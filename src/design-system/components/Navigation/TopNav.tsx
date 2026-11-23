import React from 'react';
import { Bell, Play, Pause, FastForward, Menu, Shield, User } from 'lucide-react';
import { cn } from '../../utils/cn';
import { SearchBar } from '../Input/SearchBar';

export interface TopNavProps {
  breadcrumbs?: string[];
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClear?: () => void;
  isSimulating?: boolean;
  simulationSpeed?: number;
  simulatedTime?: string;
  onToggleSimulation?: () => void;
  unreadAlertCount?: number;
  onAlertClick?: () => void;
  onProfileClick?: () => void;
  onMobileMenuToggle?: () => void;
  roleLabel?: string;
  className?: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  breadcrumbs = ['FreightTwin', 'Design System'],
  searchValue = '',
  onSearchChange,
  onSearchClear,
  isSimulating = true,
  simulationSpeed = 5,
  simulatedTime = '2026-11-23 09:45',
  onToggleSimulation,
  unreadAlertCount = 3,
  onAlertClick,
  onProfileClick,
  onMobileMenuToggle,
  roleLabel = 'DISPATCH CHIEF',
  className,
}) => {
  return (
    <header
      className={cn(
        'h-16 px-5 bg-white/95 backdrop-blur-md border-b border-command-border flex items-center justify-between gap-4 select-none z-10 shadow-premium-xs',
        className
      )}
    >
      {/* Left: Mobile hamburger + Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <nav className="hidden sm:flex items-center gap-2 text-xs text-text-muted" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-slate-300 font-medium">/</span>}
              <span
                className={cn(
                  'truncate max-w-[160px]',
                  idx === breadcrumbs.length - 1
                    ? 'text-text-primary font-bold font-display'
                    : 'text-text-muted hover:text-text-secondary transition-colors'
                )}
              >
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Center: Search input */}
      <div className="flex-1 max-w-md hidden md:block">
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          onClear={onSearchClear}
          placeholder="Quick search nodes, trips, vehicles..."
        />
      </div>

      {/* Right: Simulation Controller & Alerts & Profile */}
      <div className="flex items-center gap-3">
        {/* Simulation Clock Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-command-border text-xs shadow-premium-xs">
          <button
            onClick={onToggleSimulation}
            className="flex items-center gap-1.5 text-accent-primary hover:text-blue-700 font-mono font-bold transition-colors cursor-pointer"
            title={isSimulating ? 'Pause simulation' : 'Resume simulation'}
          >
            {isSimulating ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span className="hidden xl:inline text-[11px]">ACTIVE</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current text-status-warning" />
                <span className="hidden xl:inline text-[11px] text-status-warning">PAUSED</span>
              </>
            )}
          </button>

          <span className="hidden lg:inline text-slate-300">|</span>

          <span className="hidden lg:inline font-mono text-[11px] font-semibold text-text-secondary">
            {simulationSpeed}x
          </span>

          <span className="hidden xl:inline text-slate-300">|</span>

          <span className="hidden xl:inline font-mono text-[11px] text-text-muted">
            {simulatedTime}
          </span>
        </div>

        {/* Role Badge */}
        {roleLabel && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50/80 border border-blue-200/60 text-accent-primary text-xs font-semibold shadow-premium-xs">
            <Shield className="w-3.5 h-3.5 text-accent-primary" />
            <span className="text-[11px] font-mono tracking-wide">{roleLabel}</span>
          </div>
        )}

        {/* Alert Notifications Button */}
        <button
          onClick={onAlertClick}
          className="relative p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
          aria-label={`View notifications, ${unreadAlertCount} unread`}
        >
          <Bell className="w-4 h-4 stroke-[2]" />
          {unreadAlertCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-danger opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-status-danger" />
            </span>
          )}
        </button>

        {/* Profile Avatar Button */}
        <button
          onClick={onProfileClick}
          className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl border border-command-border hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer shadow-premium-xs"
          aria-label="User profile settings"
        >
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-premium-xs">
            FT
          </div>
          <span className="hidden lg:inline text-xs font-semibold text-text-primary">
            Ops Operator
          </span>
        </button>
      </div>
    </header>
  );
};
