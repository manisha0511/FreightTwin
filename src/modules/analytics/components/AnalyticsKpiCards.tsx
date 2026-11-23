import React from 'react';
import {
  Package,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Truck,
  Leaf,
  Sparkles,
} from 'lucide-react';
import { Badge, AnimatedNumber, MicroSparkline } from '../../../design-system';
import { AnalyticsKpiMetrics } from '../types/analytics.types';

export interface AnalyticsKpiCardsProps {
  metrics: AnalyticsKpiMetrics;
}

export const AnalyticsKpiCards: React.FC<AnalyticsKpiCardsProps> = ({ metrics }) => {
  // Sparkline data representing trend trajectory
  const shipmentTrend = [120, 132, 140, 138, 145, 155, 168];
  const onTimeTrend = [91, 92, 91.5, 93, 93.8, 94.2, 94.5];
  const transitTrend = [34, 33.5, 32.8, 32.2, 31.9, 31.4, 31.2];
  const costTrend = [4.2, 4.1, 4.05, 3.98, 3.92, 3.86, 3.84];
  const utilTrend = [82, 83.5, 84, 85.2, 86, 87.4, 88.5];
  const carbonTrend = [210, 205, 198, 192, 185, 178, 172];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 text-left">
      {/* 1. Total Shipments */}
      <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-blue-600" />
              Total Shipments
            </span>
            <Badge variant="cyan" size="sm">
              MOCK
            </Badge>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            <AnimatedNumber value={metrics.totalShipments} />
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-semibold">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span>+{metrics.totalShipmentsDeltaPct}%</span>
          </div>
          <MicroSparkline data={shipmentTrend} color="#2563EB" width={56} height={18} />
        </div>
      </div>

      {/* 2. On-Time Delivery Rate */}
      <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              On-Time Rate
            </span>
            <Badge variant="success" size="sm">
              SLA 94%
            </Badge>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
            <AnimatedNumber value={metrics.onTimeDeliveryRate} formatter={(n) => `${n.toFixed(1)}%`} />
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-semibold">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span>+{metrics.onTimeRateDeltaPct}% SLA</span>
          </div>
          <MicroSparkline data={onTimeTrend} color="#059669" width={56} height={18} />
        </div>
      </div>

      {/* 3. Average Transit Time */}
      <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              Avg Transit Time
            </span>
            <span className="text-[10px] font-mono text-slate-400">Door-to-Door</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            <AnimatedNumber value={metrics.avgTransitTimeHours} formatter={(n) => `${n.toFixed(1)}h`} />
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-semibold">
            <TrendingDown className="w-3 h-3 text-emerald-600" />
            <span>{metrics.avgTransitTimeDeltaHours}h velocity</span>
          </div>
          <MicroSparkline data={transitTrend} color="#06B6D4" width={56} height={18} />
        </div>
      </div>

      {/* 4. Total Transportation Cost */}
      <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-amber-600" />
              Freight Spend
            </span>
            <span className="text-[10px] font-mono text-slate-400">Multi-Modal</span>
          </div>
          <div className="text-2xl font-bold font-mono text-amber-600 mt-1">
            ${(metrics.totalTransportationCostUsd / 1000000).toFixed(2)}M
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-semibold">
            <TrendingDown className="w-3 h-3 text-emerald-600" />
            <span>{metrics.totalCostDeltaPct}% savings</span>
          </div>
          <MicroSparkline data={costTrend} color="#D97706" width={56} height={18} />
        </div>
      </div>

      {/* 5. Fleet Utilization */}
      <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-cyan-600" />
              Fleet Utilization
            </span>
            <span className="text-[10px] font-mono text-slate-400">Active Units</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            <AnimatedNumber value={metrics.fleetUtilizationRate} formatter={(n) => `${n.toFixed(1)}%`} />
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-semibold">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span>+{metrics.fleetUtilizationDeltaPct}% deadhead</span>
          </div>
          <MicroSparkline data={utilTrend} color="#4F46E5" width={56} height={18} />
        </div>
      </div>

      {/* 6. Estimated CO2e Emissions */}
      <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              Est. CO2e Carbon
            </span>
            <Badge variant="cyan" size="sm">
              GLEC v3
            </Badge>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
            {metrics.estimatedEmissionsCO2eTons.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-500">t</span>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-semibold">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>-{metrics.emissionsDeltaPct}% carbon</span>
          </div>
          <MicroSparkline data={carbonTrend} color="#059669" width={56} height={18} />
        </div>
      </div>
    </div>
  );
};
