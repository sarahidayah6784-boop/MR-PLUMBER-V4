import React from 'react';
import {
  Wrench,
  MessageCircle,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Phone
} from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW, COMPANY_WHATSAPP_NUMBER, SERVICE_AREAS } from '../data/services';
import heroPlumberImg from '../assets/images/hero_mr_plumber_1790906948270.jpg';
import officialLogoImg from '../assets/images/mr_plumber_logo_official_1790907937387.jpg';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenDiagnostic: () => void;
  onOpenEmergency: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenDiagnostic,
  onOpenEmergency
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1E36] via-[#0E2542] to-slate-900 text-white">
      {/* Decorative background grid and lighting */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 py-8 sm:py-14">
        {/* Emergency Top Quick Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-red-950/40 border border-red-500/30 rounded-2xl p-3 sm:px-4">
          <div className="flex items-center gap-2.5 text-xs text-red-200">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="font-semibold">
              Air melimpah atau paip pecah? Jangan panik.
            </span>
          </div>
          <button
            onClick={onOpenEmergency}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>🚨 KECEMASAN PLUMBING</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
            {/* Brand Logo & Tagline Lockup */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-amber-400 shadow-xl shadow-amber-400/20 bg-white shrink-0">
                <img
                  src={officialLogoImg}
                  alt="Mr Plumber Logo Rasmi"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest block font-sans">
                  Servis Plumbing Profesional
                </span>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-display leading-[1.1]">
                  MASALAH PAIP?<br />
                  <span className="text-amber-400">KAMI BANTU.</span>
                </h1>
                <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
                  Affordable Plumbing. Premium Service.
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl">
              Pakar melancarkan tandas & singki tersumbat, membaiki paip bocor, pam air, tangki dan sistem saliran di kediaman serta premis anda.
            </p>

            {/* Coverage Tagline */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-300">
              <span className="font-semibold text-amber-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Liputan:
              </span>
              {SERVICE_AREAS.map((area, idx) => (
                <span key={area} className="inline-flex items-center gap-1">
                  <span>{area}</span>
                  {idx < SERVICE_AREAS.length - 1 && <span className="text-slate-500">·</span>}
                </span>
              ))}
            </div>

            {/* Two Big Main Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto sm:mx-0">
                {/* 1. TEMPAH SERVIS SEKARANG */}
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full py-4 px-5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/20 transition-all transform active:scale-[0.98] cursor-pointer"
                >
                  <Wrench className="w-5 h-5 text-slate-950" />
                  <span>🔧 TEMPAH SERVIS SEKARANG</span>
                </button>

                {/* 2. WHATSAPP MR PLUMBER */}
                <a
                  href={`https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    'Assalamualaikum Mr Plumber. Saya perlukan bantuan servis paip.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/30 transition-all transform active:scale-[0.98] cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>📱 WHATSAPP MR PLUMBER</span>
                </a>
              </div>

              {/* Diagnostic Button: "Tak pasti masalah paip apa?" */}
              <div className="max-w-lg mx-auto sm:mx-0">
                <button
                  type="button"
                  onClick={onOpenDiagnostic}
                  className="w-full py-3 px-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-between gap-2 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span>Tak pasti masalah paip apa? Tekan di sini</span>
                  </div>
                  <span className="text-amber-400 text-xs font-extrabold group-hover:translate-x-1 transition-transform">
                    Bantu Kenalpasti &rarr;
                  </span>
                </button>
              </div>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center sm:text-left">
              <div className="space-y-0.5">
                <span className="text-amber-400 font-black text-sm sm:text-base font-display block">RM330+</span>
                <span className="text-[11px] text-slate-400 font-medium block">Kadar Bermula Telus</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-amber-400 font-black text-sm sm:text-base font-display block">Tiada Caj</span>
                <span className="text-[11px] text-slate-400 font-medium block">Tersembunyi</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-amber-400 font-black text-sm sm:text-base font-display block">7 Hari</span>
                <span className="text-[11px] text-slate-400 font-medium block">Termasuk Cuti Umum</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-700/60 shadow-2xl bg-slate-800 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group">
              <img
                src={heroPlumberImg}
                alt="Mr Plumber Juruteknik Berpengalaman"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Overlaid Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#0B1E36]/90 backdrop-blur-md border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-amber-400 block tracking-wider">
                    Juruteknik Mr Plumber
                  </span>
                  <span className="text-sm font-extrabold text-white block">
                    Peralatan Khas & Moden
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Hubungi Terus</span>
                  <span className="text-xs font-mono font-bold text-emerald-400 block">
                    {COMPANY_PHONE}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
