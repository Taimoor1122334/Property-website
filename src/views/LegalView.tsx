import React, { useState, useEffect } from 'react';
import { ShieldCheck, Scale, FileText, Landmark, AlertTriangle, CheckCircle2, Eye, HelpCircle } from 'lucide-react';

export type LegalTabType = 
  | 'disclaimers' 
  | 'financing-disclosures'
  | 'electronic-communications'
  | 'accessibility'
  | 'privacy' 
  | 'terms' 
  | 'equal-housing';

interface LegalViewProps {
  initialTab?: LegalTabType;
}

export const LegalView: React.FC<LegalViewProps> = ({ initialTab = 'disclaimers' }) => {
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#DECFA9] p-6 sm:p-10 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#153023] text-[#DFC386] text-xs font-bold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          <span>Statutory Compliance &amp; Regulatory Disclosures</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#153023]">
          Legal Policies &amp; Consumer Protections
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl font-sans">
          Richport Southern, LLC operates under Arkansas statutory provisions, the Federal Fair Housing Act, Truth in Lending regulations, and the Electronic Signatures in Global and National Commerce Act.
        </p>

        {/* Legal Counsel Notice Bar */}
        <div className="p-3 bg-[#FAF5ED] rounded-md border border-[#E0D7C2] text-[11px] text-[#967433] flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-[#967433]" />
          <span>
            <strong>Notice Regarding Legal Language:</strong> The operational and statutory summaries below reflect current state laws and business practices. Formal contract terms and loan documents remain subject to final review and approval by licensed Arkansas legal counsel.
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#DECFA9] text-xs font-semibold overflow-x-auto gap-1">
        {[
          { id: 'disclaimers', label: 'Tax-Sale Disclaimers' },
          { id: 'financing-disclosures', label: 'Financing Disclosures' },
          { id: 'electronic-communications', label: 'Electronic Communications' },
          { id: 'accessibility', label: 'Accessibility' },
          { id: 'privacy', label: 'Privacy Policy' },
          { id: 'terms', label: 'Terms of Use' },
          { id: 'equal-housing', label: 'Equal Housing' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as LegalTabType)}
            className={`py-3 px-4 border-b-2 whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'border-[#153023] text-[#153023] font-bold bg-white rounded-t shadow-2xs'
                : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Panes */}
      <div className="bg-white rounded-xl border border-[#DECFA9] p-6 sm:p-8 text-xs leading-relaxed text-stone-700 space-y-6 shadow-xs">
        {/* Tab 1: Tax-Sale Disclaimers */}
        {activeTab === 'disclaimers' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="font-serif text-lg font-bold text-[#153023]">
              State &amp; County Tax-Sale Real Estate Disclaimers
            </h3>
            <p>
              <strong>Corporate Principal Status:</strong> Richport Southern, LLC is a private real estate investment company and deedholder of record. We are principals buying and selling for our own portfolio, not real estate brokers, fiduciaries, or legal counsel. We strongly advise all prospective purchasers to consult with an independent Arkansas real estate attorney or title professional before executing contracts.
            </p>
            <p>
              <strong>"As Is, Where Is" Sale Condition:</strong> All parcels and structures are offered strictly AS IS, WHERE IS, WITH ALL FAULTS. Richport Southern makes no representations, warranties, or guarantees, express or implied, regarding physical condition, zoning, access easements, boundary markers, building code compliance, soil perk capability, flood plain designation, or suitability for any particular purpose.
            </p>
            <p>
              <strong>Title Conveyance &amp; Quiet Title Proceedings:</strong> Conveyance is made via Limited Warranty Deed derived from tax sales conducted pursuant to Arkansas statutory code (A.C.A. § 26-37-101 et seq.). While Richport Southern confirms that county statutory redemption periods have lapsed, standard title insurance policies may require a statutory Quiet Title legal proceeding before issuance of marketable title policies.
            </p>
            <p>
              <strong>Notice to Former Owners:</strong> Under no circumstances does communication with Richport Southern, LLC, or use of this website, constitute a promise, guarantee, or obligation that any parcel can be redeemed, repurchased, or returned. All rights are governed strictly by recorded deeds and Arkansas statutory tax law.
            </p>
          </div>
        )}

        {/* Tab 2: Required Financing & TILA Advertising Disclosures */}
        {activeTab === 'financing-disclosures' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <h3 className="font-serif text-lg font-bold text-[#153023]">
                Owner Financing &amp; Truth in Lending Act (TILA) Disclosures
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                Subject to Counsel Approval
              </span>
            </div>
            <p>
              <strong>Nature of Financing Estimates:</strong> Payment calculations, down payment figures, interest rates, and loan durations displayed on this website or generated by our interactive payment calculator are informational estimates only. They do not constitute an extension of credit, loan approval, or a binding commitment to lend under federal Regulation Z (12 CFR Part 1026).
            </p>
            <p>
              <strong>Representative Loan Example:</strong> An example owner-financed purchase of $42,000 with a $3,500 down payment results in an initial financed principal amount of $38,500. At a fixed simple annual interest rate of 9.9% over a 7-year term (84 monthly payments), the monthly Principal and Interest (P&amp;I) payment would be approximately $636.50.
            </p>
            <p>
              <strong>Taxes, Insurance &amp; Servicing Fees:</strong> Monthly property tax prorations, required annual hazard insurance policies, and third-party loan servicing software fees (typically $15–$25 per month) are collected in addition to the monthly principal and interest payment. Richport Southern requires that the buyer maintain hazard insurance naming Richport Southern as loss payee until final note satisfaction.
            </p>
            <p>
              <strong>Zero Prepayment Penalties:</strong> All promissory notes and owner-financing agreements issued by Richport Southern, LLC contain a 100% zero-penalty prepayment guarantee. Borrowers may pay off the principal balance in whole or in part at any time with no penalty or additional fee.
            </p>
            <p>
              <strong>Underwriting Criteria:</strong> Financing is subject to satisfactory review of buyer income, employment or stable recurring revenue, debt obligations, down-payment verification, and property suitability. Decisions are made through manual review by Richport Southern's underwriting committee.
            </p>
          </div>
        )}

        {/* Tab 3: Electronic Communications & E-Sign Consent */}
        {activeTab === 'electronic-communications' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <h3 className="font-serif text-lg font-bold text-[#153023]">
                Electronic Communications &amp; E-Sign Consent Disclosure
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                E-SIGN Act Compliance
              </span>
            </div>
            <p>
              <strong>Consent to Electronic Records:</strong> By submitting an application, inquiry, or transaction request through Richport Southern, LLC, you consent to receive all notices, disclosures, promissory agreements, tax certifications, and closing communications electronically.
            </p>
            <p>
              <strong>Approved Third-Party E-Signature Provider:</strong> All remote contract executions are facilitated exclusively through an approved third-party electronic signature provider [Provider selection required by Richport Southern]. The third-party provider guarantees cryptographic document integrity, non-repudiation audit trails, time-stamped IP logs, and secure signer authentication. Richport Southern does not execute legally binding deeds or promissory contracts through unauthenticated web forms.
            </p>
            <p>
              <strong>Manual Review Exception Routing:</strong> Electronic signatures are restricted to straightforward individual buyers. The following transactions are strictly routed for manual attorney review and notarized paper execution:
            </p>
            <ul className="list-disc list-inside space-y-1 text-stone-600 pl-2">
              <li>Corporate, LLC, or formal entity purchasers</li>
              <li>Trusts and family estates</li>
              <li>Signers acting under Power of Attorney (POA)</li>
              <li>Discrepancies or mismatches between government identification and record deedholder name</li>
            </ul>
            <p>
              <strong>Hardware &amp; Software Requirements:</strong> To view and retain electronic disclosures, you must have access to a valid email account, a modern web browser supporting 256-bit encryption, and software capable of reading Portable Document Format (.pdf) files.
            </p>
            <p>
              <strong>Withdrawing Consent:</strong> You have the right to withdraw electronic communication consent at any time by notifying Richport Southern in writing. If you withdraw consent, closing documents will be delivered via U.S. Postal Service or executed in-person at our designated Little Rock closing attorney office.
            </p>
          </div>
        )}

        {/* Tab 4: Accessibility */}
        {activeTab === 'accessibility' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="font-serif text-lg font-bold text-[#153023]">
              Website Accessibility Statement (ADA &amp; WCAG 2.1 AA)
            </h3>
            <p>
              Richport Southern, LLC is committed to facilitating the accessibility and usability of its website for all people, including individuals with disabilities. We strive to adhere to the World Wide Web Consortium's Web Content Accessibility Guidelines 2.1 Level AA (WCAG 2.1 AA) and the Americans with Disabilities Act (ADA).
            </p>
            <div className="p-4 bg-[#FAF8F5] rounded-md border border-[#DECFA9] space-y-2">
              <span className="font-bold text-stone-800 block">Our Accessibility Standards Include:</span>
              <ul className="list-disc list-inside space-y-1 text-stone-600">
                <li>High contrast color palettes exceeding the 4.5:1 minimum ratio for standard text</li>
                <li>Comprehensive keyboard navigation with clearly visible focus rings</li>
                <li>Descriptive labels and ARIA attributes for screen reader compatibility</li>
                <li>Alternative text descriptions for property photographs and maps</li>
                <li>Predictable layout and semantic HTML landmarks across all views</li>
              </ul>
            </div>
            <p>
              <strong>Accessibility Feedback &amp; Assistance:</strong> If you experience any difficulty accessing any element of this website, or if you require property disclosures in an alternate format, please contact our team immediately:
            </p>
            <div className="p-3 bg-white border border-stone-200 rounded font-mono text-stone-800 space-y-1">
              <div>Phone: (501) 500-2440</div>
              <div>Email: accessibility@richportsouthern.com</div>
              <div>Mailing Address: 400 W Capitol Ave, Suite 1700, Little Rock, AR 72201</div>
            </div>
          </div>
        )}

        {/* Tab 5: Privacy */}
        {activeTab === 'privacy' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="font-serif text-lg font-bold text-[#153023]">
              Privacy &amp; Sensitive Information Protection Policy
            </h3>
            <p>
              <strong>Zero In-App Credential Storage:</strong> Richport Southern, LLC does not store borrower bank account routing numbers, debit card details, credit bureau credentials, or Social Security numbers on our public website server.
            </p>
            <p>
              <strong>Third-Party Note Servicing:</strong> Active loan servicing, recurring ACH electronic bank drafts, payment histories, and IRS 1098 interest statements are managed by our licensed, PCI-DSS compliant third-party loan servicing partner.
            </p>
            <p>
              <strong>Secure Application Data Handling:</strong> Driver’s license copies, entity formation documents, and income verification files submitted through our owner-financing application portal are encrypted during transit (TLS 1.3) and stored in secure offsite repositories. We strictly prohibit transmission of sensitive PII via unencrypted email attachments.
            </p>
            <p>
              <strong>No Sale of Personal Data:</strong> We will never sell, rent, or trade your contact information or application records to third-party marketing brokers or advertising networks.
            </p>
          </div>
        )}

        {/* Tab 6: Terms of Use */}
        {activeTab === 'terms' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="font-serif text-lg font-bold text-[#153023]">
              Website Terms of Use &amp; Electronic Signature Consent
            </h3>
            <p>
              By accessing and using this website, you agree to be bound by these Terms of Use and all applicable federal and Arkansas state laws.
            </p>
            <p>
              <strong>Non-Binding Inquiries &amp; Property Availability:</strong> Property listings, pricing calculations, estimated monthly payments, and parcel maps displayed on this website are provided for illustrative and estimation purposes only. Richport Southern reserves the right to adjust pricing, accept cash offers, or withdraw properties from the market at any time without notice prior to a fully executed purchase agreement.
            </p>
            <p>
              <strong>Intellectual Property:</strong> All site content, photographic media, vector cartography, architectural seals, and the Richport Southern monogram are protected by United States copyright and trademark laws.
            </p>
          </div>
        )}

        {/* Tab 7: Equal Housing */}
        {activeTab === 'equal-housing' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
              <Landmark className="w-8 h-8 text-[#153023]" />
              <h3 className="font-serif text-lg font-bold text-[#153023]">
                Equal Housing Opportunity Statement
              </h3>
            </div>
            <p>
              Richport Southern, LLC is fully committed to the letter and spirit of the United States Fair Housing Act, the Civil Rights Act, and the Equal Credit Opportunity Act.
            </p>
            <p>
              We conduct all business in strict compliance with federal and Arkansas fair housing laws. We do not discriminate against any applicant or buyer in terms, conditions, privileges of sale, or financing qualification on the basis of race, color, religion, sex, handicap / disability, familial status (presence of children under 18), national origin, or source of lawful income.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
