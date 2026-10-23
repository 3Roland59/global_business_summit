import React from 'react';
import { Users, Globe, Phone, Mail, ArrowRight } from 'lucide-react';
import { speakers } from '../data/summitData';
import type { Speaker } from '../types';

interface SpeakersProps {
  onSpeakerSelect: (speaker: Speaker) => void;
}

interface SpeakerCardProps {
  speaker: Speaker;
  className?: string;
  onSelect: (speaker: Speaker) => void;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, className = '', onSelect }) => {
  return (
    <div
      onClick={() => onSelect(speaker)}
      className={`group relative rounded-2xl overflow-hidden bg-navy-dark shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${className}`}
    >
      {/* Background Speaker Photo */}
      <img
        src={speaker.image}
        alt={speaker.name}
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />

      {/* Atmospheric dark gradient overlays matching ui.jpg */}
      <div className="absolute inset-0 bg-linear-to-t from-navy-dark via-navy-dark/40 to-transparent" />
      <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-300" />

      {/* Top Left: 3 circular social buttons matching ui.jpg */}
      <div
        className="absolute top-4 left-4 z-20 flex items-center gap-1.5"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onSelect(speaker)}
          className="w-7 h-7 rounded-full border border-white/30 bg-black/40 backdrop-blur-xs text-white/90 hover:text-white hover:bg-gold hover:border-gold flex items-center justify-center transition-all text-xs cursor-pointer"
          title="Email"
        >
          <Mail className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onSelect(speaker)}
          className="w-7 h-7 rounded-full border border-white/30 bg-black/40 backdrop-blur-xs text-white/90 hover:text-white hover:bg-gold hover:border-gold flex items-center justify-center transition-all text-xs cursor-pointer"
          title="Phone"
        >
          <Phone className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onSelect(speaker)}
          className="w-7 h-7 rounded-full border border-white/30 bg-black/40 backdrop-blur-xs text-white/90 hover:text-white hover:bg-gold hover:border-gold flex items-center justify-center transition-all text-xs cursor-pointer"
          title="Global Profile"
        >
          <Globe className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top Right: Subtle Category Pill */}
      <div className="absolute top-4 right-4 z-20">
        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/15 backdrop-blur-md text-white border border-white/20">
          {speaker.category}
        </span>
      </div>

      {/* Bottom Left: Speaker Name & Role matching ui.jpg */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-20 text-left">
        <h3 className="text-lg font-extrabold text-white group-hover:text-gold-light transition-colors leading-tight">
          {speaker.name}
        </h3>
        <div className="text-xs font-medium text-slate-300 mt-1 line-clamp-1">
          {speaker.role} • {speaker.org}
        </div>
      </div>
    </div>
  );
};

export const Speakers: React.FC<SpeakersProps> = ({ onSpeakerSelect }) => {
  const [firstSpeaker, secondSpeaker, thirdSpeaker, fourthSpeaker] = speakers;

  return (
    <section id="speakers" className="py-20 lg:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* DESKTOP 3-COLUMN ASYMMETRIC MOSAIC MATCHING UI.JPG */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 items-stretch">
          {/* COLUMN 1: Heading block on top, Card 1 on bottom */}
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col justify-center py-2 lg:py-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-gold-dark bg-gold/10 border border-gold/25 mb-4 w-fit">
                <Users className="w-3.5 h-3.5 text-gold" />
                WORLD-CLASS FACULTY
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight uppercase leading-[1.08] mb-4">
                MEET THE <br />
                <span className="text-gradient-gold">INCREDIBLE</span> <br />
                SPEAKERS
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                Engage with seasoned sovereign wealth managers, private equity partners, visionary policy architects, and transformative business pioneers.
              </p>
            </div>

            {firstSpeaker && (
              <SpeakerCard
                speaker={firstSpeaker}
                className="h-80 lg:h-96"
                onSelect={onSpeakerSelect}
              />
            )}
          </div>

          {/* COLUMN 2: Card 2 on top, Card 3 on bottom */}
          <div className="flex flex-col gap-6">
            {secondSpeaker && (
              <SpeakerCard
                speaker={secondSpeaker}
                className="h-80 lg:h-87.5"
                onSelect={onSpeakerSelect}
              />
            )}
            {fourthSpeaker && (
              <SpeakerCard
                speaker={fourthSpeaker}
                className="h-80 lg:h-87.5"
                onSelect={onSpeakerSelect}
              />
            )}
          </div>

          {/* COLUMN 3: Card 4 (tall) on top, "See More Speakers" on bottom */}
          <div className="flex flex-col justify-between gap-6">
            {thirdSpeaker && (
              <SpeakerCard
                speaker={thirdSpeaker}
                className="h-115 lg:h-132"
                onSelect={onSpeakerSelect}
              />
            )}

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => onSpeakerSelect(firstSpeaker || speakers[0])}
                className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:text-gold-dark transition-colors cursor-pointer group uppercase tracking-wider"
              >
                <span>See More Speakers</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW MATCHING UI.JPG (Right side of ui.jpg) */}
        <div className="md:hidden">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-gold-dark bg-gold/10 border border-gold/25 mb-3">
              <Users className="w-3.5 h-3.5 text-gold" />
              WORLD-CLASS FACULTY
            </div>
            <h2 className="text-3xl font-extrabold text-navy tracking-tight uppercase leading-tight mb-3">
              MEET THE <br />
              <span className="text-gradient-gold">INCREDIBLE</span> SPEAKERS
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Engage with seasoned sovereign wealth managers, private equity partners, visionary policy architects, and transformative business pioneers.
            </p>
          </div>

          {/* Horizontal scrollable carousel matching mobile ui.jpg */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth -mx-4 px-4">
            {speakers.map(speaker => (
              <SpeakerCard
                key={speaker.id}
                speaker={speaker}
                className="w-70 shrink-0 snap-center aspect-4/5"
                onSelect={onSpeakerSelect}
              />
            ))}
          </div>

          {/* <div className="flex justify-center mt-6">
            <button
              onClick={() => onSpeakerSelect(firstSpeaker || speakers[0])}
              className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:text-gold-dark transition-colors cursor-pointer uppercase tracking-wider"
            >
              <span>See More Speakers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};
