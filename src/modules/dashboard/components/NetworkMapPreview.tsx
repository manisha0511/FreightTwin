import React, { useState } from 'react';
import {
  Maximize2,
  Compass,
  MapPin,
  X,
  Layers,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Radio,
} from 'lucide-react';
import { Badge, Button } from '../../../design-system';
import {
  MOCK_TRANSPORT_HUBS,
  MOCK_ROUTE_LINES,
} from '../data/mockDashboardData';
import { TransportHub } from '../types/dashboard.types';

export interface NetworkMapPreviewProps {
  onOpenFullMap?: () => void;
  onNavigateToRouting?: () => void;
}

export const NetworkMapPreview: React.FC<NetworkMapPreviewProps> = ({
  onOpenFullMap,
  onNavigateToRouting,
}) => {
  const [selectedHub, setSelectedHub] = useState<TransportHub | null>(MOCK_TRANSPORT_HUBS[0]);
  const [modeFilter, setModeFilter] = useState<'all' | 'rail' | 'road'>('all');

  const filteredRoutes = MOCK_ROUTE_LINES.filter((route) => {
    if (modeFilter === 'all') return true;
    return route.mode === modeFilter;
  });

  return (
    <div className="relative rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-sm flex flex-col h-full">
      {/* Map Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-slate-200/80 bg-slate-50/70">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
              <span>Transport Network Digital Twin</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-50 text-cyan-700 border border-cyan-200/80">
                LIVE TOPOLOGY
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Multi-modal corridor flow, active freight packets, and intermodal terminal dwell telemetry.
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Mode Selector */}
          <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-xs">
            <button
              onClick={() => setModeFilter('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                modeFilter === 'all'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Corridors
            </button>
            <button
              onClick={() => setModeFilter('rail')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                modeFilter === 'rail'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rail Trunks
            </button>
            <button
              onClick={() => setModeFilter('road')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                modeFilter === 'road'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Highways
            </button>
          </div>

          {onOpenFullMap && (
            <Button
              variant="outline"
              size="xs"
              onClick={onOpenFullMap}
              rightIcon={<Maximize2 className="w-3 h-3" />}
            >
              Expand GIS
            </Button>
          )}
        </div>
      </div>

      {/* Main Map Visual Canvas Area */}
      <div className="relative w-full h-[380px] sm:h-[440px] bg-slate-50/60 flex items-center justify-center overflow-hidden select-none">
        {/* Subtle Map Coordinate Grid */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Continental US Outline (Clean, High-Tech Minimalist Vector) */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] pointer-events-none opacity-45"
        >
          <path
            d="M 12,20 L 25,18 L 45,22 L 75,20 L 92,26 L 88,45 L 82,60 L 72,78 L 55,80 L 45,74 L 30,78 L 15,65 L 12,38 Z"
            fill="rgba(241, 245, 249, 0.7)"
            stroke="#94A3B8"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
        </svg>

        {/* SVG Corridors and Animated Connections */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] overflow-visible"
        >
          <defs>
            <linearGradient id="railLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="roadLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.85" />
            </linearGradient>
            <filter id="corridorLightGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render Route Polylines between Hubs */}
          {filteredRoutes.map((route) => {
            const source = MOCK_TRANSPORT_HUBS.find((h) => h.id === route.sourceHubId);
            const target = MOCK_TRANSPORT_HUBS.find((h) => h.id === route.targetHubId);
            if (!source || !target) return null;

            // Generate an arc or curved corridor
            const midX = (source.coordinates.x + target.coordinates.x) / 2;
            const midY = (source.coordinates.y + target.coordinates.y) / 2 - 4;
            const pathData = `M ${source.coordinates.x},${source.coordinates.y} Q ${midX},${midY} ${target.coordinates.x},${target.coordinates.y}`;

            const isRail = route.mode === 'rail';
            const isCongested = route.status === 'congested';
            const isDelayed = route.status === 'delayed';

            const strokeColor = isDelayed
              ? '#DC2626'
              : isCongested
              ? '#D97706'
              : isRail
              ? 'url(#railLineGradient)'
              : 'url(#roadLineGradient)';

            return (
              <g key={route.id}>
                {/* Route Track with Glow */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isRail ? 2.2 : 1.6}
                  strokeDasharray={isRail ? 'none' : '3 2'}
                  filter="url(#corridorLightGlow)"
                  className="transition-all duration-300"
                />

                {/* Animated Moving Freight Packet Pulse */}
                <circle
                  r={isRail ? 2.0 : 1.6}
                  fill={isDelayed ? '#DC2626' : isCongested ? '#D97706' : '#0284C7'}
                  stroke="#FFFFFF"
                  strokeWidth={0.6}
                >
                  <animateMotion
                    path={pathData}
                    dur={`${isRail ? 4.8 : 6.5}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Clickable Transport Hub Node Pins */}
        <div className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] pointer-events-none">
          {MOCK_TRANSPORT_HUBS.map((hub) => {
            const isSelected = selectedHub?.id === hub.id;
            const isCongested = hub.status === 'congested';
            const isRestricted = hub.status === 'restricted';

            return (
              <div
                key={hub.id}
                style={{
                  left: `${hub.coordinates.x}%`,
                  top: `${hub.coordinates.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              >
                <button
                  type="button"
                  onClick={() => setSelectedHub(hub)}
                  className={`group relative flex items-center justify-center transition-all duration-150 cursor-pointer ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-115 z-20'
                  }`}
                  aria-label={`Select hub ${hub.name}`}
                >
                  {/* Radar Pulse for Selected Hub */}
                  {isSelected && (
                    <span className="absolute -inset-2 rounded-full bg-blue-500/20 animate-ping pointer-events-none" />
                  )}

                  {/* Hub Pin Ring */}
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center border shadow-sm transition-all ${
                      isSelected
                        ? 'bg-blue-600 border-blue-700 text-white ring-4 ring-blue-500/25'
                        : isCongested
                        ? 'bg-amber-50 border-amber-300 text-amber-700 hover:border-amber-400'
                        : isRestricted
                        ? 'bg-red-50 border-red-300 text-red-700 hover:border-red-400'
                        : 'bg-white border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>

                  {/* Node Label Tooltip */}
                  <span
                    className={`absolute top-full mt-1.5 px-1.5 py-0.5 rounded text-[10px] font-mono whitespace-nowrap border pointer-events-none transition-all shadow-xs ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 font-bold z-40'
                        : 'bg-white/95 text-slate-700 border-slate-200 opacity-90 group-hover:opacity-100 group-hover:border-slate-300'
                    }`}
                  >
                    {hub.code}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Hub Inspector Overlay Drawer */}
        {selectedHub && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:w-80 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-md p-4 shadow-lg z-40 text-left animate-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-start justify-between gap-2 mb-2.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wide">
                    {selectedHub.code}
                  </span>
                  <Badge
                    variant={
                      selectedHub.status === 'nominal'
                        ? 'success'
                        : selectedHub.status === 'congested'
                        ? 'warning'
                        : 'danger'
                    }
                    size="sm"
                    hasPulseDot={selectedHub.status !== 'nominal'}
                  >
                    {selectedHub.status.toUpperCase()}
                  </Badge>
                </div>
                <h4 className="text-xs font-bold text-slate-900 font-display mt-0.5 truncate">
                  {selectedHub.name}
                </h4>
              </div>

              <button
                onClick={() => setSelectedHub(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-slate-100 text-center">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[9px] uppercase font-bold text-slate-400 font-mono">Throughput</div>
                <div className="text-xs font-extrabold text-slate-900 font-display mt-0.5">
                  {selectedHub.throughputTEU.toLocaleString()} <span className="text-[9px] text-slate-400 font-normal">TEU</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[9px] uppercase font-bold text-slate-400 font-mono">Active Units</div>
                <div className="text-xs font-extrabold text-blue-600 font-display mt-0.5">
                  {selectedHub.activeVehicles} <span className="text-[9px] text-slate-400 font-normal">units</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[9px] uppercase font-bold text-slate-400 font-mono">Avg Dwell</div>
                <div className="text-xs font-extrabold text-amber-600 font-display mt-0.5">
                  {selectedHub.averageDwellHours}h
                </div>
              </div>
            </div>

            {/* Quick Link to Corridor Optimization */}
            {onNavigateToRouting && (
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-medium">Intermodal Corridor Flow</span>
                <button
                  onClick={onNavigateToRouting}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Plan Route</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Map Legend (Bottom Right) */}
        <div className="hidden sm:flex absolute bottom-3 right-3 items-center gap-3 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200/80 text-[11px] font-medium text-slate-600 backdrop-blur-md shadow-xs z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
            <span>Rail Corridor</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 border-t-2 border-dashed border-blue-500" />
            <span>Highway Feeder</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Bottleneck</span>
          </div>
        </div>
      </div>
    </div>
  );
};
