import React from 'react';
import {
  Sliders,
  AlertTriangle,
  Zap,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  Clock,
  DollarSign,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Badge } from '../../../design-system';
import {
  SimulationScenarioId,
  SimulationScenarioConfig,
} from '../types/routing.types';
import { SIMULATION_SCENARIOS } from '../data/mockRoutingData';

export interface SimulationScenarioPanelProps {
  activeScenarioId: SimulationScenarioId;
  onSelectScenario: (scenarioId: SimulationScenarioId) => void;
  onResetSimulation: () => void;
}

export const SimulationScenarioPanel: React.FC<SimulationScenarioPanelProps> = ({
  activeScenarioId,
  onSelectScenario,
  onResetSimulation,
}) => {
  const getScenarioVisual = (id: SimulationScenarioId) => {
    switch (id) {
      case 'normal_traffic':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          bg: 'bg-emerald-50 border-emerald-200',
          accentColor: 'text-emerald-700',
        };
      case 'heavy_traffic':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
          bg: 'bg-amber-50 border-amber-200',
          accentColor: 'text-amber-700',
        };
      case 'route_disruption':
        return {
          icon: <Zap className="w-5 h-5 text-rose-600" />,
          bg: 'bg-rose-50 border-rose-200',
          accentColor: 'text-rose-700',
        };
      case 'increased_demand':
        return {
          icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
          bg: 'bg-blue-50 border-blue-200',
          accentColor: 'text-blue-700',
        };
      case 'alternative_route':
        return {
          icon: <RefreshCw className="w-5 h-5 text-cyan-600" />,
          bg: 'bg-cyan-50 border-cyan-200',
          accentColor: 'text-cyan-700',
        };
    }
  };

  const getSeverityBadgeVariant = (severity: SimulationScenarioConfig['severity']) => {
    switch (severity) {
      case 'nominal':
        return 'success';
      case 'moderate':
        return 'warning';
      case 'critical':
        return 'danger';
      case 'informational':
        return 'cyan';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="p-5 lg:p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80 mb-5">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
              <Sliders className="w-4 h-4" />
            </span>
            Transport Disruption & Demand Simulation Studio
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Inject synthetic traffic shocks, terminal bottlenecks, or capacity surges to stress-test corridor elasticity.
          </p>
        </div>

        <button
          type="button"
          onClick={onResetSimulation}
          className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto font-medium shadow-2xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset to Normal Baseline</span>
        </button>
      </div>

      {/* Scenario Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {SIMULATION_SCENARIOS.map((scenario) => {
          const isSelected = activeScenarioId === scenario.id;
          const visual = getScenarioVisual(scenario.id);

          return (
            <div
              key={scenario.id}
              onClick={() => onSelectScenario(scenario.id)}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/20 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header Icon + Severity Badge */}
                <div className="flex items-center justify-between gap-1 mb-3">
                  <div className={`p-2 rounded-xl border ${visual.bg}`}>
                    {visual.icon}
                  </div>
                  <Badge variant={getSeverityBadgeVariant(scenario.severity)} size="sm">
                    {scenario.severity.toUpperCase()}
                  </Badge>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-tight mb-1">
                  {scenario.name}
                </h4>
                <p className="text-[10px] text-slate-500 font-mono mb-2">
                  {scenario.tagline}
                </p>
                <p className="text-[11px] text-slate-600 line-clamp-3 mb-3 leading-snug">
                  {scenario.description}
                </p>
              </div>

              {/* Multipliers & Impact Bar */}
              <div className="pt-2.5 border-t border-slate-200/80 text-[10px] font-mono space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1 font-sans">
                    <Clock className="w-2.5 h-2.5 text-blue-600" /> Transit Time:
                  </span>
                  <span
                    className={
                      scenario.timeMultiplier > 1
                        ? 'text-amber-700 font-bold'
                        : 'text-slate-700 font-medium'
                    }
                  >
                    {scenario.timeMultiplier > 1
                      ? `+${Math.round((scenario.timeMultiplier - 1) * 100)}%`
                      : '1.0x (Nominal)'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1 font-sans">
                    <DollarSign className="w-2.5 h-2.5 text-emerald-600" /> Freight Rate:
                  </span>
                  <span
                    className={
                      scenario.costMultiplier > 1
                        ? 'text-rose-700 font-bold'
                        : scenario.costMultiplier < 1
                        ? 'text-emerald-700 font-bold'
                        : 'text-slate-700 font-medium'
                    }
                  >
                    {scenario.costMultiplier > 1
                      ? `+${Math.round((scenario.costMultiplier - 1) * 100)}%`
                      : scenario.costMultiplier < 1
                      ? `-${Math.round((1 - scenario.costMultiplier) * 100)}%`
                      : '1.0x (Nominal)'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
