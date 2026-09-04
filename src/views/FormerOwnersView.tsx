import React, { useState } from 'react';
import { FormerOwnerInquiry } from '../types';
import { 
  HeartHandshake, 
  Search, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Phone, 
  ShieldCheck, 
  FileText,
  Clock
} from 'lucide-react';

export const FormerOwnersView: React.FC = () => {
  const [parcelOrAddress, setParcelOrAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState<FormerOwnerInquiry['relationship']>('Former Deedholder');
  const [message, setMessage] = useState('');
  const [acknowledgedDisclaimer, setAcknowledgedDisclaimer] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!acknowledgedDisclaimer) {
      setFormError('Please review and check the required statutory disclaimer acknowledgment before submitting.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Compassionate Header */}
      <div className="bg-[#FAF5ED] rounded-xl border-l-4 border-[#C29F59] p-6 sm:p-10 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#967433] text-xs font-bold uppercase tracking-wider">
          <HeartHandshake className="w-5 h-5" />
          <span>Information &amp; Inquiries for Former Property Owners</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#153023]">
          A Respectful, Honest Conversation for Past Owners &amp; Families
        </h1>

        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-2xl font-sans">
          At Richport Southern, we recognize that tax sale transfers often follow challenging circumstances—estate transitions, family illness, communication lapses with county assessors, or economic hardship. We believe in treating every past owner, heir, and neighboring family with dignity, clear facts, and genuine respect.
        </p>
      </div>

      {/* Educational Context: Why Tax Sales Occur in Arkansas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="p-5 rounded-lg bg-white border border-[#DECFA9] space-y-2 shadow-2xs">
          <span className="font-serif text-sm font-bold text-[#153023] block">
            1. County Delinquency &amp; State Certification
          </span>
          <p className="text-stone-600 leading-relaxed">
            Under Arkansas law (A.C.A. § 26-37-101), when real estate property taxes remain unpaid for several consecutive years, county collectors certify the title to the Arkansas Commissioner of State Lands (COSL).
          </p>
        </div>

        <div className="p-5 rounded-lg bg-white border border-[#DECFA9] space-y-2 shadow-2xs">
          <span className="font-serif text-sm font-bold text-[#153023] block">
            2. Statutory Redemption Window
          </span>
          <p className="text-stone-600 leading-relaxed">
            The State of Arkansas maintains a strict legal window during which deedholders or heirs can redeem parcels by satisfying delinquent taxes directly with the Commissioner in Little Rock.
          </p>
        </div>

        <div className="p-5 rounded-lg bg-white border border-[#DECFA9] space-y-2 shadow-2xs">
          <span className="font-serif text-sm font-bold text-[#153023] block">
            3. Public Auction &amp; Conveyance
          </span>
          <p className="text-stone-600 leading-relaxed">
            Parcels not redeemed are sold at public tax auctions or post-auction negotiated sales. Richport Southern acquires these properties legally at state sales to rehabilitate and return them to productive community use.
          </p>
        </div>
      </div>

      {/* The Inquiry Form or Success State */}
      <div className="bg-white rounded-xl border border-[#DECFA9] p-6 sm:p-8 shadow-xs space-y-6">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#153023] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#153023]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#153023]">
              Inquiry Received with Respect
            </h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{fullName}</strong>. Your inquiry regarding <em>{parcelOrAddress}</em> has been securely delivered to Sam Carrasquillo and Bryan Hosto. Our team will review the county tax deed records and reach out within 1 to 2 business days.
            </p>
            <div className="p-3 bg-[#FAF8F5] rounded-md border border-[#DECFA9] text-xs font-mono text-stone-600">
              Reference: RPS-FO-{Date.now().toString().slice(-6)}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="border-b border-stone-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#153023]">
                Property Inquiry &amp; Family Circumstances Form
              </h3>
              <p className="text-stone-600 mt-0.5">
                Please provide the parcel details or address so our records coordinator can locate the historical county title file.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Parcel Number, Street Address, or General Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1420 W 22nd St or Parcel 34L-020..."
                  value={parcelOrAddress}
                  onChange={(e) => setParcelOrAddress(e.target.value)}
                  className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5] text-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Your Relationship to the Property *
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value as any)}
                  className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5] text-stone-800"
                >
                  <option value="Former Deedholder">Former Recorded Deedholder</option>
                  <option value="Heir / Family Member">Heir / Surviving Family Member</option>
                  <option value="Adjoining Neighbor">Adjoining Landowner / Neighbor</option>
                  <option value="Attorney / Representative">Attorney or Estate Administrator</option>
                  <option value="Other">Other Interested Party</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mary Higgins"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5] text-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="mary@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5] text-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(501) 555-0144"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5] text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Your Questions or Information About This Parcel
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share any context regarding estate probate, personal property remaining on site, or inquiries about the parcel status."
                className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5] text-stone-900"
              />
            </div>

            {/* Mandatory Scope Brief Disclaimer (Section 3 Requirement) */}
            <div className="p-4 bg-[#FFFBEB] rounded-lg border border-[#FDE68A] space-y-2">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-amber-900">
                  <span className="font-bold block uppercase tracking-wide text-[11px]">
                    Required Legal Notice Regarding Repurchase &amp; Titles
                  </span>
                  <p className="leading-relaxed">
                    Richport Southern, LLC is a private real estate investment company and lawful deedholder of record under Arkansas law. 
                    <strong> Submitting this inquiry form does not constitute an offer, agreement, promise, or guarantee that any property will be returned, deeded back, or resold at a discount.</strong> We treat all inquiries with compassion and dignity, but all title rights remain strictly governed by recorded county deeds and statutory law.
                  </p>
                </div>
              </div>

              <label className="flex items-start gap-2 pt-2 border-t border-amber-200 cursor-pointer font-semibold text-amber-950">
                <input
                  type="checkbox"
                  required
                  checked={acknowledgedDisclaimer}
                  onChange={(e) => setAcknowledgedDisclaimer(e.target.checked)}
                  className="mt-0.5 accent-[#153023]"
                />
                <span>
                  I have read and understand this disclaimer, and acknowledge that Richport Southern makes no promises of repurchase or special treatment.
                </span>
              </label>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-800">
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !acknowledgedDisclaimer}
              className="w-full py-3 px-4 rounded-md bg-[#153023] hover:bg-[#1E4331] disabled:opacity-50 text-[#FAF7F2] font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
            >
              {isSubmitting ? (
                <span>Submitting Inquiry...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-[#DFC386]" />
                  <span>Submit Inquiry Respectfully</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
