import React, { forwardRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  shortcutKey?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      value,
      onChange,
      onClear,
      shortcutKey = '⌘K',
      placeholder = 'Search network, assets, consignments...',
      disabled,
      ...props
    },
    ref
  ) => {
    const hasValue = Boolean(value && String(value).length > 0);

    return (
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3.5 w-4 h-4 text-text-muted pointer-events-none" />

        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'w-full h-10 pl-10 pr-16 rounded-xl text-sm text-text-primary bg-slate-50',
            'border border-command-border placeholder:text-text-muted shadow-premium-xs',
            'transition-all duration-150',
            'hover:border-command-border-subtle hover:bg-white focus:border-accent-primary focus:bg-white',
            'focus:outline-none focus:ring-2 focus:ring-accent-primary/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />

        <div className="absolute right-2.5 flex items-center gap-1.5">
          {hasValue && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {shortcutKey && (
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-semibold text-text-muted bg-white border border-slate-200/90 rounded-md shadow-premium-xs select-none pointer-events-none">
              {shortcutKey}
            </kbd>
          )}
        </div>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
