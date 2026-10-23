import React from 'react';
import { partners } from '../data/summitData';

export const Partners: React.FC = () => {
  // Quadruple the partners list to create a seamless, non-breaking infinite marquee loop
  const marqueePartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section id="partners" className="py-20 lg:py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <span className="text-xs font-extrabold tracking-widest text-gold-dark uppercase block mb-2">
            CONVENED & PRESENTED BY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight uppercase">
            PARTNERS OF <span className="text-gradient-gold">THE GLOBAL BUSINESS SUMMIT</span>
          </h2>
        </div>
      </div>

      {/* Infinite Marquee Track with Edge Fades */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right gradient edge masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 z-10 bg-linear-to-r from-slate-50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 z-10 bg-linear-to-l from-slate-50 to-transparent" />

        {/* Marquee sliding ribbon */}
        <div className="animate-marquee py-4 flex gap-8 items-stretch">
          {marqueePartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className={`w-48 sm:w-56 shrink-0 rounded-2xl p-6 flex flex-col items-center justify-between text-center transition-all duration-300 group/card ${partner.isHost
                ? 'bg-white border-2 border-gold-dark shadow-md hover:shadow-xl hover:-translate-y-1'
                : 'bg-white border border-white shadow-xs hover:border-navy hover:shadow-md hover:-translate-y-1'
                }`}
            >
              {/* Logo Container: handles both light and dark partner logos */}
              <div
                className={`w-full h-24 rounded-xl flex items-center justify-center p-3 mb-4 overflow-hidden transition-transform duration-300 group-hover/card:scale-105 ${partner.darkBg ? 'bg-navy-dark' : 'bg-transparent'
                  }`}
              >
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="max-h-20 max-w-32.5 object-contain"
                />
              </div>

              <div>
                <div className="text-xs font-extrabold text-navy leading-tight mb-1">
                  {partner.name}
                </div>
                <div className="text-[11px] text-slate-500 leading-tight">
                  {partner.tagline}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

