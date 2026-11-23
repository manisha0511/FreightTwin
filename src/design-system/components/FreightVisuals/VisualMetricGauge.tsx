import React from 'react';
import { cn } from '../../utils/cn';

export interface VisualMetricGaugeProps {
  value: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  unit?: string;
  sublabel?: string;
  statusVariant?: 'default' | 'success' | 'warning' | 'danger' | 'cyan';
  className?: string;
}

const sizeConfig = {
  sm: { dimension: 64, strokeWidth: 5, fontSize: 'text-sm', labelSize: 'text-[9px]' },
  md: { dimension: 88, strokeWidth: 7, fontSize: 'text-lg', labelSize: 'text-[10px]' },
  lg: { dimension: 120, strokeWidth: 9, fontSize: 'text-2xl', labelSize: 'text-xs' },
};

const colorConfig = {
  default: { stroke: '#2563EB', track: '#E2E8F0', text: 'text-blue-600' },
  success: { stroke: '#059669', track: '#D1FAE5', text: 'text-emerald-600' },
  warning: { stroke: '#D97706', track: '#FEF3C7', text: 'text-amber-600' },
  danger: { stroke: '#DC2626', track: '#FEE2E2', text: 'text-red-600' },
  cyan: { stroke: '#06B6D4', track: '#CFFAFE', text: 'text-cyan-600' },
};

export const VisualMetricGauge: React.FC<VisualMetricGaugeProps> = ({
  value,
  size = 'md',
  label,
  unit = '%',
  sublabel,
  statusVariant = 'default',
  className,
}) => {
  const { dimension, strokeWidth, fontSize, labelSize } = sizeConfig[size];
  const colors = colorConfig[statusVariant];

  const radius = (dimension - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  return (
    <div className={cn('inline-flex flex-col items-center justify-center select-none', className)}>
      <div className="relative flex items-center justify-center" style={{ width: dimension, height: dimension }}>
        <svg width={dimension} height={dimension} className="-rotate-90 transform">
          {/* Background Track Circle */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke={colors.track}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active Value Arc */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline">
            <span className={cn('font-extrabold font-display tabular-nums tracking-tight text-text-primary', fontSize)}>
              {Math.round(clampedValue)}
            </span>
            {unit && <span className="text-[10px] font-bold text-text-muted ml-0.5">{unit}</span>}
          </div>
          {label && (
            <span className={cn('font-mono font-semibold uppercase text-text-muted -mt-0.5', labelSize)}>
              {label}
            </span>
          )}
        </div>
      </div>

      {sublabel && (
        <span className="text-[11px] font-medium text-text-secondary mt-1.5 text-center">
          {sublabel}
        </span>
      )}
    </div>
  );
};
