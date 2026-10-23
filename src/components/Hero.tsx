import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Building, Sparkles, ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/summitData';

interface HeroProps {
  onRegisterClick: () => void;
  onSponsorClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onSponsorClick }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2027-05-26T08:00:00Z').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative pt-12 pb-20 md:py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden border-b border-slate-200">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#C58F28]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#0B4635]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headings, Theme, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-[#9A6C15] bg-[#C58F28]/10 border border-[#C58F28]/25 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#C58F28]" />
              WEST AFRICA'S PREMIER INVESTMENT SUMMIT
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B2240] uppercase leading-[1.08] mb-6">
              THE GLOBAL <br />
              BUSINESS SUMMIT <span className="text-gradient-gold">2027</span>
            </h1>

            {/* Summit Theme Box from Requirement Document */}
            <div className="w-full bg-white border-l-4 border-[#C58F28] border-y border-r border-slate-200 rounded-xl p-5 shadow-sm mb-6">
              <div className="text-[11px] font-extrabold tracking-widest text-[#9A6C15] uppercase mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C58F28]" />
                Official Summit Theme
              </div>
              <p className="text-base sm:text-lg font-bold text-[#0B2240] leading-snug">
                “Bridging the Global Investment Gap: Unlocking Capital, Expanding Opportunities and Accelerating Economic Growth”
              </p>
            </div>

            {/* Summit Overview Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              Convening sovereign leaders, institutional asset allocators, multinational corporations, and visionary African entrepreneurs for two days of strategic deal-making and bilateral partnerships at the Mövenpick Ambassador Hotel Accra.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onRegisterClick}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-grad-gold text-white font-bold text-base shadow-lg hover:shadow-xl hover:opacity-95 transition-all transform hover:-translate-y-0.5"
              >
                Register as Delegate
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onSponsorClick}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white border-2 border-[#0B2240] hover:bg-[#0B2240] text-[#0B2240] hover:text-white font-bold text-base transition-all transform hover:-translate-y-0.5"
              >
                Become a Sponsor
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="w-full pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <Calendar className="w-4 h-4 text-[#C58F28]" />
                <span>26–27 May 2027</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <MapPin className="w-4 h-4 text-[#C58F28]" />
                <span>Accra, Ghana</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 text-xs font-semibold text-slate-600">
                <Building className="w-4 h-4 text-[#C58F28]" />
                <span>Host: FKI Holdings</span>
              </div>
            </div>
          </div>

          {/* Right Column: Stage Media & Overlapping Countdown (Replicating ui.jpg geometry) */}
          <div className="lg:col-span-5 flex flex-col items-center relative">
            {/* Stage Media Card */}
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#0B2240] relative group">
              <img
                src={ASSETS.heroKeynote}
                alt="GBS 2027 Keynote Session at Mövenpick Ambassador Hotel Accra"
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071629] via-[#071629]/40 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#E0AB43] uppercase tracking-wider block">
                      Grand Ballroom Plenary
                    </span>
                    <strong className="text-base font-extrabold">
                      Mövenpick Ambassador Hotel Accra
                    </strong>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B4635]/90 border border-white/20 text-xs font-bold text-white shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    SUMMIT 2027
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Live Countdown Card directly below stage card (ui.jpg design) */}
            <div className="w-[92%] -mt-8 bg-white border border-slate-200 rounded-2xl shadow-xl p-5 relative z-20 flex flex-col items-center text-center">
              <span className="text-[11px] font-extrabold tracking-widest text-[#0B2240] uppercase mb-3">
                COUNTDOWN TO GBS 2027 INAUGURATION
              </span>

              <div className="grid grid-cols-4 gap-2.5 w-full mb-4">
                {[
                  { value: timeLeft.days, label: 'DAYS' },
                  { value: timeLeft.hours, label: 'HOURS' },
                  { value: timeLeft.minutes, label: 'MINS' },
                  { value: timeLeft.seconds, label: 'SECS' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200/80 rounded-xl py-2 px-1 flex flex-col items-center"
                  >
                    <span className="font-mono text-2xl font-extrabold text-[#0B2240] leading-none">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={onRegisterClick}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0B2240] hover:bg-[#163660] text-white text-xs font-extrabold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Secure Your Pass Today</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E0AB43]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
