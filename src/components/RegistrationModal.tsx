import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { delegatePackages } from '../data/summitData';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialPackageId,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    jobTitle: '',
    country: 'Ghana',
    packageId: initialPackageId || 'individual',
    delegatesCount: initialPackageId === 'group' ? 3 : 1,
    notes: '',
    groupDelegate2Name: '',
    groupDelegate2Email: '',
    groupDelegate2Role: '',
    groupDelegate3Name: '',
    groupDelegate3Email: '',
    groupDelegate3Role: '',
    agreedPrivacy: true,
  });

  const [submittedData, setSubmittedData] = useState<{
    refId: string;
    name: string;
    packageName: string;
    delegatesCount: number;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (initialPackageId) {
      setFormData(prev => ({
        ...prev,
        packageId: initialPackageId,
        delegatesCount: initialPackageId === 'group' ? 3 : 1,
      }));
    }
  }, [initialPackageId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pkg = delegatePackages.find(p => p.id === formData.packageId) || delegatePackages[1];
    const generatedRef = `GBS-2027-REG-${Math.floor(100000 + Math.random() * 900000)}`;

    setSubmittedData({
      refId: generatedRef,
      name: formData.fullName,
      packageName: pkg.name,
      delegatesCount: formData.delegatesCount,
      email: formData.email,
    });
  };

  const handleClose = () => {
    setSubmittedData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B2240]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scaleUp">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#9A6C15] bg-[#C58F28]/10 px-3 py-1 rounded-full border border-[#C58F28]/20">
              GBS 2027 REGISTRATION
            </span>
            <h3 className="text-xl font-extrabold text-[#0B2240] mt-2">
              Delegate Registration Form
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {submittedData ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#0B4635]/10 text-[#0B4635] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h4 className="text-2xl font-extrabold text-[#0B2240] mb-2">
              Registration Received!
            </h4>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Thank you, <strong>{submittedData.name}</strong>. Your registration for <strong>{submittedData.packageName}</strong> has been logged with the summit secretariat.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 text-left space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Registration Ref:</span>
                <strong className="font-mono text-[#0B2240]">{submittedData.refId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Package:</span>
                <strong className="text-[#0B2240]">{submittedData.packageName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delegates:</span>
                <strong className="text-[#0B2240]">{submittedData.delegatesCount}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Confirmation Sent To:</span>
                <strong className="text-[#0B2240]">{submittedData.email}</strong>
              </div>
            </div>

            {/* Crucial requirement doc instruction */}
            <div className="bg-[#C58F28]/10 border border-[#C58F28]/30 rounded-2xl p-4 mb-6 text-left text-xs text-[#0B2240] leading-relaxed">
              <strong className="text-[#9A6C15] font-bold block mb-1">Payment Instructions Next Steps:</strong>
              Payment is not collected at this stage. The <strong>FKI Holdings</strong> Secretariat will verify your registration and dispatch your official Summit Invoice alongside bank transfer and electronic payment instructions via email within 24 hours.
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 px-6 rounded-xl bg-[#0B2240] text-white font-bold text-sm hover:bg-[#163660] transition-colors"
            >
              Return to Summit Overview
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-slate-600">
              <ShieldCheck className="w-5 h-5 text-[#C58F28] flex-shrink-0" />
              <span>
                <strong>Zero-Risk Registration:</strong> No upfront payment is required today. Submit your accreditation details to reserve your package.
              </span>
            </div>

            {/* Package Selector */}
            <div>
              <label className="block text-xs font-bold text-[#0B2240] uppercase tracking-wider mb-1.5">
                Selected Delegate Package *
              </label>
              <select
                value={formData.packageId}
                onChange={e => {
                  const val = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    packageId: val,
                    delegatesCount: val === 'group' ? 3 : 1,
                  }));
                }}
                className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0B2240] bg-slate-50/50"
                required
              >
                {delegatePackages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} — {pkg.formattedPrice} ({pkg.perText})
                  </option>
                ))}
              </select>
            </div>

            {/* Lead Name & Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0B2240] uppercase tracking-wider mb-1.5">
                  Lead Delegate Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kwabena Mensah"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0B2240]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0B2240] uppercase tracking-wider mb-1.5">
                  Organisation / Business *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Atlas Capital Group"
                  value={formData.organization}
                  onChange={e => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0B2240]"
                  required
                />
              </div>
            </div>

            {/* Job Title & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0B2240] uppercase tracking-wider mb-1.5">
                  Job Title / Designation
                </label>
                <input
                  type="text"
                  placeholder="e.g. Managing Director"
                  value={formData.jobTitle}
                  onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0B2240]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0B2240] uppercase tracking-wider mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Ghana / International"
                  value={formData.country}
                  onChange={e => setFormData({ ...formData, country: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0B2240]"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0B2240] uppercase tracking-wider mb-1.5">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0B2240]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0B2240] uppercase tracking-wider mb-1.5">
                  Telephone / Mobile *
                </label>
                <input
                  type="tel"
                  placeholder="+233 24 000 0000"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0B2240]"
                  required
                />
              </div>
            </div>

            {/* Dynamic Group Registration for 3 Delegates (as required in docx section 7) */}
            {formData.packageId === 'group' && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="text-xs font-extrabold text-[#0B2240] uppercase flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#C58F28]" />
                  Additional Group Delegates (Delegates 2 & 3)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Delegate 2 Full Name *"
                    value={formData.groupDelegate2Name}
                    onChange={e => setFormData({ ...formData, groupDelegate2Name: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 text-xs"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Delegate 2 Email *"
                    value={formData.groupDelegate2Email}
                    onChange={e => setFormData({ ...formData, groupDelegate2Email: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 text-xs"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Delegate 3 Full Name *"
                    value={formData.groupDelegate3Name}
                    onChange={e => setFormData({ ...formData, groupDelegate3Name: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 text-xs"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Delegate 3 Email *"
                    value={formData.groupDelegate3Email}
                    onChange={e => setFormData({ ...formData, groupDelegate3Email: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 text-xs"
                    required
                  />
                </div>
              </div>
            )}

            {/* Special Notes */}
            <div>
              <label className="block text-xs font-bold text-[#0B2240] uppercase tracking-wider mb-1.5">
                Special Notes / Investment Focus / Dietary
              </label>
              <textarea
                rows={2}
                placeholder="Mention specific sector interests or accessibility requirements..."
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0B2240]"
              />
            </div>

            {/* Privacy notice checkbox */}
            <div className="flex items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                id="privacyCheck"
                checked={formData.agreedPrivacy}
                onChange={e => setFormData({ ...formData, agreedPrivacy: e.target.checked })}
                className="mt-1"
                required
              />
              <label htmlFor="privacyCheck" className="text-xs text-slate-500 leading-tight">
                I understand that submitting this form registers my delegate interest. FKI Holdings will securely handle my details and dispatch official payment instructions.
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-grad-gold text-white text-xs font-bold shadow-md hover:opacity-95"
              >
                Submit Registration
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
