import React from 'react';

interface SiteLogoProps {
  variant?: 'header' | 'footer' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const SiteLogo: React.FC<SiteLogoProps> = ({
  variant = 'header',
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const iconSizeClass = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
  }[size];

  const titleSizeClass = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
  }[size];

  const taglineSizeClass = {
    sm: 'text-[8.5px]',
    md: 'text-[9.5px]',
    lg: 'text-[11px]',
  }[size];

  // Colors based on variant
  const isDark = variant === 'dark';
  const textColorPrimary = isDark ? 'text-white' : 'text-black';
  const textColorAccent = isDark ? 'text-[#FFE600]' : 'text-[#004a25]';
  const tagColor = isDark ? 'text-emerald-400' : 'text-black/85';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* High-Tech Cyber Gaming Vault Shield Emblem */}
      <div
        className={`${iconSizeClass} relative shrink-0 rounded-sm bg-[#01160c] p-1.5 flex items-center justify-center border-2 border-black shadow-[0_2px_10px_rgba(0,0,0,0.3)] group-hover:scale-105 group-hover:border-[#00e5ff] transition-all duration-300`}
      >
        {/* Animated Cyber Glow Backing */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFE600]/20 via-transparent to-[#00e5ff]/20 opacity-60 group-hover:opacity-100 transition-opacity rounded-xs pointer-events-none" />

        <svg
          viewBox="0 0 64 64"
          className="w-full h-full relative z-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE600" />
              <stop offset="60%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#00ff88" />
            </linearGradient>
            <linearGradient id="logoInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#011f10" />
              <stop offset="100%" stopColor="#000904" />
            </linearGradient>
          </defs>

          {/* Hex Shield Contour */}
          <polygon
            points="32,4 58,17 58,43 32,60 6,43 6,17"
            fill="url(#logoInnerGrad)"
            stroke="url(#logoShieldGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Inner Cyber Tactical Mesh */}
          <polygon
            points="32,10 52,20 52,40 32,53 12,40 12,20"
            fill="none"
            stroke="#00e5ff"
            strokeWidth="1.2"
            strokeOpacity="0.45"
            strokeDasharray="5 2.5"
          />

          {/* Bold "V" Vault Anchor */}
          <path
            d="M 18 20 L 32 48 L 46 20"
            stroke="#FFE600"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dynamic "G" Gaming Wing & Crosshair Chamber */}
          <path
            d="M 44 24 L 25 24 C 20 24 17 27 17 32 C 17 38 21 42 27 42 L 37 42 C 41 42 43 39 43 35 L 31 35"
            stroke="#00e5ff"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Center Esports Aim Diamond Core */}
          <polygon points="32,27 35,32 32,37 29,32" fill="#FFE600" />
          <circle cx="32" cy="32" r="1.5" fill="#011b0e" />

          {/* Precision Neon Corner Nodes */}
          <circle cx="32" cy="8" r="1.5" fill="#FFE600" />
          <circle cx="53.5" cy="19.5" r="1.5" fill="#00e5ff" />
          <circle cx="10.5" cy="19.5" r="1.5" fill="#00e5ff" />
          <circle cx="32" cy="55.5" r="1.5" fill="#00ff88" />
        </svg>
      </div>

      {/* Brand Wordmark & Tagline */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline leading-none">
          <span
            className={`${titleSizeClass} font-display font-black tracking-tighter ${textColorPrimary} uppercase group-hover:tracking-tight transition-all duration-300`}
          >
            game<span className={textColorAccent}>vaulte</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] ml-1 mb-0.5 group-hover:scale-125 transition-transform" />
        </div>

        {showTagline && (
          <p
            className={`hidden md:block ${taglineSizeClass} font-mono uppercase tracking-widest ${tagColor} font-bold mt-0.5`}
          >
            THE ULTIMATE GAMER'S PLAYBOOK
          </p>
        )}
      </div>
    </div>
  );
};
