import React from 'react';
import { AlertOctagon, Phone, MessageCircle, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW, COMPANY_WHATSAPP_NUMBER } from '../data/services';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const emergencyWhatsAppUrl = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    '🚨 KECEMASAN PLUMBING: Saya perlukan bantuan paip kecemasan segera di lokasi saya (air melimpah / paip pecah).'
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border-2 border-red-500 overflow-hidden animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="emergency-modal-title"
      >
        {/* Grab handle for touch */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Top Emergency Header */}
        <div className="bg-red-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-red-200 font-bold block">
                Tindakan Segera
              </span>
              <h2 id="emergency-modal-title" className="text-xl font-black tracking-tight">
                Kecemasan Plumbing
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Safe Instruction Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-950 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed font-semibold">
              “Jika berlaku kebocoran besar atau air sedang melimpah, sila tutup injap utama air (stopcock) jika selamat dilakukan.”
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Jauhkan wayar dan soket elektrik daripada takungan air.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Pasukan Mr Plumber sedia membantu bergerak ke lokasi anda.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2.5">
            {/* Phone button */}
            <a
              href={`tel:${COMPANY_PHONE_RAW}`}
              className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-md shadow-red-600/30 transition-transform active:scale-[0.98]"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm sm:text-base">HUBUNGI MR PLUMBER ({COMPANY_PHONE})</span>
            </a>

            {/* WhatsApp button */}
            <a
              href={emergencyWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-md shadow-emerald-600/30 transition-transform active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span className="text-sm sm:text-base">WHATSAPP MR PLUMBER</span>
            </a>
          </div>
        </div>

        {/* Safe dismiss */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-1 px-4 cursor-pointer"
          >
            Tutup & Kembali ke Aplikasi
          </button>
        </div>
      </div>
    </div>
  );
};
