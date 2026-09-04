import React, { useState } from 'react';
import { Property } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { trackRichportEvent } from '../utils/analytics';

interface ContactViewProps {
  properties: Property[];
}

export const ContactView: React.FC<ContactViewProps> = ({ properties }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPropId, setSelectedPropId] = useState('general');
  const [inquiryTopic, setInquiryTopic] = useState('General Question');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isViewing = inquiryTopic.toLowerCase().includes('view') || inquiryTopic.toLowerCase().includes('walkthrough');
    trackRichportEvent(isViewing ? 'viewing_request' : 'inquiry', {
      propertyId: selectedPropId !== 'general' ? selectedPropId : undefined,
      inquiryTopic,
      source: 'contact_page',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#DECFA9] p-6 sm:p-10 shadow-xs space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#967433]">
          Connect With Us
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#153023]">
          Contact Richport Southern, LLC
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl font-sans">
          Whether you have questions about a specific Arkansas tax parcel, need assistance with your loan servicing account, or wish to schedule a structural inspection walkthrough, our Little Rock team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information & Office Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-[#DECFA9] p-6 space-y-5 text-xs shadow-2xs">
            <h3 className="font-serif text-base font-bold text-[#153023]">
              Little Rock Main Office
            </h3>

            <div className="space-y-4 text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#967433] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Physical Address:</strong>
                  <p className="text-stone-600 mt-0.5">
                    Executive Center<br />
                    400 W Capitol Ave, Suite 1700<br />
                    Little Rock, AR 72201
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#967433] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Telephone Inquiries:</strong>
                  <p className="text-stone-600 mt-0.5 font-mono">
                    <a 
                      href="tel:5015002440" 
                      onClick={() => trackRichportEvent('phone_click', { location: 'contact_page' })}
                      className="hover:text-[#153023] underline"
                    >
                      (501) 500-2440
                    </a>
                    <br />
                    Servicing &amp; Payments: Option 2
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#967433] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Electronic Inquiries:</strong>
                  <p className="text-stone-600 mt-0.5">
                    <a 
                      href="mailto:info@richportsouthern.com" 
                      onClick={() => trackRichportEvent('email_click', { location: 'contact_page' })}
                      className="hover:text-[#153023] underline block"
                    >
                      info@richportsouthern.com
                    </a>
                    Acquisitions: acquisitions@richportsouthern.com<br />
                    Servicing: servicing@richportsouthern.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#967433] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Operating Hours:</strong>
                  <p className="text-stone-600 mt-0.5">
                    Monday – Friday: 8:30 AM – 5:00 PM CST<br />
                    Saturday: By appointment for property viewings<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF8F5] rounded-xl border border-[#DECFA9] p-5 text-xs space-y-2">
            <h4 className="font-semibold text-[#153023] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#967433]" />
              <span>Identity Protection Policy</span>
            </h4>
            <p className="text-stone-600 leading-relaxed text-[11px]">
              For your safety, do not submit social security numbers, driver's license scans, or banking details through this general contact form. To submit financing application materials, please use our encrypted <strong>Apply for Financing</strong> portal.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#DECFA9] p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#153023] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#153023]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#153023]">
                Message Received
              </h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you, <strong>{fullName}</strong>. Your inquiry has been routed to our Little Rock team. We typically respond within one business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-md bg-[#153023] text-white text-xs font-semibold"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-serif text-lg font-bold text-[#153023] border-b border-stone-200 pb-2">
                Send a Message to Our Little Rock Team
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. William Clark"
                    className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="william@example.com"
                    className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(501) 555-0182"
                    className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Inquiry Topic *
                  </label>
                  <select
                    value={inquiryTopic}
                    onChange={(e) => setInquiryTopic(e.target.value)}
                    className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5]"
                  >
                    <option value="General Question">General Real Estate Question</option>
                    <option value="Property Viewing">Request Property Viewing Pass</option>
                    <option value="Owner Financing">Owner Financing Qualifications</option>
                    <option value="Payment Servicing">Active Borrower Payment Servicing</option>
                    <option value="Former Owner">Former Property Owner / Heir Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Specific Arkansas Property (Optional)
                </label>
                <select
                  value={selectedPropId}
                  onChange={(e) => setSelectedPropId(e.target.value)}
                  className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5]"
                >
                  <option value="general">Not specific to a single property</option>
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.county} Co.) — Parcel {p.parcelNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our acquisition or servicing team assist you?"
                  className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-md bg-[#153023] hover:bg-[#1E4331] text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
              >
                {isSubmitting ? (
                  <span>Transmitting Message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#DFC386]" />
                    <span>Submit Message to Richport Southern</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
