import React, { useState } from 'react';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  Wrench,
  Radio,
  ArrowRight,
  ShieldAlert,
  Sliders,
} from 'lucide-react';
import { Badge, Button } from '../../../design-system';
import { MOCK_ACTIVITY_FEED } from '../data/mockDashboardData';
import { ActivityEvent } from '../types/dashboard.types';

export interface RecentActivityProps {
  onSelectEvent?: (event: ActivityEvent) => void;
  onNavigateToSimulation?: () => void;
  onNavigateToFleet?: () => void;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  onSelectEvent,
  onNavigateToSimulation,
  onNavigateToFleet,
}) => {
  const [filter, setFilter] = useState<'all' | 'alerts' | 'milestones'>('all');

  const filteredFeed = MOCK_ACTIVITY_FEED.filter((item) => {
    if (filter === 'alerts') {
      return item.severity === 'danger' || item.severity === 'warning';
    }
    if (filter === 'milestones') {
      return item.type === 'milestone' || item.type === 'route';
    }
    return true;
  });

  const getSeverityBadge = (severity: ActivityEvent['severity']) => {
    switch (severity) {
      case 'danger':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-50 text-red-700 border border-red-200">
            CRITICAL
          </span>
        );
      case 'warning':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
            DELAY
          </span>
        );
      case 'success':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            RESOLVED
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
            TELEMETRY
          </span>
        );
    }
  };

  const getIcon = (type: ActivityEvent['type'], severity: ActivityEvent['severity']) => {
    switch (type) {
      case 'delay':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />;
      case 'maintenance':
        return <Wrench className="w-3.5 h-3.5 text-red-600" />;
      case 'milestone':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'route':
        return <Navigation className="w-3.5 h-3.5 text-blue-600" />;
      default:
        return <Radio className="w-3.5 h-3.5 text-cyan-600" />;
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col h-full text-left overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200/80 bg-slate-50/70 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Logistics Operations Feed
              </h3>
              <p className="text-[11px] text-slate-500">
                Live chronology & operational alerts
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {filteredFeed.length} EVENTS
          </span>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-xs self-start">
          <button
            onClick={() => setFilter('all')}
            className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('alerts')}
            className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              filter === 'alerts'
                ? 'bg-white text-amber-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setFilter('milestones')}
            className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              filter === 'milestones'
                ? 'bg-white text-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Milestones
          </button>
        </div>
      </div>

      {/* Feed List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-1">
        {filteredFeed.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectEvent && onSelectEvent(item)}
            className="p-3.5 hover:bg-slate-50/80 transition-colors flex items-start gap-3 cursor-pointer group rounded-xl"
          >
            <div className="p-2 rounded-xl bg-slate-100 border border-slate-200/80 mt-0.5 shrink-0 group-hover:border-blue-300 transition-colors">
              {getIcon(item.type, item.severity)}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-1.5">
                <h4 className="text-xs font-bold text-slate-900 truncate font-display group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                  {item.timestamp}
                </span>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center justify-between pt-1">
                {item.relatedEntityId && (
                  <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                    REF: {item.relatedEntityId}
                  </span>
                )}
                {getSeverityBadge(item.severity)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-50/50 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-500 font-medium">All 1,420 events recorded</span>
        {onNavigateToSimulation && (
          <button
            onClick={onNavigateToSimulation}
            className="text-[11px] text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>What-If Sandbox</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
