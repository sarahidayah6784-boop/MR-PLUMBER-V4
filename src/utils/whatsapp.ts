import { BookingFormData } from '../types';
import { COMPANY_WHATSAPP_NUMBER } from '../data/services';

export function formatUrgencyLabel(level: BookingFormData['urgency']): string {
  switch (level) {
    case 'biasa':
      return 'Biasa (Tidak mendesak)';
    case 'segera':
      return 'Perlu Tindakan Segera';
    case 'kecemasan':
      return 'KECEMASAN (Air melimpah / bocor kuat)';
    default:
      return 'Biasa';
  }
}

export function formatTimeframeLabel(timeframe: BookingFormData['timeframe']): string {
  switch (timeframe) {
    case 'baru':
      return 'Baru berlaku';
    case 'beberapa_jam':
      return 'Sejak beberapa jam';
    case 'semalam':
      return 'Sejak semalam';
    case 'beberapa_hari':
      return 'Sudah beberapa hari';
    case 'tidak_pasti':
      return 'Tidak pasti';
    default:
      return timeframe;
  }
}

export function buildWhatsAppMessage(data: BookingFormData): string {
  const urgencyText = formatUrgencyLabel(data.urgency);
  
  // Format exactly matching the user's specification
  let message = `Assalamualaikum Mr Plumber.

Saya ingin mendapatkan servis plumbing.

Nama:
${data.customerName.trim()}

Telefon:
${data.phone.trim()}

Jenis masalah:
${data.serviceName.trim()}

Masalah:
${data.issueDescription.trim() || 'Servis & pemeriksaan di lokasi'}

Tahap masalah:
${urgencyText}

Lokasi:
${data.address.trim()}${data.serviceArea ? ` (${data.serviceArea})` : ''}

Saya telah mengisi borang melalui aplikasi Mr Plumber.

Mohon bantuan untuk semakan dan sebut harga.

Terima kasih.`;

  // Additional detail footnote if available
  const notes: string[] = [];
  if (data.canWaterFlow) {
    notes.push(`- Air mengalir: ${data.canWaterFlow === 'ya' ? 'Ya' : 'Tidak'}`);
  }
  if (data.isLeaking) {
    notes.push(`- Kebocoran: ${data.isLeaking === 'ya' ? 'Ya' : 'Tidak'}`);
  }
  if (data.isFlooding) {
    notes.push(`- Kawasan dinaiki air: ${data.isFlooding === 'ya' ? 'Ya' : 'Tidak'}`);
  }
  if (data.mediaFiles && data.mediaFiles.length > 0) {
    const imagesCount = data.mediaFiles.filter(m => m.type === 'image').length;
    const videoCount = data.mediaFiles.filter(m => m.type === 'video').length;
    const mediaParts: string[] = [];
    if (imagesCount > 0) mediaParts.push(`${imagesCount} gambar`);
    if (videoCount > 0) mediaParts.push(`${videoCount} video`);
    notes.push(`- Lampiran media sedia ada: ${mediaParts.join(', ')} (akan dihantar di chat ini)`);
  }

  if (notes.length > 0) {
    message += `\n\n[Status Tambahan]:\n${notes.join('\n')}`;
  }

  return message;
}

export function generateWhatsAppLink(data: BookingFormData): string {
  const text = buildWhatsAppMessage(data);
  return `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function generateDirectWhatsAppLink(customText?: string): string {
  const defaultText = `Assalamualaikum Mr Plumber, saya ingin bertanya tentang servis plumbing.`;
  return `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent(customText || defaultText)}`;
}

export function generateCustomerReplyWhatsAppLink(customerPhone: string, customerName: string, serviceName: string): string {
  // Clean phone to Malaysian international format (e.g. 0123127739 -> 60123127739)
  let cleanPhone = customerPhone.replace(/\D/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '6' + cleanPhone;
  } else if (!cleanPhone.startsWith('60')) {
    cleanPhone = '60' + cleanPhone;
  }
  const text = `Salam ${customerName}, kami dari Mr Plumber berkenaan tempahan anda untuk servis [${serviceName}]. Kami sedia bantu.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
