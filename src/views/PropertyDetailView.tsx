import React, { useState, useEffect } from 'react';
import { Property, PropertyInquiry } from '../types';
import { PaymentCalculator } from '../components/PaymentCalculator';
import { InquiryModal } from '../components/InquiryModal';
import { ShareModal } from '../components/ShareModal';
import { trackRichportEvent } from '../utils/analytics';
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Share2, 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Download, 
  ExternalLink,
  HelpCircle,
  Clock,
  Compass,
  Building,
  Info,
  ChevronRight,
  Eye,
  Check,
  X,
  Map as MapIcon,
  Navigation
} from 'lucide-react';

interface PropertyDetailViewProps {
  property: Property;
  onBack: () => void;
  onApply: (propertyId: string) => void;
  onSelectProperty?: (id: string) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  onBack,
  onApply,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<'question' | 'viewing'>('question');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Synchronize document title and trigger analytics pageview
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${property.title} (${property.referenceNumber}) | Richport Southern, LLC`;
    trackRichportEvent('inquiry', {
      propertyId: property.id,
      propertyRef: property.referenceNumber,
      source: 'property_detail_view',
      county: property.location.county,
      price: property.pricing.cashPrice,
    });
    return () => {
      document.title = originalTitle;
    };
  }, [property]);

  // JSON-LD Structured Data Schema (RealEstateListing / Land / SingleFamilyResidence)
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': property.type === 'land' ? 'Land' : 'SingleFamilyResidence',
    name: `${property.title} (${property.referenceNumber})`,
    description: property.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.location.address,
      addressLocality: property.location.city,
      addressRegion: 'AR',
      postalCode: property.location.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.location.latitude,
      longitude: property.location.longitude,
    },
    offers: {
      '@type': 'Offer',
      price: property.pricing.cashPrice,
      priceCurrency: 'USD',
      priceValidUntil: '2026-12-31',
      availability: property.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    },
  };

  const activePhoto = property.media.gallery[selectedPhotoIndex] || {
    url: property.media.primaryPhoto,
    caption: property.title,
    date: '2024',
    label: 'Current Inspection',
  };

  const handleDownloadDoc = (docTitle: string) => {
    setDownloadToast(`Preparing ${docTitle} verification packet...`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 3000);
  };

  const isAvailable = property.status === 'available';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Search Engine Optimization: JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* Toast Notification */}
      {downloadToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#153023] text-white text-xs px-4 py-3 rounded-md shadow-xl border border-[#DFC386] flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-[#DFC386]" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E0D7C2] text-xs">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-stone-600 hover:text-[#153023] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Arkansas Properties</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShareModalOpen(true)}
            className="px-3 py-1.5 rounded-md border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-semibold flex items-center gap-1.5 shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-[#967433]" />
            <span>Share</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-md border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-semibold flex items-center gap-1.5 shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#967433]" />
            <span>Print Summary</span>
          </button>
        </div>
      </div>

      {/* Title & Overview Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-xs text-xs font-bold uppercase tracking-wider bg-[#153023] text-white">
              {property.county} County, AR
            </span>
            <span className="px-2 py-0.5 rounded-xs text-xs font-medium bg-[#F4EDE0] text-[#153023] border border-[#D5C29F]">
              {property.propertyType}
            </span>
            <span className="text-xs font-mono text-stone-500">
              Parcel: {property.parcelNumber}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#153023]">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-600">
            <MapPin className="w-4 h-4 text-[#C29F59] shrink-0" />
            <span>{property.streetAddress}, {property.city}, AR {property.zip}</span>
          </div>
        </div>

        {/* Pricing Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-lg border-2 border-[#C29F59] p-5 shadow-xs space-y-4">
          <div className="flex items-baseline justify-between border-b border-[#F0EAE1] pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 block">
                Cash Price
              </span>
              <span className="font-serif text-3xl font-bold text-[#153023]">
                ${property.pricing.cashPrice.toLocaleString()}
              </span>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#EAF2ED] text-[#153023]">
              Deed Direct
            </span>
          </div>

          {property.pricing.ownerFinanceAvailable ? (
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-[#153023] font-semibold">
                <span>Owner Financing Terms:</span>
                <span className="text-sm font-bold text-emerald-800">
                  ${property.pricing.estimatedMonthlyPI}/mo
                </span>
              </div>
              <div className="flex justify-between text-stone-500 text-[11px]">
                <span>Required Down Payment:</span>
                <span className="font-semibold text-stone-800">
                  ${property.pricing.downPayment?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-stone-500 text-[11px]">
                <span>Interest &amp; Term:</span>
                <span>{property.pricing.interestRate}% APR • {property.pricing.termMonths} Months</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-stone-500 italic">
              Cash sale only. No owner financing on this parcel.
            </div>
          )}

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 border-t border-[#F0EAE1]">
            {isAvailable && property.pricing.ownerFinanceAvailable && (
              <button
                onClick={() => {
                  trackRichportEvent('application_start', {
                    propertyId: property.id,
                    propertyRef: property.referenceNumber,
                    source: 'property_detail_cta'
                  });
                  onApply(property.id);
                }}
                className="w-full py-3 px-4 rounded-md bg-[#153023] hover:bg-[#1E4331] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Apply for Owner Financing</span>
                <ChevronRight className="w-4 h-4 text-[#DFC386]" />
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setInquiryType('viewing');
                  setInquiryModalOpen(true);
                }}
                className="py-2.5 px-3 rounded-md bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#C5A869]/70 text-[#153023] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-[#967433]" />
                <span>Request Viewing</span>
              </button>
              <button
                onClick={() => {
                  setInquiryType('question');
                  setInquiryModalOpen(true);
                }}
                className="py-2.5 px-3 rounded-md bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#C5A869]/70 text-[#153023] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#967433]" />
                <span>Ask Question</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery with Dates and Source Labels */}
      <div className="space-y-3">
        <div className="relative aspect-16/9 md:aspect-21/9 max-h-[500px] w-full rounded-xl overflow-hidden bg-stone-900 border border-[#DECFA9]">
          <img
            src={activePhoto.url}
            alt={activePhoto.caption}
            className="w-full h-full object-cover"
          />

          {/* Media Label & Date Watermark (Section 4 Compliance) */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-sm bg-[#153023]/90 backdrop-blur-xs text-white text-xs font-semibold uppercase tracking-wider border border-white/20">
              {activePhoto.label}
            </span>
            <span className="px-3 py-1 rounded-sm bg-black/70 backdrop-blur-xs text-stone-200 text-xs font-mono">
              Date: {activePhoto.date}
            </span>
          </div>

          {/* Caption banner */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white text-xs">
            <p className="max-w-2xl font-sans">{activePhoto.caption}</p>
          </div>
        </div>

        {/* Thumbnail Selector */}
        {property.media.gallery.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {property.media.gallery.map((photo, index) => (
              <button
                key={index}
                onClick={() => setSelectedPhotoIndex(index)}
                className={`relative w-24 h-16 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                  selectedPhotoIndex === index
                    ? 'border-[#153023] ring-2 ring-[#DFC386]'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Specifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Columns: Facts, Condition, Good Fit, Documents */}
        <div className="lg:col-span-8 space-y-10">
          {/* Key Facts Summary Table */}
          <div className="bg-white rounded-lg border border-[#DECFA9] p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#153023] flex items-center gap-2">
              <Building className="w-5 h-5 text-[#967433]" />
              <span>Physical Specifications &amp; Location Overview</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs border-t border-[#F2EDE2] pt-4">
              <div>
                <span className="text-stone-500 font-medium block">Land Area</span>
                <span className="font-bold text-[#153023] text-sm">{property.physical.acreage} Acres</span>
              </div>
              {property.physical.bedrooms && (
                <div>
                  <span className="text-stone-500 font-medium block">Bedrooms / Baths</span>
                  <span className="font-bold text-[#153023] text-sm">
                    {property.physical.bedrooms} Bed / {property.physical.bathrooms} Bath
                  </span>
                </div>
              )}
              {property.physical.sqft && (
                <div>
                  <span className="text-stone-500 font-medium block">Square Footage</span>
                  <span className="font-bold text-[#153023] text-sm">{property.physical.sqft.toLocaleString()} Sq Ft</span>
                </div>
              )}
              {property.physical.yearBuilt && (
                <div>
                  <span className="text-stone-500 font-medium block">Year Built</span>
                  <span className="font-bold text-[#153023] text-sm">{property.physical.yearBuilt}</span>
                </div>
              )}
              <div>
                <span className="text-stone-500 font-medium block">Zoning</span>
                <span className="font-bold text-[#153023] text-sm">{property.physical.zoning}</span>
              </div>
              <div>
                <span className="text-stone-500 font-medium block">FEMA Flood Zone</span>
                <span className="font-bold text-[#153023] text-sm">{property.physical.floodZone}</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-[#F2EDE2] text-xs">
              <div>
                <span className="font-semibold text-stone-700 block">Utilities &amp; Infrastructure:</span>
                <p className="text-stone-600 mt-0.5">{property.physical.utilities}</p>
              </div>
              <div>
                <span className="font-semibold text-stone-700 block">Road Access &amp; Frontage:</span>
                <p className="text-stone-600 mt-0.5">{property.physical.roadAccess}</p>
              </div>
              <div>
                <span className="font-semibold text-stone-700 block">Soil / Septic Status:</span>
                <p className="text-stone-600 mt-0.5">{property.physical.perkSoil}</p>
              </div>
              <div>
                <span className="font-semibold text-stone-700 block">Driving Directions:</span>
                <p className="text-stone-600 mt-0.5 font-mono text-[11px] bg-stone-50 p-2 rounded">
                  {property.location.directions}
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Interactive Parcel Cartography & Coordinates Map */}
          <div className="bg-white rounded-lg border border-[#DECFA9] p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2EDE2] pb-3">
              <div className="flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-[#967433]" />
                <h3 className="font-serif text-lg font-bold text-[#153023]">
                  Parcel Location &amp; Cartography
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500">Coordinates:</span>
                <span className="font-mono font-bold text-[#153023] bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                  {property.location.latitude.toFixed(4)}°N, {Math.abs(property.location.longitude).toFixed(4)}°W
                </span>
              </div>
            </div>

            {/* Embedded OpenStreetMap Preview */}
            <div className="relative w-full h-72 sm:h-80 rounded-md overflow-hidden border border-stone-300 bg-stone-100 shadow-inner">
              <iframe
                title={`Map of ${property.title}`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.location.longitude - 0.008}%2C${property.location.latitude - 0.006}%2C${property.location.longitude + 0.008}%2C${property.location.latitude + 0.006}&layer=mapnik&marker=${property.location.latitude}%2C${property.location.longitude}`}
                className="w-full h-full"
              />
              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-mono text-stone-700 shadow-xs border border-stone-200">
                Parcel: {property.legal.parcelNumber}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-xs text-stone-600 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#967433]" />
                <span>{property.location.address}, {property.location.city}, AR {property.location.zip}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={property.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#153023] border border-[#DECFA9] font-semibold text-xs inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#967433]" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={property.legal.gisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[#153023] hover:bg-[#1E4331] text-white font-semibold text-xs inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#DFC386]" />
                  <span>County Assessor GIS</span>
                </a>
              </div>
            </div>
          </div>

          {/* Section 4: Known Condition & What is NOT Known */}
          <div className="bg-white rounded-lg border-2 border-amber-300 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-900 font-bold font-serif text-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Known Condition &amp; Transparency Disclosures</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                Tier: {property.condition.repairLevel}
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              In adherence to our strict transparency policy, Richport Southern documents all known defects and code items observed during our acquisition walkthroughs.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-stone-800 block mb-1">
                  What Is Known (Observed Defects &amp; Maintenance Items):
                </span>
                <ul className="space-y-1.5">
                  {property.condition.knownDefects.map((defect, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-700">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{defect}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 4: What Is NOT Known Subsection */}
              <div className="pt-3 border-t border-amber-200 space-y-2">
                <span className="font-bold text-stone-800 block">
                  What Is NOT Known About This Property:
                </span>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  As a tax-sale acquisition principal, Richport Southern has not occupied this property and has not performed destructive testing or extensive civil engineering. The following aspects are expressly not known:
                </p>
                <ul className="space-y-1 text-stone-600 text-[11px] pl-2">
                  <li className="flex items-start gap-1.5">
                    <span className="text-stone-400 font-bold">•</span>
                    <span><strong>Subsurface Soil Perk &amp; Rock Depth:</strong> No certified environmental perc test or geotechnical soil boring has been performed.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-stone-400 font-bold">•</span>
                    <span><strong>Unmarked Boundary Pins:</strong> While county GIS lines are plotted, no formal certified boundary survey stakes have been verified by a licensed surveyor.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-stone-400 font-bold">•</span>
                    <span><strong>Concealed Plumbing &amp; Wiring:</strong> Systems behind closed wall surfaces or under slab foundations are uninspected and untested.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-stone-400 font-bold">•</span>
                    <span><strong>Unrecorded Easements or Past Permits:</strong> Predecessor occupant history and unrecorded prescriptive easements remain subject to buyer title search.</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-200">
                <div>
                  <span className="font-semibold text-stone-700 block">Debris / Site Cleanliness:</span>
                  <p className="text-stone-600 mt-0.5">{property.condition.debris}</p>
                </div>
                <div>
                  <span className="font-semibold text-stone-700 block">Municipal Code / Liens:</span>
                  <p className="text-stone-600 mt-0.5">{property.condition.codeIssues}</p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-900 text-[11px] space-y-1">
                <span className="font-bold block">Inspection Limitations &amp; As-Is Statement:</span>
                <p>{property.condition.inspectionLimitations}</p>
                <p className="font-semibold italic pt-1">{property.condition.asIsStatement}</p>
              </div>
            </div>
          </div>

          {/* Section 4: Good Fit and Watch Out */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAF8F5] rounded-lg border border-emerald-300 p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-serif font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>This Property is a Good Fit For:</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {property.fitAndWatchOut.goodFit.map((fit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{fit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FAF8F5] rounded-lg border border-rose-300 p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-serif font-bold text-base">
                <AlertTriangle className="w-5 h-5 text-rose-700" />
                <span>Watch Out / Not a Good Fit If:</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {property.fitAndWatchOut.watchOut.map((wo, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{wo}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 4: Available Documents */}
          <div className="bg-white rounded-lg border border-[#DECFA9] p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#153023] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#967433]" />
              <span>Available Title &amp; County Documents</span>
            </h3>
            <p className="text-xs text-stone-600">
              Download approved property records, assessor cards, and state tax sale deeds for your legal counsel's review.
            </p>

            <div className="divide-y divide-stone-200">
              {property.titleClosing.availableDocuments.map((doc) => (
                <div key={doc.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#C29F59]" />
                    <div>
                      <span className="font-semibold text-stone-800 block">{doc.title}</span>
                      <span className="text-[11px] text-stone-500 font-mono">
                        {doc.category} • Recorded: {doc.date} ({doc.fileSize})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadDoc(doc.title)}
                    className="px-3 py-1.5 rounded bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#153023] border border-[#DECFA9] font-medium text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#967433]" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Calculator Anchor */}
          {property.pricing.ownerFinanceAvailable && (
            <div id="calculator-section" className="scroll-mt-20">
              <PaymentCalculator
                property={property}
                onApply={onApply}
              />
            </div>
          )}

          {/* Buyer Responsibilities Checklist */}
          <div className="bg-white rounded-lg border border-[#DECFA9] p-6 space-y-3">
            <h3 className="font-serif text-base font-bold text-[#153023] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#967433]" />
              <span>Buyer Due Diligence Responsibilities</span>
            </h3>
            <ul className="space-y-2 text-xs text-stone-700">
              {property.buyerResponsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#C29F59] font-bold">✓</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right 4 Columns: Viewing Instructions, Title Details, FAQs */}
        <div className="lg:col-span-4 space-y-6">
          {/* Viewing Instructions Card */}
          <div className="bg-[#FAF8F5] rounded-lg border border-[#DECFA9] p-5 space-y-3">
            <h4 className="font-serif text-base font-bold text-[#153023] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#967433]" />
              <span>Viewing Instructions</span>
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Daylight Visits:</strong> You are welcome to drive by and walk vacant parcels during daylight hours. Please stay within property stakes and respect adjoining property lines.
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Structure Access:</strong> For properties with locked dwellings, contact Richport Southern for contractor lockbox clearance.
            </p>
            <button
              onClick={() => {
                setInquiryType('viewing');
                setInquiryModalOpen(true);
              }}
              className="w-full py-2.5 px-3 rounded bg-[#153023] hover:bg-[#1E4331] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Request Structure Viewing Pass
            </button>
          </div>

          {/* Title & Closing Method */}
          <div className="bg-white rounded-lg border border-[#DECFA9] p-5 space-y-3 text-xs">
            <h4 className="font-serif text-base font-bold text-[#153023] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#967433]" />
              <span>Title &amp; Closing Process</span>
            </h4>
            <div className="space-y-2 text-stone-700">
              <div>
                <span className="font-semibold text-stone-900 block">Title Status:</span>
                <p className="text-[11px] text-stone-600 mt-0.5">{property.titleClosing.titleStatus}</p>
              </div>
              <div>
                <span className="font-semibold text-stone-900 block">Conveyance Deed:</span>
                <p className="text-[11px] text-stone-600 mt-0.5">{property.titleClosing.closingMethod}</p>
              </div>
              <div>
                <span className="font-semibold text-stone-900 block">Closing Procedure:</span>
                <p className="text-[11px] text-stone-600 mt-0.5">{property.titleClosing.closingProcess}</p>
              </div>
            </div>
          </div>

          {/* Property Specific FAQs */}
          {property.faqs.length > 0 && (
            <div className="bg-white rounded-lg border border-[#DECFA9] p-5 space-y-3">
              <h4 className="font-serif text-base font-bold text-[#153023] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#967433]" />
                <span>Property Questions</span>
              </h4>
              <div className="space-y-3">
                {property.faqs.map((faq, i) => (
                  <div key={i} className="text-xs space-y-1">
                    <span className="font-semibold text-stone-900 block">{faq.question}</span>
                    <p className="text-stone-600 text-[11px]">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Statutory Real Estate Disclaimer Banner */}
      <div className="bg-[#FAF8F5] rounded-lg border border-[#DECFA9] p-6 text-xs text-stone-600 space-y-2">
        <div className="flex items-center gap-2 text-[#153023] font-serif font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-[#967433]" />
          <span>Statutory Disclaimer &amp; Arkansas Real Estate Transparency Notice</span>
        </div>
        <p className="leading-relaxed">
          <strong>Parcel Ref #{property.referenceNumber}:</strong> This parcel is offered for sale strictly in &quot;AS-IS, WHERE-IS&quot; condition, WITH ALL FAULTS AND LATENT DEFECTS, WITHOUT WARRANTY OF HABITABILITY OR SUITABILITY FOR ANY PURPOSE. Conveyance is made via {property.titleClosing.closingMethod.toLowerCase()} stemming from state tax delinquent sale procedures (Ark. Code Ann. § 26-37-101 et seq.). Richport Southern, LLC encourages all purchasers to obtain independent title examinations and survey verifications. Financing calculations shown are preliminary estimates; final terms are subject to formal underwriting and deed of trust execution.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-[11px] text-stone-500 border-t border-[#EAE3D2]">
          <span>Equal Housing Opportunity • Richport Southern, LLC (Principal Seller)</span>
          <span>Pulaski, Saline, Garland, Faulkner &amp; Jefferson Counties, Arkansas</span>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        property={property}
        initialType={inquiryType}
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        onSubmit={(inquiry) => {
          // Handled inside modal
        }}
      />

      {/* Share Modal */}
      <ShareModal
        property={property}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
};
