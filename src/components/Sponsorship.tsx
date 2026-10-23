import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { sponsorTiers } from '../data/summitData';

interface SponsorshipProps {
  onSelectSponsorTier: (tierName: string) => void;
}

export const Sponsorship: React.FC<SponsorshipProps> = ({ onSelectSponsorTier }) => {
  return (
    <section id="sponsorship" className="py-20 lg:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-gold-dark bg-gold/10 border border-gold/25 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            STRATEGIC CORPORATE ALLIANCES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight uppercase leading-tight mb-4">
            SUMMIT SPONSORSHIP <span className="text-gradient-gold">PACKAGES</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Showcase your corporate leadership, generate prime B2B investment leads, and secure direct alignment with Africa's high-growth economic corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {sponsorTiers.map(tier => (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 flex flex-col text-center border transition-all ${tier.id === 'diamond'
                ? 'bg-linear-to-b from-white to-amber-50/40 border-gold shadow-lg hover:-translate-y-1.5'
                : 'bg-white border-slate-200 shadow-xs hover:border-navy hover:shadow-md hover:-translate-y-1'
                }`}
            >
              <span className="text-xs font-extrabold tracking-wider uppercase text-navy mb-3">
                {tier.name}
              </span>
              <div className={`font-mono text-xl sm:text-2xl font-extrabold mb-5 ${tier.id === 'diamond' ? 'text-gold-dark' : 'text-navy'
                }`}>
                {tier.price}
              </div>

              <ul className="space-y-2.5 text-left text-xs text-slate-600 mb-6 grow">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectSponsorTier(tier.name)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all mt-auto ${tier.highlight
                  ? 'bg-grad-gold text-white hover:opacity-95 shadow-sm'
                  : 'border border-navy text-navy hover:bg-navy hover:text-white'
                  }`}
              >
                Enquire Tier
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
