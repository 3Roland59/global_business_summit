import React, { useState } from 'react';
import { Calendar, MapPin, Building, Mail, ArrowRight, Menu, X } from 'lucide-react';
import { ASSETS } from '../data/summitData';

interface NavbarProps {
  onRegisterClick: () => void;
  onSponsorClick: () => void;
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRegisterClick,
  onSponsorClick,
  onContactClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-navy text-white text-xs py-2 px-4 border-b border-gold/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-slate-200">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold-light" />
              <strong className="text-gold-light font-bold">DATES:</strong> 26–27 MAY 2027
            </span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold-light" />
              MÖVENPICK AMBASSADOR HOTEL ACCRA, GHANA
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-slate-200">
            <span className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-gold-light" />
              OFFICIALLY HOSTED BY <strong className="text-white">FKI HOLDINGS</strong>
            </span>
            <span className="opacity-40">|</span>
            <button
              onClick={onContactClick}
              className="flex items-center gap-1 text-white hover:text-gold-light transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-gold-light" />
              <span>info@gbsummit2027.com</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. STICKY MAIN NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Branding */}
          <a href="#home" className="flex items-center gap-3.5 group">
            <img
              src={ASSETS.logo}
              alt="The Global Business Summit Logo"
              className="h-12 w-auto object-contain rounded"
            />
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-navy leading-none group-hover:text-gold transition-colors">
                THE GLOBAL BUSINESS SUMMIT
              </span>
              <span className="text-[11px] font-bold tracking-widest text-gold-dark uppercase mt-1">
                GBS 2027 • ACCRA
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <a href="#about" className="text-sm font-semibold text-slate-700 hover:text-gold transition-colors">
              About Summit
            </a>
            <a href="#speakers" className="text-sm font-semibold text-slate-700 hover:text-gold transition-colors">
              Speakers
            </a>
            <a href="#schedule" className="text-sm font-semibold text-slate-700 hover:text-gold transition-colors">
              Programme
            </a>
            <a href="#packages" className="text-sm font-semibold text-slate-700 hover:text-gold transition-colors">
              Delegate Packages
            </a>
            <a href="#sponsorship" className="text-sm font-semibold text-slate-700 hover:text-gold transition-colors">
              Sponsorship
            </a>
            <a href="#partners" className="text-sm font-semibold text-slate-700 hover:text-gold transition-colors">
              Partners
            </a>
            <a href="#venue" className="text-sm font-semibold text-slate-700 hover:text-gold transition-colors">
              Venue
            </a>
            <button
              onClick={onContactClick}
              className="text-sm font-semibold text-slate-700 hover:text-gold transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onSponsorClick}
              className="text-xs font-bold text-navy hover:text-gold px-3 py-2 transition-colors uppercase tracking-wider cursor-pointer"
            >
              Sponsorship
            </button>
            <button
              onClick={onRegisterClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Register Now
              <ArrowRight className="w-4 h-4 text-gold-light" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-navy hover:text-gold focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white p-6 flex flex-col justify-between animate-fadeIn">
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <img src={ASSETS.logo} alt="GBS Logo" className="h-10 w-auto" />
                <div>
                  <div className="font-extrabold text-navy text-sm">GBS 2027</div>
                  <div className="text-[10px] font-bold text-gold-dark uppercase tracking-wider">ACCRA, GHANA</div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-600 hover:text-slate-900"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 mt-6">
              {[
                { label: 'About Summit', href: '#about' },
                { label: 'Keynote Speakers', href: '#speakers' },
                { label: 'Summit Programme', href: '#schedule' },
                { label: 'Delegate Packages & Pricing', href: '#packages' },
                { label: 'Sponsorship Tiers', href: '#sponsorship' },
                { label: 'Summit Partners', href: '#partners' },
                { label: 'Venue & Travel', href: '#venue' },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold text-navy hover:text-gold py-1 border-b border-slate-100"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="text-base font-bold text-navy hover:text-gold py-1 border-b border-slate-100 text-left cursor-pointer"
              >
                Contact Secretariat
              </button>
            </nav>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-slate-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRegisterClick();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-grad-gold text-white font-bold text-center shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              Register as Delegate
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSponsorClick();
              }}
              className="w-full py-3 px-4 rounded-xl border-2 border-navy text-navy font-bold text-center cursor-pointer"
            >
              Become a Sponsor
            </button>
          </div>
        </div>
      )}
    </>
  );
};
