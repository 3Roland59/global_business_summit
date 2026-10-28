import React from 'react';
import { LockKeyhole, Sparkles, Users } from 'lucide-react';
import { ASSETS } from '../data/summitData';

export const Speakers: React.FC = () => {
  const teaserImages = [ASSETS.speaker1, ASSETS.speaker2, ASSETS.speaker3, ASSETS.speaker4];
  return (
    <section id="speakers" className="py-20 lg:py-28 bg-navy-dark border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-gold-light bg-white/10 border border-white/15 mb-4">
            <Users className="w-3.5 h-3.5" />
            THE GBS 2027 LINEUP
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            THE VOICES THAT <span className="text-gradient-gold">MOVE BUSINESS.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Curious who will take the stage? We’re keeping our guest speakers under wraps. Join us in Accra and discover the voices, ideas, and conversations shaping GBS 2027—in person.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 lg:mt-14 max-w-5xl mx-auto">
          {teaserImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-4/5 rounded-2xl overflow-hidden border border-white/15 bg-navy shadow-xl"
            >
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover blur-[2px] scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy-dark/95 via-navy-dark/25 to-navy-dark/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-3">
                  {index === 0 ? <Sparkles className="w-5 h-5 text-gold-light" /> : <LockKeyhole className="w-5 h-5 text-gold-light" />}
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold tracking-[0.16em] text-white uppercase">
                  WHO'S TAKING THE STAGE?
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-gold-light uppercase mt-1">
                  Find out at GBS 2027
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300">
            <LockKeyhole className="w-4 h-4 text-gold-light" />
            Meet the speakers when you join us in Accra
          </div>
        </div>
      </div>
    </section>
  );
};
