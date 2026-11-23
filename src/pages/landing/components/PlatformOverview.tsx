import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Box, Sliders, ArrowRight, ShieldCheck, Activity, Zap } from 'lucide-react';
import { Card, Badge, Button, FreightModeIcon, VisualMetricGauge, MovingFreightPulse } from '../../../design-system';

export const PlatformOverview: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'macro' | 'micro' | 'simulation'>('macro');

  const pillars = {
    macro: {
      title: 'Macro Corridor Network Twin',
      badge: 'TOPOLOGY GRAPH',
      tagline: 'Multi-modal transit synchronization across road, rail, ocean, and air.',
      metric1: { value: 6, unit: 'Trunks', label: 'Monitored Corridors' },
      metric2: { value: 94.6, unit: '%', label: 'On-Time Velocity' },
      gaugeVal: 82,
      gaugeLabel: 'Capacity V/C',
      modes: ['road', 'rail', 'ocean', 'air'] as const,
    },
    micro: {
      title: 'Microscopic Terminal & Asset Twin',
      badge: 'SPATIAL YARD TWIN',
      tagline: 'High-fidelity container stack dwell tracking and predictive fleet degradation.',
      metric1: { value: 142, unit: 'Units', label: 'Active Telemetry' },
      metric2: { value: 2.1, unit: 'Days', label: 'Avg Port Dwell' },
      gaugeVal: 96,
      gaugeLabel: 'Fleet Health',
      modes: ['hub', 'container', 'road'] as const,
    },
    simulation: {
      title: 'Deterministic What-If Simulation',
      badge: 'DECISION LAB',
      tagline: 'Inject synthetic operational shocks to quantitatively measure supply chain resilience.',
      metric1: { value: 5, unit: 'Shocks', label: 'Scenario Models' },
      metric2: { value: 10, unit: 'x', label: 'Max Clock Speed' },
      gaugeVal: 88,
      gaugeLabel: 'Resilience Index',
      modes: ['rail', 'ocean', 'hub'] as const,
    },
  };

  const current = pillars[activePillar];

  return (
    <section id="platform" className="py-20 sm:py-28 bg-white border-y border-command-border relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header (Short, Concise) */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-12">
          <Badge variant="cyan" size="sm">
            PLATFORM PILLARS
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary font-display">
            A Tri-Layer Digital Twin
          </h2>
          <p className="text-sm sm:text-base text-text-secondary">
            Unifying macroscopic spatial network routing with physical terminal yards and predictive simulation.
          </p>
        </div>

        {/* Pillar Switcher Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActivePillar('macro')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activePillar === 'macro'
                ? 'bg-blue-50 text-blue-700 border border-blue-300 shadow-premium-xs'
                : 'bg-white text-text-secondary border border-command-border hover:bg-slate-50'
            }`}
          >
            <Globe className="w-4 h-4 text-blue-600" />
            <span>01. Macro Corridors</span>
          </button>

          <button
            onClick={() => setActivePillar('micro')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activePillar === 'micro'
                ? 'bg-blue-50 text-blue-700 border border-blue-300 shadow-premium-xs'
                : 'bg-white text-text-secondary border border-command-border hover:bg-slate-50'
            }`}
          >
            <Box className="w-4 h-4 text-blue-600" />
            <span>02. Terminal & Assets</span>
          </button>

          <button
            onClick={() => setActivePillar('simulation')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activePillar === 'simulation'
                ? 'bg-blue-50 text-blue-700 border border-blue-300 shadow-premium-xs'
                : 'bg-white text-text-secondary border border-command-border hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>03. What-If Sandbox</span>
          </button>
        </div>

        {/* Large Visual Section (Hero-grade Card) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <Card variant="hero" className="p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                {/* Left: Short Content & Metrics */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {current.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary font-display">
                      {current.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {current.tagline}
                    </p>
                  </div>

                  {/* Mode Icon Badges */}
                  <div className="flex items-center gap-3">
                    {current.modes.map((m) => (
                      <FreightModeIcon key={m} mode={m} size="sm" interactive />
                    ))}
                  </div>

                  {/* Visual Metric Row */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div className="space-y-0.5">
                      <div className="text-2xl sm:text-3xl font-extrabold text-text-primary font-display tabular-nums">
                        {current.metric1.value}{' '}
                        <span className="text-xs font-semibold text-text-muted">{current.metric1.unit}</span>
                      </div>
                      <div className="text-xs font-semibold text-text-muted">{current.metric1.label}</div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-2xl sm:text-3xl font-extrabold text-text-primary font-display tabular-nums">
                        {current.metric2.value}{' '}
                        <span className="text-xs font-semibold text-text-muted">{current.metric2.unit}</span>
                      </div>
                      <div className="text-xs font-semibold text-text-muted">{current.metric2.label}</div>
                    </div>
                  </div>
                </div>

                {/* Right: Large Visual Interactive Canvas */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center gap-6 p-6 rounded-2xl bg-white/90 border border-command-border shadow-premium-sm">
                  {activePillar === 'macro' && (
                    <div className="w-full space-y-4">
                      <MovingFreightPulse
                        mode="rail"
                        originName="LAX Intermodal"
                        destName="Chicago Hub"
                        distanceKm={3240}
                        durationHours={46.5}
                        statusLabel="ACTIVE FREIGHT PULSE"
                      />
                      <div className="flex items-center justify-around">
                        <VisualMetricGauge value={current.gaugeVal} size="md" label="Capacity" statusVariant="cyan" />
                        <VisualMetricGauge value={94.6} size="md" label="On-Time" statusVariant="success" />
                      </div>
                    </div>
                  )}

                  {activePillar === 'micro' && (
                    <div className="w-full flex items-center justify-around py-4">
                      <div className="flex flex-col items-center gap-2">
                        <FreightModeIcon mode="container" size="xl" interactive />
                        <span className="font-mono text-xs font-bold text-text-primary">ISO 40ft High-Cube</span>
                      </div>
                      <VisualMetricGauge value={current.gaugeVal} size="lg" label="Health" statusVariant="success" />
                    </div>
                  )}

                  {activePillar === 'simulation' && (
                    <div className="w-full space-y-4 text-center">
                      <div className="flex items-center justify-around">
                        <VisualMetricGauge value={88} size="md" label="Resilience" statusVariant="cyan" sublabel="Blizzard Shock" />
                        <VisualMetricGauge value={22} size="md" label="Delta Cost" unit="%" statusVariant="warning" sublabel="Fuel Spike" />
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-text-secondary font-medium">
                        Instant recalculation of multi-modal routes upon synthetic disturbance injection.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
