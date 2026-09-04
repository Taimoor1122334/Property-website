import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'mark' | 'horizontal';
  className?: string;
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'horizontal',
  className = '',
  inverted = false,
}) => {
  const sizeDimensions = {
    sm: { dimension: 44, fontSize: 'text-base' },
    md: { dimension: 58, fontSize: 'text-lg' },
    lg: { dimension: 84, fontSize: 'text-2xl' },
    xl: { dimension: 120, fontSize: 'text-3xl' },
  }[size];

  const dim = sizeDimensions.dimension;

  // The circular emblem SVG based faithfully on the official Richport Southern seal
  const Seal = (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-[1.02]"
      aria-label="Richport Southern, LLC Official Seal"
    >
      <defs>
        {/* Curved text paths for circular typography */}
        <path id="rs-text-path-top" d="M 24,120 A 96,96 0 1,1 216,120" fill="none" />
        <path id="rs-text-path-bottom" d="M 216,120 A 96,96 0 0,1 24,120" fill="none" />
        <linearGradient id="rs-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFC386" />
          <stop offset="50%" stopColor="#C29F59" />
          <stop offset="100%" stopColor="#9C7733" />
        </linearGradient>
        <linearGradient id="rs-green-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#244B38" />
          <stop offset="100%" stopColor="#153023" />
        </linearGradient>
      </defs>

      {/* Outer subtle shadow & bounding border */}
      <circle cx="120" cy="120" r="116" fill="#FAF7F2" stroke="url(#rs-gold-grad)" strokeWidth="3" />
      
      {/* Primary Forest Green Ring */}
      <circle cx="120" cy="120" r="112" fill="url(#rs-green-grad)" stroke="#C29F59" strokeWidth="2.5" />

      {/* Circular Brand Text - Top & Bottom */}
      <text fill="#FAF7F2" fontSize="13.2" fontWeight="700" letterSpacing="0.22em" fontFamily="Cinzel, Georgia, serif">
        <textPath href="#rs-text-path-top" startOffset="50%" textAnchor="middle">
          RICHPORT SOUTHERN, LLC
        </textPath>
      </text>

      <text fill="#FAF7F2" fontSize="11.8" fontWeight="700" letterSpacing="0.20em" fontFamily="Cinzel, Georgia, serif">
        <textPath href="#rs-text-path-bottom" startOffset="50%" textAnchor="middle">
          ARKANSAS HOMES &amp; LAND
        </textPath>
      </text>

      {/* Two Accent Gold Stars / Dots */}
      <circle cx="36" cy="120" r="3.2" fill="#DFC386" />
      <circle cx="204" cy="120" r="3.2" fill="#DFC386" />

      {/* Inner Cream Medallion */}
      <circle cx="120" cy="120" r="76" fill="#F8F4EC" stroke="#C29F59" strokeWidth="3" />
      <circle cx="120" cy="120" r="73" fill="none" stroke="#E6D3A7" strokeWidth="1" />

      {/* Rolling Hills & Furrows Graphic (Lower half of inner circle) */}
      <g clipPath="url(#rs-inner-clip)">
        <clipPath id="rs-inner-clip">
          <circle cx="120" cy="120" r="72" />
        </clipPath>

        {/* Distant Ridge */}
        <path d="M 40,145 Q 85,130 120,138 T 200,136 L 200,200 L 40,200 Z" fill="#D5C5A8" />
        
        {/* Pine Tree Silhouettes */}
        <path d="M 52,142 L 55,133 L 58,142 Z M 60,143 L 64,131 L 68,143 Z M 70,144 L 73,135 L 76,144 Z M 165,142 L 168,134 L 171,142 Z M 174,143 L 178,131 L 182,143 Z" fill="#204030" />

        {/* Cultivated Furrows / Hills */}
        <path d="M 44,152 Q 85,140 120,148 T 196,146 L 200,200 L 40,200 Z" fill="#3D5A46" />
        <path d="M 44,162 Q 95,152 120,158 T 196,158 L 200,200 L 40,200 Z" fill="#294634" />
        <path d="M 44,172 Q 100,164 120,168 T 196,170 L 200,200 L 40,200 Z" fill="#1B3325" />

        {/* Curved Furrow Contour Lines */}
        <path d="M 50,155 Q 80,185 105,195" stroke="#E8DAC2" strokeWidth="1.5" fill="none" opacity="0.65" />
        <path d="M 65,153 Q 95,183 114,195" stroke="#E8DAC2" strokeWidth="1.5" fill="none" opacity="0.65" />
        <path d="M 80,152 Q 105,178 120,195" stroke="#E8DAC2" strokeWidth="1.8" fill="none" opacity="0.8" />
        <path d="M 190,155 Q 160,185 135,195" stroke="#E8DAC2" strokeWidth="1.5" fill="none" opacity="0.65" />
        <path d="M 175,153 Q 145,183 126,195" stroke="#E8DAC2" strokeWidth="1.5" fill="none" opacity="0.65" />

        {/* Central Winding Pathway ("A Clear Path Forward") */}
        <path d="M 120,147 C 122,160 112,175 120,196 L 126,196 C 120,175 128,160 123,147 Z" fill="#F7F1E3" stroke="#C29F59" strokeWidth="0.8" />
      </g>

      {/* Monogram "RS" in Upper Center */}
      <g>
        {/* R */}
        <text
          x="100"
          y="114"
          textAnchor="middle"
          fontSize="46"
          fontWeight="700"
          fontFamily="Prata, Cinzel, Georgia, serif"
          fill="#1A3828"
          stroke="#FAF7F2"
          strokeWidth="1.2"
        >
          R
        </text>
        {/* S interlaced */}
        <text
          x="134"
          y="118"
          textAnchor="middle"
          fontSize="44"
          fontWeight="700"
          fontFamily="Prata, Cinzel, Georgia, serif"
          fill="#1A3828"
          stroke="#FAF7F2"
          strokeWidth="1.2"
        >
          S
        </text>
      </g>

      {/* EST. 2024 Flanking Ribbon */}
      <text x="80" y="98" textAnchor="middle" fontSize="8.5" fontWeight="600" letterSpacing="0.1em" fontFamily="Cinzel, serif" fill="#6B5935">
        EST.
      </text>
      <line x1="68" y1="91" x2="92" y2="91" stroke="#C29F59" strokeWidth="0.8" />
      <line x1="68" y1="104" x2="92" y2="104" stroke="#C29F59" strokeWidth="0.8" />

      <text x="160" y="98" textAnchor="middle" fontSize="8.5" fontWeight="600" letterSpacing="0.1em" fontFamily="Cinzel, serif" fill="#6B5935">
        2024
      </text>
      <line x1="148" y1="91" x2="172" y2="91" stroke="#C29F59" strokeWidth="0.8" />
      <line x1="148" y1="104" x2="172" y2="104" stroke="#C29F59" strokeWidth="0.8" />

      {/* Slogan Banner: "A CLEAR PATH FORWARD" */}
      <rect x="74" y="166" width="92" height="13" rx="2" fill="#FAF8F3" stroke="#C29F59" strokeWidth="0.8" opacity="0.95" />
      <text x="120" y="175" textAnchor="middle" fontSize="6" fontWeight="700" letterSpacing="0.14em" fontFamily="Cinzel, serif" fill="#204030">
        A CLEAR PATH FORWARD
      </text>

      {/* Arkansas State Outline Silhouette */}
      <path
        d="M 115,183 L 125,183 L 125,191 L 123,193 L 118,193 L 115,189 Z"
        fill="#C29F59"
        stroke="#9C7733"
        strokeWidth="0.5"
      />
    </svg>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{Seal}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3.5 group select-none ${className}`}>
      {Seal}
      <div className="flex flex-col">
        <span
          className={`font-display font-bold tracking-[0.08em] leading-tight transition-colors ${
            size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg sm:text-xl'
          } ${inverted ? 'text-[#FAF7F2]' : 'text-[#153023]'}`}
        >
          RICHPORT SOUTHERN
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`font-display font-medium tracking-[0.16em] uppercase text-[10px] sm:text-[11px] ${
              inverted ? 'text-[#DFC386]' : 'text-[#967433]'
            }`}
          >
            Arkansas Homes &amp; Land
          </span>
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${inverted ? 'bg-[#DFC386]' : 'bg-[#C29F59]/70'}`} />
          <span
            className={`text-[10px] uppercase tracking-wider font-sans font-medium ${
              inverted ? 'text-stone-300' : 'text-stone-500'
            }`}
          >
            Est. 2024
          </span>
        </div>
      </div>
    </div>
  );
};
