import React, { useState, useId } from 'react';
import { Property, PropertyInquiry } from '../types';
import { X, Send, CheckCircle2, Shield, Calendar, HelpCircle, Phone, Mail } from 'lucide-react';
import { trackRichportEvent } from '../utils/analytics';

interface InquiryModalProps {
  property: Property;
  initialType?: 'question' | 'viewing';
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inquiry: PropertyInquiry) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  property,
  initialType = 'question',
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [type, setType] = useState<'question' | 'viewing'>(initialType);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState<'phone' | 'email' | 'text'>('email');
  const [buyingTimeline, setBuyingTimeline] = useState<'immediate' | '1-3_months' | 'exploring'>('1-3_months');
  const [message, setMessage] = useState('');
  const [consentSpam, setConsentSpam] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fullNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const timelineId = useId();
  const messageId = useId();
  const consentId = useId();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    trackRichportEvent(type === 'viewing' ? 'viewing_request' : 'inquiry', {
      propertyId: property.id,
      propertyRef: property.referenceNumber,
      county: property.location.county,
      propertyType: property.type,
      price: property.pricing.cashPrice,
      buyingTimeline,
      preferredContact,
    });

    setTimeout(() => {
      const inquiryData: PropertyInquiry = {
        id: `inq-${Date.now()}`,
        propertyId: property.id,
        propertyTitle: property.title,
        type,
        fullName,
        email,
        phone,
        preferredContact,
        buyingTimeline,
        message: message || (type === 'viewing' ? 'Requested daylight drive-by inspection & access code instructions.' : 'Requested property details.'),
        createdAt: new Date().toISOString(),
      };

      onSubmit(inquiryData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg max-w-lg w-full border border-[#D5C5A8] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Southern theme */}
        <div className="bg-[#153023] text-white p-5 border-b border-[#254A37] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#DFC386] text-xs uppercase tracking-wider font-semibold">
              {type === 'viewing' ? <Calendar className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />}
              <span>{type === 'viewing' ? 'Request Daylight Property Viewing' : 'Ask Richport Southern a Question'}</span>
            </div>
            <h3 className="font-serif text-lg font-bold mt-1 text-white">
              {property.title}
            </h3>
            <p className="text-xs text-stone-300 font-mono mt-0.5">
              Ref: {property.referenceNumber} • Parcel: {property.parcelNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#153023] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#153023]" />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#153023]">
              Inquiry Successfully Recorded
            </h4>
            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{fullName}</strong>. Your inquiry for <em>{property.streetAddress}</em> has been securely forwarded to our Little Rock acquisition and property management team. We typically respond within 1 business day.
            </p>
            <div className="p-3 bg-[#FAF8F5] rounded-md border border-[#E8DFC9] text-xs text-stone-600 font-mono">
              Lead Tracking ID: RPS-{Date.now().toString().slice(-6)}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-md bg-[#153023] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1E4331]"
            >
              Back to Property Listing
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Toggle Inquiry Mode */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#F4EFEB] rounded-md border border-[#E0D7C2]">
              <button
                type="button"
                onClick={() => setType('question')}
                className={`py-2 px-3 rounded text-xs font-semibold transition-all ${
                  type === 'question'
                    ? 'bg-[#153023] text-white shadow-2xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Ask a Question
              </button>
              <button
                type="button"
                onClick={() => setType('viewing')}
                className={`py-2 px-3 rounded text-xs font-semibold transition-all ${
                  type === 'viewing'
                    ? 'bg-[#153023] text-white shadow-2xs'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Schedule / Viewing Info
              </button>
            </div>

            {/* Viewing Guidance Note */}
            {type === 'viewing' && (
              <div className="p-3 rounded-md bg-stone-100 border border-stone-300 text-stone-700 text-[11px] leading-relaxed">
                <strong>Viewing Protocol:</strong> Vacant land parcels may be walked during daylight hours at your leisure. For residential structures with lockboxes, Richport Southern will review your request and send access instructions and safety disclaimers.
              </div>
            )}

            {/* Contact Details */}
            <div className="space-y-3">
              <div>
                <label htmlFor={fullNameId} className="block font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  id={fullNameId}
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Robert Vance"
                  className="w-full p-2.5 rounded-md border border-[#C5A869]/60 bg-[#FAF8F5] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#153023]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={emailId} className="block font-semibold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full p-2.5 rounded-md border border-[#C5A869]/60 bg-[#FAF8F5] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#153023]"
                  />
                </div>
                <div>
                  <label htmlFor={phoneId} className="block font-semibold text-stone-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    id={phoneId}
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(501) 555-0123"
                    className="w-full p-2.5 rounded-md border border-[#C5A869]/60 bg-[#FAF8F5] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#153023]"
                  />
                </div>
              </div>

              {/* Preferred Contact & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="block font-semibold text-stone-700 mb-1">
                    Preferred Contact Method
                  </span>
                  <div className="flex gap-2 text-[11px]">
                    {(['email', 'phone', 'text'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPreferredContact(method)}
                        className={`flex-1 py-1.5 px-2 rounded-sm border capitalize font-medium ${
                          preferredContact === method
                            ? 'bg-[#153023] text-white border-[#153023]'
                            : 'bg-white text-stone-700 border-stone-300'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor={timelineId} className="block font-semibold text-stone-700 mb-1">
                    Buying Timeline
                  </label>
                  <select
                    id={timelineId}
                    value={buyingTimeline}
                    onChange={(e) => setBuyingTimeline(e.target.value as any)}
                    className="w-full p-2 rounded-md border border-[#C5A869]/60 bg-[#FAF8F5] text-stone-800 focus:outline-none"
                  >
                    <option value="immediate">Immediate / Ready to Close (Cash or Pre-approved)</option>
                    <option value="1-3_months">1 - 3 Months (Evaluating terms)</option>
                    <option value="exploring">Just Exploring / Researching Area</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor={messageId} className="block font-semibold text-stone-700 mb-1">
                  {type === 'viewing' ? 'Specific Viewing Date / Notes' : 'Your Question or Due Diligence Request'}
                </label>
                <textarea
                  id={messageId}
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    type === 'viewing'
                      ? 'I would like to walk the parcel this Saturday morning. Please confirm road access.'
                      : 'Can you provide the Pulaski County GIS parcel ID and clarify utility tap fees?'
                  }
                  className="w-full p-2.5 rounded-md border border-[#C5A869]/60 bg-[#FAF8F5] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#153023]"
                />
              </div>
            </div>

            {/* Consent & Tracking */}
            <div className="pt-2 border-t border-stone-200">
              <label htmlFor={consentId} className="flex items-start gap-2 text-[11px] text-stone-600 cursor-pointer">
                <input
                  id={consentId}
                  type="checkbox"
                  required
                  checked={consentSpam}
                  onChange={(e) => setConsentSpam(e.target.checked)}
                  className="mt-0.5 accent-[#153023]"
                />
                <span>
                  I consent to receive transactional communications from Richport Southern regarding this property inquiry. We never sell personal information.
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-md bg-[#153023] hover:bg-[#1E4331] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Recording Inquiry...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-[#DFC386]" />
                  <span>Submit {type === 'viewing' ? 'Viewing Request' : 'Inquiry'}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
