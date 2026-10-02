import { BookingFormData, ServiceRequestRecord } from '../types';

const DRAFT_STORAGE_KEY = 'mr_plumber_form_draft_v1';
const REQUESTS_STORAGE_KEY = 'mr_plumber_requests_v1';

export const INITIAL_FORM_DATA: BookingFormData = {
  customerName: '',
  phone: '',
  serviceId: '',
  serviceName: '',
  issueDescription: '',
  timeframe: 'baru',
  urgency: 'biasa',
  canWaterFlow: 'tidak',
  isLeaking: 'tidak',
  isFlooding: 'tidak',
  serviceArea: 'Lembah Klang',
  address: '',
  mediaFiles: []
};

// Realistic Malaysian demo requests for initial demonstration
const SAMPLE_REQUESTS: ServiceRequestRecord[] = [
  {
    id: 'MP-8921',
    customerName: 'Ahmad Faiz',
    phone: '012-4567890',
    serviceId: 'jamban-tersumbat',
    serviceName: 'JAMBAN TERSUMBAT',
    issueDescription: 'Air tandas master bedroom bertakung bila flush, risau melimpah ke lantai bilik.',
    timeframe: 'sejak_beberapa_jam' as any,
    urgency: 'segera',
    canWaterFlow: 'tidak',
    isLeaking: 'tidak',
    isFlooding: 'tidak',
    serviceArea: 'Selangor',
    address: 'No. 24, Jalan USJ 11/3, Subang Jaya, 47620 Selangor',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 mins ago
    status: 'baru',
    mediaFiles: []
  },
  {
    id: 'MP-8919',
    customerName: 'Siti Norhaliza',
    phone: '019-3321144',
    serviceId: 'gully-trap-tersumbat',
    serviceName: 'GULLY TRAP TERSUMBAT',
    issueDescription: 'Longkang perangkap luar dapur berbau dan buih sabun melimpah keluar.',
    timeframe: 'semalam',
    urgency: 'biasa',
    canWaterFlow: 'ya',
    isLeaking: 'tidak',
    isFlooding: 'tidak',
    serviceArea: 'Lembah Klang',
    address: '15, Jalan 4/14D, Seksyen 4, 43650 Bandar Baru Bangi',
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(), // 3 hours ago
    status: 'dihubungi',
    mediaFiles: []
  },
  {
    id: 'MP-8904',
    customerName: 'Tan Wei Loon',
    phone: '017-8899211',
    serviceId: 'paip-bocor',
    serviceName: 'PAIP BOCOR',
    issueDescription: 'Paip utama berhampiran meter air pecah dan air menyembur kuat.',
    timeframe: 'baru',
    urgency: 'kecemasan',
    canWaterFlow: 'ya',
    isLeaking: 'ya',
    isFlooding: 'ya',
    serviceArea: 'Selangor',
    address: 'B-12-03, Residensi Puchong Mas, Puchong, Selangor',
    createdAt: new Date(Date.now() - 7 * 3600 * 1000).toISOString(),
    status: 'proses',
    mediaFiles: []
  },
  {
    id: 'MP-8876',
    customerName: 'Kavitha Devi',
    phone: '016-7788990',
    serviceId: 'sinki-floor-trap-tersumbat',
    serviceName: 'SINKI / FLOOR TRAP TERSUMBAT',
    issueDescription: 'Sinki dapur basah tersumbat lemak berminyak, selesai diservis.',
    timeframe: 'beberapa_hari',
    urgency: 'biasa',
    canWaterFlow: 'tidak',
    isLeaking: 'tidak',
    isFlooding: 'tidak',
    serviceArea: 'Negeri Sembilan',
    address: 'No 88, Jalan Senawang Perdana 3, Senawang, Seremban',
    createdAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
    status: 'selesai',
    mediaFiles: []
  }
];

export function getStoredDraft(): BookingFormData | null {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Don't retain huge base64 media if stored incorrectly
    return {
      ...INITIAL_FORM_DATA,
      ...parsed,
      mediaFiles: parsed.mediaFiles || []
    };
  } catch (e) {
    console.error('Error reading draft from localStorage:', e);
    return null;
  }
}

export function saveFormDraft(data: Partial<BookingFormData>): void {
  try {
    const current = getStoredDraft() || INITIAL_FORM_DATA;
    // Don't store large blob data URLs in localStorage to prevent quota exhaustion
    const sanitizedMedia = (data.mediaFiles || current.mediaFiles || []).map(m => ({
      id: m.id,
      name: m.name,
      type: m.type,
      url: m.url.startsWith('blob:') ? '' : m.url.slice(0, 100) // avoid storing raw blobs
    }));

    const updated = {
      ...current,
      ...data,
      mediaFiles: sanitizedMedia
    };
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save draft to localStorage', e);
  }
}

export function clearFormDraft(): void {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing draft:', e);
  }
}

export function getServiceRequests(): ServiceRequestRecord[] {
  try {
    const raw = localStorage.getItem(REQUESTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(SAMPLE_REQUESTS));
      return SAMPLE_REQUESTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading service requests:', e);
    return SAMPLE_REQUESTS;
  }
}

export function saveNewServiceRequest(formData: BookingFormData): ServiceRequestRecord {
  const requests = getServiceRequests();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newRecord: ServiceRequestRecord = {
    ...formData,
    id: `MP-${randomNum}`,
    createdAt: new Date().toISOString(),
    status: 'baru'
  };

  const updated = [newRecord, ...requests];
  try {
    // Sanitize media before saving in localStorage
    const storable = updated.map(item => ({
      ...item,
      mediaFiles: (item.mediaFiles || []).map(m => ({
        id: m.id,
        name: m.name,
        type: m.type,
        url: '' // save storage space
      }))
    }));
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(storable));
  } catch (e) {
    console.warn('Failed to save service request to storage', e);
  }

  return newRecord;
}

export function updateServiceRequestStatus(id: string, newStatus: ServiceRequestRecord['status']): void {
  const requests = getServiceRequests();
  const updated = requests.map(item => item.id === id ? { ...item, status: newStatus } : item);
  try {
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update status', e);
  }
}
