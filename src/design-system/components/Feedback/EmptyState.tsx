import React from 'react';
import { PackageOpen } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-10 text-center rounded-2xl border border-dashed border-command-border bg-white shadow-premium-xs',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-accent-primary mb-4 shadow-premium-xs">
        {icon || <PackageOpen className="w-7 h-7 stroke-[1.8]" />}
      </div>

      <h3 className="text-base font-bold text-text-primary font-display tracking-tight mb-1.5">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-text-secondary max-w-sm mb-5 leading-relaxed">
        {description}
      </p>

      {action && <div>{action}</div>}
    </div>
  );
};
