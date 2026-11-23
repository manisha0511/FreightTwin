import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface StatCardProps {
  title: string;
  value: React.ReactNode;
  unit?: string;
  changePercent?: number; // e.g., +4.2 or -1.8
  changePeriodLabel?: string; // e.g. "vs 24h"
  icon?: React.ReactNode;
  statusVariant?: 'default' | 'success' | 'warning' | 'danger' | 'cyan';
  sparkline?: React.ReactNode;
  className?: string;
  badgeText?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  changePercent,
  changePeriodLabel = 'vs 24h',
  icon,
  statusVariant = 'default',
  sparkline,
  className,
  badgeText,
}) => {
  const isPositive = typeof changePercent === 'number' && changePercent > 0;
  const isNegative = typeof changePercent === 'number' && changePercent < 0;
  const isNeutral = typeof changePercent === 'number' && changePercent === 0;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-white border border-command-border p-5 text-left',
        'hover:border-command-border-subtle transition-all duration-200 shadow-command-sm hover:shadow-command-md hover:-translate-y-0.5',
        statusVariant === 'cyan' && 'border-accent-secondary/30 ring-1 ring-accent-secondary/15',
        statusVariant === 'success' && 'border-emerald-200/60 ring-1 ring-emerald-500/10',
        statusVariant === 'warning' && 'border-amber-200/60 ring-1 ring-amber-500/10',
        statusVariant === 'danger' && 'border-red-200/60 ring-1 ring-red-500/10',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Top row: Label and Icon / Badge */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider font-display">
          {title}
        </span>
        <div className="flex items-center gap-1.5">
          {badgeText && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-full bg-slate-100 border border-slate-200/80 text-text-primary">
              {badgeText}
            </span>
          )}
          {icon && (
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-accent-primary group-hover:scale-105 transition-transform duration-200">
              {icon}
            </div>
          )}
        </div>
      </div>

      {/* Metric Value */}
      <div className="flex items-baseline gap-1.5 my-1">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary font-display tabular-nums">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-semibold text-text-muted">{unit}</span>
        )}
      </div>

      {/* Sparkline slot if provided */}
      {sparkline && <div className="my-2">{sparkline}</div>}

      {/* Bottom row: Trend Delta */}
      {typeof changePercent === 'number' && (
        <div className="flex items-center gap-2 mt-2.5 text-xs">
          <div
            className={cn(
              'inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-[11px] border',
              isPositive && 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
              isNegative && 'text-red-700 bg-red-50 border-red-200/60',
              isNeutral && 'text-slate-600 bg-slate-50 border-slate-200/60'
            )}
          >
            {isPositive && <TrendingUp className="w-3 h-3 stroke-[2.5]" />}
            {isNegative && <TrendingDown className="w-3 h-3 stroke-[2.5]" />}
            {isNeutral && <Minus className="w-3 h-3 stroke-[2.5]" />}
            <span>{isPositive ? `+${changePercent}%` : `${changePercent}%`}</span>
          </div>
          <span className="text-text-muted text-[11px] font-semibold">{changePeriodLabel}</span>
        </div>
      )}
    </div>
  );
};
