import React from 'react';
import { Calendar, FileText, ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/summitData';

interface AboutProps {
  onRegisterClick: () => void;
}

export const About: React.FC<AboutProps> = ({ onRegisterClick }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* Left: Geometric Photo Collage (Faithful replication of ui.jpg layout with GBS brand palette) */}
          <div className="lg:col-span-6 relative">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Colored Geometric Backdrop Squares as in ui.jpg */}
              <div className="absolute -top-4 -left-4 w-52 h-52 bg-navy rounded-3xl opacity-90 z-0" />
              <div className="absolute -bottom-5 -right-5 w-48 h-48 bg-gold rounded-3xl opacity-85 z-0" />
              <div className="absolute top-1/2 -left-6 w-16 h-16 bg-green rounded-xl z-0" />

              {/* Primary Summit Networking Image */}
              <div className="relative z-10 w-[88%] ml-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={ASSETS.networking}
                  alt="Executive delegates networking at Mövenpick Ambassador Hotel Accra"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              {/* Secondary Overlapping Speaker Photo (Bottom Left as in ui.jpg) */}
              <div className="absolute -bottom-8 left-0 w-[54%] z-20 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={ASSETS.speaker1}
                  alt="Keynote leadership delegate"
                  className="w-full h-52 sm:h-60 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Narrative, Mission, and Stats Counter */}
          <div className="lg:col-span-6 flex flex-col items-start pt-6 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-green bg-green/10 border border-green/25 mb-4">
              <Calendar className="w-3.5 h-3.5" />
              26–27 MAY 2027 • ACCRA, GHANA
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight uppercase leading-tight mb-6">
              ABOUT THE EVENT <br />
              <span className="text-gradient-gold">THE GLOBAL BUSINESS SUMMIT</span>
            </h2>

            <p className="text-base sm:text-lg font-medium text-navy leading-relaxed mb-4">
              The Global Business Summit (GBS 2027) is an elite international business and investment gathering convened by <strong>FKI Holdings</strong> to catalyze private-sector capital and sovereign partnerships across Africa.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
              Against the backdrop of continental integration under AfCFTA and rapid economic diversification, GBS 2027 directly addresses the global investment gap. The summit provides an institutional, high-trust environment where international asset allocators, private equity syndicates, and African enterprise champions formulate bankable transactions and deploy catalytic growth capital.
            </p>

            {/* Stats Grid Matching ui.jpg Numbers & Grid Arrangement */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-slate-200 mb-8">
              {[
                { number: '40', suffix: '+', label: 'Sponsors & Partners' },
                { number: '2.5K', suffix: '+', label: 'C-Level & Global Investors' },
                { number: '35', suffix: '+', label: 'Keynote & Plenary Speakers' },
                { number: '50', suffix: '+', label: 'Represented Economies' },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
                    {stat.number}
                    <span className="text-gold">{stat.suffix}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onRegisterClick}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-navy hover:bg-navy-light text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
              >
                Register Your Interest
                <ArrowRight className="w-4 h-4 text-gold-light" />
              </button>
              <button
                onClick={() => {
                  alert('The official GBS 2027 Summit Prospectus is prepared by FKI Holdings Secretariat and will be dispatched to your email upon registration.');
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-navy text-slate-700 hover:text-navy font-bold text-sm transition-all"
              >
                <FileText className="w-4 h-4 text-gold" />
                Download Prospectus
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
