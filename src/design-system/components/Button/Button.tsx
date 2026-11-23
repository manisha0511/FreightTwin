import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-primary text-white font-semibold hover:bg-accent-primary-hover active:bg-blue-800 shadow-premium-xs hover:shadow-blue-glow focus-visible:ring-accent-primary border border-accent-primary/80',
  secondary:
    'bg-white text-text-primary border border-command-border hover:bg-slate-50/90 hover:border-command-border-subtle active:bg-slate-100 shadow-premium-xs focus-visible:ring-slate-400',
  outline:
    'bg-transparent text-accent-primary border border-accent-primary/60 hover:bg-accent-primary-muted hover:border-accent-primary active:bg-accent-primary/15 focus-visible:ring-accent-primary',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-slate-100/80 active:bg-slate-200/60 focus-visible:ring-slate-400',
  danger:
    'bg-status-danger text-white font-medium hover:bg-red-700 active:bg-red-800 shadow-premium-xs focus-visible:ring-status-danger border border-red-700/80',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-7 px-2.5 text-xs gap-1.5 rounded-md font-medium',
  sm: 'h-8 px-3 text-xs gap-2 rounded-lg font-medium',
  md: 'h-9 px-4 text-sm gap-2 rounded-lg font-medium',
  lg: 'h-11 px-5 text-base gap-2.5 rounded-xl font-medium',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'secondary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-150 select-none whitespace-nowrap cursor-pointer',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-0.5 h-4 w-4 shrink-0 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}

        {children && <span>{children}</span>}

        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
