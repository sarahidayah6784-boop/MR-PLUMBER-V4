import React from 'react';
import { ShieldCheck, Info, CheckCircle2, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { SERVICES, COMPANY_PHONE, COMPANY_PHONE_RAW, COMPANY_WHATSAPP_NUMBER } from '../data/services';
import { ServiceItem } from '../types';

interface PricingViewProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenContact: () => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onSelectService, onOpenContact }) => {
  const fixedRateServices = SERVICES.filter((s) => s.startingPrice);
  const quotationServices = SERVICES.filter((s) => !s.startingPrice);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-8 animate-in fade-in duration-200">
      {/* Title Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block">
          Telus & Jujur
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          HARGA SERVIS MR PLUMBER
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Kadar bermula yang telus tanpa caj tersembunyi bagi menyelesaikan masalah paip anda dengan tuntas.
        </p>
      </div>

      {/* Mandatory Disclaimer Note */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 flex items-start gap-3 shadow-xs">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm leading-relaxed">
          <span className="font-bold block mb-0.5">Nota Penting:</span>
          “Harga tertakluk kepada keadaan sebenar di lokasi dan skop kerja.” Tiada caj tersembunyi sebelum kerja dimulakan; persetujuan sebut harga dibuat terlebih dahulu.
        </div>
      </div>

      {/* Section 1: Known Standard Fixed Rates */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>Kadar Bermula Tetap</span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Paling Popular
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Kadar asas bagi kerja-kerja melancarkan saliran dan mangkuk tandas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fixedRateServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border-2 border-blue-900/10 hover:border-blue-700 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl mb-3">
                  {service.emoji}
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Peralatan moden spesifikasi tinggi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Tiada caj tersembunyi</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Harga Bermula:
                  </span>
                  <span className="text-2xl font-black text-blue-950 font-display">
                    {service.priceTag}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="px-4 py-2 bg-[#0B1E36] hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm cursor-pointer"
                >
                  <span>Tempah</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Quotation Required Services */}
      <div className="space-y-4 pt-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-lg font-bold text-slate-900">
            Servis Lain: Pemeriksaan & Sebut Harga
          </h2>
          <p className="text-xs text-slate-500">
            “Hubungi kami untuk pemeriksaan dan sebut harga.” Kadar bergantung kepada panjang saluran, jenis paip (PVC, PPR, Galvanized) atau tahap kerosakan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quotationServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-all flex items-center justify-between gap-3 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl shrink-0">{service.emoji}</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {service.title}
                  </h4>
                  <span className="text-[11px] text-blue-800 font-semibold block mt-0.5">
                    Dapatkan Sebut Harga
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSelectService(service)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-lg transition-colors shrink-0 cursor-pointer"
              >
                Pilih
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quality & Transparency Guarantee Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B1E36] to-slate-900 text-white space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Jaminan Kualiti Mr Plumber</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black">
              Ingin Bertanya Anggaran Terlebih Dahulu?
            </h3>
            <p className="text-xs text-slate-300">
              Hantarkan gambar kerosakan paip anda melalui WhatsApp untuk semakan sebut harga pantas.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Assalamualaikum Mr Plumber, saya ingin bertanyakan sebut harga untuk kerja plumbing di rumah saya.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Semakan</span>
            </a>
            <a
              href={`tel:${COMPANY_PHONE_RAW}`}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
