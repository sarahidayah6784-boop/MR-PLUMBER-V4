import React from 'react';
import { Phone, MessageCircle, X, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW, COMPANY_WHATSAPP_NUMBER, SERVICE_AREAS } from '../data/services';
import officialLogoImg from '../assets/images/mr_plumber_logo_official_1790907937387.jpg';

interface ContactSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactSheet: React.FC<ContactSheetProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const defaultWaUrl = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Assalamualaikum Mr Plumber, saya ingin bertanyakan servis plumbing anda.'
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-sheet-title"
      >
        {/* Grab bar */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 sm:hidden" />

        <div className="p-5 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 bg-white shadow-xs">
              <img src={officialLogoImg} alt="Mr Plumber" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 id="contact-sheet-title" className="text-lg font-black text-slate-900 leading-snug">
                Hubungi Mr Plumber
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Tindak balas pantas bagi seluruh kawasan liputan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* WhatsApp Primary */}
          <a
            href={defaultWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-2xl flex items-center justify-between shadow-md shadow-emerald-600/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 fill-white" />
              </div>
              <div className="text-left">
                <span className="text-xs uppercase font-bold text-emerald-100 block">
                  Respons Pantas (Mesej)
                </span>
                <span className="text-base font-black tracking-tight block">
                  WhatsApp Mr Plumber
                </span>
                <span className="text-xs text-white/90 font-mono">012-312 7739</span>
              </div>
            </div>
            <span className="text-xs bg-white text-emerald-800 font-bold px-3 py-1.5 rounded-xl group-hover:scale-105 transition-transform">
              Chat
            </span>
          </a>

          {/* Call Phone */}
          <a
            href={`tel:${COMPANY_PHONE_RAW}`}
            className="w-full p-4 bg-[#0B1E36] hover:bg-slate-800 active:bg-slate-900 text-white rounded-2xl flex items-center justify-between shadow-md shadow-slate-900/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-amber-400" />
              </div>
              <div className="text-left">
                <span className="text-xs uppercase font-bold text-amber-400 block">
                  Panggilan Terus
                </span>
                <span className="text-base font-black tracking-tight block">
                  Call Mr Plumber
                </span>
                <span className="text-xs text-slate-300 font-mono">{COMPANY_PHONE}</span>
              </div>
            </div>
            <span className="text-xs bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl group-hover:scale-105 transition-transform">
              Dail
            </span>
          </a>

          {/* Service Area Info */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <MapPin className="w-4 h-4 text-blue-700" />
              <span>Kawasan Liputan:</span>
            </div>
            <p className="text-[12px] text-slate-600 pl-6 leading-relaxed">
              {SERVICE_AREAS.join(' · ')}
            </p>
            <div className="flex items-center gap-2 pt-1 font-bold text-slate-900">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Waktu Operasi:</span>
            </div>
            <p className="text-[12px] text-slate-600 pl-6">
              Isnin – Ahad (Setiap Hari Termasuk Cuti Umum)
            </p>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-1 cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
