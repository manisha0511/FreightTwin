import React from 'react';
import { Layers, Truck, Compass, Sliders, BarChart3, FileText, Settings, ArrowRight } from 'lucide-react';
import { Modal, Badge, Button } from '../../../design-system';

export interface ModulePreviewModalProps {
  moduleId: string | null;
  onClose: () => void;
}

const moduleSpecs: Record<
  string,
  {
    title: string;
    code: string;
    icon: React.ReactNode;
    scheduledStep: string;
    description: string;
    capabilities: string[];
    contractEndpoint: string;
  }
> = {
  digital_twin: {
    title: 'Digital Twin Corridor & 3D Yard Twin',
    code: 'MODULE 01 & 05',
    icon: <Layers className="w-5 h-5 text-blue-600" />,
    scheduledStep: 'Spatial Digital Twin',
    description:
      'Macroscopic multi-modal network topology linking road, rail, maritime, and air lanes, combined with microscopic 3D terminal yard container slotting.',
    capabilities: [
      'Interactive 3D yard container stacking by bay, row, and tier',
      'Dynamic RTG/RMG crane cycle animation and dwell time heatmaps',
      'Corridor vector layer with choke point volume-to-capacity overlay',
    ],
    contractEndpoint: 'GET /api/v1/network/topology & GET /api/v1/terminals/:id/manifest',
  },
  fleet: {
    title: 'Fleet & Asset Management Twin',
    code: 'MODULE 02 & 06',
    icon: <Truck className="w-5 h-5 text-cyan-600" />,
    scheduledStep: 'Fleet Management System',
    description:
      'Physics-informed multi-class vehicle modeling across Diesel, BEV electric, Hydrogen fuel cell, and LNG tractors. Evaluates state-of-charge, tire wear, and predictive failure risks.',
    capabilities: [
      'Weibull degradation curves for powertrain, braking, and chassis subsystems',
      'Synthetic high-frequency telemetry ticks (lat, lng, heading, fuel/SOC)',
      'Automated work order generation and preventative overhaul grouping',
    ],
    contractEndpoint: 'WSS /api/v1/telemetry/stream & GET /api/v1/fleet/diagnostics',
  },
  routing: {
    title: 'Dynamic Route Planning & Green Corridors',
    code: 'MODULE 04',
    icon: <Compass className="w-5 h-5 text-emerald-600" />,
    scheduledStep: 'Route Optimization Engine',
    description:
      'Multi-objective heuristic pathfinder evaluating route options across financial cost ($), transit duration (hours), and GLEC-compliant greenhouse gas emissions (kg CO2e).',
    capabilities: [
      'Pareto-optimal trade-off frontier between cost, time, and carbon',
      'Intermodal transfer penalty calculations at transshipment ramps',
      'Hazmat/ADR restricted tunnel and bridge avoidance routing',
    ],
    contractEndpoint: 'POST /api/v1/routing/solve & GET /api/v1/routing/corridors',
  },
  simulation: {
    title: 'What-If Disruption Scenario Sandbox',
    code: 'MODULE 09',
    icon: <Sliders className="w-5 h-5 text-amber-600" />,
    scheduledStep: 'Simulation Sandbox Engine',
    description:
      'Deterministic resilience modeling allowing planners to inject synthetic corridor closures, canal blockages, port labor lockouts, and fuel price spikes to assess network elasticity.',
    capabilities: [
      'Client-side simulation time engine with clock speed multipliers',
      'Side-by-side metric diffs (Baseline Model vs. Disturbed Scenario)',
      'Contingency action plan generator for logistics leadership sign-off',
    ],
    contractEndpoint: 'POST /api/v1/simulation/scenarios/run',
  },
  reports: {
    title: 'ESG & Regulatory Compliance Reporting',
    code: 'MODULE 08',
    icon: <FileText className="w-5 h-5 text-blue-600" />,
    scheduledStep: 'Compliance Reporting Engine',
    description:
      'Automated Scope 1, 2, and 3 carbon accounting dossiers following the Global Logistics Emissions Council (GLEC v3.0) and ISO 14083 frameworks.',
    capabilities: [
      'Exportable corporate GHG sustainability reports in PDF and CSV format',
      'Embodied carbon intensity per ton-kilometer across carriers and modes',
      'Clean fuel certification ledger (HVO100 renewable diesel, green hydrogen)',
    ],
    contractEndpoint: 'POST /api/v1/esg/audit-report',
  },
  settings: {
    title: 'Simulation & System Preferences',
    code: 'SETTINGS',
    icon: <Settings className="w-5 h-5 text-slate-500" />,
    scheduledStep: 'Active Simulation Settings',
    description:
      'Configure simulation clock tick frequencies, display unit systems (Metric vs Imperial), and toggle between Mock Data Engine mode and Live API Gateway mode.',
    capabilities: [
      'Simulation Tick Step: 1 tick = 15 simulated minutes',
      'Unit preferences: Metric (km, t, L) vs Imperial (mi, ton, gal)',
      'Data adapter mode: Currently operating in deterministic MOCK GENERATOR MODE',
    ],
    contractEndpoint: 'LOCAL ENGINE CALIBRATION',
  },
};

export const ModulePreviewModal: React.FC<ModulePreviewModalProps> = ({
  moduleId,
  onClose,
}) => {
  if (!moduleId || !moduleSpecs[moduleId]) return null;

  const spec = moduleSpecs[moduleId];

  return (
    <Modal
      isOpen={Boolean(moduleId)}
      onClose={onClose}
      title={spec.title}
      description={spec.code}
      size="md"
      footer={
        <Button variant="primary" size="sm" onClick={onClose}>
          Acknowledge Specification
        </Button>
      }
    >
      <div className="space-y-4 text-left text-xs">
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white border border-slate-200 text-blue-600 shadow-xs">
              {spec.icon}
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Module Scope</div>
              <div className="text-xs font-bold text-slate-900 font-display">{spec.scheduledStep}</div>
            </div>
          </div>
          <Badge variant="cyan" size="sm">PREVIEW</Badge>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {spec.description}
        </p>

        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Target Core Capabilities:</div>
          {spec.capabilities.map((cap, idx) => (
            <div key={idx} className="flex items-start gap-2 text-slate-700">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
              <span>{cap}</span>
            </div>
          ))}
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-500">
          Service Contract: <span className="text-blue-600 font-semibold">{spec.contractEndpoint}</span>
        </div>
      </div>
    </Modal>
  );
};
