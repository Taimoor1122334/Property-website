import React, { useState } from 'react';
import { 
  DollarSign, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Calendar, 
  Scale, 
  CreditCard,
  Compass
} from 'lucide-react';

interface HowItWorksViewProps {
  onNavigate: (view: string) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'owner-financing' | 'cash-purchase'>('owner-financing');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#DECFA9] p-6 sm:p-10 shadow-xs space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#967433]">
          Acquisition Process Guide
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#153023]">
          How Purchasing from Richport Southern Works
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
          We believe real estate transactions should be completely transparent and predictable. Explore the exact steps for both our direct cash sales and accessible owner financing program.
        </p>
      </div>

      {/* Path Selector Tabs */}
      <div className="flex border-b-2 border-[#DECFA9]">
        <button
          onClick={() => setActiveTab('owner-financing')}
          className={`flex-1 py-4 px-6 text-sm font-bold tracking-wide transition-all border-b-4 flex items-center justify-center gap-2 ${
            activeTab === 'owner-financing'
              ? 'border-[#153023] text-[#153023] bg-white rounded-t-lg'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Building className="w-4 h-4 text-[#967433]" />
          <span>Path A: Richport Owner Financing (Low Down Payment)</span>
        </button>

        <button
          onClick={() => setActiveTab('cash-purchase')}
          className={`flex-1 py-4 px-6 text-sm font-bold tracking-wide transition-all border-b-4 flex items-center justify-center gap-2 ${
            activeTab === 'cash-purchase'
              ? 'border-[#153023] text-[#153023] bg-white rounded-t-lg'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <DollarSign className="w-4 h-4 text-[#967433]" />
          <span>Path B: Direct Cash Purchase (Maximum Discount)</span>
        </button>
      </div>

      {/* TAB A: Owner Financing Path */}
      {activeTab === 'owner-financing' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl border border-[#DECFA9] p-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#153023]">
              Five Steps from Application to Account Servicing
            </h3>
            <p className="text-xs text-stone-600">
              No mortgage brokers, origination points, or long underwriting delays. We finance directly from our company balance sheet.
            </p>

            <div className="space-y-6 pt-4">
              {[
                {
                  step: 'Step 1',
                  title: 'Select Parcel & Submit Online Application',
                  desc: 'Pick your property from our Arkansas inventory. Complete our secure 6-step online application specifying your down payment readiness, monthly income, and intended property use.',
                  duration: '10 minutes online',
                },
                {
                  step: 'Step 2',
                  title: 'Underwriting Verification & Term Structuring',
                  desc: 'Richport Southern reviews your income and down payment capacity. We structure a clear monthly schedule including principal, interest, and county tax escrow.',
                  duration: '1–2 business days',
                },
                {
                  step: 'Step 3',
                  title: 'Remote E-Signature Transaction Package',
                  desc: 'We route your Promissory Note and Contract for Deed / Deed of Trust through an approved electronic signature provider (DocuSign). Sign securely from your phone or computer.',
                  duration: 'Same-day turnaround',
                },
                {
                  step: 'Step 4',
                  title: 'Earnest Escrow & Down Payment Settlement',
                  desc: 'Deposit your agreed down payment via secure bank wire or certified cashier’s check. Funds are credited directly to your principal reduction.',
                  duration: '2–3 business days',
                },
                {
                  step: 'Step 5',
                  title: 'Servicing Portal Activation & Possession',
                  desc: 'Your account is activated with our authorized loan servicing provider. Set up automatic monthly payments (ACH). Take immediate possession of the property to begin improvements!',
                  duration: 'Day of funding',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg bg-[#FAF8F5] border border-stone-200">
                  <div className="shrink-0 w-16 text-center">
                    <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[#153023] text-white">
                      {item.step}
                    </span>
                    <span className="block text-[10px] text-stone-400 font-mono mt-2">
                      {item.duration}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-base font-bold text-[#153023]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => onNavigate('apply')}
                className="px-6 py-3 rounded-md bg-[#153023] hover:bg-[#1E4331] text-white font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span>Start Owner Financing Application</span>
                <ArrowRight className="w-4 h-4 text-[#DFC386]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB B: Cash Purchase Path */}
      {activeTab === 'cash-purchase' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl border border-[#DECFA9] p-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#153023]">
              Four Steps for Direct Cash Buyers
            </h3>
            <p className="text-xs text-stone-600">
              For builders, contractors, and self-directed IRA investors looking for maximum savings and expedited closing.
            </p>

            <div className="space-y-6 pt-4">
              {[
                {
                  step: 'Step 1',
                  title: 'Physical Due Diligence & Purchase Agreement',
                  desc: 'Inspect the parcel during daylight hours. Request our inspection disclosure report. We generate a straightforward Arkansas Real Estate Purchase Agreement reflecting the discounted cash price.',
                  duration: '1 business day',
                },
                {
                  step: 'Step 2',
                  title: 'Escrow Deposit with Title Attorney',
                  desc: 'Submit non-refundable earnest deposit ($1,000 minimum) held in escrow by a reputable Arkansas title company or closing attorney in Little Rock.',
                  duration: '1–2 business days',
                },
                {
                  step: 'Step 3',
                  title: 'Title Verification & Closing Settlement',
                  desc: 'The title company confirms state tax deed chain of custody, calculates tax prorations, and prepares the Special/Limited Warranty Deed conveyance.',
                  duration: '5–7 business days',
                },
                {
                  step: 'Step 4',
                  title: 'Wire Funding & County Deed Recording',
                  desc: 'Wire remaining balance. The deed is officially stamped and recorded in county courthouse land records. Original deed mailed directly to you.',
                  duration: 'Closing Day',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg bg-[#FAF8F5] border border-stone-200">
                  <div className="shrink-0 w-16 text-center">
                    <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[#C29F59] text-[#153023]">
                      {item.step}
                    </span>
                    <span className="block text-[10px] text-stone-400 font-mono mt-2">
                      {item.duration}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-base font-bold text-[#153023]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => onNavigate('inventory')}
                className="px-6 py-3 rounded-md bg-[#153023] hover:bg-[#1E4331] text-white font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span>Browse Cash Properties</span>
                <ArrowRight className="w-4 h-4 text-[#DFC386]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
