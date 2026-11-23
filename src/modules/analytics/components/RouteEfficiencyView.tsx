import React from 'react';
import {
  Navigation,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { Badge } from '../../../design-system';
import { RouteCorridorAnalytics } from '../types/analytics.types';
import { MOCK_DELAY_CAUSES } from '../data/mockAnalyticsData';

export interface RouteEfficiencyViewProps {
  corridors: RouteCorridorAnalytics[];
}

export const RouteEfficiencyView: React.FC<RouteEfficiencyViewProps> = ({ corridors }) => {
  const avgDistance = Math.round(
    corridors.reduce((sum, c) => sum + c.avgDistanceKm, 0) / (corridors.length || 1)
  );

  const avgTransitTime = +(
    corridors.reduce((sum, c) => sum + c.avgTransitHours, 0) / (corridors.length || 1)
  ).toFixed(1);

  const avgEfficiency = Math.round(
    corridors.reduce((sum, c) => sum + c.efficiencyScore, 0) / (corridors.length || 1)
  );

  return (
    <div className="space-y-6 text-left">
      {/* 3 Corridor Efficiency Metric Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span className="flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-cyan-600" />
              Network Average Distance
            </span>
            <span className="font-mono text-[10px] text-slate-400">Intercity</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {avgDistance.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-500">km</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Weighted across active transcontinental corridors
          </p>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              Average Corridor Velocity
            </span>
            <span className="font-mono text-[10px] text-emerald-700 font-bold">98 km/h</span>
          </div>
          <div className="text-2xl font-bold font-mono text-blue-600 mt-1">
            {avgTransitTime}{' '}
            <span className="text-xs font-normal text-slate-500">hrs</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Scheduled transit duration door-to-terminal
          </p>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Corridor Resiliency Score
            </span>
            <Badge variant="success" size="sm">
              OPTIMAL
            </Badge>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
            {avgEfficiency} / 100
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Composite resistance against weather and road detours
          </p>
        </div>
      </div>

      {/* Grid: Most Used Transport Corridors Table (2 cols) & Delay Root Cause Analysis (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Most Used Corridors Table */}
        <div className="lg:col-span-2 p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                  <Navigation className="w-3.5 h-3.5" />
                </span>
                Primary Freight Corridors & Efficiency Benchmark
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluates linehaul throughput, distance, velocity, on-time rate, and efficiency index.
              </p>
            </div>
            <Badge variant="cyan" size="sm">
              {corridors.length} LANES
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-[11px] font-mono uppercase bg-slate-50/70">
                  <th className="py-2.5 px-3 rounded-l-lg">Corridor</th>
                  <th className="py-2.5 px-3">Mode</th>
                  <th className="py-2.5 px-3 text-right">Volume</th>
                  <th className="py-2.5 px-3 text-right">Distance</th>
                  <th className="py-2.5 px-3 text-right">Transit</th>
                  <th className="py-2.5 px-3 text-right">On-Time</th>
                  <th className="py-2.5 px-3 text-right rounded-r-lg">Efficiency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {corridors.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-50/80 transition-colors text-slate-800"
                  >
                    <td className="py-3 px-3">
                      <div className="font-sans font-semibold text-slate-900">
                        {c.corridorName}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                        {c.originCity} <ArrowRight className="w-2.5 h-2.5 text-slate-400" /> {c.destinationCity}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {c.primaryMode}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">
                      {c.totalShipmentsVolume.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-600">
                      {c.avgDistanceKm.toLocaleString()} km
                    </td>
                    <td className="py-3 px-3 text-right text-blue-600 font-semibold">
                      {c.avgTransitHours}h
                    </td>
                    <td className="py-3 px-3 text-right text-emerald-700 font-bold">
                      {c.onTimeRatePercent}%
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.efficiencyScore >= 90
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {c.efficiencyScore}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delay Root Cause Breakdown Card */}
        <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-4">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-50 text-amber-600 border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5" />
              </span>
              Estimated Delay Causes
            </h3>
            <Badge variant="warning" size="sm">
              ATTRIBUTION
            </Badge>
          </div>

          <div className="space-y-3.5">
            {MOCK_DELAY_CAUSES.map((item) => (
              <div key={item.cause} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-800 font-medium truncate max-w-[70%]">
                    {item.cause}
                  </span>
                  <span className="font-mono text-rose-700 font-bold">
                    {item.pctShare}% ({item.delayHours}h)
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.pctShare}%` }}
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{item.incidentCount} logged incidents</span>
                  <span className="italic text-slate-500">{item.primaryAffectedMode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
