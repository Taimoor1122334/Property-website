import React from 'react';
import { Logo } from '../components/Logo';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Users, 
  Landmark, 
  Scale,
  Compass
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Brand Hero */}
      <div className="bg-[#153023] text-white rounded-xl p-8 sm:p-12 border-b-4 border-[#C29F59] shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="shrink-0 p-4 bg-white/5 rounded-2xl border border-white/10">
          <Logo size="xl" inverted={true} />
        </div>
        <div className="space-y-3 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFC386]">
            Our Heritage &amp; Purpose
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Richport Southern, LLC
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl font-sans">
            Headquartered in Little Rock, Arkansas, Richport Southern is a dedicated real estate investment and property stewardship enterprise specializing in the acquisition, stabilization, and responsible revitalization of tax-sale real estate.
          </p>
        </div>
      </div>

      {/* Origin Story & Core Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed text-stone-700">
        <div className="bg-white rounded-xl border border-[#DECFA9] p-6 space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#153023] flex items-center gap-2">
            <Landmark className="w-5 h-5 text-[#967433]" />
            <span>Rooted in Arkansas Communities</span>
          </h3>
          <p>
            When properties fall behind on municipal and county taxes, they often sit neglected for years—draining county revenues, creating code compliance issues for neighborhoods, and depriving families of affordable homeownership opportunities.
          </p>
          <p>
            Richport Southern steps into that gap. By acquiring properties directly through statutory tax sales and post-auction state land offerings, we clear delinquent county back taxes, provide immediate community revitalization, and make home and land ownership attainable through direct owner financing.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#DECFA9] p-6 space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#153023] flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#967433]" />
            <span>Uncompromising Transparency</span>
          </h3>
          <p>
            Traditional tax-sale operators often sell land sight-unseen with hidden defects and evasive marketing. At Richport Southern, we do the opposite:
          </p>
          <ul className="space-y-1.5 list-disc list-inside text-stone-600">
            <li>We publish exact defect lists and condition assessments.</li>
            <li>We clearly state what is <em>not</em> known about a property.</li>
            <li>We require transparent legal disclosures before contract execution.</li>
            <li>We partner with licensed, third-party note servicers for transparent monthly accounting.</li>
          </ul>
        </div>
      </div>

      {/* Leadership & Stewards */}
      <div className="space-y-6">
        <div className="border-b border-[#DECFA9] pb-3">
          <h2 className="font-serif text-2xl font-bold text-[#153023]">
            Leadership &amp; Acquisition Management
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Experienced Arkansas real estate professionals dedicated to fair transactions and neighborhood enhancement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl border border-[#DECFA9] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF5ED] text-[#153023] border border-[#DFC386] flex items-center justify-center font-serif font-bold text-lg">
                SC
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#153023]">
                  Sam Carrasquillo
                </h4>
                <span className="text-xs text-stone-500 font-medium">
                  Managing Member &amp; Co-Founder
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Oversees strategic asset acquisitions across all 75 Arkansas counties, title verification pipelines, and customer financing operations. Committed to accessible housing pathways and ethical land stewardship.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#DECFA9] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF5ED] text-[#153023] border border-[#DFC386] flex items-center justify-center font-serif font-bold text-lg">
                BH
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#153023]">
                  Bryan Hosto
                </h4>
                <span className="text-xs text-stone-500 font-medium">
                  Managing Member &amp; Co-Founder
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Directs capital allocation, municipal compliance, and underwriting review. Bryan brings decades of deep Arkansas commercial and residential property expertise to ensure secure, compliant closings.
            </p>
          </div>
        </div>
      </div>

      {/* Company Contact Coordinates */}
      <div className="p-6 bg-[#FAF8F5] rounded-xl border border-[#DECFA9] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
        <div className="space-y-1 text-center sm:text-left">
          <span className="font-bold text-[#153023] block text-sm">
            Richport Southern, LLC
          </span>
          <span className="text-stone-600 block">
            Executive Center • 400 W Capitol Ave, Suite 1700 • Little Rock, AR 72201
          </span>
          <span className="text-stone-500 block font-mono text-[11px]">
            Arkansas Secretary of State Entity ID: 811456980
          </span>
        </div>
        <div className="flex gap-3">
          <a
            href="tel:5015002440"
            className="px-4 py-2 rounded-md bg-[#153023] text-white font-semibold text-xs hover:bg-[#1E4331]"
          >
            Call (501) 500-2440
          </a>
        </div>
      </div>
    </div>
  );
};
