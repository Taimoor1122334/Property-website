import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  CreditCard, 
  FileText, 
  Calendar, 
  Lock, 
  HelpCircle, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Upload
} from 'lucide-react';
import { trackRichportEvent } from '../utils/analytics';

interface PaymentPortalViewProps {
  onNavigate: (view: string) => void;
}

export const PaymentPortalView: React.FC<PaymentPortalViewProps> = ({ onNavigate }) => {
  const [loanNumber, setLoanNumber] = useState('');
  const [borrowerLastName, setBorrowerLastName] = useState('');
  const [redirecting, setRedirecting] = useState(false);
  const [handoffSuccess, setHandoffSuccess] = useState(false);

  const handlePortalHandoff = (e: React.FormEvent) => {
    e.preventDefault();
    trackRichportEvent('payment_portal_click', { 
      location: 'payment_portal_handoff_form',
      hasLoanNumber: !!loanNumber 
    });
    setRedirecting(true);
    setTimeout(() => {
      // Simulate redirection to approved third-party servicing platform
      setRedirecting(false);
      setHandoffSuccess(true);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner */}
      <div className="bg-[#153023] text-white rounded-xl p-6 sm:p-10 border-b-4 border-[#C29F59] shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-[#DFC386] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Richport Southern Borrower Servicing Gateway</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold">
          Customer Loan Account &amp; Make a Payment
        </h1>
        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-2xl font-sans">
          Manage your monthly owner-financing payments, configure automatic bank drafts (ACH), review amortization history, or upload required annual hazard insurance policies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Login / Handoff Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#DECFA9] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h2 className="font-serif text-xl font-bold text-[#153023] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#967433]" />
              <span>Connect to Secure Servicing Portal</span>
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Enter your loan reference details to jump directly to your account on our authorized servicing partner's portal.
            </p>
          </div>

          <form onSubmit={handlePortalHandoff} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                Loan Account Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. RPS-2024-0087 or 6-digit Servicer ID"
                value={loanNumber}
                onChange={(e) => setLoanNumber(e.target.value)}
                className="w-full p-3 rounded-md border border-stone-300 bg-[#FAF8F5] font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#153023]"
              />
              <span className="text-[11px] text-stone-500 mt-1 block">
                Located on your monthly billing statement or initial closing welcome letter.
              </span>
            </div>

            <div>
              <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                Primary Borrower Last Name / Entity Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Miller or Ozark Holdings"
                value={borrowerLastName}
                onChange={(e) => setBorrowerLastName(e.target.value)}
                className="w-full p-3 rounded-md border border-stone-300 bg-[#FAF8F5] text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#153023]"
              />
            </div>

            {/* Security Notice (Section 6 Compliance) */}
            <div className="p-4 rounded-md bg-[#FAF8F5] border border-[#E0D7C2] text-[11px] text-stone-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#153023]">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>PCI-Compliant External Servicing Security</span>
              </div>
              <p>
                In compliance with federal banking regulations, Richport Southern does <strong>not</strong> store bank account numbers, debit cards, or balance calculations on our WordPress website. You will be routed directly to the licensed loan servicing system with 256-bit SSL encryption.
              </p>
            </div>

            <button
              type="submit"
              disabled={redirecting}
              className="w-full py-3.5 px-4 rounded-md bg-[#153023] hover:bg-[#1E4331] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
            >
              {redirecting ? (
                <span>Routing to Servicing Provider...</span>
              ) : (
                <>
                  <span>Proceed to Payment &amp; Servicing Portal</span>
                  <ExternalLink className="w-4 h-4 text-[#DFC386]" />
                </>
              )}
            </button>
          </form>

          {/* Quick Support & Return Paths */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between text-xs text-stone-600">
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-[#153023] underline"
            >
              Need help finding your loan number?
            </button>
            <button
              onClick={() => onNavigate('faq')}
              className="hover:text-[#153023] underline"
            >
              Servicing &amp; Payment FAQs
            </button>
          </div>
        </div>

        {/* Right Column: Portal Capabilities & Desired Features */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF8F5] rounded-xl border border-[#DECFA9] p-6 space-y-4">
            <h3 className="font-serif text-base font-bold text-[#153023] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#967433]" />
              <span>Available Borrower Services</span>
            </h3>

            <p className="text-xs text-stone-600">
              Through our servicing provider, active borrowers can manage all aspects of their note:
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-800">One-Time ACH &amp; AutoPay:</strong>
                  <p className="text-stone-600 text-[11px]">Setup automatic recurring monthly drafts from checking or savings.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-800">Payment History &amp; Receipts:</strong>
                  <p className="text-stone-600 text-[11px]">Instant access to past receipts and year-end IRS Form 1098 interest statements.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-800">Principal &amp; Interest Breakdown:</strong>
                  <p className="text-stone-600 text-[11px]">View real-time principal reduction and scheduled amortization payoff timeline.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-800">Insurance Verification Upload:</strong>
                  <p className="text-stone-600 text-[11px]">Submit updated homeowner/hazard insurance declarations naming Richport Southern as loss payee.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-800">Early Payoff Quotes:</strong>
                  <p className="text-stone-600 text-[11px]">Request zero-penalty early payoff quotes at any time.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Servicing Contact Card */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3 text-xs">
            <h4 className="font-semibold text-stone-800 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#967433]" />
              <span>Dedicated Servicing Support</span>
            </h4>
            <p className="text-stone-600">
              Have questions about your statement, escrow, or payoff? Contact our Little Rock servicing coordinator:
            </p>
            <div className="space-y-1 font-mono text-[11px] text-stone-800">
              <div>Phone: (501) 500-2440 (Option 2)</div>
              <div>Email: servicing@richportsouthern.com</div>
              <div>Hours: Monday - Friday, 8:30 AM - 5:00 PM CST</div>
            </div>
          </div>
        </div>
      </div>

      {/* Secure Handoff Modal */}
      {handoffSuccess && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full border border-[#D5C5A8] shadow-2xl p-6 text-xs space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#153023] mx-auto flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-[#153023]" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#153023]">
                Routing to Authorized Loan Servicer
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Loan Account: <strong className="font-mono text-[#153023]">{loanNumber || 'RPS-ACTIVE'}</strong>
              </p>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-md border border-[#E0D7C2] text-stone-700 leading-relaxed">
              Your payment session is encrypted with 256-bit SSL. For security and PCI compliance, your ACH draft or debit payment is executed directly inside the authorized third-party loan servicing portal [Provider Selection Required by Richport Southern]. Richport Southern never stores bank account credentials or card numbers.
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setHandoffSuccess(false)}
                className="flex-1 py-2.5 px-4 rounded-md bg-[#153023] hover:bg-[#1E4331] text-white font-semibold text-center transition-colors shadow-xs"
              >
                Close &amp; Return to Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
