import React from 'react';
import { Card, Badge, VisualMetricGauge } from '../../../design-system';

export const Benefits: React.FC = () => {
  const impacts = [
    {
      value: 18.4,
      unit: '%',
      label: 'On-Time Velocity',
      status: 'success' as const,
      desc: 'Predictive bottleneck mitigation across transcontinental trunks.',
    },
    {
      value: 14.2,
      unit: '%',
      label: 'Spend Reduction',
      status: 'cyan' as const,
      desc: 'Optimal multi-modal routing shifting heavy freight to electric rail.',
    },
    {
      value: 22.7,
      unit: '%',
      label: 'Carbon Savings',
      status: 'success' as const,
      desc: 'GLEC v3 / ISO 14083 certified modal shift emissions reduction.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-slate-50/70 select-none text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-14">
          <Badge variant="cyan" size="sm">
            QUANTIFIED IMPACT
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary font-display">
            Operational ROI at Scale
          </h2>
          <p className="text-sm text-text-secondary">
            Measurable supply chain velocity, cost containment, and carbon optimization.
          </p>
        </div>

        {/* 3 Spacious Visual Dials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impacts.map((imp) => (
            <Card key={imp.label} className="p-8 flex flex-col items-center text-center justify-between">
              <div className="space-y-4 flex flex-col items-center">
                <VisualMetricGauge
                  value={imp.value * 3.5}
                  size="lg"
                  statusVariant={imp.status}
                  unit={imp.unit}
                />

                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-text-primary font-display tabular-nums">
                    +{imp.value}{imp.unit}
                  </div>
                  <h3 className="text-base font-bold text-text-primary font-display">
                    {imp.label}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-text-secondary mt-4 leading-relaxed font-normal">
                {imp.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
