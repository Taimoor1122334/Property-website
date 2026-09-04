import React from 'react';
import { Property } from '../types';
import { MapPin, DollarSign, Calendar, Compass, ArrowRight, ShieldAlert, CheckCircle2, Home } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (id: string) => void;
  onApply?: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect, onApply }) => {
  const isAvailable = property.status === 'available';
  const isPending = property.status === 'pending';
  const isSold = property.status === 'sold';

  return (
    <article
      id={`post-${property.id}`}
      className="post type-property status-publish hentry property-card group bg-white rounded-lg border border-[#E5DEC9] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col"
    >
      {/* Property Image & Status Badges */}
      <div className="relative aspect-16/10 overflow-hidden bg-stone-200">
        <img
          src={property.media.primaryPhoto}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {isAvailable && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-[#1B3B2B] text-[#FAF7F2] shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#DFC386]" />
              Available
            </span>
          )}
          {isPending && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-amber-700 text-white shadow-sm">
              <Calendar className="w-3.5 h-3.5" />
              Under Contract
            </span>
          )}
          {isSold && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-stone-700 text-stone-200 shadow-sm">
              Closed / Sold
            </span>
          )}

          {property.featured && isAvailable && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-[#DFC386] text-[#153023] shadow-xs">
              Featured
            </span>
          )}
        </div>

        {/* Property Type Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-block px-2.5 py-0.5 rounded-sm text-xs font-medium bg-[#153023]/85 backdrop-blur-xs text-stone-100 border border-white/10">
            {property.propertyType}
          </span>
        </div>

        {/* Reference ID */}
        <div className="absolute bottom-3 right-3 text-[10px] font-mono font-medium px-2 py-0.5 rounded-sm bg-black/60 text-stone-300">
          {property.referenceNumber}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Location details */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B6B2B] uppercase tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-[#C29F59] shrink-0" />
            <span>
              {property.city}, {property.county} County, AR
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(property.id)}
            className="font-serif text-lg text-[#153023] font-bold leading-snug hover:text-[#967433] cursor-pointer transition-colors line-clamp-2"
          >
            {property.title}
          </h3>

          {/* Street Address */}
          <p className="text-xs text-stone-500 font-sans truncate">
            {property.streetAddress}
          </p>

          {/* Quick Specifications */}
          <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-700 border-t border-[#F0EAE1]">
            <span className="font-semibold text-[#153023]">
              {property.physical.acreage} Acres
            </span>
            {property.physical.bedrooms ? (
              <>
                <span>•</span>
                <span>{property.physical.bedrooms} Bed / {property.physical.bathrooms} Bath</span>
              </>
            ) : null}
            {property.physical.sqft ? (
              <>
                <span>•</span>
                <span>{property.physical.sqft.toLocaleString()} Sq Ft</span>
              </>
            ) : null}
            <span>•</span>
            <span className="text-stone-500">{property.condition.repairLevel}</span>
          </div>
        </div>

        {/* Pricing Box - Section 4 Specs */}
        <div className="p-3.5 rounded-md bg-[#FAF7F2] border border-[#EBE3D3] space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
              Cash Price
            </span>
            <span className="text-xl font-bold font-serif text-[#153023]">
              ${property.pricing.cashPrice.toLocaleString()}
            </span>
          </div>

          {/* Owner Financing Terms if offered */}
          {property.pricing.ownerFinanceAvailable ? (
            <div className="pt-2 border-t border-[#EAE1D0] flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-[#1F4A34] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#306B50]" />
                <span>Owner Financing:</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#153023]">
                  ${property.pricing.estimatedMonthlyPI}/mo
                </span>
                <span className="text-stone-500 text-[11px] block">
                  (${property.pricing.downPayment?.toLocaleString()} down)
                </span>
              </div>
            </div>
          ) : (
            <div className="pt-1.5 border-t border-[#EAE1D0] text-[11px] text-stone-500 italic">
              Cash Purchase or Conventional Wire only
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-1 flex items-center gap-2">
          <button
            onClick={() => onSelect(property.id)}
            id={`btn-view-property-${property.id}`}
            className="flex-1 py-2.5 px-3 rounded-sm bg-[#153023] hover:bg-[#1E4331] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <span>View Property Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#DFC386]" />
          </button>
          
          {isAvailable && property.pricing.ownerFinanceAvailable && onApply && (
            <button
              onClick={() => onApply(property.id)}
              className="py-2.5 px-3 rounded-sm bg-[#F4EDE0] hover:bg-[#EBDDC5] text-[#153023] text-xs font-semibold transition-colors border border-[#D5C29F]"
              title="Apply for owner financing on this parcel"
            >
              Apply
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
