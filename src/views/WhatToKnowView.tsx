import React from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Scale, 
  Wrench, 
  FileSearch, 
  Building, 
  Flame, 
  Compass, 
  HelpCircle,
  Home
} from 'lucide-react';

export const WhatToKnowView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title Header */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#DECFA9] p-6 sm:p-10 shadow-xs space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#967433]">
          Buyer Due Diligence Guide
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#153023]">
          What You Need to Know About Arkansas Tax-Sale Properties
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl font-sans">
          We believe an educated buyer is a satisfied owner. Real estate purchased through tax-sale mechanisms requires careful due diligence. Read our plain-language guide on what to expect.
        </p>
      </div>

      {/* Guide Topics Grid */}
      <div className="space-y-6 text-xs">
        {/* Topic 1: The "As Is, Where Is" Standard */}
        <div className="bg-white rounded-xl border border-[#DECFA9] p-6 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5 text-[#153023] font-serif text-lg font-bold">
            <Wrench className="w-5 h-5 text-[#967433]" />
            <span>1. Strict "As-Is, Where-Is" Standard</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            All properties sold by Richport Southern, LLC are conveyed strictly <strong>AS IS, WHERE IS, WITH ALL FAULTS</strong>. We do not warranty roof conditions, foundations, HVAC, plumbing, or electrical systems. We document every defect we know about, but you must conduct your own inspections to confirm repair estimates before signing contracts.
          </p>
        </div>

        {/* Topic 2: Title Status & Quiet Title Mechanics */}
        <div className="bg-white rounded-xl border border-[#DECFA9] p-6 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5 text-[#153023] font-serif text-lg font-bold">
            <Scale className="w-5 h-5 text-[#967433]" />
            <span>2. Understanding Arkansas Tax Titles &amp; Deeds</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            Properties are conveyed via Limited Warranty Deed based on statutory deeds issued by the Arkansas Commissioner of State Lands (COSL). In Arkansas, tax titles carry statutory redemption periods. While we verify that statutory redemption windows have expired, conventional title insurance underwriters may require an action to <em>Quiet Title</em> before issuing standard policy coverage. Buyers wishing to build or refinance later can engage a local Arkansas real estate attorney to file a Quiet Title petition.
          </p>
        </div>

        {/* Topic 3: Physical Inspections & Daylight Walking */}
        <div className="bg-white rounded-xl border border-[#DECFA9] p-6 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5 text-[#153023] font-serif text-lg font-bold">
            <FileSearch className="w-5 h-5 text-[#967433]" />
            <span>3. Physical Due Diligence Checklist</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-1">
              <strong className="text-stone-800 block">Boundary &amp; Staked Survey:</strong>
              <p className="text-stone-600 text-[11px]">
                County GIS mapping boundaries are for tax assessment estimates only. We advise hiring a licensed Arkansas surveyor if you intend to erect fencing or build near boundaries.
              </p>
            </div>
            <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-1">
              <strong className="text-stone-800 block">Soil &amp; Perk Tests:</strong>
              <p className="text-stone-600 text-[11px]">
                For rural vacant acreage without public sewer, an official soil test by an Arkansas Department of Health certified soil scientist is required prior to septic permit issuance.
              </p>
            </div>
          </div>
        </div>

        {/* Topic 4: Utilities, Codes, and Municipal Liens */}
        <div className="bg-white rounded-xl border border-[#DECFA9] p-6 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5 text-[#153023] font-serif text-lg font-bold">
            <Flame className="w-5 h-5 text-[#967433]" />
            <span>4. Utilities, Municipal Codes, and Liens</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            Utility connections (Entergy, First Electric Co-op, municipal water, CenterPoint Gas) must be verified directly by the buyer. In residential municipalities like Little Rock or Fort Smith, past grass liens or board-up assessments are researched prior to closing, but buyers should always review municipal records to confirm clean building standing.
          </p>
        </div>

        {/* Topic 5: Financing Costs, Escrows, and Insurance */}
        <div className="bg-white rounded-xl border border-[#DECFA9] p-6 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2.5 text-[#153023] font-serif text-lg font-bold">
            <ShieldCheck className="w-5 h-5 text-[#967433]" />
            <span>5. Ongoing Financing Responsibilities</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            When entering an owner-financing note with Richport Southern:
          </p>
          <ul className="space-y-1.5 list-disc list-inside text-stone-600 pt-1">
            <li>You must maintain hazard/fire insurance naming Richport Southern as loss payee.</li>
            <li>County real estate taxes are collected monthly via escrow and paid annually to the county collector.</li>
            <li>A modest loan servicing fee ($18/mo) is billed to maintain ACH transfers and 1098 interest statements.</li>
            <li>You may pay off your loan balance early at any time without prepayment penalty.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
