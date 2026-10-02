import React from 'react';
import { MapPin, Phone, MessageCircle, CheckCircle, ShieldCheck, Clock, Award } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW, COMPANY_WHATSAPP_NUMBER, SERVICE_AREAS } from '../data/services';
import officialLogoImg from '../assets/images/mr_plumber_logo_official_1790907937387.jpg';

interface AboutViewProps {
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenBooking, onOpenEmergency }) => {
  const serviceHighlights = [
    'Paip tersumbat',
    'Paip bocor',
    'Tandas tersumbat',
    'Sinki tersumbat',
    'Floor trap',
    'Gully trap',
    'Grease trap',
    'Pam air',
    'Tangki air',
    'Renovation plumbing',
    'Kerja pembaikan plumbing',
    'Masalah plumbing lain'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-8 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-amber-400 mx-auto shadow-xl shadow-blue-950/20 bg-white">
          <img
            src={officialLogoImg}
            alt="Logo Rasmi Mr Plumber"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
          TENTANG MR PLUMBER
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
          “Mr Plumber menyediakan perkhidmatan plumbing untuk kediaman, premis perniagaan dan keperluan penyelenggaraan plumbing.”
        </p>
      </div>

      {/* Main Core Principles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Tiada Caj Tersembunyi</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Semua sebut harga diterangkan dengan telus sebelum kerja bermula. Tiada caj mengejut.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Tindak Balas Pantas</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sedia bertindak untuk kes kecemasan seperti paip pecah atau limpahan tandas yang memerlukan bantuan segera.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Peralatan Profesional</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menggunakan mesin khas pelancar paip tersumbat moden bertekanan tinggi untuk hasil yang tahan lama.
          </p>
        </div>
      </div>

      {/* Kawasan Perkhidmatan */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-[#0B1E36]">
          <MapPin className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-bold">Kawasan Perkhidmatan Kami</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Pasukan Mr Plumber beroperasi di seluruh kawasan tumpuan berikut bagi kediaman teres, kondominium, kedai dan premis komersial:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SERVICE_AREAS.map((area) => (
            <div
              key={area}
              className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 font-bold text-slate-900 text-center text-xs sm:text-sm"
            >
              📍 {area}
            </div>
          ))}
        </div>
      </div>

      {/* Senarai Servis Lengkap */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Skop Perkhidmatan Plumbing Termasuk:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {serviceHighlights.map((serv) => (
            <div
              key={serv}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-semibold text-slate-800"
            >
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{serv}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hubungi Section */}
      <div className="p-6 rounded-3xl bg-[#0B1E36] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
            Masalah Paip? Kami Bantu.
          </span>
          <h3 className="text-xl font-black font-display">
            Hubungi Mr Plumber Hari Ini
          </h3>
          <p className="text-xs text-slate-300">
            Telefon / WhatsApp: <span className="font-mono text-amber-400 font-bold">{COMPANY_PHONE}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBooking}
            className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Tempah Servis
          </button>
          <a
            href={`https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent('Assalamualaikum Mr Plumber.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
