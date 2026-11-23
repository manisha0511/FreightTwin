import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export type AlertSeverity = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  severity?: AlertSeverity;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  action?: React.ReactNode;
  className?: string;
}

const severityConfig: Record<
  AlertSeverity,
  {
    container: string;
    icon: React.ComponentType<{ className?: string }>;
    iconClass: string;
    border: string;
  }
> = {
  info: {
    container: 'bg-blue-50 text-blue-900',
    icon: Info,
    iconClass: 'text-accent-primary',
    border: 'border-blue-200',
  },
  success: {
    container: 'bg-emerald-50 text-emerald-950',
    icon: CheckCircle2,
    iconClass: 'text-status-success',
    border: 'border-emerald-200',
  },
  warning: {
    container: 'bg-amber-50 text-amber-950',
    icon: AlertTriangle,
    iconClass: 'text-status-warning',
    border: 'border-amber-200',
  },
  danger: {
    container: 'bg-red-50 text-red-950',
    icon: AlertCircle,
    iconClass: 'text-status-danger',
    border: 'border-red-200',
  },
};

export const Alert: React.FC<AlertProps> = ({
  severity = 'info',
  title,
  children,
  onDismiss,
  action,
  className,
}) => {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-xl border text-sm shadow-premium-xs transition-all duration-150',
        config.container,
        config.border,
        className
      )}
    >
      <Icon className={cn('w-5 h-5 shrink-0 mt-0.5', config.iconClass)} />

      <div className="flex-1 space-y-1">
        {title && <h5 className="font-semibold text-sm leading-tight font-display">{title}</h5>}
        <div className="text-xs leading-relaxed opacity-95">{children}</div>
        {action && <div className="pt-2">{action}</div>}
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 rounded-md text-current opacity-70 hover:opacity-100 hover:bg-black/5 transition-opacity cursor-pointer"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
