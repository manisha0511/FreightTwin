import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { Card, Badge, Button, FreightModeIcon, VisualMetricGauge } from '../../../design-system';

export interface KeyFeaturesProps {
  onExploreFeature?: () => void;
}

export const KeyFeatures: React.FC<KeyFeaturesProps> = ({ onExploreFeature }) => {
  const features = [
    {
      title: 'Multi-Modal Network Routing',
      subtitle: 'Dynamic Pareto-optimal road, rail, sea & air corridors.',
      mode: 'road' as const,
      metric: '94.6%',
      metricLabel: 'On-Time Velocity',
      status: 'success' as const,
    },
    {
      title: 'Micro Terminal & TEU Yard',
      subtitle: 'High-fidelity container dwell tracking and gantry pick-cycles.',
      mode: 'container' as const,
      metric: '2.1d',
      metricLabel: 'Average Dwell',
      status: 'cyan' as const,
    },
    {
      title: 'What-If Disruption Sandbox',
      subtitle: 'Simulate weather, canal blockades and diesel shocks.',
      mode: 'rail' as const,
      metric: '10x',
      metricLabel: 'Simulation Speed',
      status: 'warning' as const,
    },
    {
      title: 'GLEC v3 / Scope 3 ESG Engine',
      subtitle: 'ISO 14083 certified logistics carbon accounting.',
      mode: 'ocean' as const,
      metric: '42.8',
      metricLabel: 'gCO2e / t-km',
      status: 'success' as const,
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-slate-50/60 select-none text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2 max-w-xl">
            <Badge variant="cyan" size="sm">
              CORE CAPABILITIES
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary font-display">
              Enterprise Logistics Intelligence
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Domain-specific freight capabilities designed for modern dispatch rooms and supply chain executives.
            </p>
          </div>

          {onExploreFeature && (
            <Button
              variant="secondary"
              size="sm"
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />}
              onClick={onExploreFeature}
            >
              All Features
            </Button>
          )}
        </div>

        {/* 4 Spacious Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat) => (
            <Card key={feat.title} variant="interactive" className="p-6 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FreightModeIcon mode={feat.mode} size="md" interactive />
                  <Badge variant={feat.status} size="sm">
                    {feat.metric}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-text-primary font-display tracking-tight group-hover:text-blue-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    {feat.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-text-muted">{feat.metricLabel}</span>
                <span className="font-mono font-bold text-accent-primary group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
