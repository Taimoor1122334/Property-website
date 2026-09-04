import React, { useState } from 'react';
import { Property } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { Logo } from '../components/Logo';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  HeartHandshake, 
  CreditCard,
  Building,
  TreePine,
  DollarSign,
  Scale
} from 'lucide-react';

interface HomeViewProps {
  properties: Property[];
  onSelectProperty: (id: string) => void;
  onNavigate: (view: string, propertyId?: string, filters?: { county?: string; type?: string }) => void;
  onApply: (propertyId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  properties,
  onSelectProperty,
  onNavigate,
  onApply,
}) => {
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const featuredProperties = properties.filter((p) => p.featured && p.status === 'available');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('inventory', undefined, {
      county: selectedCounty,
      type: selectedType,
    });
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section with Southern Heritage Atmosphere */}
      <section className="relative bg-[#153023] text-white border-b-4 border-[#C29F59] z-20">
        {/* Background Subtle Texture & Gradient strictly clipped */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 opacity-15 bg-cover bg-center mix-blend-overlay"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#112419]/95 via-[#153023]/90 to-[#1D402F]/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#204432] border border-[#C29F59]/40 text-[#DFC386] text-xs font-semibold tracking-wider uppercase">
                <ShieldCheck className="w-4 h-4 text-[#DFC386]" />
                <span>Direct Arkansas Tax Sale Land &amp; Properties</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                A Clear Path Forward for Arkansas Homes &amp; Land
              </h1>

              <p className="text-base sm:text-lg text-stone-200 leading-relaxed font-sans max-w-2xl">
                We market Arkansas tax-sale real estate for straightforward cash sale or accessible owner financing. Straight facts, transparent as-is disclosures, and no sales pressure.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('inventory')}
                  id="btn-hero-browse-properties"
                  className="px-6 py-3.5 rounded-md bg-[#DFC386] hover:bg-[#D5B570] text-[#153023] font-bold text-sm tracking-wide transition-all shadow-md inline-flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Browse Available Properties</span>
                </button>

                <button
                  onClick={() => onNavigate('how-it-works')}
                  id="btn-hero-how-it-works"
                  className="px-6 py-3.5 rounded-md bg-[#224734] hover:bg-[#2C5942] text-white font-semibold text-sm border border-[#C29F59]/50 transition-all inline-flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#DFC386]" />
                  <span>How Owner Financing Works</span>
                </button>
              </div>

              {/* Three Pill Trust Anchors */}
              <div className="pt-6 border-t border-[#2A523C] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DFC386] shrink-0" />
                  <span>Direct Deedholders (No Brokers)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DFC386] shrink-0" />
                  <span>Simple Low Down Payment Terms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DFC386] shrink-0" />
                  <span>Full Known As-Is Disclosures</span>
                </div>
              </div>
            </div>

            {/* Right Emblem & Seal Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-[#112419]/80 rounded-2xl border-2 border-[#C29F59]/50 shadow-2xl backdrop-blur-xs text-center space-y-4">
              <Logo size="xl" variant="mark" />
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold tracking-wider text-white">
                  RICHPORT SOUTHERN
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#DFC386] font-semibold">
                  Arkansas Homes &amp; Land • Est. 2024
                </p>
              </div>
              <p className="text-xs text-stone-300 max-w-xs leading-relaxed font-sans pt-1">
                Committed to responsible land stewardship, clear title conveyance, and creating homeownership opportunities across the Natural State.
              </p>
              <div className="w-full pt-3 border-t border-[#234533] flex justify-around text-[11px] text-stone-300">
                <span>Pulaski • Saline • Garland</span>
                <span>•</span>
                <span>Faulkner • Sebastian</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Search Strip */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-10 sm:-mb-12 z-30">
          <form
            onSubmit={handleQuickSearch}
            className="relative z-30 bg-white rounded-xl p-5 sm:p-6 shadow-2xl border-2 border-[#C29F59] grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end text-stone-800"
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Arkansas County
              </label>
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#153023]"
              >
                <option value="all">All Arkansas Counties</option>
                <option value="Pulaski">Pulaski County (Little Rock)</option>
                <option value="Saline">Saline County (Benton)</option>
                <option value="Garland">Garland County (Hot Springs)</option>
                <option value="Sebastian">Sebastian County (Fort Smith)</option>
                <option value="Faulkner">Faulkner County (Conway)</option>
                <option value="Jefferson">Jefferson County (Pine Bluff)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#153023]"
              >
                <option value="all">All Property Types</option>
                <option value="Single Family Residence">Single Family Residence</option>
                <option value="Vacant Residential Land">Vacant Residential Land</option>
                <option value="Rural Acreage / Timber">Rural Acreage / Timber</option>
                <option value="Cabin / Recreational">Cabin / Recreational</option>
                <option value="Commercial / Mixed">Commercial / Mixed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Purchase Structure
              </label>
              <select className="w-full p-2.5 rounded-md border border-stone-300 bg-[#FAF8F5] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#153023]">
                <option value="all">Any (Cash or Owner Financing)</option>
                <option value="owner_finance">Owner Financing Available</option>
                <option value="cash_discount">Cash Discounted Purchases</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-md bg-[#153023] hover:bg-[#1E4331] text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
              >
                <Search className="w-4 h-4 text-[#DFC386]" />
                <span>Search Inventory</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#967433]">
              <TreePine className="w-4 h-4" />
              <span>Current Arkansas Portfolio</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153023] mt-1">
              Featured Properties &amp; Land
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              Inspect current representative tax-sale parcels available for direct purchase or owner financing.
            </p>
          </div>

          <button
            onClick={() => onNavigate('inventory')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#153023] hover:text-[#967433] transition-colors group"
          >
            <span>View All Available Inventory ({properties.length})</span>
            <ArrowRight className="w-4 h-4 text-[#C29F59] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
              onApply={onApply}
            />
          ))}
        </div>
      </section>

      {/* Cash Purchase vs. Owner Financing Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-xl border-2 border-[#E2D8C3] p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#967433]">
              Two Clear Paths to Ownership
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153023]">
              Choose the Transaction That Fits Your Goals
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Whether you are an investor seeking maximum cash savings or a buyer seeking low monthly payments without traditional bank obstacles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cash Purchase Path */}
            <div className="bg-white rounded-lg p-6 border border-[#E0D7C2] space-y-5 flex flex-col justify-between shadow-2xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#F4EDE0] text-[#153023] flex items-center justify-center font-bold font-serif">
                    <DollarSign className="w-5 h-5 text-[#967433]" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-sm bg-stone-100 text-stone-700">
                    Fastest Closing: 5–10 Days
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#153023]">
                  Direct Cash Purchase
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Ideal for contractors, investors, and land buyers with ready funds. Benefit from our lowest negotiated price and quick escrow turnaround.
                </p>
                <ul className="space-y-2 text-xs text-stone-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Maximum price discount from stated financed values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Closing through local Arkansas closing attorney / title escrow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Immediate deed recording in county records upon funding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>No ongoing interest charges or monthly servicing fees</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onNavigate('how-it-works')}
                className="w-full py-2.5 px-4 rounded-md border border-[#153023] text-[#153023] hover:bg-[#153023] hover:text-white font-semibold text-xs transition-colors text-center"
              >
                Learn About Cash Closings
              </button>
            </div>

            {/* Owner Financing Path */}
            <div className="bg-white rounded-lg p-6 border-2 border-[#C29F59] space-y-5 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#153023] text-[#DFC386] flex items-center justify-center font-bold font-serif">
                    <Building className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-sm bg-[#F4EDE0] text-[#153023]">
                    No Bank Hassle
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#153023]">
                  Richport Owner Financing
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We finance our properties directly. We evaluate overall income and repayment ability rather than requiring pristine bank credit scores.
                </p>
                <ul className="space-y-2 text-xs text-stone-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#153023] shrink-0 mt-0.5" />
                    <span>Modest down payments (typically 10% or as low as $1,500)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#153023] shrink-0 mt-0.5" />
                    <span>Flexible fixed terms from 3 to 10 years (36 to 120 months)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#153023] shrink-0 mt-0.5" />
                    <span>No prepayment penalties — pay off early at any time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#153023] shrink-0 mt-0.5" />
                    <span>Managed through licensed third-party loan servicing portal</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onNavigate('apply')}
                className="w-full py-2.5 px-4 rounded-md bg-[#153023] hover:bg-[#1E4331] text-white font-semibold text-xs transition-colors text-center shadow-xs"
              >
                Start Owner Financing Application
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Four-Step Transparent Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#967433]">
            How It Works
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153023]">
            Our Four-Step Acquisition Process
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            From your first parcel review to deed delivery, every stage is organized, transparent, and legally verified.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Browse & Review Facts',
              desc: 'Inspect GPS coordinates, county parcel IDs, known defect disclosures, and available plat maps online.',
            },
            {
              step: '02',
              title: 'Independent Due Diligence',
              desc: 'Walk vacant land during daylight hours or request structure access. Conduct independent utility and title checks.',
            },
            {
              step: '03',
              title: 'Apply or Make Cash Offer',
              desc: 'Submit your online buyer application for owner financing, or execute a straightforward cash purchase agreement.',
            },
            {
              step: '04',
              title: 'Closing & Deed Delivery',
              desc: 'Execute closing documents via attorney escrow or approved remote e-sign. Your deed is recorded with the county.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-lg bg-white border border-[#E0D7C2] relative flex flex-col justify-between"
            >
              <div>
                <span className="font-display text-2xl font-bold text-[#C29F59]">
                  {item.step}
                </span>
                <h3 className="font-serif text-base font-bold text-[#153023] mt-2">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Former Owners Compassionate Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF5ED] rounded-xl border-l-4 border-[#C29F59] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#967433]">
              <HeartHandshake className="w-4 h-4 text-[#C29F59]" />
              <span>Message for Former Property Owners</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#153023]">
              Did you or your family previously own a tax-sale property?
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              We understand tax delinquency can arise from complex estate, health, or financial hardships. If Richport Southern holds title to a parcel you have questions about, we offer a dedicated lookup and compassionate inquiry process to explain your situation respectfully.
            </p>
          </div>
          <button
            onClick={() => onNavigate('former-owners')}
            id="btn-home-former-owners"
            className="shrink-0 px-5 py-3 rounded-md bg-[#153023] hover:bg-[#1E4331] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-xs"
          >
            <span>Former Owner Inquiry Form</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#DFC386]" />
          </button>
        </div>
      </section>

      {/* Customer Servicing & Payment Strip */}
      <section className="bg-[#153023] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#DFC386]">
              <ShieldCheck className="w-4 h-4" />
              <span>Current Richport Southern Borrowers</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Manage Your Monthly Loan Account
            </h3>
            <p className="text-xs text-stone-300">
              Access one-time ACH payments, AutoPay setup, payment histories, and amortization statements through our authorized servicing system.
            </p>
          </div>
          <button
            onClick={() => onNavigate('payment-portal')}
            className="shrink-0 px-6 py-3.5 rounded-md bg-[#FAF7F2] text-[#153023] hover:bg-[#F3EAD8] font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-md"
          >
            <CreditCard className="w-4 h-4 text-[#967433]" />
            <span>Go to Make a Payment Portal</span>
          </button>
        </div>
      </section>
    </div>
  );
};
