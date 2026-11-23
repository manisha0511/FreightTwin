import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck, Truck, Layers } from 'lucide-react';
import { Button, Badge } from '../../../design-system';
import { HeroVisual } from './HeroVisual';

export interface HeroSectionProps {
  onExplorePlatform: () => void;
  onPlanRoute?: () => void;
  onDiscoverFeatures?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePlatform,
  onPlanRoute,
  onDiscoverFeatures,
}) => {
  return (
    <section id="home" className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-blue-100/60 via-cyan-50/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Platform Tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-premium-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <span className="text-xs font-mono font-bold text-text-primary tracking-wide">
                FREIGHT TWIN PLATFORM 2.0
              </span>
            </motion.div>

            {/* Main Short Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[4rem] font-extrabold tracking-tight text-text-primary font-display leading-[1.08]"
            >
              See Freight.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
                Simulate What’s Next.
              </span>
            </motion.h1>

            {/* One Short Supporting Sentence */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl font-normal"
            >
              Synchronizing global multi-modal freight corridors with deterministic physics simulation to predict chokepoints and optimize logistics movement.
            </motion.p>

            {/* Two Required CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={onExplorePlatform}
                rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                className="shadow-blue-glow font-bold text-sm px-6"
              >
                Explore Digital Twin
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={onPlanRoute || onExplorePlatform}
                leftIcon={<Compass className="w-4 h-4 text-accent-primary stroke-[2.2]" />}
                className="font-bold text-sm px-6"
              >
                Plan a Route
              </Button>
            </motion.div>

            {/* Only 3 Concise Highlight Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6 border-t border-slate-200/90 grid grid-cols-3 gap-4"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-blue-600">
                  <Truck className="w-4 h-4" />
                  <span className="font-extrabold text-base sm:text-lg text-text-primary font-display">142</span>
                </div>
                <div className="text-[11px] font-semibold text-text-muted">Active Units</div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-cyan-600">
                  <Layers className="w-4 h-4" />
                  <span className="font-extrabold text-base sm:text-lg text-text-primary font-display">6</span>
                </div>
                <div className="text-[11px] font-semibold text-text-muted">Corridor Trunks</div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-extrabold text-base sm:text-lg text-text-primary font-display">GLEC v3</span>
                </div>
                <div className="text-[11px] font-semibold text-text-muted">ISO 14083 Scope 3</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Freight Globe (6 cols) */}
          <div className="lg:col-span-6 flex justify-center">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
};
