import React from 'react';

interface ForgeLogoProps {
  variant?: 'full' | 'icon' | 'horizontal';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  tagline?: string;
}

export const ForgeIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-8 h-8',
  color = 'currentColor',
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="FORGE Mark"
    >
      {/* Outer Hexagon with Precise Anvil & Hammer Construction */}
      {/* Upper Hexagon Outline */}
      <path
        d="M36 96V58L100 22L164 58V76"
        stroke={color}
        strokeWidth="13"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* Right lower Hexagon Outline */}
      <path
        d="M164 100V142L100 178L36 142V104"
        stroke={color}
        strokeWidth="13"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* Hammer Head */}
      <rect
        x="78"
        y="46"
        width="30"
        height="44"
        rx="4"
        fill={color}
      />
      {/* Hammer Center Pivot Accent */}
      <rect
        x="72"
        y="62"
        width="6"
        height="12"
        rx="1"
        fill={color}
      />

      {/* Hammer Handle extending to right border */}
      <path
        d="M108 68H164"
        stroke={color}
        strokeWidth="13"
        strokeLinecap="square"
      />

      {/* Anvil Top Plate */}
      <path
        d="M36 102H150"
        stroke={color}
        strokeWidth="13"
        strokeLinecap="square"
      />

      {/* Anvil Horn and Waist Structure */}
      <path
        d="M48 118C48 134 68 142 88 152L100 174L112 152C132 142 152 134 152 118"
        stroke={color}
        strokeWidth="13"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* Anvil Cut-In / Notch on left */}
      <path
        d="M42 120C60 120 74 136 82 148"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="square"
      />
    </svg>
  );
};

export const ForgeLogo: React.FC<ForgeLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  theme = 'light',
  className = '',
  tagline = 'PROFESSIONAL TOOLS',
}) => {
  // Color determination based on theme
  const brandColor =
    theme === 'dark' ? '#ffffff' : theme === 'light' ? '#0a2f5c' : 'currentColor';
  const textColor = theme === 'dark' ? 'text-white' : 'text-[#0a2f5c]';
  const subtextColor = theme === 'dark' ? 'text-slate-300' : 'text-[#0a2f5c]';

  // Size mapping
  const iconSizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24',
  };

  const titleSizes = {
    xs: 'text-sm font-black',
    sm: 'text-lg font-black',
    md: 'text-2xl font-black',
    lg: 'text-3xl font-black',
    xl: 'text-5xl font-black',
  };

  const subtextSizes = {
    xs: 'text-[7px] tracking-[0.2em] font-bold',
    sm: 'text-[8px] tracking-[0.22em] font-bold',
    md: 'text-[9px] tracking-[0.25em] font-bold',
    lg: 'text-[11px] tracking-[0.28em] font-bold',
    xl: 'text-sm tracking-[0.3em] font-bold',
  };

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <ForgeIcon className={iconSizes[size]} color={brandColor} />
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`inline-flex flex-col items-center text-center ${className}`}>
        <ForgeIcon className={iconSizes[size]} color={brandColor} />
        <div className={`mt-2.5 ${textColor} font-black tracking-tight ${titleSizes[size]} leading-none`}>
          FORGE
        </div>
        {tagline && (
          <div className={`mt-1.5 ${subtextColor} uppercase ${subtextSizes[size]}`}>
            {tagline}
          </div>
        )}
      </div>
    );
  }

  // Horizontal (Default)
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <ForgeIcon className={iconSizes[size]} color={brandColor} />
      <div className="flex flex-col text-left leading-tight">
        <span className={`${textColor} ${titleSizes[size]} tracking-tight leading-none`}>
          FORGE
        </span>
        {tagline && (
          <span className={`${subtextColor} uppercase ${subtextSizes[size]} mt-1`}>
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
};
