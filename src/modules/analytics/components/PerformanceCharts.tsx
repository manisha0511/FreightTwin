import React, { useState } from 'react';
import {
  BarChart3,
  PieChart,
  Layers,
} from 'lucide-react';
import { Badge, FreightModeIcon } from '../../../design-system';
import { MonthlyVolumeRecord } from '../types/analytics.types';

export interface PerformanceChartsProps {
  monthlyVolumes: MonthlyVolumeRecord[];
  modeDistribution: { mode: string; volume: number; pct: number }[];
  statusDistribution: { status: string; count: number; pct: number }[];
}

export const PerformanceCharts: React.FC<PerformanceChartsProps> = ({
  monthlyVolumes,
  modeDistribution,
  statusDistribution,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxVolume = Math.max(...monthlyVolumes.map((v) => v.volume), 1);

  const mapModeStringToIcon = (mode: string): 'road' | 'rail' | 'ocean' | 'air' => {
    const lower = mode.toLowerCase();
    if (lower.includes('rail')) return 'rail';
    if (lower.includes('air')) return 'air';
    if (lower.includes('water') || lower.includes('coastal') || lower.includes('ocean')) return 'ocean';
    return 'road';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
      {/* 1. Monthly Shipment Volume & On-Time Performance (2 cols) */}
      <div className="lg:col-span-2 p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
                  <BarChart3 className="w-4 h-4" />
                </span>
                Monthly Shipment Volume & Delivery Reliability
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluates dispatch volume cadence alongside on-time vs delayed fulfillment SLA.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-blue-600" />
                <span className="text-slate-600">On-Time</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-rose-500" />
                <span className="text-slate-600">Delayed</span>
              </div>
            </div>
          </div>

          {/* Hover Telemetry Banner */}
          <div className="h-9 flex items-center justify-between text-xs mb-3 px-3 rounded-xl bg-slate-50 border border-slate-200/70">
            {hoveredIdx !== null ? (
              <>
                <span className="font-mono text-slate-800">
                  <strong>{monthlyVolumes[hoveredIdx].month} Total Volume:</strong>{' '}
                  <span className="text-blue-600 font-bold">
                    {monthlyVolumes[hoveredIdx].volume.toLocaleString()} units
                  </span>
                </span>
                <span className="font-mono text-[11px] text-slate-600">
                  On-Time:{' '}
                  <strong className="text-emerald-700 font-bold">
                    {monthlyVolumes[hoveredIdx].onTimeDeliveries.toLocaleString()}
                  </strong>{' '}
                  | Delayed:{' '}
                  <strong className="text-rose-700 font-bold">
                    {monthlyVolumes[hoveredIdx].delayedDeliveries.toLocaleString()}
                  </strong>
                </span>
              </>
            ) : (
              <span className="text-[11px] text-slate-500 italic">
                Hover over bars to inspect monthly dispatch breakdown
              </span>
            )}
          </div>

          {/* Interactive SVG Stacked Bar Chart */}
          <div className="h-56 w-full flex items-end justify-between gap-2 pt-2 px-2">
            {monthlyVolumes.map((item, idx) => {
              const onTimeHeightPct = Math.round((item.onTimeDeliveries / maxVolume) * 100);
              const delayedHeightPct = Math.round((item.delayedDeliveries / maxVolume) * 100);
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="relative w-full flex flex-col justify-end items-center h-44">
                    {/* Delayed Bar (Top portion) */}
                    <div
                      style={{ height: `${Math.max(delayedHeightPct, 4)}%` }}
                      className={`w-full max-w-[28px] bg-rose-500 rounded-t transition-all duration-300 ${
                        isHovered ? 'brightness-110 shadow-sm' : ''
                      }`}
                      title={`${item.month} Delayed: ${item.delayedDeliveries}`}
                    />
                    {/* On-Time Bar (Base portion) */}
                    <div
                      style={{ height: `${onTimeHeightPct}%` }}
                      className={`w-full max-w-[28px] bg-blue-600 rounded-b transition-all duration-300 ${
                        isHovered
                          ? 'brightness-110 shadow-md ring-2 ring-blue-400/50'
                          : ''
                      }`}
                      title={`${item.month} On-Time: ${item.onTimeDeliveries}`}
                    />
                  </div>

                  <span
                    className={`text-[11px] font-mono transition-colors ${
                      isHovered
                        ? 'text-blue-600 font-bold'
                        : 'text-slate-500 group-hover:text-slate-800'
                    }`}
                  >
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
          <span>Overall Annual Delivery Reliability: 94.2%</span>
          <span className="font-mono text-emerald-700 font-semibold">+2.4% vs industry baseline</span>
        </div>
      </div>

      {/* 2. Mode Distribution & Shipment Status Split (1 col) */}
      <div className="space-y-6">
        {/* Mode Distribution Card */}
        <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-4">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                <Layers className="w-3.5 h-3.5" />
              </span>
              Movement by Mode
            </h3>
            <Badge variant="cyan" size="sm">
              MODAL SPLIT
            </Badge>
          </div>

          <div className="space-y-3">
            {modeDistribution.map((modeItem) => (
              <div key={modeItem.mode} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <FreightModeIcon mode={mapModeStringToIcon(modeItem.mode)} size="sm" />
                    {modeItem.mode}
                  </span>
                  <span className="font-mono text-slate-900 font-semibold">
                    {modeItem.volume.toLocaleString()} ({modeItem.pct}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${modeItem.pct}%` }}
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipment Status Distribution Card */}
        <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-4">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="p-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200">
                <PieChart className="w-3.5 h-3.5" />
              </span>
              Consignment Status
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Lifecycle</span>
          </div>

          <div className="space-y-2.5">
            {statusDistribution.map((status) => (
              <div
                key={status.status}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      status.status === 'Delivered'
                        ? 'bg-emerald-500'
                        : status.status === 'In-Transit'
                        ? 'bg-blue-600'
                        : 'bg-rose-500'
                    }`}
                  />
                  <span className="text-slate-800 font-medium">{status.status}</span>
                </div>

                <div className="font-mono text-slate-700">
                  <strong className="text-slate-900">{status.count.toLocaleString()}</strong> ({status.pct}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
