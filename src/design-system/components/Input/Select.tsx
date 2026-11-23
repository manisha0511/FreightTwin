import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      helperText,
      errorMessage,
      options,
      placeholder,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = Boolean(errorMessage);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold text-text-secondary tracking-wide select-none font-display"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={cn(
              'w-full h-10 rounded-xl pl-3.5 pr-10 text-sm font-normal text-text-primary bg-white',
              'border border-command-border shadow-premium-xs appearance-none cursor-pointer',
              'transition-all duration-150',
              'hover:border-command-border-subtle focus:border-accent-primary focus:bg-white',
              'focus:outline-none focus:ring-2 focus:ring-accent-primary/20',
              'disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:border-slate-200',
              hasError && 'border-status-danger focus:border-status-danger focus:ring-status-danger/20',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 flex items-center pointer-events-none text-text-muted">
            <ChevronDown className="w-4 h-4 stroke-[2]" />
          </div>
        </div>

        {errorMessage ? (
          <span className="text-xs text-status-danger font-medium flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errorMessage}
          </span>
        ) : helperText ? (
          <span className="text-xs text-text-muted">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
