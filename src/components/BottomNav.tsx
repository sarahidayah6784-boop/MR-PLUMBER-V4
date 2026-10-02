import React from 'react';
import { Home, Wrench, ClipboardList, PhoneCall } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'services' | 'bookings' | 'pricing' | 'about';
  onSelectTab: (tab: 'home' | 'services' | 'bookings' | 'pricing' | 'about') => void;
  onOpenContact: () => void;
  bookingCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenContact,
  bookingCount = 0
}) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-safe"
      aria-label="Navigasi Mudah Alih"
    >
      <div className="grid grid-cols-4 items-center h-16 max-w-lg mx-auto px-2">
        {/* 1. Utama */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-[#0B1E36] font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] tracking-tight mt-1">Utama</span>
        </button>

        {/* 2. Servis */}
        <button
          onClick={() => onSelectTab('services')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors cursor-pointer ${
            activeTab === 'services' ? 'text-[#0B1E36] font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Wrench className={`w-5 h-5 ${activeTab === 'services' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] tracking-tight mt-1">Servis</span>
        </button>

        {/* 3. Tempahan */}
        <button
          onClick={() => onSelectTab('bookings')}
          className={`relative flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors cursor-pointer ${
            activeTab === 'bookings' ? 'text-[#0B1E36] font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ClipboardList className={`w-5 h-5 ${activeTab === 'bookings' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] tracking-tight mt-1">Tempahan</span>
          {bookingCount > 0 && (
            <span className="absolute top-1 right-5 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
              {bookingCount > 9 ? '9+' : bookingCount}
            </span>
          )}
        </button>

        {/* 4. Hubungi (Opens action sheet) */}
        <button
          onClick={onOpenContact}
          className="flex flex-col items-center justify-center min-h-[44px] py-1 text-emerald-700 hover:text-emerald-800 font-bold transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mb-0.5 shadow-xs">
            <PhoneCall className="w-4 h-4 fill-emerald-600" />
          </div>
          <span className="text-[10px] tracking-tight">Hubungi</span>
        </button>
      </div>
    </nav>
  );
};
