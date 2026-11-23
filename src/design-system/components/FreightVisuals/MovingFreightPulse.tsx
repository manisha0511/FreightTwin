import React from 'react';
import { cn } from '../../utils/cn';

export interface MovingFreightPulseProps {
  mode?: 'road' | 'rail' | 'ocean' | 'air';
  originName?: string;
  destName?: string;
  distanceKm?: number;
  durationHours?: number;
  statusLabel?: string;
  className?: string;
}

const modeColors = {
  road: { stroke: '#2563EB', glow: '#3B82F6', pulse: 'bg-blue-600' },
  rail: { stroke: '#06B6D4', glow: '#22D3EE', pulse: 'bg-cyan-500' },
  ocean: { stroke: '#059669', glow: '#10B981', pulse: 'bg-emerald-500' },
  air: { stroke: '#4F46E5', glow: '#6366F1', pulse: 'bg-indigo-600' },
};

export const MovingFreightPulse: React.FC<MovingFreightPulseProps> = ({
  mode = 'road',
  originName = 'Origin Terminal',
  destName = 'Destination Hub',
  distanceKm = 1240,
  durationHours = 18.5,
  statusLabel = 'ACTIVE CORRIDOR TRANSIT',
  className,
}) => {
  const colors = modeColors[mode] || modeColors.road;

  return (
    <div
      className={cn(
        'relative p-4 rounded-2xl bg-white border border-command-border shadow-premium-xs flex flex-col gap-3 select-none',
        className
      )}
    >
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-[10px] uppercase font-bold text-accent-primary tracking-wider flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary" />
          </span>
          {statusLabel}
        </span>
        <span className="font-mono text-[11px] font-semibold text-text-muted">
          {distanceKm} km · {durationHours}h est.
        </span>
      </div>

      {/* Corridor SVG Line with animated pulse */}
      <div className="relative py-2">
        <svg viewBox="0 0 320 28" className="w-full h-7 overflow-visible">
          <defs>
            <linearGradient id="corridorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.stroke} stopOpacity="0.4" />
              <stop offset="50%" stopColor={colors.stroke} stopOpacity="0.9" />
              <stop offset="100%" stopColor={colors.stroke} stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Background track line */}
          <line x1="16" y1="14" x2="304" y2="14" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />

          {/* Active Flow Line */}
          <line
            x1="16"
            y1="14"
            x2="304"
            y2="14"
            stroke="url(#corridorGradient)"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />

          {/* Origin Pin */}
          <circle cx="16" cy="14" r="5" fill="#FFFFFF" stroke={colors.stroke} strokeWidth="3" />

          {/* Destination Pin */}
          <circle cx="304" cy="14" r="5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
        </svg>

        {/* Animated Moving Freight Dot */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 pointer-events-none">
          <div
            className={cn(
              'w-3.5 h-3.5 rounded-full shadow-premium-sm border-2 border-white animate-pulse',
              colors.pulse
            )}
            style={{
              animation: 'movingFreightDot 3s ease-in-out infinite alternate',
            }}
          />
        </div>
      </div>

      {/* Nodes Footer */}
      <div className="flex items-center justify-between text-xs font-semibold text-text-primary">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-slate-400" />
          <span className="truncate max-w-[130px]">{originName}</span>
        </div>
        <div className="flex items-center gap-1.5 text-right">
          <span className="truncate max-w-[130px]">{destName}</span>
          <div className="w-2 h-2 rounded-full bg-accent-primary" />
        </div>
      </div>

      <style>{`
        @keyframes movingFreightDot {
          0% { transform: translateX(0%); }
          100% { transform: translateX(calc(100% - 14px)); }
        }
      `}</style>
    </div>
  );
};
