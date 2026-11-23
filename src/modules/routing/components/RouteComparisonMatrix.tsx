import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Navigation,
  DollarSign,
  Leaf,
  Layers,
  Sparkles,
  Check,
} from 'lucide-react';
import { Badge, FreightModeIcon } from '../../../design-system';
import { RouteAlternative, TransportMode } from '../types/routing.types';

export interface RouteComparisonMatrixProps {
  alternatives: RouteAlternative[];
  selectedRouteId: string;
  onSelectRoute: (route: RouteAlternative) => void;
}

export const RouteComparisonMatrix: React.FC<RouteComparisonMatrixProps> = ({
  alternatives,
  selectedRouteId,
  onSelectRoute,
}) => {
  // Find maximums for relative visual bar graphs
  const maxDistance = Math.max(...alternatives.map((a) => a.distanceKm), 1);
  const maxDuration = Math.max(...alternatives.map((a) => a.durationHours), 1);
  const maxCost = Math.max(...alternatives.map((a) => a.estimatedCostUsd), 1);
  const maxEmissions = Math.max(...alternatives.map((a) => a.carbonEmissionKgCO2e), 1);

  const mapModeToIcon = (mode: TransportMode): 'road' | 'rail' | 'ocean' | 'air' => {
    switch (mode) {
      case 'rail':
        return 'rail';
      case 'air':
        return 'air';
      case 'water':
        return 'ocean';
      case 'road':
      default:
        return 'road';
    }
  };

  return (
    <div className="p-5 lg:p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200/80 mb-5">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
              <Layers className="w-4 h-4" />
            </span>
            Multi-Modal Route Trade-Off & Comparison Matrix
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Normalized benchmark comparison across duration, cost efficiency, distance, and GLEC carbon footprints.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-600 flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Relative Benchmark Scale</span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {alternatives.map((alt) => {
          const isSelected = selectedRouteId === alt.id;

          const distancePct = Math.round((alt.distanceKm / maxDistance) * 100);
          const durationPct = Math.round((alt.durationHours / maxDuration) * 100);
          const costPct = Math.round((alt.estimatedCostUsd / maxCost) * 100);
          const emissionsPct = Math.round((alt.carbonEmissionKgCO2e / maxEmissions) * 100);

          return (
            <div
              key={alt.id}
              onClick={() => onSelectRoute(alt)}
              className={`rounded-xl border p-4 flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/20 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-1.5 rounded-lg bg-white border border-slate-200 shrink-0 text-slate-700">
                      <FreightModeIcon mode={mapModeToIcon(alt.primaryMode)} size="sm" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                        {alt.code}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">
                        {alt.name}
                      </h4>
                    </div>
                  </div>
                  <Badge variant={alt.statusBadgeVariant} size="sm">
                    {alt.statusLabel}
                  </Badge>
                </div>

                {isSelected && (
                  <div className="mb-3 px-2 py-1 rounded-lg bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-mono font-semibold text-center flex items-center justify-center gap-1">
                    <Check className="w-3 h-3" /> ACTIVE CORRIDOR FOR MAP & SIMULATION
                  </div>
                )}

                {/* Relative Comparison Bars */}
                <div className="space-y-3 py-3 border-y border-slate-200/80 text-xs">
                  {/* Transit Time */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-500 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-blue-600" /> Transit Time
                      </span>
                      <span className="font-mono font-bold text-blue-600">
                        {alt.durationHours} hrs
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${durationPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Freight Cost */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-500 flex items-center gap-1 font-medium">
                        <DollarSign className="w-3 h-3 text-emerald-600" /> Freight Cost
                      </span>
                      <span className="font-mono font-bold text-emerald-600">
                        ${alt.estimatedCostUsd.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${costPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Distance */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-500 flex items-center gap-1 font-medium">
                        <Navigation className="w-3 h-3 text-cyan-600" /> Distance
                      </span>
                      <span className="font-mono font-semibold text-slate-800">
                        {alt.distanceKm.toLocaleString()} km
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-600 rounded-full transition-all duration-500"
                        style={{ width: `${distancePct}%` }}
                      />
                    </div>
                  </div>

                  {/* Carbon Footprint */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-500 flex items-center gap-1 font-medium">
                        <Leaf className="w-3 h-3 text-amber-600" /> Carbon
                      </span>
                      <span className="font-mono font-semibold text-amber-700">
                        {alt.carbonEmissionKgCO2e} kg
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${emissionsPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Advantages (Pros) */}
                <div className="mt-3 space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Key Strengths
                  </span>
                  <ul className="space-y-1">
                    {alt.advantages.map((adv, idx) => (
                      <li key={idx} className="text-[11px] text-slate-700 flex items-start gap-1.5 leading-snug">
                        <span className="text-emerald-600 font-bold shrink-0">+</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disadvantages (Cons) */}
                <div className="mt-3 space-y-1.5">
                  <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1">
                    <XCircle className="w-3 h-3 text-rose-600" /> Trade-offs
                  </span>
                  <ul className="space-y-1">
                    {alt.disadvantages.map((dis, idx) => (
                      <li key={idx} className="text-[11px] text-slate-500 flex items-start gap-1.5 leading-snug">
                        <span className="text-rose-500 font-bold shrink-0">-</span>
                        <span>{dis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended For Footer */}
              <div className="mt-4 pt-3 border-t border-slate-200/80">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-0.5">
                  Best Fit For
                </div>
                <p className="text-[11px] text-slate-600 italic">
                  {alt.recommendedFor}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
