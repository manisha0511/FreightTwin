import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge, FreightModeIcon } from '../../../design-system';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Consignment Ingestion',
      desc: 'Ingest shipment volume, weight & freight class.',
      mode: 'container' as const,
    },
    {
      num: '02',
      title: 'Corridor Optimization',
      desc: 'Evaluate Pareto-optimal road, rail & ocean legs.',
      mode: 'rail' as const,
    },
    {
      num: '03',
      title: 'Spatial Twin Tracking',
      desc: 'Simulate flow velocity & predict corridor bottlenecks.',
      mode: 'road' as const,
    },
    {
      num: '04',
      title: 'Yard Gate & ESG Audit',
      desc: 'Terminal turnover with ISO 14083 carbon reporting.',
      mode: 'hub' as const,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white border-b border-command-border select-none text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-14">
          <Badge variant="cyan" size="sm">
            WORKFLOW
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary font-display">
            From Booking to Carbon Audit
          </h2>
          <p className="text-sm text-text-secondary">
            Continuous synchronization across physical logistics operations.
          </p>
        </div>

        {/* 4-Step Horizontal Visual Process */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-white border border-command-border shadow-premium-xs flex flex-col justify-between relative group hover:border-blue-400 hover:shadow-command-md transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    STAGE {step.num}
                  </span>
                  <FreightModeIcon mode={step.mode} size="sm" interactive />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-text-primary font-display tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-command-border flex items-center justify-center text-accent-primary shadow-premium-xs">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
