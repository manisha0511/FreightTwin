import React from 'react';
import { cn } from '../../utils/cn';

export type FreightTransportMode = 'road' | 'rail' | 'ocean' | 'air' | 'hub' | 'container';
export type VisualSize = 'sm' | 'md' | 'lg' | 'xl';

export interface FreightModeIconProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: FreightTransportMode;
  size?: VisualSize;
  interactive?: boolean;
  active?: boolean;
  label?: string;
  badge?: string;
}

const sizeConfig: Record<VisualSize, { wrapper: string; svg: string }> = {
  sm: { wrapper: 'w-8 h-8 rounded-lg p-1.5', svg: 'w-5 h-5' },
  md: { wrapper: 'w-11 h-11 rounded-xl p-2.5', svg: 'w-6 h-6' },
  lg: { wrapper: 'w-14 h-14 rounded-2xl p-3', svg: 'w-8 h-8' },
  xl: { wrapper: 'w-20 h-20 rounded-3xl p-4', svg: 'w-12 h-12' },
};

export const FreightModeIcon: React.FC<FreightModeIconProps> = ({
  mode,
  size = 'md',
  interactive = false,
  active = false,
  label,
  badge,
  className,
  ...props
}) => {
  const currentSize = sizeConfig[size];

  const renderIcon = () => {
    switch (mode) {
      case 'road':
        // Modern Class 8 Aerodynamic Heavy Haul Truck
        return (
          <svg viewBox="0 0 48 48" fill="none" className={cn(currentSize.svg, 'transition-transform duration-200')}>
            <rect x="4" y="10" width="24" height="22" rx="3" fill="#2563EB" fillOpacity="0.12" stroke="#2563EB" strokeWidth="2.5" />
            <path d="M4 18H28" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M28 16L38 18V32H28V16Z" fill="#2563EB" fillOpacity="0.2" stroke="#2563EB" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M30 20H37L37 25H30V20Z" fill="#2563EB" fillOpacity="0.35" />
            <circle cx="12" cy="34" r="4" fill="#0F172A" stroke="#2563EB" strokeWidth="2" />
            <circle cx="22" cy="34" r="4" fill="#0F172A" stroke="#2563EB" strokeWidth="2" />
            <circle cx="34" cy="34" r="4" fill="#0F172A" stroke="#2563EB" strokeWidth="2" />
            <line x1="38" y1="28" x2="43" y2="28" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'rail':
        // High-Capacity Intermodal Rail Locomotive & Stack
        return (
          <svg viewBox="0 0 48 48" fill="none" className={cn(currentSize.svg, 'transition-transform duration-200')}>
            <rect x="8" y="8" width="32" height="13" rx="2" fill="#06B6D4" fillOpacity="0.2" stroke="#06B6D4" strokeWidth="2" />
            <rect x="10" y="21" width="28" height="13" rx="2" fill="#2563EB" fillOpacity="0.25" stroke="#2563EB" strokeWidth="2" />
            <path d="M14 26H19" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
            <path d="M29 26H34" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
            <circle cx="14" cy="37" r="3.5" fill="#0F172A" stroke="#06B6D4" strokeWidth="2" />
            <circle cx="24" cy="37" r="3.5" fill="#0F172A" stroke="#06B6D4" strokeWidth="2" />
            <circle cx="34" cy="37" r="3.5" fill="#0F172A" stroke="#06B6D4" strokeWidth="2" />
            <line x1="4" y1="41" x2="44" y2="41" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'ocean':
        // Container Mega-Vessel / Maritime Carrier
        return (
          <svg viewBox="0 0 48 48" fill="none" className={cn(currentSize.svg, 'transition-transform duration-200')}>
            <path d="M6 31C14 31 16 33 24 33C32 33 34 31 42 31L44 37C36 38 32 40 24 40C16 40 12 38 4 37L6 31Z" fill="#2563EB" fillOpacity="0.2" stroke="#2563EB" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Containers Stack on Deck */}
            <rect x="10" y="16" width="7" height="6" rx="1" fill="#06B6D4" fillOpacity="0.4" stroke="#06B6D4" strokeWidth="1.5" />
            <rect x="19" y="16" width="7" height="6" rx="1" fill="#4F46E5" fillOpacity="0.4" stroke="#4F46E5" strokeWidth="1.5" />
            <rect x="28" y="16" width="7" height="6" rx="1" fill="#059669" fillOpacity="0.4" stroke="#059669" strokeWidth="1.5" />
            <rect x="14" y="9" width="7" height="6" rx="1" fill="#D97706" fillOpacity="0.4" stroke="#D97706" strokeWidth="1.5" />
            <rect x="23" y="9" width="7" height="6" rx="1" fill="#2563EB" fillOpacity="0.4" stroke="#2563EB" strokeWidth="1.5" />
            <line x1="38" y1="12" x2="38" y2="30" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="38" y1="16" x2="43" y2="16" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'air':
        // Wide-Body Cargo Jet
        return (
          <svg viewBox="0 0 48 48" fill="none" className={cn(currentSize.svg, 'transition-transform duration-200')}>
            <path d="M24 6L28 18H42L44 22L28 25V35L33 39V42L24 40L15 42V39L20 35V25L4 22L6 18H20L24 6Z" fill="#4F46E5" fillOpacity="0.2" stroke="#4F46E5" strokeWidth="2.2" strokeLinejoin="round" />
            <circle cx="24" cy="18" r="2.5" fill="#4F46E5" />
          </svg>
        );

      case 'hub':
        // Multi-Modal Terminal Warehouse & Crane
        return (
          <svg viewBox="0 0 48 48" fill="none" className={cn(currentSize.svg, 'transition-transform duration-200')}>
            <rect x="6" y="20" width="22" height="18" rx="2" fill="#2563EB" fillOpacity="0.15" stroke="#2563EB" strokeWidth="2" />
            <path d="M6 20L17 12L28 20" stroke="#2563EB" strokeWidth="2" strokeLinejoin="round" />
            <rect x="12" y="27" width="10" height="11" fill="#2563EB" fillOpacity="0.3" stroke="#2563EB" strokeWidth="1.5" />
            {/* Gantry Crane Tower */}
            <path d="M32 40V12H44" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="38" y1="12" x2="38" y2="24" stroke="#D97706" strokeWidth="1.8" strokeDasharray="2 2" />
            <rect x="35" y="24" width="6" height="5" rx="1" fill="#D97706" fillOpacity="0.5" stroke="#D97706" strokeWidth="1.5" />
          </svg>
        );

      case 'container':
        // Standard ISO Intermodal Container (TEU)
        return (
          <svg viewBox="0 0 48 48" fill="none" className={cn(currentSize.svg, 'transition-transform duration-200')}>
            <rect x="6" y="14" width="36" height="20" rx="3" fill="#2563EB" fillOpacity="0.15" stroke="#2563EB" strokeWidth="2.5" />
            {/* Corrugated Vertical Ribs */}
            <line x1="12" y1="14" x2="12" y2="34" stroke="#2563EB" strokeWidth="1.8" strokeOpacity="0.7" />
            <line x1="18" y1="14" x2="18" y2="34" stroke="#2563EB" strokeWidth="1.8" strokeOpacity="0.7" />
            <line x1="24" y1="14" x2="24" y2="34" stroke="#2563EB" strokeWidth="1.8" strokeOpacity="0.7" />
            <line x1="30" y1="14" x2="30" y2="34" stroke="#2563EB" strokeWidth="1.8" strokeOpacity="0.7" />
            <line x1="36" y1="14" x2="36" y2="34" stroke="#2563EB" strokeWidth="1.8" strokeOpacity="0.7" />
            <rect x="14" y="19" width="8" height="4" rx="1" fill="#0F172A" />
            <circle cx="9" cy="17" r="1.5" fill="#0F172A" />
            <circle cx="39" cy="17" r="1.5" fill="#0F172A" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn('inline-flex items-center gap-3', className)} {...props}>
      <div
        className={cn(
          'flex items-center justify-center transition-all duration-200',
          currentSize.wrapper,
          'bg-white border border-command-border shadow-premium-xs',
          interactive && 'hover:shadow-command-md hover:-translate-y-0.5 hover:border-slate-300 cursor-pointer',
          active && 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20'
        )}
      >
        {renderIcon()}
      </div>

      {(label || badge) && (
        <div className="flex flex-col text-left">
          {label && (
            <span className="text-xs font-bold text-text-primary font-display leading-tight">
              {label}
            </span>
          )}
          {badge && (
            <span className="text-[10px] uppercase font-mono font-semibold text-text-muted">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
