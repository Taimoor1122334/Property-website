import React, { useState, useId } from 'react';
import { Property } from '../types';
import { DollarSign, Percent, Calendar, AlertTriangle, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';

interface PaymentCalculatorProps {
  property: Property;
  onApply?: (propertyId: string) => void;
}

export const PaymentCalculator: React.FC<PaymentCalculatorProps> = ({ property, onApply }) => {
  const downPaymentInputId = useId();
  const termSelectId = useId();
  const interestRateInputId = useId();

  const basePrice = property.pricing.financedPrice || property.pricing.cashPrice;
  const initialDown = property.pricing.downPayment || Math.round(basePrice * 0.1);
  const initialRate = property.pricing.interestRate || 9.9;
  const initialTerm = property.pricing.termMonths || 60;

  const [downPayment, setDownPayment] = useState<number>(initialDown);
  const [interestRate, setInterestRate] = useState<number>(initialRate);
  const [termMonths, setTermMonths] = useState<number>(initialTerm);

  // Calculate monthly principal & interest payment: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
  const loanAmount = Math.max(0, basePrice - downPayment);
  const monthlyRate = interestRate / 100 / 12;

  let monthlyPI = 0;
  if (loanAmount > 0 && monthlyRate > 0 && termMonths > 0) {
    monthlyPI =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
  } else if (termMonths > 0) {
    monthlyPI = loanAmount / termMonths;
  }

  // Estimated servicing & property tax escrow estimates for transparency
  const estimatedTaxEscrow = 35.0;
  const estimatedServicingFee = 18.0;
  const estimatedTotalMonthly = monthlyPI + estimatedTaxEscrow + estimatedServicingFee;

  return (
    <div className="bg-white rounded-lg border border-[#DECFA9] overflow-hidden shadow-xs">
      {/* Header */}
      <div className="bg-[#153023] text-[#FAF7F2] p-5 border-b border-[#224734]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <DollarSign className="w-5 h-5 text-[#DFC386]" />
            <h3 className="font-serif text-lg font-bold">Estimated Owner Financing Calculator</h3>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#204030] text-[#DFC386] border border-[#DFC386]/30">
            Richport Southern Terms
          </span>
        </div>
        <p className="text-xs text-stone-300 mt-1">
          Adjust terms below to estimate monthly payments for {property.title}.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Down Payment */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
              <label htmlFor={downPaymentInputId} className="flex items-center gap-1 cursor-pointer">
                <span>Down Payment ($)</span>
              </label>
              <span className="font-mono text-[#153023] font-bold">
                ${downPayment.toLocaleString()} ({((downPayment / basePrice) * 100).toFixed(0)}%)
              </span>
            </div>
            <input
              id={downPaymentInputId}
              type="range"
              min={Math.round(basePrice * 0.05)}
              max={Math.round(basePrice * 0.5)}
              step={250}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full accent-[#153023] h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-500 font-mono">
              <span>Min: ${(basePrice * 0.05).toLocaleString()}</span>
              <span>Max: ${(basePrice * 0.5).toLocaleString()}</span>
            </div>
          </div>

          {/* Loan Term */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
              <label htmlFor={termSelectId} className="flex items-center gap-1 cursor-pointer">
                <span>Financing Term</span>
              </label>
              <span className="font-mono text-[#153023] font-bold">
                {termMonths} Months ({(termMonths / 12).toFixed(1)} Yrs)
              </span>
            </div>
            <select
              id={termSelectId}
              value={termMonths}
              onChange={(e) => setTermMonths(Number(e.target.value))}
              className="w-full text-xs font-medium bg-[#FAF8F5] border border-[#C5A869]/50 rounded-md p-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#153023]"
            >
              <option value={36}>36 Months (3 Years) - Accelerated Payoff</option>
              <option value={60}>60 Months (5 Years) - Standard Richport Term</option>
              <option value={84}>84 Months (7 Years) - Extended</option>
              <option value={120}>120 Months (10 Years) - Maximum Term</option>
            </select>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
              <label htmlFor={interestRateInputId} className="flex items-center gap-1 cursor-pointer">
                <span>Estimated APR (%)</span>
              </label>
              <span className="font-mono text-[#153023] font-bold">{interestRate.toFixed(1)}%</span>
            </div>
            <input
              id={interestRateInputId}
              type="range"
              min={7.5}
              max={12.5}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#153023] h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-500 font-mono">
              <span>7.5%</span>
              <span>Fixed Rate</span>
              <span>12.5%</span>
            </div>
          </div>
        </div>

        {/* Calculation Summary Results Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-md bg-[#FAF7F2] border border-[#DECFA9]">
          <div>
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
              Estimated Principal &amp; Interest (P&amp;I)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif text-3xl font-bold text-[#153023]">
                ${monthlyPI.toFixed(2)}
              </span>
              <span className="text-xs text-stone-500">/ month</span>
            </div>
            <div className="mt-3 space-y-1 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Purchase Financed Price:</span>
                <span className="font-mono font-semibold">${basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Down Payment Deducted:</span>
                <span className="font-mono font-semibold">-${downPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-stone-300 pt-1">
                <span>Financed Loan Balance:</span>
                <span className="font-mono font-bold text-[#153023]">${loanAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Included vs Not Included Breakdown */}
          <div className="border-t md:border-t-0 md:border-l border-stone-300 pt-4 md:pt-0 md:pl-5 space-y-2.5">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
              Payment Breakdown Components
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-emerald-800">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Included in P&amp;I:
                </span>
                <span className="font-semibold">${monthlyPI.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400" /> Est. County Tax Escrow:
                </span>
                <span className="font-semibold">~${estimatedTaxEscrow.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400" /> Servicing Software Fee:
                </span>
                <span className="font-semibold">${estimatedServicingFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-300 font-bold text-[#153023]">
                <span>Est. Total Monthly Obligation:</span>
                <span className="font-serif text-sm">${estimatedTotalMonthly.toFixed(2)} /mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Scope Rule Disclaimer Box */}
        <div className="p-4 rounded-md bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-900 uppercase tracking-wide text-[11px]">
              Mandatory Calculator Disclosure &amp; Scope Rule
            </h4>
            <p className="leading-relaxed">
              This payment calculator provides a non-binding mathematical estimate for budgeting purposes only. Figures exclude hazard insurance, municipal assessments, closing escrow, and underwriting fees. 
              <strong> An online calculation is not a credit approval, loan commitment, or reservation of real property.</strong> Final interest rates, down payments, and repayment schedules are governed exclusively by the legally binding Promissory Note and Deed of Trust approved by Arkansas counsel.
            </p>
          </div>
        </div>

        {/* CTA to Apply */}
        {onApply && (
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-600">
              Ready to submit your owner financing application for this parcel?
            </div>
            <button
              onClick={() => onApply(property.id)}
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#153023] hover:bg-[#1E4331] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Begin Owner Financing Application</span>
              <ArrowRight className="w-4 h-4 text-[#DFC386]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
