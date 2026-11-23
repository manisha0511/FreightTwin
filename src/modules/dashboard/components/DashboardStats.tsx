import React from 'react';
import { Box, Truck, Activity, Clock, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { MicroSparkline, AnimatedNumber } from '../../../design-system';

export interface DashboardStatsProps {
  onNavigateToFleet?: () => void;
  onNavigateToRouting?: () => void;
  onNavigateToAnalytics?: () => void;
  onScrollToShipments?: () => void;
}

interface StatItem {
  id: string;
  title: string;
  badge: string;
  badgeVariant: 'cyan' | 'success' | 'indigo' | 'default';
  value: number;
  unit: string;
  decimals?: number;
  changePercent: number;
  changeLabel: string;
  isPositive: boolean;
  sparklineData: number[];
  sparklineColor: string;
  icon: React.ReactNode;
  hint: string;
  onClick?: () => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  onNavigateToFleet,
  onNavigateToRouting,
  onNavigateToAnalytics,
  onScrollToShipments,
}) => {
  const stats: StatItem[] = [
    {
      id: 'shipments',
      title: 'Total Shipments',
      badge: 'SIMULATED',
      badgeVariant: 'cyan',
      value: 1428,
      unit: 'TEU',
      changePercent: 12.8,
      changeLabel: 'vs last week',
      isPositive: true,
      sparklineData: [1120, 1180, 1250, 1220, 1310, 1390, 1428],
      sparklineColor: '#2563EB',
      icon: <Box className="w-4 h-4 text-primary-600" />,
      hint: 'Inspect consignments',
      onClick: onScrollToShipments,
    },
    {
      id: 'fleet',
      title: 'Active Fleet',
      badge: '83% READY',
      badgeVariant: 'default',
      value: 118,
      unit: '/ 142 Units',
      changePercent: 4.2,
      changeLabel: 'vs last shift',
      isPositive: true,
      sparklineData: [98, 104, 102, 110, 112, 115, 118],
      sparklineColor: '#06B6D4',
      icon: <Truck className="w-4 h-4 text-cyan-600" />,
      hint: 'View fleet telematics',
      onClick: onNavigateToFleet,
    },
    {
      id: 'ontime',
      title: 'On-Time Delivery',
      badge: 'SLA MET',
      badgeVariant: 'success',
      value: 94.6,
      decimals: 1,
      unit: '%',
      changePercent: 1.4,
      changeLabel: 'vs SLA target',
      isPositive: true,
      sparklineData: [91.2, 92.0, 93.4, 92.8, 93.9, 94.2, 94.6],
      sparklineColor: '#059669',
      icon: <Activity className="w-4 h-4 text-emerald-600" />,
      hint: 'Analyze delivery SLA',
      onClick: onNavigateToAnalytics,
    },
    {
      id: 'transit',
      title: 'Avg. Transit Time',
      badge: '-2.4h SPEEDUP',
      badgeVariant: 'indigo',
      value: 18.5,
      decimals: 1,
      unit: 'hrs',
      changePercent: -2.4,
      changeLabel: 'faster vs benchmark',
      isPositive: true, // A decrease in transit time is positive performance
      sparklineData: [22.4, 21.8, 20.9, 20.1, 19.4, 18.9, 18.5],
      sparklineColor: '#4F46E5',
      icon: <Clock className="w-4 h-4 text-indigo-600" />,
      hint: 'Optimize corridor routes',
      onClick: onNavigateToRouting || onNavigateToAnalytics,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <button
          key={stat.id}
          type="button"
          onClick={stat.onClick}
          className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 p-5 text-left transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
        >
          {/* Top row: Label, Badge & Action Arrow */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
              {stat.title}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className={`px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-full border ${
                  stat.badgeVariant === 'cyan'
                    ? 'bg-cyan-50 border-cyan-200/80 text-cyan-700'
                    : stat.badgeVariant === 'success'
                    ? 'bg-emerald-50 border-emerald-200/80 text-emerald-700'
                    : stat.badgeVariant === 'indigo'
                    ? 'bg-indigo-50 border-indigo-200/80 text-indigo-700'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {stat.badge}
              </span>
              <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                {stat.icon}
              </div>
            </div>
          </div>

          {/* Metric Value with Animated Number */}
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display tabular-nums">
              <AnimatedNumber
                value={stat.value}
                formatter={(n) =>
                  stat.decimals ? n.toFixed(stat.decimals) : Math.round(n).toLocaleString()
                }
              />
            </span>
            {stat.unit && (
              <span className="text-xs font-semibold text-slate-500">{stat.unit}</span>
            )}
          </div>

          {/* Miniature Sparkline */}
          <div className="my-2.5 -mx-1 opacity-90 group-hover:opacity-100 transition-opacity">
            <MicroSparkline
              data={stat.sparklineData}
              height={32}
              color={stat.sparklineColor}
              showArea
              interactive={false}
            />
          </div>

          {/* Bottom row: Trend Delta + Quick Action Prompt */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5">
              <div
                className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-[11px] border ${
                  stat.isPositive
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200/70'
                    : 'text-amber-700 bg-amber-50 border-amber-200/70'
                }`}
              >
                <TrendingUp className="w-3 h-3 stroke-[2.5]" />
                <span>{stat.changePercent > 0 ? `+${stat.changePercent}%` : `${stat.changePercent}%`}</span>
              </div>
              <span className="text-slate-500 text-[11px] font-medium truncate">
                {stat.changeLabel}
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
