import React from 'react';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'cyan';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  hasPulseDot?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, { container: string; dot: string; pulse: string }> = {
  success: {
    container: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    dot: 'bg-emerald-500',
    pulse: 'bg-emerald-400',
  },
  warning: {
    container: 'bg-amber-50 text-amber-800 border-amber-200/80',
    dot: 'bg-amber-500',
    pulse: 'bg-amber-400',
  },
  danger: {
    container: 'bg-red-50 text-red-700 border-red-200/80',
    dot: 'bg-red-500',
    pulse: 'bg-red-400',
  },
  info: {
    container: 'bg-blue-50 text-blue-700 border-blue-200/80',
    dot: 'bg-blue-500',
    pulse: 'bg-blue-400',
  },
  neutral: {
    container: 'bg-slate-100 text-slate-700 border-slate-200/90',
    dot: 'bg-slate-400',
    pulse: 'bg-slate-300',
  },
  cyan: {
    container: 'bg-cyan-50 text-cyan-800 border-cyan-200/80',
    dot: 'bg-cyan-500',
    pulse: 'bg-cyan-400',
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[11px] gap-1.5 rounded-full font-medium',
  md: 'px-2.5 py-1 text-xs gap-1.5 rounded-full font-semibold',
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  hasPulseDot = false,
  icon,
  children,
  ...props
}) => {
  const currentVariant = variantStyles[variant] || variantStyles.neutral;

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium border leading-none tracking-wide select-none transition-colors',
        currentVariant.container,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {hasPulseDot && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className={cn(
              'animate-radar-pulse absolute inline-flex h-full w-full rounded-full opacity-75',
              currentVariant.pulse
            )}
          />
          <span className={cn('relative inline-flex rounded-full h-2 w-2', currentVariant.dot)} />
        </span>
      )}

      {icon && <span className="shrink-0">{icon}</span>}

      <span>{children}</span>
    </span>
  );
};
