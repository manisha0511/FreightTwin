import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeTabId: string;
  onChange: (id: string) => void;
  variant?: 'pill' | 'underline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTabId,
  onChange,
  variant = 'pill',
  size = 'md',
  className,
}) => {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1 select-none',
        variant === 'pill' &&
          'p-1 bg-slate-100/90 border border-command-border rounded-xl shadow-premium-xs',
        variant === 'underline' && 'border-b border-command-border w-full gap-5',
        className
      )}
    >
      {items.map((tab) => {
        const isActive = activeTabId === tab.id;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 font-medium transition-all duration-150 cursor-pointer',
              size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm',
              variant === 'pill' && [
                'rounded-lg',
                isActive
                  ? 'bg-white text-accent-primary font-bold shadow-premium-xs border border-slate-200/80'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/60',
              ],
              variant === 'underline' && [
                'pb-2.5 -mb-px border-b-2',
                isActive
                  ? 'border-accent-primary text-accent-primary font-bold'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-slate-300',
              ]
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  'px-2 py-0.5 rounded-full text-[10px] tabular-nums font-semibold border',
                  isActive
                    ? 'bg-blue-50 text-accent-primary border-blue-200/60'
                    : 'bg-white text-text-muted border-slate-200/80'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
