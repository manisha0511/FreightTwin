import React from 'react';
import { Activity, Mail, MapPin, ShieldCheck } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100/80 border-t border-command-border text-xs text-text-secondary select-none text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Platform Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-accent-primary">
                <Activity className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-base font-extrabold text-text-primary font-display">
                FreightTwin
              </span>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
              Intelligent multi-modal freight transport digital twin platform. Synchronizing macroscopic corridor networks with microscopic terminal and ESG carbon intelligence.
            </p>

            <div className="space-y-1.5 text-xs text-text-muted font-medium">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent-primary" />
                <span>contact@freighttwin.io</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent-primary" />
                <span>Freight Transport Digital Twin Lab</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider font-display">
              Navigation
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  onClick={() => scrollTo('home')}
                  className="hover:text-accent-primary transition-colors cursor-pointer"
                >
                  Overview Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('platform')}
                  className="hover:text-accent-primary transition-colors cursor-pointer"
                >
                  Platform Pillars
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="hover:text-accent-primary transition-colors cursor-pointer"
                >
                  Core Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('how-it-works')}
                  className="hover:text-accent-primary transition-colors cursor-pointer"
                >
                  Workflow
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-accent-primary transition-colors cursor-pointer"
                >
                  Quantified Impact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider font-display">
              Modules
            </h4>
            <ul className="space-y-2 text-text-muted font-medium">
              <li>Macro Corridor Network</li>
              <li>Fleet & Asset Telemetry</li>
              <li>3D Terminal & TEU Yard</li>
              <li>Green Multi-Modal Routing</li>
              <li>What-If Disruption Sandbox</li>
            </ul>
          </div>

          {/* Col 5: Standards & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider font-display">
              Standards
            </h4>
            <div className="space-y-2 text-text-muted font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
                <span>GLEC Framework v3.0</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
                <span>ISO 14083 Carbon Standards</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
                <span>UN/LOCODE Spatial Nodes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
                <span>EU CBAM Customs Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-text-muted">
          <div>
            © {new Date().getFullYear()} FreightTwin Platform. Built with React + TypeScript + Vite + Tailwind CSS.
          </div>
          <div className="flex items-center gap-4 font-mono font-medium">
            <span>VERSION 2.0</span>
            <span>SYSTEM RUNTIME: SIMULATED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
