import React, { useState } from 'react';
import { HelpCircle, X, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { DIAGNOSTIC_OPTIONS, SERVICES } from '../data/services';
import { ServiceItem } from '../types';
import officialLogoImg from '../assets/images/mr_plumber_logo_official_1790907937387.jpg';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: ServiceItem, issueNote?: string) => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  onSelectService
}) => {
  const [selectedDiagnosticId, setSelectedDiagnosticId] = useState<string | null>(null);

  if (!isOpen) return null;

  const selectedOption = DIAGNOSTIC_OPTIONS.find((opt) => opt.id === selectedDiagnosticId);
  const recommendedService = selectedOption
    ? SERVICES.find((s) => s.id === selectedOption.recommendedServiceId)
    : null;

  const handleConfirm = () => {
    if (recommendedService && selectedOption) {
      onSelectService(recommendedService, selectedOption.label);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="diagnostic-title"
      >
        {/* Grab bar for mobile touch affordance */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 pb-3 border-b border-slate-100 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 bg-white shrink-0 shadow-xs">
              <img src={officialLogoImg} alt="Mr Plumber" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 id="diagnostic-title" className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Tak Pasti Masalah Paip Apa?
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Pilih apa yang sedang berlaku dan kami cadangkan servis yang betul.
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

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Soalan: Apa yang berlaku di tempat anda?
          </p>

          <div className="space-y-2">
            {DIAGNOSTIC_OPTIONS.map((opt) => {
              const isSelected = selectedDiagnosticId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedDiagnosticId(opt.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 text-blue-950 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                  }`}
                >
                  <div>
                    <span className="font-semibold text-sm block">
                      {opt.label}
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      {opt.description}
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Recommendation Box if selected */}
          {selectedOption && recommendedService && (
            <div className="mt-4 p-4 rounded-2xl bg-[#0B1E36] text-white border border-slate-700 shadow-md animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wide mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Cadangan Servis Mr Plumber</span>
              </div>
              <p className="text-sm text-slate-200 font-medium">
                {selectedOption.recommendedReason}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{recommendedService.emoji}</span>
                  <div>
                    <span className="font-bold text-white text-sm block">
                      {recommendedService.title}
                    </span>
                    <span className="text-xs text-amber-400 font-semibold block">
                      {recommendedService.startingPrice
                        ? `Bermula ${recommendedService.priceTag}`
                        : recommendedService.priceTag}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <span>Tempah Servis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Batal
          </button>
          {selectedOption && recommendedService ? (
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Teruskan Tempahan: {recommendedService.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs text-slate-500 italic">
              Sila pilih salah satu situasi di atas
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
