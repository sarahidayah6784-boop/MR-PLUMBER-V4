import { ServiceItem } from '../types';

export const COMPANY_PHONE = '012-312 7739';
export const COMPANY_PHONE_RAW = '0123127739';
export const COMPANY_WHATSAPP_NUMBER = '60123127739';

export const SERVICE_AREAS = [
  'Lembah Klang',
  'Selangor',
  'Putrajaya',
  'Negeri Sembilan'
] as const;

export const SERVICES: ServiceItem[] = [
  {
    id: 'jamban-tersumbat',
    title: 'JAMBAN TERSUMBAT',
    emoji: '🚽',
    description: 'Air tandas tidak turun / tiada caj tersumbunyi',
    priceTag: 'RM350',
    startingPrice: 350,
    popular: true,
    buttonLabel: 'Pilih Servis',
    category: 'tersumbat'
  },
  {
    id: 'gully-trap-tersumbat',
    title: 'GULLY TRAP TERSUMBAT',
    emoji: '🕳️',
    description: 'Gully trap tersumbat termasuk servis paip sinki',
    priceTag: 'RM330',
    startingPrice: 330,
    popular: true,
    buttonLabel: 'Pilih Servis',
    category: 'tersumbat'
  },
  {
    id: 'sinki-floor-trap-tersumbat',
    title: 'SINKI / FLOOR TRAP TERSUMBAT',
    emoji: '🚰',
    description: 'Sinki atau floor trap tidak mengalir',
    priceTag: 'RM330',
    startingPrice: 330,
    popular: true,
    buttonLabel: 'Pilih Servis',
    category: 'tersumbat'
  },
  {
    id: 'paip-bocor',
    title: 'PAIP BOCOR',
    emoji: '💧',
    description: 'Paip bocor, menitis atau pecah',
    priceTag: 'Dapatkan Sebut Harga',
    buttonLabel: 'Pilih Servis',
    category: 'bocor'
  },
  {
    id: 'longkang-saliran-tersumbat',
    title: 'LONGKANG / SALIRAN TERSUMBAT',
    emoji: '🚿',
    description: 'Air bertakung atau saliran tidak mengalir',
    priceTag: 'Dapatkan Sebut Harga',
    buttonLabel: 'Pilih Servis',
    category: 'tersumbat'
  },
  {
    id: 'bilik-air-tersumbat',
    title: 'BILIK AIR TERSUMBAT',
    emoji: '🛁',
    description: 'Masalah saliran atau air tidak turun',
    priceTag: 'Dapatkan Sebut Harga',
    buttonLabel: 'Pilih Servis',
    category: 'tersumbat'
  },
  {
    id: 'pam-air-bermasalah',
    title: 'PAM AIR BERMASALAH',
    emoji: '💦',
    description: 'Pam air tidak berfungsi / tekanan air lemah',
    priceTag: 'Dapatkan Sebut Harga',
    buttonLabel: 'Pilih Servis',
    category: 'peralatan'
  },
  {
    id: 'tangki-air',
    title: 'TANGKI AIR',
    emoji: '🛢️',
    description: 'Pemeriksaan, pembersihan atau masalah tangki air',
    priceTag: 'Dapatkan Sebut Harga',
    buttonLabel: 'Pilih Servis',
    category: 'peralatan'
  },
  {
    id: 'pembersihan-grease-trap',
    title: 'PEMBERSIHAN GREASE TRAP',
    emoji: '🧼',
    description: 'Grease trap penuh atau tersumbat',
    priceTag: 'Dapatkan Sebut Harga',
    buttonLabel: 'Pilih Servis',
    category: 'tersumbat'
  },
  {
    id: 'pemasangan-pembaikan-plumbing',
    title: 'PEMASANGAN / PEMBAIKAN PLUMBING',
    emoji: '🔧',
    description: 'Kerja pemasangan dan pembaikan sistem paip',
    priceTag: 'Dapatkan Sebut Harga',
    buttonLabel: 'Pilih Servis',
    category: 'am'
  },
  {
    id: 'renovation-plumbing',
    title: 'RENOVATION PLUMBING',
    emoji: '🏠',
    description: 'Kerja plumbing untuk renovasi rumah / premis',
    priceTag: 'Dapatkan Sebut Harga',
    buttonLabel: 'Pilih Servis',
    category: 'am'
  },
  {
    id: 'masalah-lain',
    title: 'MASALAH LAIN',
    emoji: '❓',
    description: 'Tidak pasti masalah apa? Beritahu kami.',
    priceTag: 'Dapatkan Sebut Harga',
    buttonLabel: 'Bantu Saya',
    category: 'am'
  }
];

export interface DiagnosticOption {
  id: string;
  label: string;
  description: string;
  recommendedServiceId: string;
  recommendedReason: string;
}

export const DIAGNOSTIC_OPTIONS: DiagnosticOption[] = [
  {
    id: 'air-tidak-turun-tandas',
    label: 'Air tandas tidak turun / bertakung',
    description: 'Mangkuk tandas melimpah atau air langsung tidak mengalir turun',
    recommendedServiceId: 'jamban-tersumbat',
    recommendedReason: 'Masalah anda berkemungkinan besar adalah JAMBAN TERSUMBAT.'
  },
  {
    id: 'air-bawah-sinki',
    label: 'Air keluar dari bawah sinki / bocor',
    description: 'Terdapat titisan air atau paip bawah kabinet sinki basah',
    recommendedServiceId: 'paip-bocor',
    recommendedReason: 'Masalah berkemungkinan SINKI / PAIP BOCOR.'
  },
  {
    id: 'sinki-lambat-turun',
    label: 'Sinki dapur atau bilik air tidak mengalir',
    description: 'Air bertakung lama dalam mangkuk sinki atau floor trap bilik air',
    recommendedServiceId: 'sinki-floor-trap-tersumbat',
    recommendedReason: 'Masalah anda adalah SINKI / FLOOR TRAP TERSUMBAT.'
  },
  {
    id: 'gully-trap-melimpah',
    label: 'Gully trap luar rumah melimpah / berbuih',
    description: 'Air sabun atau sisa kotoran keluar dari perangkap longkang luar rumah',
    recommendedServiceId: 'gully-trap-tersumbat',
    recommendedReason: 'Masalah anda disyorkan servis GULLY TRAP TERSUMBAT.'
  },
  {
    id: 'paip-pancut-bocor',
    label: 'Paip bocor / menitis / pecah',
    description: 'Ada semburan air atau dinding lembap akibat paip dalaman retak',
    recommendedServiceId: 'paip-bocor',
    recommendedReason: 'Masalah anda memerlukan servis pantas PAIP BOCOR.'
  },
  {
    id: 'tekanan-rendah',
    label: 'Tekanan air rendah / air keluar perlahan',
    description: 'Pili air mengalir sangat perlahan atau pam penggalak tidak hidup',
    recommendedServiceId: 'pam-air-bermasalah',
    recommendedReason: 'Masalah anda mungkin PAM AIR BERMASALAH.'
  },
  {
    id: 'tiada-air-tangki',
    label: 'Air tiada / masalah tangki air atas siling',
    description: 'Air tak sampai ke rumah atau tangki melimpah tanpa henti',
    recommendedServiceId: 'tangki-air',
    recommendedReason: 'Masalah anda memerlukan pemeriksaan TANGKI AIR.'
  },
  {
    id: 'longkang-tersumbat',
    label: 'Longkang luar rumah bertakung & berkelodak',
    description: 'Saliran longkang sekitar rumah tidak mengalir ke longkang utama',
    recommendedServiceId: 'longkang-saliran-tersumbat',
    recommendedReason: 'Masalah anda adalah LONGKANG / SALIRAN TERSUMBAT.'
  },
  {
    id: 'bau-busuk',
    label: 'Bau busuk meluap dari lubang lantai / perangkap lemak',
    description: 'Bau sisa makanan atau kotoran kuat di dapur komersial/kediaman',
    recommendedServiceId: 'pembersihan-grease-trap',
    recommendedReason: 'Masalah anda mungkin memerlukan PEMBERSIHAN GREASE TRAP.'
  },
  {
    id: 'masalah-lain-diagnosa',
    label: 'Masalah lain / ubah suai plumbing',
    description: 'Pemasangan paip baru, pembaikan am atau ubah suai rumah',
    recommendedServiceId: 'masalah-lain',
    recommendedReason: 'Mr Plumber sedia memeriksa dan memberi sebut harga tepat.'
  }
];
