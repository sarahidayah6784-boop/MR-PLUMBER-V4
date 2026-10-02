import React from 'react';
import { ChevronRight, ArrowRight, Shield } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const isFixedPrice = Boolean(service.startingPrice);

  return (
    <div
      onClick={() => onSelect(service)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(service);
        }
      }}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400/80 p-4.5 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 active:scale-[0.99]"
    >
      {/* Top Tag or Category indicator */}
      {service.popular && (
        <span className="absolute top-3 right-3 text-[11px] font-bold text-amber-800 bg-amber-100/90 border border-amber-200 px-2 py-0.5 rounded-full">
          Paling Kerap
        </span>
      )}

      <div>
        {/* Emoji & Title */}
        <div className="flex items-start gap-3.5 mb-2.5">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
            {service.emoji}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-blue-900 transition-colors">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
              {service.description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Price & Action */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-500 block font-semibold">
            {isFixedPrice ? 'Harga Bermula:' : 'Kadar Servis:'}
          </span>
          <div className="flex items-baseline gap-1">
            <span
              className={`font-black tracking-tight ${
                isFixedPrice
                  ? 'text-lg text-blue-950 font-display'
                  : 'text-sm font-semibold text-slate-700'
              }`}
            >
              {service.priceTag}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(service);
          }}
          className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
            isFixedPrice
              ? 'bg-[#0B1E36] text-white hover:bg-slate-800 shadow-sm'
              : service.id === 'masalah-lain'
              ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold'
              : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
          }`}
        >
          <span>{service.buttonLabel || 'Pilih Servis'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
