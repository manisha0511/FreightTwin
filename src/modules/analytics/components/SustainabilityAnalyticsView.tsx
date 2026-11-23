import React from 'react';
import {
  Leaf,
  Sparkles,
  TrendingDown,
  Info,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { Badge, FreightModeIcon } from '../../../design-system';
import { MOCK_SUSTAINABILITY_DATA } from '../data/mockAnalyticsData';

export const SustainabilityAnalyticsView: React.FC = () => {
  const data = MOCK_SUSTAINABILITY_DATA;

  const totalModeEmissions =
    data.modeBreakdown.roadKg +
    data.modeBreakdown.railKg +
    data.modeBreakdown.airKg +
    data.modeBreakdown.waterKg;

  const roadPct = Math.round((data.modeBreakdown.roadKg / totalModeEmissions) * 100);
  const railPct = Math.round((data.modeBreakdown.railKg / totalModeEmissions) * 100);
  const airPct = Math.round((data.modeBreakdown.airKg / totalModeEmissions) * 100);
  const waterPct = Math.round((data.modeBreakdown.waterKg / totalModeEmissions) * 100);

  const maxMonthlyEmission = Math.max(
    ...data.monthlyEmissionTrend.map((t) => t.targetBaselineKg),
    1
  );

  return (
    <div className="space-y-6 text-left">
      {/* Top GLEC KPI Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span className="flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              Annual Estimated Carbon
            </span>
            <Badge variant="cyan" size="sm">
              GLEC SCOPE 1-3
            </Badge>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
            {(data.totalEstimatedEmissionsKg / 1000000).toFixed(2)}M{' '}
            <span className="text-xs font-normal text-slate-500">kg CO2e</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Compliant with ISO 14083 freight accounting standards
          </p>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              Modal Shift Carbon Abatement
            </span>
            <span className="font-mono text-[10px] text-cyan-700 font-bold">-38% reduction</span>
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-600 mt-1">
            {(data.emissionsSavedByModalShiftKg / 1000000).toFixed(2)}M{' '}
            <span className="text-xs font-normal text-slate-500">kg abated</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Direct emissions avoided via rail & barge intermodal routing
          </p>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span className="flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-blue-600" />
              Carbon Intensity Index
            </span>
            <Badge variant="success" size="sm">
              TIER 1 GREEN
            </Badge>
          </div>
          <div className="text-2xl font-bold font-mono text-blue-600 mt-1">
            {data.avgEmissionPerTonKmGrams}{' '}
            <span className="text-xs font-normal text-slate-500">g CO2e / t-km</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Target benchmark: &lt; 50 g CO2e / ton-kilometer
          </p>
        </div>
      </div>

      {/* Grid: Emissions by Mode (1 col) & Monthly Emissions Trend (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emissions by Mode Comparison */}
        <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-200/80">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="p-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200">
                <Layers className="w-3.5 h-3.5" />
              </span>
              Emissions by Transport Mode
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Highlights carbon efficiency across multi-modal segments.
            </p>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Road */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <FreightModeIcon mode="road" size="sm" /> Road Freight (Diesel)
                </span>
                <span className="font-mono text-slate-900 font-semibold">
                  {(data.modeBreakdown.roadKg / 1000000).toFixed(2)}M kg ({roadPct}%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: `${roadPct}%` }} className="h-full bg-amber-500 rounded-full" />
              </div>
              <div className="text-[10px] text-slate-400">62 - 110 g CO2e / t-km</div>
            </div>

            {/* Rail */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <FreightModeIcon mode="rail" size="sm" /> Electrified Rail
                </span>
                <span className="font-mono text-emerald-700 font-semibold">
                  {(data.modeBreakdown.railKg / 1000000).toFixed(2)}M kg ({railPct}%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: `${railPct}%` }} className="h-full bg-blue-600 rounded-full" />
              </div>
              <div className="text-[10px] text-emerald-700 font-mono font-medium">
                -68% lower emissions vs highway trucking
              </div>
            </div>

            {/* Air */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <FreightModeIcon mode="air" size="sm" /> Air Cargo Freighters
                </span>
                <span className="font-mono text-slate-900 font-semibold">
                  {(data.modeBreakdown.airKg / 1000000).toFixed(2)}M kg ({airPct}%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: `${airPct}%` }} className="h-full bg-cyan-500 rounded-full" />
              </div>
              <div className="text-[10px] text-slate-400">High-priority express cargo</div>
            </div>

            {/* Water */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <FreightModeIcon mode="ocean" size="sm" /> Coastal & Waterway
                </span>
                <span className="font-mono text-emerald-700 font-semibold">
                  {(data.modeBreakdown.waterKg / 1000).toFixed(0)}k kg ({waterPct}%)
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div style={{ width: `${waterPct}%` }} className="h-full bg-emerald-600 rounded-full" />
              </div>
              <div className="text-[10px] text-emerald-700 font-mono font-medium">
                -78% lowest emission index per ton-km
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Emissions Trend vs Baseline Target */}
        <div className="lg:col-span-2 p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <span className="p-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <Leaf className="w-3.5 h-3.5" />
                </span>
                Decarbonization Trajectory (Actual vs Target Baseline)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tracks monthly reductions achieved through fleet electrification and intermodal rail routing.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-emerald-600" />
                <span className="text-slate-600">Actual Emissions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-slate-300" />
                <span className="text-slate-500">Target Baseline</span>
              </div>
            </div>
          </div>

          {/* Interactive SVG Trend Chart */}
          <div className="h-56 w-full flex items-end justify-between gap-2 pt-4 px-2">
            {data.monthlyEmissionTrend.map((item) => {
              const actualHeightPct = Math.round((item.actualEmissionsKg / maxMonthlyEmission) * 100);
              const baselineHeightPct = Math.round((item.targetBaselineKg / maxMonthlyEmission) * 100);

              return (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                  title={`${item.month}: Actual ${(item.actualEmissionsKg / 1000).toFixed(0)}t vs Target ${(
                    item.targetBaselineKg / 1000
                  ).toFixed(0)}t`}
                >
                  <div className="relative w-full flex items-end justify-center h-44">
                    {/* Target baseline bar */}
                    <div
                      style={{ height: `${baselineHeightPct}%` }}
                      className="w-full max-w-[24px] bg-slate-100 border border-dashed border-slate-300 rounded-t absolute inset-0 mx-auto"
                    />
                    {/* Actual emission bar */}
                    <div
                      style={{ height: `${actualHeightPct}%` }}
                      className="w-full max-w-[20px] bg-emerald-600 rounded-t relative z-10 group-hover:brightness-110 transition-all shadow-xs"
                    />
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 group-hover:text-emerald-700">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              On track to exceed corporate ESG Scope 3 net-zero targets
            </span>
            <span className="font-mono text-emerald-700 font-semibold">-17.8% YOY Abatement</span>
          </div>
        </div>
      </div>

      {/* Synthetic Data Disclaimer Banner */}
      <div className="p-3.5 px-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-slate-700 flex items-center gap-2">
        <Info className="w-4 h-4 text-blue-600 shrink-0" />
        <span>
          <strong>Simulated Emissions Disclaimer:</strong> All carbon calculations, ton-kilometer emissions, and modal shift figures are estimated mock values computed using GLEC v3 standard emission factors. These estimates do not represent certified regulatory carbon credits or real-world exhaust measurements.
        </span>
      </div>
    </div>
  );
};
