import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { sendGeneralEnquiry, RECIPIENT_EMAIL } from '../services/emailService';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Summit Enquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    refId: string;
    recipientEmail: string;
    mailtoFallbackUrl?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedRef = `GBS-2027-MSG-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const result = await sendGeneralEnquiry({
        refId: generatedRef,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setSubmittedData({
        refId: generatedRef,
        recipientEmail: RECIPIENT_EMAIL,
        mailtoFallbackUrl: result.mailtoFallbackUrl,
      });
      setFormData({
        name: '',
        email: '',
        subject: 'General Summit Enquiry',
        message: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmittedData(null);
    setFormData({
      name: '',
      email: '',
      subject: 'General Summit Enquiry',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scaleUp">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-gold-dark bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
              SUMMIT SECRETARIAT
            </span>
            <h3 className="text-xl font-extrabold text-navy mt-2">
              Contact & Enquiries
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedData ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green/10 text-green flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h4 className="text-2xl font-extrabold text-navy mb-2">
              Message Submitted
            </h4>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Thank you. The <strong>FKI Holdings</strong> Secretariat has received your message and will respond within 24-48 hours.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Tracking Reference:</span>
                <strong className="font-mono text-navy">{submittedData.refId}</strong>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 px-6 rounded-xl bg-navy text-white font-bold text-sm hover:bg-navy-light transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Kwabena Mensah"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-navy"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-navy"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Travel & Accreditation enquiry"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                Message *
              </label>
              <textarea
                rows={4}
                placeholder="Write your enquiry or question here..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-navy"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-grad-gold text-white text-xs font-bold shadow-md hover:opacity-95 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
