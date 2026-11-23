import React from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-slate-200/80',
        variant === 'rectangular' && 'rounded-xl',
        variant === 'circular' && 'rounded-full',
        variant === 'text' && 'h-4 rounded-md w-full',
        className
      )}
      {...props}
    />
  );
};
