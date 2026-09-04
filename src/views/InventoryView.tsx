import React, { useState, useMemo, useId, useEffect } from 'react';
import { Property, PropertyType, PropertyStatus } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { ArkansasMap } from '../components/ArkansasMap';
import { 
  Filter, 
  Map, 
  List, 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw,
  CheckCircle2,
  DollarSign,
  Grid
} from 'lucide-react';

interface InventoryViewProps {
  properties: Property[];
  initialFilters?: { county?: string; type?: string } | null;
  onSelectProperty: (id: string) => void;
  onApply: (id: string) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  properties,
  initialFilters,
  onSelectProperty,
  onApply,
}) => {
  const searchInputId = useId();
  const countySelectId = useId();
  const typeSelectId = useId();
  const maxPriceInputId = useId();
  const sortSelectId = useId();

  const [viewMode, setViewMode] = useState<'list' | 'map' | 'both'>('both');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [financingOnly, setFinancingOnly] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync incoming search filters if navigated from homepage search
  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.county) setSelectedCounty(initialFilters.county);
      if (initialFilters.type) setSelectedType(initialFilters.type);
    }
  }, [initialFilters]);

  // Available counties derived from properties
  const counties = useMemo(() => {
    const set = new Set(properties.map((p) => p.county));
    return Array.from(set).sort();
  }, [properties]);

  // Filtered & Sorted properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // Search term
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(term);
          const matchCity = p.city.toLowerCase().includes(term);
          const matchCounty = p.county.toLowerCase().includes(term);
          const matchAddress = p.streetAddress.toLowerCase().includes(term);
          const matchParcel = p.parcelNumber.toLowerCase().includes(term);
          const matchRef = p.referenceNumber.toLowerCase().includes(term);
          if (!matchTitle && !matchCity && !matchCounty && !matchAddress && !matchParcel && !matchRef) {
            return false;
          }
        }

        // County
        if (selectedCounty !== 'all' && p.county !== selectedCounty) {
          return false;
        }

        // Property Type
        if (selectedType !== 'all' && p.propertyType !== selectedType) {
          return false;
        }

        // Owner Financing available
        if (financingOnly && !p.pricing.ownerFinanceAvailable) {
          return false;
        }

        // Status
        if (selectedStatus !== 'all' && p.status !== selectedStatus) {
          return false;
        }

        // Max price
        if (p.pricing.cashPrice > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.pricing.cashPrice - b.pricing.cashPrice;
        }
        if (sortBy === 'price-asc') return a.pricing.cashPrice - b.pricing.cashPrice;
        if (sortBy === 'price-desc') return b.pricing.cashPrice - a.pricing.cashPrice;
        return a.id.localeCompare(b.id);
      });
  }, [properties, searchTerm, selectedCounty, selectedType, financingOnly, selectedStatus, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCounty('all');
    setSelectedType('all');
    setFinancingOnly(false);
    setSelectedStatus('all');
    setMaxPrice(100000);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#E0D7C2] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#967433]">
            Arkansas Property Portfolio
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#153023] mt-1">
            Available Tax-Sale Properties &amp; Land
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Browse verified Arkansas properties acquired directly through state and county tax sales. Filter by terms, county, or inspect on the Arkansas state map.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-[#EBE4D5] rounded-md border border-[#D5C7B0] self-stretch sm:self-auto justify-center">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
              viewMode === 'list'
                ? 'bg-[#153023] text-white shadow-2xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List Only</span>
          </button>
          <button
            onClick={() => setViewMode('both')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
              viewMode === 'both'
                ? 'bg-[#153023] text-white shadow-2xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Map &amp; Grid</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
              viewMode === 'map'
                ? 'bg-[#153023] text-white shadow-2xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>State Map</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-lg border border-[#E0D7C2] p-4 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
          {/* Keyword Search */}
          <div className="relative">
            <label htmlFor={searchInputId} className="sr-only">Search by city, county, street, or parcel ID</label>
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              id={searchInputId}
              type="text"
              placeholder="City, county, street, parcel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-md border border-stone-300 bg-[#FAF8F5] text-xs focus:outline-none focus:ring-2 focus:ring-[#153023]"
            />
          </div>

          {/* County Selector */}
          <div>
            <label htmlFor={countySelectId} className="sr-only">Filter by county</label>
            <select
              id={countySelectId}
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="w-full p-2 rounded-md border border-stone-300 bg-[#FAF8F5] text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#153023]"
            >
              <option value="all">All Counties</option>
              {counties.map((c) => (
                <option key={c} value={c}>
                  {c} County
                </option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label htmlFor={typeSelectId} className="sr-only">Filter by property type</label>
            <select
              id={typeSelectId}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 rounded-md border border-stone-300 bg-[#FAF8F5] text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#153023]"
            >
              <option value="all">All Property Types</option>
              <option value="Single Family Residence">Single Family Residence</option>
              <option value="Vacant Residential Land">Vacant Residential Land</option>
              <option value="Rural Acreage / Timber">Rural Acreage / Timber</option>
              <option value="Cabin / Recreational">Cabin / Recreational</option>
              <option value="Commercial / Mixed">Commercial / Mixed</option>
            </select>
          </div>

          {/* Max Price Range */}
          <div>
            <label htmlFor={maxPriceInputId} className="sr-only">Filter by maximum cash price</label>
            <div className="flex items-center justify-between text-[11px] font-semibold text-stone-600 mb-0.5">
              <span>Max Cash Price:</span>
              <span className="font-mono text-[#153023]">${maxPrice.toLocaleString()}</span>
            </div>
            <input
              id={maxPriceInputId}
              type="range"
              min={10000}
              max={100000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#153023] h-1.5 bg-stone-200 rounded cursor-pointer"
            />
          </div>

          {/* Sort By */}
          <div>
            <label htmlFor={sortSelectId} className="sr-only">Sort properties</label>
            <select
              id={sortSelectId}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2 rounded-md border border-stone-300 bg-[#FAF8F5] text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#153023]"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Listings</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Row */}
        <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 font-medium text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={financingOnly}
                onChange={(e) => setFinancingOnly(e.target.checked)}
                className="accent-[#153023] rounded-sm"
              />
              <span>Owner Financing Offered Only</span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-stone-500">Status:</span>
              <div className="flex gap-1">
                {(['all', 'available', 'pending', 'sold'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStatus(s)}
                    className={`px-2 py-0.5 rounded text-[11px] capitalize font-medium ${
                      selectedStatus === s
                        ? 'bg-[#153023] text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500 font-semibold">
              Showing {filteredProperties.length} of {properties.length} properties
            </span>
            <button
              onClick={resetFilters}
              className="text-stone-500 hover:text-[#153023] text-xs flex items-center gap-1 hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Map Section (if in Map or Both mode) */}
      {(viewMode === 'map' || viewMode === 'both') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#153023]">
              Geographic Map View (Arkansas Counties)
            </h3>
            <span className="text-xs text-stone-500">
              Pins reflect geocoded coordinates from county parcel records
            </span>
          </div>
          <ArkansasMap
            properties={filteredProperties}
            onSelectProperty={onSelectProperty}
          />
        </div>
      )}

      {/* Property Cards Grid (if in List or Both mode) */}
      {(viewMode === 'list' || viewMode === 'both') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#153023]">
              Property Listings
            </h3>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-lg border border-[#DECFA9] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF5ED] text-[#967433] mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#153023]">
                No matching properties found
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Try widening your price range or clearing county filters to view more Arkansas tax-sale parcels.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-md bg-[#153023] text-white text-xs font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={onSelectProperty}
                  onApply={onApply}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
