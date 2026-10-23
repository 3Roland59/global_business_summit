import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { sponsorTiers } from '../data/summitData';
import { sendSponsorshipEnquiry, RECIPIENT_EMAIL } from '../services/emailService';

interface SponsorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier: string;
}

export const SponsorshipModal: React.FC<SponsorshipModalProps> = ({
  isOpen,
  onClose,
  initialTier,
}) => {
  const [formData, setFormData] = useState({
    tier: initialTier || 'Gold',
    orgName: '',
    contactName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    refId: string;
    orgName: string;
    tier: string;
    recipientEmail: string;
    mailtoFallbackUrl?: string;
  } | null>(null);

  useEffect(() => {
    if (initialTier) {
      setFormData(prev => ({ ...prev, tier: initialTier }));
    }
  }, [initialTier]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedRef = `GBS-2027-SPON-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const result = await sendSponsorshipEnquiry({
        refId: generatedRef,
        orgName: formData.orgName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        tier: formData.tier,
        message: formData.message,
      });

      setSubmittedData({
        refId: generatedRef,
        orgName: formData.orgName,
        tier: formData.tier,
        recipientEmail: RECIPIENT_EMAIL,
        mailtoFallbackUrl: result.mailtoFallbackUrl,
      });
      setFormData({
        tier: initialTier || 'Gold',
        orgName: '',
        contactName: '',
        email: '',
        phone: '',
        message: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmittedData(null);
    setFormData({
      tier: initialTier || 'Gold',
      orgName: '',
      contactName: '',
      email: '',
      phone: '',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scaleUp">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-gold-dark bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
              CORPORATE PARTNERSHIP
            </span>
            <h3 className="text-xl font-extrabold text-navy mt-2">
              Sponsorship Enquiry
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submittedData ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h4 className="text-2xl font-extrabold text-navy mb-2">
              Enquiry Submitted
            </h4>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Thank you. The <strong>FKI Holdings</strong> Corporate Sponsorship Directorate has received your request for <strong>{submittedData.tier} Sponsor Tier</strong> on behalf of <strong>{submittedData.orgName}</strong>.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Enquiry Reference:</span>
                <strong className="font-mono text-navy">{submittedData.refId}</strong>
              </div>
              <p className="mt-1 text-slate-500">
                A dedicated partnership director will connect with your designated contact officer within 1 business day.
              </p>
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
                Preferred Sponsorship Level *
              </label>
              <select
                value={formData.tier}
                onChange={e => setFormData({ ...formData, tier: e.target.value })}
                className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-navy bg-slate-50/50"
              >
                {sponsorTiers.map(t => (
                  <option key={t.id} value={t.name}>
                    {t.name} ({t.price})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  Organisation / Enterprise *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Global Bank"
                  value={formData.orgName}
                  onChange={e => setFormData({ ...formData, orgName: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-navy"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  Contact Person *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nana Afua"
                  value={formData.contactName}
                  onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-navy"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  placeholder="partnerships@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-navy"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                  Telephone / Mobile *
                </label>
                <input
                  type="tel"
                  placeholder="+233 20 000 0000"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-navy"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                Brand Goals & Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Describe your exhibition booth, keynote, or deal room objectives..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-navy"
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
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Sponsorship Enquiry</span>
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
