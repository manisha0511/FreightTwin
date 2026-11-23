import React from 'react';
import {
  Clock,
  Navigation,
  DollarSign,
  Leaf,
  ShieldCheck,
  Check,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Layers,
  MapPin,
} from 'lucide-react';
import { Badge, Button, FreightModeIcon } from '../../../design-system';
import { RouteAlternative, TransportMode } from '../types/routing.types';

export interface RouteAlternativesListProps {
  alternatives: RouteAlternative[];
  selectedRouteId: string;
  onSelectRoute: (route: RouteAlternative) => void;
  onProceedToSimulation?: (route: RouteAlternative) => void;
}

export const RouteAlternativesList: React.FC<RouteAlternativesListProps> = ({
  alternatives,
  selectedRouteId,
  onSelectRoute,
  onProceedToSimulation,
}) => {
  // Map transport mode to FreightModeIcon's accepted modes ('road' | 'rail' | 'ocean' | 'air' | 'hub' | 'container')
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
    <div className="space-y-4 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
              <Layers className="w-3.5 h-3.5" />
            </span>
            <h3 className="text-sm font-semibold text-slate-900">
              Route Alternatives ({alternatives.length} Corridors Evaluated)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare duration, cost, GLEC carbon emissions, and multi-stage journeys.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Click any card to inspect on map & compare
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alternatives.map((alt) => {
          const isSelected = selectedRouteId === alt.id;
          const isOptimal = alt.status === 'optimal' || alt.id === 'ALT-1';

          return (
            <div
              key={alt.id}
              onClick={() => onSelectRoute(alt)}
              className={`group relative rounded-2xl border transition-all duration-200 cursor-pointer p-5 flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/20 border-blue-500 shadow-md ring-2 ring-blue-500/30'
                  : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div>
                {/* Header: Mode Icon + Code + Name + Badges */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2.5 rounded-xl border shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-100 border-slate-200 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600'
                      }`}
                    >
                      <FreightModeIcon
                        mode={mapModeToIcon(alt.primaryMode)}
                        size="md"
                        className={isSelected ? 'text-white' : 'text-slate-700'}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-500">
                          {alt.code}
                        </span>
                        {isOptimal && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 shadow-2xs">
                            <Sparkles className="w-2.5 h-2.5 text-emerald-600" /> Recommended Choice
                          </span>
                        )}
                        {isSelected && !isOptimal && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-blue-100 text-blue-700 border border-blue-200 flex items-center gap-1">
                            <Check className="w-2.5 h-2.5" /> Selected
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors mt-0.5">
                        {alt.name}
                      </h4>
                    </div>
                  </div>

                  <Badge variant={alt.statusBadgeVariant} size="sm" className="shrink-0 font-medium">
                    {alt.statusLabel}
                  </Badge>
                </div>

                {/* Key Metrics Grid: Distance, Time, Cost, Emissions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 px-3 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs mb-3.5">
                  {/* Distance */}
                  <div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-cyan-600" />
                      Distance
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-900 mt-0.5">
                      {alt.distanceKm.toLocaleString()}{' '}
                      <span className="text-[10px] font-normal text-slate-500">km</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-600" />
                      Transit Time
                    </div>
                    <div className="text-xs font-mono font-bold text-blue-600 mt-0.5">
                      {alt.durationHours}{' '}
                      <span className="text-[10px] font-normal text-blue-500">hrs</span>
                    </div>
                  </div>

                  {/* Cost */}
                  <div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-600" />
                      Est. Freight
                    </div>
                    <div className="text-xs font-mono font-bold text-emerald-600 mt-0.5">
                      ${alt.estimatedCostUsd.toLocaleString()}
                    </div>
                  </div>

                  {/* Emissions */}
                  <div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Leaf className="w-3 h-3 text-amber-600" />
                      CO2e Footprint
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-700 mt-0.5">
                      {alt.carbonEmissionKgCO2e}{' '}
                      <span className="text-[10px] font-normal text-slate-500">kg</span>
                    </div>
                  </div>
                </div>

                {/* Visual Journey Timeline / Transport Stages */}
                <div className="p-2.5 rounded-xl bg-slate-100/70 border border-slate-200/60 mb-3 text-left">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
                    <span>Journey Timeline & Stages</span>
                    <span className="text-emerald-700 font-mono font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> {alt.reliabilityScorePercent}% on-time SLA
                    </span>
                  </div>

                  {/* Horizontal Stage Stepper */}
                  <div className="flex items-center justify-between text-xs font-mono gap-1.5 overflow-x-auto pb-1">
                    {/* Stage 1: Origin Drayage */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
                        <MapPin className="w-3 h-3" />
                      </div>
                      <div className="text-left">
                        <div className="text-[11px] font-sans font-semibold text-slate-900 leading-tight">
                          {alt.originName.split(' ')[0]}
                        </div>
                        <div className="text-[9px] text-slate-400">Origin Drayage</div>
                      </div>
                    </div>

                    {/* Connecting Corridor Arrow */}
                    <div className="flex-1 flex items-center justify-center min-w-[28px] max-w-[60px]">
                      <div className="w-full h-0.5 bg-slate-300 relative">
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-white px-1 text-[9px] text-slate-400">
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    {/* Stage 2: Main Linehaul / Transshipment */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-6 h-6 rounded-lg bg-cyan-500 text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
                        <FreightModeIcon mode={mapModeToIcon(alt.primaryMode)} size="sm" className="text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-[11px] font-sans font-semibold text-slate-900 leading-tight">
                          {alt.transshipmentPoints[0] || 'Line-haul'}
                        </div>
                        <div className="text-[9px] text-cyan-600 font-mono uppercase">{alt.primaryMode}</div>
                      </div>
                    </div>

                    {/* Connecting Corridor Arrow */}
                    <div className="flex-1 flex items-center justify-center min-w-[28px] max-w-[60px]">
                      <div className="w-full h-0.5 bg-slate-300 relative">
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-white px-1 text-[9px] text-slate-400">
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    {/* Stage 3: Destination Hub */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
                        <MapPin className="w-3 h-3" />
                      </div>
                      <div className="text-left">
                        <div className="text-[11px] font-sans font-semibold text-slate-900 leading-tight">
                          {alt.destinationName.split(' ')[0]}
                        </div>
                        <div className="text-[9px] text-slate-400">Final Delivery</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer: Recommendation Summary & Simulate CTA */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 gap-2">
                <span className="text-[11px] text-slate-500 italic truncate max-w-[65%]">
                  {alt.recommendedFor}
                </span>

                <div className="flex items-center gap-2 shrink-0">
                  {onProceedToSimulation && (
                    <Button
                      variant={isSelected ? 'primary' : 'outline'}
                      size="xs"
                      rightIcon={<ChevronRight className="w-3 h-3" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRoute(alt);
                        onProceedToSimulation(alt);
                      }}
                    >
                      Simulate
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
