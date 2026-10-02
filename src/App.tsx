/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Wrench,
  MessageCircle,
  Phone,
  AlertTriangle,
  HelpCircle,
  MapPin,
  ShieldCheck,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles,
  ClipboardList,
  UserCheck
} from 'lucide-react';
import { SERVICES, SERVICE_AREAS, COMPANY_PHONE, COMPANY_PHONE_RAW, COMPANY_WHATSAPP_NUMBER } from './data/services';
import { ServiceItem, ServiceRequestRecord } from './types';
import { getServiceRequests } from './utils/storage';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServiceCard } from './components/ServiceCard';
import { BookingModal } from './components/BookingModal';
import { DiagnosticModal } from './components/DiagnosticModal';
import { EmergencyModal } from './components/EmergencyModal';
import { ContactSheet } from './components/ContactSheet';
import { PricingView } from './components/PricingView';
import { AboutView } from './components/AboutView';
import { AdminView } from './components/AdminView';
import { BottomNav } from './components/BottomNav';
import officialLogoImg from './assets/images/mr_plumber_logo_official_1790907937387.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'bookings' | 'pricing' | 'about'>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('semua');
  
  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [initialBookingNote, setInitialBookingNote] = useState<string>('');
  
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Admin view toggle inside Bookings tab
  const [adminMode, setAdminMode] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    const list = getServiceRequests();
    setRequestCount(list.length);
  }, [isBookingOpen]);

  // Open booking modal with a specific service
  const handleSelectService = (service: ServiceItem, issueNote?: string) => {
    setSelectedServiceForBooking(service);
    setInitialBookingNote(issueNote || '');
    setIsBookingOpen(true);
  };

  // Open generic booking
  const handleOpenGeneralBooking = () => {
    setSelectedServiceForBooking(SERVICES[0]);
    setInitialBookingNote('');
    setIsBookingOpen(true);
  };

  // Filtered services for the home grid
  const filteredServices = SERVICES.filter((service) => {
    if (selectedCategoryFilter === 'semua') return true;
    return service.category === selectedCategoryFilter;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-950 pb-20 md:pb-8">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Area based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-8 sm:space-y-12 animate-in fade-in duration-200">
            {/* Hero Section */}
            <HeroSection
              onOpenBooking={handleOpenGeneralBooking}
              onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
              onOpenEmergency={() => setIsEmergencyOpen(true)}
            />

            {/* Service Categories Section */}
            <section id="services-grid" className="max-w-6xl mx-auto px-4 py-4 space-y-6">
              {/* Section Header */}
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-blue-900 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full inline-block">
                  Kategori Masalah / Servis
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                  Pilih Masalah Anda Di Bawah
                </h2>
                <p className="text-sm text-slate-600 font-medium">
                  “Pilih masalah anda di bawah dan kami akan bantu.” Tekan pada mana-mana kad untuk mengisi borang aduan pantas.
                </p>
              </div>

              {/* Category Segmented Tabs Filter */}
              <div className="flex items-center justify-center overflow-x-auto no-scrollbar py-1 gap-1.5 max-w-xl mx-auto">
                {[
                  { id: 'semua', label: 'Semua Masalah (12)' },
                  { id: 'tersumbat', label: 'Tersumbat (6)' },
                  { id: 'bocor', label: 'Bocor & Saliran (2)' },
                  { id: 'peralatan', label: 'Pam & Tangki (2)' },
                  { id: 'am', label: 'Ubah Suai / Am (2)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategoryFilter(tab.id)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategoryFilter === tab.id
                        ? 'bg-[#0B1E36] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 12 Service Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onSelect={handleSelectService}
                  />
                ))}
              </div>

              {/* "Saya Tak Tahu Masalah" Banner Helper */}
              <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Perlu Bantuan Mengesan Masalah?</span>
                  </div>
                  <h3 className="text-xl font-bold font-display">
                    Tak pasti masalah paip apa yang berlaku?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                    Jawab 1 soalan mudah mengenai tanda-tanda yang berlaku di rumah anda dan kami akan cadangkan jalan penyelesaian.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDiagnosticOpen(true)}
                  className="px-5 py-3.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-amber-400/20 flex items-center gap-2 transition-transform active:scale-95 shrink-0 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-slate-950" />
                  <span>Bantu Saya Kenalpasti Masalah</span>
                </button>
              </div>

              {/* How it works flow */}
              <div className="pt-6 border-t border-slate-200/80">
                <div className="text-center mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Aliran Mudah & Pantas
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    4 Langkah Mendapatkan Servis Mr Plumber
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1.5 shadow-2xs">
                    <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center mx-auto">
                      1
                    </span>
                    <span className="text-xs font-bold text-slate-900 block">Pilih Masalah</span>
                    <span className="text-[11px] text-slate-500 block">Pilih dari 12 kategori servis</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1.5 shadow-2xs">
                    <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center mx-auto">
                      2
                    </span>
                    <span className="text-xs font-bold text-slate-900 block">Isi & Upload</span>
                    <span className="text-[11px] text-slate-500 block">Maklumat & gambar situasi</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1.5 shadow-2xs">
                    <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center mx-auto">
                      3
                    </span>
                    <span className="text-xs font-bold text-slate-900 block">Hantar WhatsApp</span>
                    <span className="text-[11px] text-slate-500 block">Mesej dibina secara automatik</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1.5 shadow-2xs">
                    <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center mx-auto">
                      4
                    </span>
                    <span className="text-xs font-bold text-slate-900 block">Mr Plumber Hadir</span>
                    <span className="text-[11px] text-slate-500 block">Penyelesaian di lokasi anda</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Tab 2: Servis */}
        {activeTab === 'services' && (
          <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-in fade-in duration-200">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-block">
                Katalog Penuh
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                SEMUA SERVIS MR PLUMBER
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Pilih servis yang anda perlukan untuk membuka borang tempahan dengan segera.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onSelect={handleSelectService}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Tempahan / Admin */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* View Mode Switcher: Pelanggan vs Juruteknik/Admin */}
            <div className="max-w-5xl mx-auto px-4 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-slate-200 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setAdminMode(false)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    !adminMode ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
                  }`}
                >
                  Pandangan Pelanggan
                </button>
                <button
                  type="button"
                  onClick={() => setAdminMode(true)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    adminMode ? 'bg-[#0B1E36] text-white shadow-2xs font-bold' : 'text-slate-600'
                  }`}
                >
                  Dashboard Juruteknik / Admin
                </button>
              </div>

              {!adminMode && (
                <button
                  type="button"
                  onClick={handleOpenGeneralBooking}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Buka Borang Baru</span>
                </button>
              )}
            </div>

            {adminMode ? (
              <AdminView />
            ) : (
              <div className="max-w-4xl mx-auto px-4 py-4 space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 text-center sm:text-left shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                        Status & Sejarah
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        Permintaan Servis Anda
                      </h2>
                      <p className="text-xs text-slate-600">
                        Semua permintaan yang anda isi di peranti ini disimpan di sini. Anda juga boleh terus menghubungi Mr Plumber pada bila-bila masa.
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent('Assalamualaikum Mr Plumber, saya ingin semak status tempahan saya.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs whitespace-nowrap self-start sm:self-auto"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>WhatsApp Semakan</span>
                    </a>
                  </div>
                </div>

                {/* Sub-component: Customer's own saved requests */}
                <CustomerRequestsList onSelectService={handleSelectService} />
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Senarai Harga */}
        {activeTab === 'pricing' && (
          <PricingView
            onSelectService={handleSelectService}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {/* Tab 5: Tentang Kami */}
        {activeTab === 'about' && (
          <AboutView
            onOpenBooking={handleOpenGeneralBooking}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1E36] text-white border-t border-slate-800 mt-12 py-8 px-4 text-xs">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-400 bg-white shrink-0 shadow-xs">
                <img
                  src={officialLogoImg}
                  alt="Mr Plumber"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display font-black text-lg text-white">MR PLUMBER</span>
            </div>
            <p className="text-amber-400 font-bold">“Masalah Paip? Kami Bantu.”</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Servis plumbing profesional untuk kediaman, premis perniagaan dan penyelenggaraan berkala di seluruh kawasan tumpuan.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
              Kawasan Liputan
            </span>
            <ul className="space-y-1 text-slate-300 text-[11px]">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
              Hubungi Kami
            </span>
            <div className="space-y-2">
              <a
                href={`tel:${COMPANY_PHONE_RAW}`}
                className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono font-bold">{COMPANY_PHONE}</span>
              </a>
              <a
                href={`https://wa.me/${COMPANY_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400 shrink-0" />
                <span>WhatsApp: {COMPANY_PHONE}</span>
              </a>
              <p className="text-slate-400 text-[11px]">
                Waktu: 7 Hari Seminggu (Termasuk Cuti Umum)
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
              Pintas Cepat
            </span>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  setActiveTab('pricing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="block text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Kadar Harga Servis
              </button>
              <button
                onClick={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="block text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Tentang Mr Plumber
              </button>
              <button
                onClick={() => setIsEmergencyOpen(true)}
                className="block text-red-400 hover:text-red-300 font-bold transition-colors cursor-pointer"
              >
                🚨 Kecemasan Paip
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-slate-800 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} MR PLUMBER MALAYSIA. Hak Cipta Terpelihara.
          </div>
          <div className="text-slate-400">
            Dibuat untuk kemudahan urusan servis plumbing pantas & telus.
          </div>
        </div>
      </footer>

      {/* Floating Bottom Navigation for Mobile */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenContact={() => setIsContactOpen(true)}
        bookingCount={requestCount}
      />

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedServiceForBooking}
        initialNote={initialBookingNote}
        onSubmittedSuccess={() => {
          setRequestCount(getServiceRequests().length);
        }}
      />

      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        onSelectService={(service, note) => {
          handleSelectService(service, note);
        }}
      />

      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <ContactSheet
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

// Sub-component for customer list inside Tab 3
function CustomerRequestsList({ onSelectService }: { onSelectService: (service: ServiceItem) => void }) {
  const [requests, setRequests] = useState<ServiceRequestRecord[]>([]);

  useEffect(() => {
    setRequests(getServiceRequests());
  }, []);

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
        <p className="text-sm font-bold text-slate-800">Belum ada rekod tempahan</p>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Apabila anda menghantar borang aduan servis, rekod tempahan akan dipaparkan di sini untuk rujukan anda.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-slate-800 px-1">
        Senarai Permintaan Yang Dihantar:
      </h3>
      <div className="space-y-3">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-2.5"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                  {req.id}
                </span>
                <span className="text-xs font-bold text-blue-900">
                  {req.serviceName}
                </span>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {req.status === 'baru' && '🟡 Diterima'}
                {req.status === 'dihubungi' && '🔵 Sedang Dihubungi'}
                {req.status === 'proses' && '🟠 Dalam Proses'}
                {req.status === 'selesai' && '🟢 Selesai'}
                {req.status === 'batal' && '🔴 Dibatalkan'}
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <div>
                <span className="font-semibold text-slate-700">Lokasi:</span> {req.address}
              </div>
              {req.issueDescription && (
                <div>
                  <span className="font-semibold text-slate-700">Catatan:</span> {req.issueDescription}
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                {new Date(req.createdAt).toLocaleDateString('ms-MY', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>

              <a
                href={`https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Salam Mr Plumber, saya ingin bertanya tentang status tempahan [${req.id} - ${req.serviceName}].`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-600" />
                <span>Susulan WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
