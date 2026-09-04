import React, { useState } from 'react';
import { Property } from '../types';
import { MapPin, ArrowRight, CheckCircle2, DollarSign, X } from 'lucide-react';

interface ArkansasMapProps {
  properties: Property[];
  selectedPropertyId?: string;
  onSelectProperty: (id: string) => void;
}

export const ArkansasMap: React.FC<ArkansasMapProps> = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
}) => {
  const [activePin, setActivePin] = useState<Property | null>(
    properties.find((p) => p.id === selectedPropertyId) || null
  );

  // Arkansas bounding box roughly:
  // Lat: 33.0 (South) to 36.5 (North)
  // Lng: -94.6 (West) to -89.6 (East)
  const minLat = 33.0;
  const maxLat = 36.5;
  const minLng = -94.62;
  const maxLng = -89.64;

  const projectToMap = (lat: number, lng: number) => {
    // Map viewbox is 800 x 600
    const x = ((lng - minLng) / (maxLng - minLng)) * 740 + 30;
    // Latitude is inverted (higher lat = higher up = smaller Y)
    const y = ((maxLat - lat) / (maxLat - minLat)) * 520 + 40;
    return { x, y };
  };

  return (
    <div className="relative w-full bg-[#162D20] rounded-lg border border-[#2B4E3A] overflow-hidden shadow-inner flex flex-col">
      {/* Map Control Bar */}
      <div className="bg-[#112419] px-4 py-3 border-b border-[#2B4E3A] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#E7D6B5] font-semibold">
          <MapPin className="w-4 h-4 text-[#DFC386]" />
          <span>Interactive Arkansas Property Inventory Map</span>
        </div>
        <div className="flex items-center gap-4 text-stone-300 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DFC386] inline-block border border-white" />
            Available Parcel
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block border border-white" />
            Under Contract
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-500 inline-block" />
            Closed
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full aspect-4/3 sm:aspect-16/9 max-h-[560px] overflow-hidden">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="ar-bg-glow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#214230" />
              <stop offset="100%" stopColor="#142B1E" />
            </radialGradient>
            <filter id="pin-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
            </filter>
          </defs>

          <rect width="800" height="600" fill="url(#ar-bg-glow)" />

          {/* Grid lines for cartographic feel */}
          <g stroke="#2D4D3A" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4">
            <line x1="100" y1="0" x2="100" y2="600" />
            <line x1="250" y1="0" x2="250" y2="600" />
            <line x1="400" y1="0" x2="400" y2="600" />
            <line x1="550" y1="0" x2="550" y2="600" />
            <line x1="700" y1="0" x2="700" y2="600" />
            <line x1="0" y1="120" x2="800" y2="120" />
            <line x1="0" y1="260" x2="800" y2="260" />
            <line x1="0" y1="400" x2="800" y2="400" />
            <line x1="0" y1="520" x2="800" y2="520" />
          </g>

          {/* Arkansas State Boundary Silhouette */}
          {/* Authentic stylized Arkansas perimeter: Northern straight border with Missouri bootheel notch, eastern Mississippi River meandering curves, southern straight border with Louisiana, western border with Oklahoma & Texas */}
          <path
            d="M 60,65 L 610,65 L 610,135 L 720,135 L 710,180 L 735,230 L 690,290 L 705,340 L 685,410 L 650,470 L 640,520 L 190,520 L 190,470 L 75,470 L 60,350 L 60,65 Z"
            fill="#1E3D2C"
            stroke="#C29F59"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Arkansas River waterway indicator */}
          <path
            d="M 60,200 Q 150,220 280,260 T 420,320 T 560,420 T 670,440"
            fill="none"
            stroke="#2E5A44"
            strokeWidth="3.5"
            strokeDasharray="8 4"
            opacity="0.6"
          />

          {/* Major Arkansas Regions Labels */}
          <text x="360" y="55" fill="#C29F59" fontSize="12" fontWeight="700" letterSpacing="0.15em" textAnchor="middle" opacity="0.7">
            MISSOURI
          </text>
          <text x="25" y="240" fill="#C29F59" fontSize="11" fontWeight="700" letterSpacing="0.15em" textAnchor="middle" opacity="0.6" transform="rotate(-90 25 240)">
            OKLAHOMA
          </text>
          <text x="400" y="550" fill="#C29F59" fontSize="11" fontWeight="700" letterSpacing="0.15em" textAnchor="middle" opacity="0.6">
            LOUISIANA
          </text>
          <text x="745" y="320" fill="#C29F59" fontSize="11" fontWeight="700" letterSpacing="0.15em" textAnchor="middle" opacity="0.6" transform="rotate(90 745 320)">
            MISSISSIPPI
          </text>

          {/* Major City Reference Markers */}
          <g fill="#A5C2B1" opacity="0.6" fontSize="10" fontFamily="sans-serif">
            {/* Little Rock (State Capital) */}
            <circle cx="420" cy="315" r="4.5" fill="#DFC386" stroke="#12241A" strokeWidth="1.5" />
            <text x="432" y="318" fontWeight="bold" fill="#F4EDE0" fontSize="11">Little Rock (Capital)</text>

            {/* Fort Smith */}
            <circle cx="110" cy="205" r="3" fill="#A5C2B1" />
            <text x="120" y="208">Fort Smith</text>

            {/* Fayetteville / NW Arkansas */}
            <circle cx="125" cy="115" r="3" fill="#A5C2B1" />
            <text x="135" y="118">Fayetteville</text>

            {/* Hot Springs */}
            <circle cx="340" cy="345" r="3" fill="#A5C2B1" />
            <text x="350" y="348">Hot Springs</text>

            {/* Jonesboro */}
            <circle cx="580" cy="170" r="3" fill="#A5C2B1" />
            <text x="590" y="173">Jonesboro</text>

            {/* Pine Bluff */}
            <circle cx="460" cy="380" r="3" fill="#A5C2B1" />
            <text x="470" y="383">Pine Bluff</text>
          </g>

          {/* Interactive Property Map Pins */}
          {properties.map((prop) => {
            const { x, y } = projectToMap(prop.location.lat, prop.location.lng);
            const isSelected = activePin?.id === prop.id;
            const isAvailable = prop.status === 'available';
            const isPending = prop.status === 'pending';

            const pinColor = isAvailable ? '#DFC386' : isPending ? '#F59E0B' : '#78716C';
            const ringColor = isSelected ? '#FFFFFF' : '#153023';

            return (
              <g
                key={prop.id}
                onClick={() => setActivePin(prop)}
                className="cursor-pointer transition-transform duration-200"
                style={{ transformOrigin: `${x}px ${y}px` }}
                filter="url(#pin-shadow)"
              >
                {/* Pulsing ring for selected pin */}
                {isSelected && (
                  <circle cx={x} cy={y - 12} r="22" fill="none" stroke="#DFC386" strokeWidth="2" opacity="0.6" className="animate-ping" />
                )}

                {/* Pin Stem and Head */}
                <path
                  d={`M ${x},${y} C ${x - 8},${y - 12} ${x - 14},${y - 24} ${x},${y - 28} C ${x + 14},${y - 24} ${x + 8},${y - 12} ${x},${y} Z`}
                  fill={pinColor}
                  stroke={ringColor}
                  strokeWidth="2"
                />
                
                {/* Pin Center White Dot */}
                <circle cx={x} cy={y - 18} r="4" fill="#153023" />

                {/* Pin Label Tag */}
                <rect
                  x={x - 42}
                  y={y - 44}
                  width="84"
                  height="16"
                  rx="3"
                  fill="#112419"
                  stroke={pinColor}
                  strokeWidth="1"
                  opacity="0.9"
                />
                <text
                  x={x}
                  y={y - 33}
                  fill="#FAF7F2"
                  fontSize="8.5"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  ${(prop.pricing.cashPrice / 1000).toFixed(0)}k • {prop.county}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Property Preview Overlay if a pin is clicked */}
        {activePin && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-white text-stone-900 rounded-lg p-4 shadow-xl border-2 border-[#C29F59] animate-in fade-in slide-in-from-bottom-2 duration-200 z-10">
            <button
              onClick={() => setActivePin(null)}
              className="absolute top-2 right-2 p-1 text-stone-400 hover:text-stone-700"
              aria-label="Close preview"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-3.5">
              <img
                src={activePin.media.primaryPhoto}
                alt={activePin.title}
                className="w-24 h-20 object-cover rounded-md shrink-0 bg-stone-100"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#153023] text-white">
                    {activePin.county} County
                  </span>
                  <span className="text-[11px] font-semibold text-stone-500">
                    {activePin.physical.acreage} Acres
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-[#153023] truncate mt-1">
                  {activePin.title}
                </h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-bold text-[#153023]">
                    ${activePin.pricing.cashPrice.toLocaleString()} Cash
                  </span>
                  {activePin.pricing.ownerFinanceAvailable && (
                    <span className="text-xs text-[#25523D] font-medium">
                      or ${activePin.pricing.estimatedMonthlyPI}/mo
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-stone-500 truncate">
                    {activePin.condition.repairLevel}
                  </span>
                  <button
                    onClick={() => onSelectProperty(activePin.id)}
                    className="text-xs font-bold text-[#153023] hover:text-[#C29F59] inline-flex items-center gap-1 hover:underline"
                  >
                    <span>View Property</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-[#112419] px-4 py-2 border-t border-[#2B4E3A] text-stone-400 text-[11px] flex items-center justify-between">
        <span>Click any pin to inspect parcel specifications &amp; financing terms.</span>
        <span className="font-mono text-stone-500">NAD83 Arkansas State Plane Coordinates</span>
      </div>
    </div>
  );
};
