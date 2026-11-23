import React from 'react';
import { cn } from '../../utils/cn';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeStyles = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  label,
  className,
  ...props
}) => {
  return (
    <div className={cn('inline-flex items-center gap-2 text-accent-primary', className)} {...props}>
      <div
        className={cn(
          'rounded-full border-slate-200 border-t-accent-primary animate-spin shrink-0',
          sizeStyles[size]
        )}
        aria-label={label || 'Loading'}
      />
      {label && <span className="text-xs font-medium text-text-secondary">{label}</span>}
    </div>
  );
};
