import React from 'react';
import { ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { cn } from '../../utils/cn';
import { NavSection } from './Navigation.types';

export interface SidebarProps {
  sections: NavSection[];
  activeItemId: string;
  onSelect: (id: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeItemId,
  onSelect,
  isCollapsed = false,
  onToggleCollapse,
  className,
}) => {
  return (
    <aside
      className={cn(
        'relative flex flex-col h-full bg-white border-r border-command-border select-none transition-all duration-200 z-20 shadow-premium-xs',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center h-16 px-4 border-b border-command-border justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 text-accent-primary shadow-premium-xs shrink-0">
            <Activity className="w-5 h-5 stroke-[2.2]" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-extrabold tracking-tight text-text-primary font-display truncate">
                FreightTwin
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-accent-primary font-semibold truncate">
                Digital Twin Hub
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {section.title && !isCollapsed && (
              <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display">
                {section.title}
              </div>
            )}

            {section.items.map((item) => {
              const isActive = activeItemId === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative text-left cursor-pointer',
                    isActive
                      ? 'bg-blue-50/90 text-accent-primary font-semibold shadow-premium-xs border border-blue-200/60'
                      : 'text-text-secondary hover:text-text-primary hover:bg-slate-50/90',
                    isCollapsed && 'justify-center px-0'
                  )}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-accent-primary rounded-r" />
                  )}

                  <Icon
                    className={cn(
                      'w-4 h-4 shrink-0 transition-colors stroke-[2]',
                      isActive ? 'text-accent-primary' : 'text-slate-400 group-hover:text-slate-600'
                    )}
                  />

                  {!isCollapsed && (
                    <span className="truncate flex-1">{item.label}</span>
                  )}

                  {!isCollapsed && item.badge !== undefined && (
                    <span
                      className={cn(
                        'px-2 py-0.5 text-[10px] font-semibold rounded-full tabular-nums border',
                        item.badgeVariant === 'cyan' && 'bg-cyan-50 text-cyan-800 border-cyan-200/80',
                        item.badgeVariant === 'warning' && 'bg-amber-50 text-amber-800 border-amber-200/80',
                        item.badgeVariant === 'danger' && 'bg-red-50 text-red-700 border-red-200/80',
                        (!item.badgeVariant || item.badgeVariant === 'neutral') &&
                          'bg-slate-100 text-slate-600 border-slate-200/80'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Collapse Action & System Tag */}
      <div className="p-3 px-4 border-t border-command-border flex items-center justify-between bg-slate-50/50">
        {!isCollapsed ? (
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-radar-pulse absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success" />
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold text-text-primary truncate">
                TWIN ENGINE LIVE
              </span>
              <span className="text-[9px] font-mono text-text-muted truncate">
                SIMULATION CLOCK ACTIVE
              </span>
            </div>
          </div>
        ) : (
          <span className="relative flex h-2 w-2 mx-auto">
            <span className="animate-radar-pulse absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success" />
          </span>
        )}

        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-white hover:shadow-premium-xs border border-transparent hover:border-slate-200 transition-all cursor-pointer"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>
    </aside>
  );
};
