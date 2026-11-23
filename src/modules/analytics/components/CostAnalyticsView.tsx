import React, { useState } from 'react';
import {
  DollarSign,
  Fuel,
  Truck,
  Receipt,
  BarChart2,
} from 'lucide-react';
import { Badge } from '../../../design-system';
import { CostBreakdownRecord } from '../types/analytics.types';

export interface CostAnalyticsViewProps {
  monthlyCosts: CostBreakdownRecord[];
}

export const CostAnalyticsView: React.FC<CostAnalyticsViewProps> = ({ monthlyCosts }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Compute total aggregates
  const totalSpend = monthlyCosts.reduce((sum, c) => sum + c.totalCostUsd, 0);
  const totalFuel = monthlyCosts.reduce((sum, c) => sum + c.fuelOrEnergyCostUsd, 0);
  const totalLinehaul = monthlyCosts.reduce((sum, c) => sum + c.carrierLinehaulCostUsd, 0);
  const totalTolls = monthlyCosts.reduce((sum, c) => sum + c.tollsAndAccessCostUsd, 0);
  const totalSurcharges = monthlyCosts.reduce((sum, c) => sum + c.delaySurchargesUsd, 0);

  const maxMonthlyCost = Math.max(...monthlyCosts.map((c) => c.totalCostUsd), 1);

  return (
    <div className="space-y-6 text-left">
      {/* 4 Cost Sub-Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Cost */}
        <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              Total Period Spend
            </span>
            <Badge variant="cyan" size="sm">
              ALL MODES
            </Badge>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            ${(totalSpend / 1000000).toFixed(2)}M
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Reconciled across road, rail, air & coastal lines
          </p>
        </div>

        {/* Fuel & Energy */}
        <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-amber-600" />
              Fuel & Traction Energy
            </span>
            <span className="font-mono text-[10px] text-amber-700 font-bold">
              {Math.round((totalFuel / totalSpend) * 100)}% of total
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-amber-600 mt-1">
            ${(totalFuel / 1000000).toFixed(2)}M
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Diesel fuel burn & EV depot charging tariffs
          </p>
        </div>

        {/* Carrier Linehaul */}
        <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              Carrier Linehaul
            </span>
            <span className="font-mono text-[10px] text-blue-700 font-bold">
              {Math.round((totalLinehaul / totalSpend) * 100)}% of total
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-blue-600 mt-1">
            ${(totalLinehaul / 1000000).toFixed(2)}M
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Contract rates & dedicated driver drayage
          </p>
        </div>

        {/* Tolls & Surcharges */}
        <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span className="flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-cyan-600" />
              Tolls & Surcharges
            </span>
            <span className="font-mono text-[10px] text-rose-700 font-bold">
              ${(totalSurcharges / 1000).toFixed(0)}k idle penalties
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-700 mt-1">
            ${((totalTolls + totalSurcharges) / 1000000).toFixed(2)}M
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Interstate tolls, terminal gates, and demurrage
          </p>
        </div>
      </div>

      {/* Main Monthly Cost Trends Stacked Chart */}
      <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
                <BarChart2 className="w-4 h-4" />
              </span>
              Monthly Transportation Cost Progression & Cost Categories
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Historical cost evolution categorizing fuel burn, linehaul tariffs, and municipal highway tolls.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-blue-600" />
              <span className="text-slate-600">Linehaul</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-amber-500" />
              <span className="text-slate-600">Fuel/Energy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-cyan-500" />
              <span className="text-slate-600">Tolls</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-rose-500" />
              <span className="text-slate-600">Surcharge</span>
            </div>
          </div>
        </div>

        {/* Hover telemetry banner */}
        <div className="h-9 flex items-center justify-between text-xs mb-3 px-3 rounded-xl bg-slate-50 border border-slate-200/70">
          {hoveredIdx !== null ? (
            <>
              <span className="font-mono text-slate-800">
                <strong>{monthlyCosts[hoveredIdx].period} Total Spend:</strong>{' '}
                <span className="text-emerald-700 font-bold">
                  ${monthlyCosts[hoveredIdx].totalCostUsd.toLocaleString()}
                </span>
              </span>
              <span className="font-mono text-[11px] text-slate-600">
                Fuel: ${monthlyCosts[hoveredIdx].fuelOrEnergyCostUsd.toLocaleString()} | Linehaul: $
                {monthlyCosts[hoveredIdx].carrierLinehaulCostUsd.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-[11px] text-slate-500 italic">
              Hover over monthly columns to view cost component allocation
            </span>
          )}
        </div>

        {/* Interactive SVG Stacked Column Chart */}
        <div className="h-56 w-full flex items-end justify-between gap-2 pt-2 px-2">
          {monthlyCosts.map((item, idx) => {
            const linehaulPct = Math.round((item.carrierLinehaulCostUsd / maxMonthlyCost) * 100);
            const fuelPct = Math.round((item.fuelOrEnergyCostUsd / maxMonthlyCost) * 100);
            const tollsPct = Math.round((item.tollsAndAccessCostUsd / maxMonthlyCost) * 100);
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={item.period}
                className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="relative w-full flex flex-col justify-end items-center h-44">
                  {/* Tolls top bar */}
                  <div
                    style={{ height: `${tollsPct}%` }}
                    className={`w-full max-w-[28px] bg-cyan-500 rounded-t transition-all ${
                      isHovered ? 'brightness-110 shadow-sm' : ''
                    }`}
                  />
                  {/* Fuel middle bar */}
                  <div
                    style={{ height: `${fuelPct}%` }}
                    className={`w-full max-w-[28px] bg-amber-500 transition-all ${
                      isHovered ? 'brightness-110 shadow-sm' : ''
                    }`}
                  />
                  {/* Linehaul base bar */}
                  <div
                    style={{ height: `${linehaulPct}%` }}
                    className={`w-full max-w-[28px] bg-blue-600 rounded-b transition-all ${
                      isHovered ? 'brightness-110 shadow-md ring-2 ring-blue-400/50' : ''
                    }`}
                  />
                </div>

                <span
                  className={`text-[11px] font-mono transition-colors ${
                    isHovered
                      ? 'text-emerald-700 font-bold'
                      : 'text-slate-500 group-hover:text-slate-800'
                  }`}
                >
                  {item.period}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
