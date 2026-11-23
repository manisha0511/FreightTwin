import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ToastMessage {
  id: string;
  type: 'success' | 'danger' | 'info';
  title: string;
  message?: string;
}

export interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss, className }) => {
  return (
    <div
      className={cn(
        'flex items-start gap-3 p-3.5 rounded-xl bg-command-card border border-command-border-subtle shadow-command-lg text-xs max-w-sm w-full animate-in slide-in-from-bottom-2 duration-150',
        toast.type === 'success' && 'border-status-success/30',
        toast.type === 'danger' && 'border-status-danger/30',
        toast.type === 'info' && 'border-accent-primary/30',
        className
      )}
    >
      {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />}
      {toast.type === 'danger' && <AlertCircle className="w-4 h-4 text-status-danger shrink-0 mt-0.5" />}
      {toast.type === 'info' && <Info className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" />}

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-text-primary text-xs">{toast.title}</p>
        {toast.message && <p className="text-text-secondary mt-0.5">{toast.message}</p>}
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        className="text-text-muted hover:text-text-primary p-0.5 rounded transition-colors"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
