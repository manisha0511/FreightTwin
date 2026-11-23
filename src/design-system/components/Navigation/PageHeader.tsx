import React from 'react';
import { cn } from '../../utils/cn';

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: string[];
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badge,
  actions,
  breadcrumbs,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-command-border/70 text-left',
        className
      )}
    >
      <div className="space-y-1.5 min-w-0">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-1 select-none" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-slate-300">/</span>}
                <span
                  className={cn(
                    idx === breadcrumbs.length - 1
                      ? 'text-text-primary font-medium'
                      : 'text-text-muted hover:text-text-secondary transition-colors'
                  )}
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary font-display">
            {title}
          </h1>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>

        {description && (
          <p className="text-sm text-text-secondary max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          {actions}
        </div>
      )}
    </div>
  );
};
