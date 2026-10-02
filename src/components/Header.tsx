import React from 'react';
import { Phone, MessageCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW, COMPANY_WHATSAPP_NUMBER } from '../data/services';
import officialLogoImg from '../assets/images/mr_plumber_logo_official_1790907937387.jpg';

interface HeaderProps {
  onOpenEmergency: () => void;
  onOpenContact: () => void;
  onNavigateTab: (tab: 'home' | 'services' | 'bookings' | 'pricing' | 'about') => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEmergency,
  onOpenContact,
  onNavigateTab,
  activeTab
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0B1E36] text-white border-b border-slate-800 shadow-md">
      {/* Top micro status bar */}
      <div className="bg-[#071322] px-4 py-1.5 text-[11px] text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Kawasan: Lembah Klang · Selangor · Putrajaya · N. Sembilan</span>
        </div>
        <button
          onClick={onOpenEmergency}
          className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Kecemasan 24 Jam</span>
        </button>
      </div>

      {/* Main Top Bar Contract: Brand | Nav Links | Actions */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 shadow-sm shadow-amber-400/30 group-hover:scale-105 transition-transform bg-white shrink-0">
              <img
                src={officialLogoImg}
                alt="Logo Rasmi Mr Plumber"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white block leading-none font-display">
                MR PLUMBER
              </span>
              <span className="text-[11px] font-medium text-amber-400 tracking-wide block mt-1">
                Masalah Paip? Kami Bantu.
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation links (Desktop / Tablet) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigateTab('home')}
            className={`hover:text-amber-400 transition-colors cursor-pointer ${
              activeTab === 'home' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Utama
          </button>
          <button
            onClick={() => onNavigateTab('services')}
            className={`hover:text-amber-400 transition-colors cursor-pointer ${
              activeTab === 'services' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Semua Servis
          </button>
          <button
            onClick={() => onNavigateTab('pricing')}
            className={`hover:text-amber-400 transition-colors cursor-pointer ${
              activeTab === 'pricing' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Senarai Harga
          </button>
          <button
            onClick={() => onNavigateTab('about')}
            className={`hover:text-amber-400 transition-colors cursor-pointer ${
              activeTab === 'about' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Tentang Kami
          </button>
          <button
            onClick={() => onNavigateTab('bookings')}
            className={`hover:text-amber-400 transition-colors cursor-pointer ${
              activeTab === 'bookings' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Rekod Tempahan
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2">
          {/* Direct Phone Call Button */}
          <a
            href={`tel:${COMPANY_PHONE_RAW}`}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700 whitespace-nowrap min-h-[40px]"
            title={`Hubungi terus ${COMPANY_PHONE}`}
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{COMPANY_PHONE}</span>
            <span className="sm:hidden font-bold">Call</span>
          </a>

          {/* Quick WhatsApp Action Button (Green) */}
          <a
            href={`https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent('Assalamualaikum Mr Plumber, saya perlukan bantuan servis paip.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-sm shadow-emerald-600/30 transition-all transform active:scale-95 whitespace-nowrap min-h-[40px]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
};
