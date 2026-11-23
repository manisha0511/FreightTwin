import React from 'react';
import { X, Activity } from 'lucide-react';
import { cn } from '../../utils/cn';
import { NavSection } from './Navigation.types';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  sections: NavSection[];
  activeItemId: string;
  onSelect: (id: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  sections,
  activeItemId,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white border-r border-command-border shadow-premium-float flex flex-col z-50 animate-in slide-in-from-left duration-200">
        <div className="flex items-center justify-between h-16 px-5 border-b border-command-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-accent-primary">
              <Activity className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="font-display font-bold text-base text-text-primary">
              FreightTwin
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-slate-100 transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {section.title && (
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
                    onClick={() => {
                      onSelect(item.id);
                      onClose();
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-left cursor-pointer',
                      isActive
                        ? 'bg-blue-50 text-accent-primary font-bold shadow-premium-xs border border-blue-200/60'
                        : 'text-text-secondary hover:text-text-primary hover:bg-slate-50'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-4 h-4 shrink-0',
                        isActive ? 'text-accent-primary' : 'text-slate-400'
                      )}
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-100 text-text-secondary font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-command-border text-xs text-text-muted font-mono bg-slate-50/50">
          FREIGHTTWIN PLATFORM v2.0
        </div>
      </div>
    </div>
  );
};
