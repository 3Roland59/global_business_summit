import React from 'react';
import { partners } from '../data/summitData';

export const Partners: React.FC = () => {
  return (
    <section id="partners" className="py-20 lg:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-extrabold tracking-widest text-gold-dark uppercase block mb-2">
            CONVENED & PRESENTED BY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight uppercase">
            PARTNERS OF <span className="text-gradient-gold">THE GLOBAL BUSINESS SUMMIT</span>
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch">
          {partners.map(partner => (
            <div
              key={partner.id}
              className={`rounded-2xl p-6 flex flex-col items-center justify-between text-center transition-all duration-300 ${partner.isHost
                ? 'bg-white border-2 border-gold-dark shadow-md hover:shadow-xl hover:-translate-y-1'
                : 'bg-white border border-slate-200 shadow-xs hover:border-navy hover:shadow-md hover:-translate-y-1'
                }`}
            >
              {/* Logo Container: beautifully handles both light and dark background partner logos */}
              <div
                className={`w-full h-24 rounded-xl flex items-center justify-center p-2 mb-4 overflow-hidden transition-transform duration-300 hover:scale-105 ${partner.darkBg ? 'bg-navy-dark' : 'bg-transparent'
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
