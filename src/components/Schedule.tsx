import React, { useState } from 'react';
import { Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { scheduleDay1, scheduleDay2 } from '../data/summitData';

interface ScheduleProps {
  onRegisterClick: () => void;
  onSponsorClick: () => void;
}

export const Schedule: React.FC<ScheduleProps> = ({ onRegisterClick, onSponsorClick }) => {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const currentSchedule = activeDay === 1 ? scheduleDay1 : scheduleDay2;

  return (
    <section id="schedule" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-[#0B4635] bg-[#0B4635]/10 border border-[#0B4635]/25 mb-4">
            <Clock className="w-3.5 h-3.5" />
            TWO-DAY COMPREHENSIVE AGENDA
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2240] tracking-tight uppercase leading-tight mb-4">
            SCHEDULE OF <span className="text-gradient-gold">SUMMIT</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            A dynamic programme structured to stimulate strategic dialogues, institutional co-investments, and executive deal velocity.
          </p>
        </div>

        {/* Day Selection Tabs as in ui.jpg */}
        <div className="flex justify-center gap-3 sm:gap-6 mb-14">
          <button
            onClick={() => setActiveDay(1)}
            className={`flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full text-sm font-bold transition-all ${activeDay === 1
                ? 'bg-[#0B2240] text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
              }`}
          >
            <span>DAY 1</span>
            <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded ${activeDay === 1 ? 'bg-[#C58F28] text-white' : 'bg-slate-100 text-slate-600'
              }`}>
              26 MAY
            </span>
            <span className="hidden sm:inline opacity-80">Global Capital & FDI</span>
          </button>

          <button
            onClick={() => setActiveDay(2)}
            className={`flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full text-sm font-bold transition-all ${activeDay === 2
                ? 'bg-[#0B2240] text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
              }`}
          >
            <span>DAY 2</span>
            <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded ${activeDay === 2 ? 'bg-[#C58F28] text-white' : 'bg-slate-100 text-slate-600'
              }`}>
              27 MAY
            </span>
            <span className="hidden sm:inline opacity-80">Enterprise & Deal Rooms</span>
          </button>
        </div>

        {/* Vertical Timeline Structure: Continuous Line from Beginning to End */}
        <div className="relative max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            {currentSchedule.map((session, idx) => (
              <div
                key={idx}
                className="relative flex items-start gap-3 sm:gap-6 group"
              >
                {/* Left Column: Dedicated Time (Never covered by dot or line) */}
                <div className="w-28 sm:w-44 shrink-0 text-right font-mono text-xs sm:text-sm font-bold text-[#0B2240] pt-4 pr-1 sm:pr-2 leading-snug">
                  {session.time}
                </div>

                {/* Center Column: Dedicated Timeline Node and Continuous Line */}
                <div className="relative flex flex-col items-center self-stretch shrink-0 w-6">
                  {/* Continuous vertical connecting line from beginning to end across all rows */}
                  <div className="w-0.5 bg-[#0B4635] opacity-35 absolute top-0 -bottom-6 sm:-bottom-8" />

                  {/* Node Dot: Perfectly centered in its own column */}
                  <div className="relative z-10 w-4 h-4 rounded-full bg-white border-[3.5px] border-[#C58F28] shadow-xs group-hover:bg-[#C58F28] group-hover:scale-125 transition-all mt-4" />
                </div>

                {/* Right Column: Session Card */}
                <div className="flex-1 min-w-0">
                  <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs group-hover:border-[#0B2240] group-hover:shadow-md transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-[#0B2240]">
                        {session.track}
                      </span>
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C58F28]" />
                        {session.room}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#0B2240] mb-2 leading-snug">
                      {session.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {session.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                      {session.speakers.map((sp, sIdx) => (
                        <span
                          key={sIdx}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full"
                        >
                          <Users className="w-3 h-3 text-[#C58F28]" />
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Bottom CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          <button
            onClick={onRegisterClick}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-grad-gold text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
          >
            Register as Delegate
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onSponsorClick}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white border-2 border-[#0B2240] text-[#0B2240] font-bold text-sm hover:bg-[#0B2240] hover:text-white transition-all"
          >
            Become a Sponsor
          </button>
        </div>
      </div>
    </section>
  );
};
