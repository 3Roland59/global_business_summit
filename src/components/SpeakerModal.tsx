import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import type { Speaker } from '../types';

interface SpeakerModalProps {
  speaker: Speaker | null;
  onClose: () => void;
  onRegisterClick: () => void;
}

export const SpeakerModal: React.FC<SpeakerModalProps> = ({
  speaker,
  onClose,
  onRegisterClick,
}) => {
  if (!speaker) return null;

  return (
    <div className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scaleUp overflow-hidden">
        {/* Photo Banner */}
        <div className="relative h-64 bg-navy">
          <img
            src={speaker.image}
            alt={speaker.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold-dark bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
            {speaker.category}
          </span>

          <h3 className="text-2xl font-extrabold text-navy mt-2 mb-1">
            {speaker.name}
          </h3>
          <div className="text-xs font-bold text-gold-dark mb-1">
            {speaker.role}
          </div>
          <div className="text-xs text-slate-500 mb-5">
            {speaker.org}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
              Featured Plenary Session
            </span>
            <div className="text-xs font-bold text-navy">
              {speaker.sessions}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            {speaker.bio}
          </p>

          <button
            onClick={() => {
              onClose();
              onRegisterClick();
            }}
            className="w-full py-3 px-5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
          >
            Register to Attend This Keynote
            <ArrowRight className="w-4 h-4 text-gold-light" />
          </button>
        </div>
      </div>
    </div>
  );
};
