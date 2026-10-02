export type UrgencyLevel = 'biasa' | 'segera' | 'kecemasan';
export type TimeframeOption = 'baru' | 'beberapa_jam' | 'semalam' | 'beberapa_hari' | 'tidak_pasti';
export type RequestStatus = 'baru' | 'dihubungi' | 'proses' | 'selesai' | 'batal';
export type ServiceArea = 'Lembah Klang' | 'Selangor' | 'Putrajaya' | 'Negeri Sembilan' | 'Kawasan Lain';

export interface ServiceItem {
  id: string;
  title: string;
  emoji: string;
  description: string;
  priceTag: string;
  startingPrice?: number;
  popular?: boolean;
  buttonLabel?: string;
  category: 'tersumbat' | 'bocor' | 'peralatan' | 'am';
}

export interface MediaFile {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video';
  sizeFormatted?: string;
}

export interface BookingFormData {
  customerName: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  issueDescription: string;
  timeframe: TimeframeOption;
  urgency: UrgencyLevel;
  canWaterFlow: 'ya' | 'tidak' | '';
  isLeaking: 'ya' | 'tidak' | '';
  isFlooding: 'ya' | 'tidak' | '';
  serviceArea: ServiceArea;
  address: string;
  latitude?: number;
  longitude?: number;
  mediaFiles: MediaFile[];
}

export interface ServiceRequestRecord extends BookingFormData {
  id: string;
  createdAt: string;
  status: RequestStatus;
  notes?: string;
}
