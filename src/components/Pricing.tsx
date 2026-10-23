import React from 'react';
import { Award, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { delegatePackages } from '../data/summitData';

interface PricingProps {
  onSelectPackage: (pkgId: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPackage }) => {
  return (
    <section id="packages" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-[#9A6C15] bg-[#C58F28]/10 border border-[#C58F28]/25 mb-4">
            <Award className="w-3.5 h-3.5 text-[#C58F28]" />
            CONFIRMED DELEGATE PACKAGES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2240] tracking-tight uppercase leading-tight mb-4">
            GET YOUR <span className="text-gradient-gold">TICKET</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select your delegate package to secure your presence at West Africa's flagship business and investment summit.
          </p>
        </div>

        {/* Policy Alert from Requirement Document (Section 7) */}
        <div className="max-w-4xl mx-auto mb-14 bg-white border-l-4 border-[#0B4635] border-y border-r border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs flex items-start sm:items-center gap-3.5">
          <Info className="w-6 h-6 text-[#0B4635] flex-shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-[#0B4635] font-bold">Official Registration Policy:</strong> Payment is <em>not</em> collected at initial registration. You may register your interest and delegate details today. Following verification, the <strong>FKI Holdings</strong> Summit Secretariat will issue an official invoice with approved payment instructions.
          </div>
        </div>

        {/* Primary 3 Cards as prominently seen in ui.jpg */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {delegatePackages.slice(0, 3).map(pkg => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-7 flex flex-col relative transition-all duration-300 ${
                pkg.isPopular
                  ? 'bg-white border-2 border-[#C58F28] shadow-xl hover:-translate-y-2'
                  : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-grad-gold text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md whitespace-nowrap">
                  {pkg.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-extrabold text-[#0B2240] mb-2">{pkg.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">{pkg.desc}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                <span className="text-base font-extrabold text-[#0B2240]">GH₵</span>
                <span className={`font-mono text-4xl sm:text-5xl font-extrabold tracking-tight ${
                  pkg.isPopular ? 'text-[#9A6C15]' : 'text-[#0B2240]'
                }`}>
                  {pkg.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 font-semibold ml-1.5">{pkg.perText}</span>
              </div>

              {/* Capacity Fill Bar from ui.jpg */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                  <span>Capacity Allocation</span>
                  <span className="font-bold text-[#0B2240]">{pkg.remainingText}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${pkg.isPopular ? 'bg-grad-gold' : 'bg-[#0B2240]'}`}
                    style={{ width: `${pkg.capacityFill}%` }}
                  />
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {pkg.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-[#0B4635] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPackage(pkg.id)}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-auto ${
                  pkg.isPopular
                    ? 'bg-grad-gold text-white hover:opacity-95'
                    : 'bg-[#0B2240] hover:bg-[#163660] text-white'
                }`}
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Executive & VIP Packages (VIP and VVIP from docx) */}
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-[#0B2240] bg-[#0B2240]/10 border border-[#0B2240]/20">
            HIGH-NET-WORTH & EXECUTIVE PASSES
          </span>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {delegatePackages.slice(3, 5).map(pkg => (
            <div
              key={pkg.id}
              className="bg-white border-2 border-slate-300 hover:border-[#0B2240] rounded-3xl p-7 flex flex-col relative shadow-md hover:shadow-xl transition-all"
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0B2240] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md whitespace-nowrap">
                  {pkg.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-extrabold text-[#0B2240] mb-2">{pkg.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">{pkg.desc}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                <span className="text-base font-extrabold text-[#0B2240]">GH₵</span>
                <span className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0B2240]">
                  {pkg.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 font-semibold ml-1.5">{pkg.perText}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {pkg.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-[#C58F28] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPackage(pkg.id)}
                className="w-full py-3.5 px-6 rounded-xl border-2 border-[#0B2240] text-[#0B2240] hover:bg-[#0B2240] hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2 mt-auto"
              >
                <span>Reserve Executive Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
