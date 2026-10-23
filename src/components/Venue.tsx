import React from 'react';
import { MapPin, Globe, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/summitData';

interface VenueProps {
  onRegisterClick: () => void;
}

export const Venue: React.FC<VenueProps> = ({ onRegisterClick }) => {
  return (
    <section id="venue" className="py-20 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy rounded-3xl overflow-hidden shadow-2xl text-white grid grid-cols-1 lg:grid-cols-12">
          {/* Content Side */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-light mb-4">
              <MapPin className="w-4 h-4" />
              OFFICIAL SUMMIT VENUE
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
              Mövenpick Ambassador Hotel Accra, Ghana
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-8">
              Set amidst 16 acres of lush landscaped gardens in the heart of Accra’s financial and diplomatic district, Mövenpick Ambassador Hotel is West Africa's leading five-star convention destination.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>Independence Avenue, Ridge, Accra</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <Globe className="w-4 h-4 text-gold shrink-0" />
                <span>15 Mins to Kotoka Int'l Airport</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                <span>Diplomatic Security Clearance</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <Users className="w-4 h-4 text-gold shrink-0" />
                <span>Private B2B Bilateral Lounges</span>
              </div>
            </div>

            <div>
              <button
                onClick={onRegisterClick}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-grad-gold text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                Join Us in Accra
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Side */}
          <div className="lg:col-span-5 relative min-h-75 lg:min-h-full">
            <img
              src={ASSETS.heroKeynote}
              alt="Mövenpick Ambassador Hotel Accra Ballroom"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
