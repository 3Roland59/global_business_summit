import React from 'react';
import { MapPin, Mail, Phone, Globe, Briefcase } from 'lucide-react';
import { ASSETS } from '../data/summitData';

interface FooterProps {
  onRegisterClick: (pkgId?: string) => void;
  onSponsorClick: () => void;
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onRegisterClick,
  onSponsorClick,
  onContactClick,
}) => {
  return (
    <footer className="bg-navy-dark text-white pt-16 pb-10 border-t border-gold/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3.5 mb-5">
              <img
                src={ASSETS.logo}
                alt="GBS 2027 Logo"
                className="h-12 w-auto bg-white p-1 rounded"
              />
              <div>
                <div className="font-extrabold text-base tracking-wide text-white">
                  THE GLOBAL BUSINESS SUMMIT
                </div>
                <div className="text-[11px] font-bold text-gold-light uppercase tracking-wider">
                  GBS 2027 • ACCRA
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              The Global Business Summit 2027 is West Africa’s premier international platform dedicated to bridging the global investment gap, unlocking catalytic capital, and accelerating sustainable economic growth across Africa.
            </p>

            <div className="text-xs text-slate-300 font-medium">
              Officially organized and presented by <strong className="text-white">FKI Holdings</strong>.
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold-light mb-4">
              Summit Agenda
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Summit</a></li>
              <li><a href="#speakers" className="hover:text-white transition-colors">Confirmed Faculty</a></li>
              <li><a href="#schedule" className="hover:text-white transition-colors">Summit Programme</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Delegate Packages</a></li>
              <li><a href="#sponsorship" className="hover:text-white transition-colors">Sponsorship Tiers</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">Corporate Partners</a></li>
              <li>
                <button
                  onClick={onContactClick}
                  className="hover:text-white text-left transition-colors cursor-pointer"
                >
                  Contact Secretariat
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Packages Quick Action */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold-light mb-4">
              Delegate Registration
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <button onClick={() => onRegisterClick('startup')} className="hover:text-white text-left transition-colors cursor-pointer">
                  Start-up Package (GH₵2,985)
                </button>
              </li>
              <li>
                <button onClick={() => onRegisterClick('individual')} className="hover:text-white text-left transition-colors cursor-pointer">
                  Individual Delegate (GH₵3,600)
                </button>
              </li>
              <li>
                <button onClick={() => onRegisterClick('group')} className="hover:text-white text-left transition-colors cursor-pointer">
                  Group Package (GH₵9,600 / 3 Delegates)
                </button>
              </li>
              <li>
                <button onClick={() => onRegisterClick('vip')} className="hover:text-white text-left transition-colors cursor-pointer">
                  VIP Executive Pass (GH₵8,995)
                </button>
              </li>
              <li>
                <button onClick={() => onRegisterClick('vvip')} className="hover:text-white text-left transition-colors cursor-pointer">
                  VVIP Platinum Pass (GH₵13,799)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Secretariat Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold-light mb-4">
              Summit Secretariat
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Kempinski Hotel Gold Coast City, Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <button
                  onClick={onContactClick}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  fredkwabenainkoom1@gmail.com
                </button>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:0539509902" className="hover:text-white transition-colors">0539 509 902</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span className="text-gold-light font-semibold">WhatsApp:</span>
                <a href="https://wa.me/233543382610" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">0543 382 610</a>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gold hover:opacity-90 text-xs font-bold text-white transition-all cursor-pointer"
              >
                Send Message
              </button>
              <button
                onClick={onSponsorClick}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-600 hover:border-gold-light text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                Sponsorship Desk
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2027 The Global Business Summit (GBS 2027). All rights reserved. Convened by FKI Holdings.
          </div>

          <div className="flex items-center gap-3">
            <a href="#linkedin" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-gold text-slate-300 hover:text-white flex items-center justify-center transition-colors">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#twitter" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-gold text-slate-300 hover:text-white flex items-center justify-center transition-colors">
              <Briefcase className="w-4 h-4" />
            </a>
            <button
              onClick={onContactClick}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-gold text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Email Secretariat"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
