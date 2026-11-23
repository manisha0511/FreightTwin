import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Navigation,
  ShieldCheck,
  RefreshCw,
  Info,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { Badge, Button, Modal } from '../../../design-system';
import {
  SimulationResultMetrics,
  RouteAlternative,
} from '../types/routing.types';

export interface SimulationResultsViewProps {
  simulationResults: SimulationResultMetrics;
  selectedRoute: RouteAlternative;
  onResetSimulation: () => void;
}

export const SimulationResultsView: React.FC<SimulationResultsViewProps> = ({
  simulationResults,
  selectedRoute,
  onResetSimulation,
}) => {
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);

  const isNominal = simulationResults.scenarioId === 'normal_traffic';

  // Total cost breakdown sum for percentages
  const totalCost = simulationResults.simulatedCostUsd;
  const fuelPct = Math.round((simulationResults.costBreakdown.fuelOrEnergy / totalCost) * 100);
  const carrierPct = Math.round((simulationResults.costBreakdown.carrierLinehaul / totalCost) * 100);
  const tollsPct = Math.round((simulationResults.costBreakdown.tollsAndAccessFees / totalCost) * 100);
  const delayPct = Math.round((simulationResults.costBreakdown.delayOrCongestionSurcharges / totalCost) * 100);

  return (
    <div className="p-5 lg:p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm text-left space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">
              Scenario Simulation Results
            </span>
            <Badge
              variant={
                isNominal
                  ? 'success'
                  : simulationResults.scenarioId === 'route_disruption'
                  ? 'danger'
                  : 'warning'
              }
              size="sm"
            >
              {simulationResults.scenarioName}
            </Badge>
          </div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            Disruption Impact Analysis on {selectedRoute.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsFormulaModalOpen(true)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Calculation Rules</span>
          </button>

          {!isNominal && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              onClick={onResetSimulation}
            >
              Reset Baseline
            </Button>
          )}
        </div>
      </div>

      {/* Before vs After Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Travel Time Metric */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              Transit Duration
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              Base: {simulationResults.baselineDurationHours}h
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold font-mono text-slate-900">
              {simulationResults.simulatedDurationHours}
              <span className="text-xs font-normal text-slate-500 ml-1">hrs</span>
            </div>

            {simulationResults.delayHours > 0 ? (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />+{simulationResults.delayHours}h
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                On Schedule
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
            {simulationResults.delayHours > 0
              ? `+${Math.round((simulationResults.delayHours / simulationResults.baselineDurationHours) * 100)}% transit delay variance`
              : 'Nominal corridor transit velocity'}
          </div>
        </div>

        {/* 2. Transportation Cost Metric */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              Freight Rate / Cost
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              Base: ${simulationResults.baselineCostUsd.toLocaleString()}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold font-mono text-emerald-600">
              ${simulationResults.simulatedCostUsd.toLocaleString()}
            </div>

            {simulationResults.costDeltaUsd !== 0 ? (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold flex items-center gap-1 ${
                  simulationResults.costDeltaUsd > 0
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {simulationResults.costDeltaUsd > 0 ? (
                  <>
                    <TrendingUp className="w-3 h-3" />+${simulationResults.costDeltaUsd.toLocaleString()}
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-3 h-3" />-${Math.abs(simulationResults.costDeltaUsd).toLocaleString()}
                  </>
                )}
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                Baseline
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
            {simulationResults.costDeltaPercent > 0
              ? `+${simulationResults.costDeltaPercent}% surcharges & idling fuel burn`
              : simulationResults.costDeltaPercent < 0
              ? `${simulationResults.costDeltaPercent}% bulk modal shift savings`
              : 'Contract standard linehaul rates'}
          </div>
        </div>

        {/* 3. Route Distance Metric */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-cyan-600" />
              Route Distance
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              Base: {simulationResults.baselineDistanceKm.toLocaleString()} km
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold font-mono text-slate-900">
              {simulationResults.simulatedDistanceKm.toLocaleString()}
              <span className="text-xs font-normal text-slate-500 ml-1">km</span>
            </div>

            {simulationResults.distanceDeltaKm > 0 ? (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                +{simulationResults.distanceDeltaKm} km detour
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                Direct Path
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
            {simulationResults.distanceDeltaKm > 0
              ? 'Detour around mountain corridor / road closure'
              : 'Direct corridor alignment maintained'}
          </div>
        </div>

        {/* 4. Efficiency Score */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Efficiency Index
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              Base: {simulationResults.baselineEfficiencyScore}%
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div
              className={`text-2xl font-bold font-mono ${
                simulationResults.simulatedEfficiencyScore >= 85
                  ? 'text-emerald-600'
                  : simulationResults.simulatedEfficiencyScore >= 70
                  ? 'text-amber-600'
                  : 'text-rose-600'
              }`}
            >
              {simulationResults.simulatedEfficiencyScore}%
            </div>

            {simulationResults.efficiencyDeltaPercent < 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                {simulationResults.efficiencyDeltaPercent}%
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
            {simulationResults.simulatedEfficiencyScore >= 85
              ? 'Nominal network resiliency'
              : 'Corridor elasticity warning'}
          </div>
        </div>
      </div>

      {/* Summary Narrative Callout Box */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 relative overflow-hidden">
        <div className="flex items-start gap-3">
          <span className="p-2 rounded-lg bg-blue-100 text-blue-600 shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </span>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider font-mono">
              Scenario Analysis & Recommendations
            </h4>
            <p className="text-sm text-slate-800 leading-relaxed font-sans">
              {simulationResults.summaryNarrative}
            </p>
          </div>
        </div>
      </div>

      {/* Simulated Cost Breakdown Visualization */}
      <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-900">
            Simulated Cost Structure Breakdown (${totalCost.toLocaleString()} Total)
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            Heuristic allocation model
          </span>
        </div>

        {/* Stacked Horizontal Bar */}
        <div className="w-full h-3 rounded-full bg-slate-200 flex overflow-hidden">
          <div
            style={{ width: `${fuelPct}%` }}
            className="bg-amber-500 h-full transition-all duration-500"
            title={`Fuel & Energy: $${simulationResults.costBreakdown.fuelOrEnergy.toLocaleString()} (${fuelPct}%)`}
          />
          <div
            style={{ width: `${carrierPct}%` }}
            className="bg-blue-600 h-full transition-all duration-500"
            title={`Carrier Linehaul: $${simulationResults.costBreakdown.carrierLinehaul.toLocaleString()} (${carrierPct}%)`}
          />
          <div
            style={{ width: `${tollsPct}%` }}
            className="bg-cyan-500 h-full transition-all duration-500"
            title={`Tolls & Terminal Fees: $${simulationResults.costBreakdown.tollsAndAccessFees.toLocaleString()} (${tollsPct}%)`}
          />
          {delayPct > 0 && (
            <div
              style={{ width: `${delayPct}%` }}
              className="bg-rose-500 h-full transition-all duration-500"
              title={`Congestion & Delay Surcharges: $${simulationResults.costBreakdown.delayOrCongestionSurcharges.toLocaleString()} (${delayPct}%)`}
            />
          )}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[11px]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded bg-amber-500" />
            <span className="text-slate-600">
              Fuel/Energy: <strong className="font-mono text-slate-900">${simulationResults.costBreakdown.fuelOrEnergy.toLocaleString()}</strong> ({fuelPct}%)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded bg-blue-600" />
            <span className="text-slate-600">
              Carrier Linehaul: <strong className="font-mono text-slate-900">${simulationResults.costBreakdown.carrierLinehaul.toLocaleString()}</strong> ({carrierPct}%)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded bg-cyan-500" />
            <span className="text-slate-600">
              Tolls & Access: <strong className="font-mono text-slate-900">${simulationResults.costBreakdown.tollsAndAccessFees.toLocaleString()}</strong> ({tollsPct}%)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded bg-rose-500" />
            <span className="text-slate-600">
              Delay Surcharges: <strong className="font-mono text-slate-900">${simulationResults.costBreakdown.delayOrCongestionSurcharges.toLocaleString()}</strong> ({delayPct}%)
            </span>
          </div>
        </div>
      </div>

      {/* Calculation Formula Modal */}
      <Modal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        title="Simulation Heuristic Rules & Calculation Transparency"
        size="lg"
      >
        <div className="space-y-4 text-xs text-slate-600 text-left">
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              All simulated estimates use transparent, deterministic mock calculation rules. No real-world predictions or proprietary carrier live pricing APIs are claimed.
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-900">
              1. Travel Time Multiplier Model
            </h4>
            <p>
              Simulated travel time is calculated by applying the scenario time multiplier ($M_t$) to baseline corridor duration ($T_0$):
            </p>
            <div className="p-2.5 rounded-lg bg-slate-100 font-mono text-[11px] text-blue-700">
              T_simulated = T_0 × M_t + (Weight - 10) × 0.05
            </div>
            <p className="text-[11px] text-slate-500">
              Heavy Traffic: $M_t = 1.28$ (+28%) | Route Disruption: $M_t = 1.45$ (+45%) | Increased Demand: $M_t = 1.14$ (+14%)
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-900">
              2. Cost Penalty & Surcharge Engine
            </h4>
            <p>
              Cost calculations incorporate cargo category multipliers, payload weight curves, and scenario idling penalties:
            </p>
            <div className="p-2.5 rounded-lg bg-slate-100 font-mono text-[11px] text-emerald-700">
              Cost_simulated = BaseCost × M_cost × CategoryFactor × [1 + (Weight - 10) × 0.015]
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-900">
              3. Resiliency Efficiency Index
            </h4>
            <p>
              The composite efficiency index measures corridor stability against scheduled service-level agreements (SLAs), penalizing detours and excessive dwell times.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsFormulaModalOpen(false)}
            >
              Understood
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
