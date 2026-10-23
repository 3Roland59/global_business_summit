import React, { useState } from 'react';
import { Users, Globe, Briefcase, ChevronRight } from 'lucide-react';
import { speakers } from '../data/summitData';
import type { Speaker } from '../types';

interface SpeakersProps {
  onSpeakerSelect: (speaker: Speaker) => void;
}

export const Speakers: React.FC<SpeakersProps> = ({ onSpeakerSelect }) => {
  const [filter, setFilter] = useState<'all' | 'keynote' | 'investment' | 'tech' | 'policy'>('all');

  const filtered = filter === 'all'
    ? speakers
    : speakers.filter(s => s.category === filter);

  return (
    <section id="speakers" className="py-20 lg:py-28 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-[#9A6C15] bg-[#C58F28]/10 border border-[#C58F28]/25 mb-4">
              <Users className="w-3.5 h-3.5 text-[#C58F28]" />
              WORLD-CLASS FACULTY
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2240] tracking-tight uppercase leading-tight">
              MEET THE INCREDIBLE <br />
              <span className="text-gradient-gold">SPEAKERS</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mt-3">
              Engage with seasoned sovereign wealth managers, private equity partners, visionary policy architects, and transformative business pioneers.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Faculty' },
              { id: 'keynote', label: 'Keynotes' },
              { id: 'investment', label: 'Capital & PE' },
              { id: 'tech', label: 'Tech & Trade' },
              { id: 'policy', label: 'Policy' },
            ].map(pill => (
              <button
                key={pill.id}
                onClick={() => setFilter(pill.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  filter === pill.id
                    ? 'bg-[#0B2240] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Speakers Grid (Replicating ui.jpg card architecture) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(speaker => (
            <div
              key={speaker.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#C58F28] transition-all transform hover:-translate-y-1 overflow-hidden flex flex-col group"
            >
              {/* Speaker Image with Colored Offset Badge as in ui.jpg */}
              <div className="relative h-72 bg-[#0B2240] overflow-hidden">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-[#0B2240] shadow-sm">
                    {speaker.category}
                  </span>
                </div>
              </div>

              {/* Speaker Info */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-extrabold text-[#0B2240] group-hover:text-[#C58F28] transition-colors mb-1">
                  {speaker.name}
                </h3>
                <div className="text-xs font-bold text-[#9A6C15] mb-1">
                  {speaker.role}
                </div>
                <div className="text-xs text-slate-500 mb-4 line-clamp-1">
                  {speaker.org}
                </div>

                {/* Footer with Socials & Bio Trigger */}
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSpeakerSelect(speaker)}
                      className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#C58F28] text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                      title="Executive Profile"
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onSpeakerSelect(speaker)}
                      className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#0B2240] text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                      title="Summit Portfolio"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onSpeakerSelect(speaker)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0B2240] hover:text-[#C58F28] transition-colors"
                  >
                    View Bio
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
