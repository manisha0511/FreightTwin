import React from 'react';
import { Truck, Navigation, PauseCircle, Wrench, BatteryCharging, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { AnimatedNumber, MicroSparkline } from '../../../design-system';
import { FleetSummaryStats } from '../types/fleet.types';

export interface FleetOverviewCardsProps {
  summary: FleetSummaryStats;
  onFilterStatus?: (status: string) => void;
}

export const FleetOverviewCards: React.FC<FleetOverviewCardsProps> = ({ summary, onFilterStatus }) => {
  const cards = [
    {
      id: 'total',
      title: 'Total Vehicles',
      badge: 'ROSTER UNITS',
      badgeVariant: 'cyan',
      value: summary.totalVehicles,
      unit: 'Units',
      changePercent: 6.2,
      changePeriodLabel: 'vs last quarter',
      isPositive: true,
      sparklineData: [128, 132, 135, 138, 140, 141, 142],
      sparklineColor: '#2563EB',
      icon: <Truck className="w-4 h-4 text-primary-600" />,
      onClick: () => onFilterStatus?.('all'),
    },
    {
      id: 'active',
      title: 'Active Vehicles',
      badge: `${Math.round((summary.activeVehicles / summary.totalVehicles) * 100)}% READINESS`,
      badgeVariant: 'success',
      value: summary.activeVehicles,
      unit: 'En Route',
      changePercent: 8.4,
      changePeriodLabel: 'high fleet demand',
      isPositive: true,
      sparklineData: [82, 86, 88, 92, 94, 96, 98],
      sparklineColor: '#059669',
      icon: <Navigation className="w-4 h-4 text-emerald-600" />,
      onClick: () => onFilterStatus?.('active'),
    },
    {
      id: 'in_transit',
      title: 'In Transit / Idle',
      badge: `${summary.idleVehicles} STANDBY`,
      badgeVariant: 'default',
      value: summary.idleVehicles,
      unit: 'Depot Staged',
      changePercent: -8.5,
      changePeriodLabel: 'reduced turnaround',
      isPositive: true, // Lower idle time is positive
      sparklineData: [36, 32, 28, 26, 25, 24, 24],
      sparklineColor: '#06B6D4',
      icon: <PauseCircle className="w-4 h-4 text-cyan-600" />,
      onClick: () => onFilterStatus?.('idle'),
    },
    {
      id: 'maintenance',
      title: 'Under Maintenance',
      badge: 'SERVICE BAY',
      badgeVariant: summary.maintenanceVehicles > 15 ? 'danger' : 'warning',
      value: summary.maintenanceVehicles,
      unit: 'Bay Staged',
      changePercent: -14.2,
      changePeriodLabel: 'predictive uptime',
      isPositive: true, // Lower maintenance count is positive
      sparklineData: [18, 16, 15, 14, 13, 12, 12],
      sparklineColor: '#D97706',
      icon: <Wrench className="w-4 h-4 text-amber-600" />,
      onClick: () => onFilterStatus?.('maintenance'),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          onClick={card.onClick}
          className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 p-5 text-left transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
        >
          {/* Top row: Title, Badge, and Icon */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
              {card.title}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className={`px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-full border ${
                  card.badgeVariant === 'cyan'
                    ? 'bg-blue-50 border-blue-200/80 text-blue-700'
                    : card.badgeVariant === 'success'
                    ? 'bg-emerald-50 border-emerald-200/80 text-emerald-700'
                    : card.badgeVariant === 'warning'
                    ? 'bg-amber-50 border-amber-200/80 text-amber-700'
                    : card.badgeVariant === 'danger'
                    ? 'bg-red-50 border-red-200/80 text-red-700'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {card.badge}
              </span>
              <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                {card.icon}
              </div>
            </div>
          </div>

          {/* Metric Value with Animated Number */}
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display tabular-nums">
              <AnimatedNumber value={card.value} />
            </span>
            {card.unit && (
              <span className="text-xs font-semibold text-slate-500">{card.unit}</span>
            )}
          </div>

          {/* Miniature Sparkline */}
          <div className="my-2.5 -mx-1 opacity-90 group-hover:opacity-100 transition-opacity">
            <MicroSparkline
              data={card.sparklineData}
              height={32}
              color={card.sparklineColor}
              showArea
              interactive={false}
            />
          </div>

          {/* Bottom row: Trend Delta + Filter prompt */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5">
              <div
                className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-[11px] border ${
                  card.isPositive
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200/70'
                    : 'text-amber-700 bg-amber-50 border-amber-200/70'
                }`}
              >
                <span>{card.changePercent > 0 ? `+${card.changePercent}%` : `${card.changePercent}%`}</span>
              </div>
              <span className="text-slate-500 text-[11px] font-medium truncate">
                {card.changePeriodLabel}
              </span>
            </div>

            <span className="text-[11px] font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 shrink-0">
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};
