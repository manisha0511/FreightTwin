import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
  isDanger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  trigger?: React.ReactNode;
  triggerLabel?: string;
  items: Array<DropdownItem | 'separator'>;
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  triggerLabel = 'Options',
  items,
  align = 'right',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn('relative inline-block text-left', className)}>
      {trigger ? (
        <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 border border-command-border text-text-primary shadow-premium-xs transition-colors cursor-pointer"
        >
          <span>{triggerLabel}</span>
          <ChevronDown className="w-3.5 h-3.5 text-text-muted stroke-[2]" />
        </button>
      )}

      {isOpen && (
        <div
          className={cn(
            'absolute top-full mt-1.5 w-56 rounded-xl bg-white border border-command-border shadow-premium-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((item, idx) => {
            if (item === 'separator') {
              return <div key={idx} className="my-1 border-t border-slate-100" />;
            }

            return (
              <button
                key={item.id}
                disabled={item.disabled}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors text-left cursor-pointer',
                  item.isDanger
                    ? 'text-status-danger hover:bg-red-50'
                    : 'text-text-primary hover:bg-slate-50',
                  item.disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent'
                )}
              >
                {item.icon && <span className="w-4 h-4 shrink-0 text-text-muted">{item.icon}</span>}
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-text-secondary font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
