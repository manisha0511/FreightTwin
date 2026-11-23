import React, { useState, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  MapPin,
  Compass,
  Navigation,
  Info,
  Layers,
  Sparkles,
  Train,
  Truck,
  Plane,
  Anchor,
  Clock,
  DollarSign,
  Leaf,
} from 'lucide-react';
import { Badge, Button } from '../../../design-system';
import { RouteAlternative, RouteWaypoint } from '../types/routing.types';
import { MOCK_ROUTING_DISCLAIMER } from '../data/mockRoutingData';

export interface RouteVisualizerMapProps {
  selectedRoute: RouteAlternative;
  allAlternatives: RouteAlternative[];
  onSelectAlternative: (route: RouteAlternative) => void;
}

export const RouteVisualizerMap: React.FC<RouteVisualizerMapProps> = ({
  selectedRoute,
  allAlternatives,
  onSelectAlternative,
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeHoverWaypoint, setActiveHoverWaypoint] = useState<RouteWaypoint | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom controls
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.75));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((z) => Math.min(Math.max(z + delta, 0.75), 2.5));
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Build SVG path string from waypoints
  const buildSvgPath = (waypoints: RouteWaypoint[]): string => {
    if (!waypoints || waypoints.length === 0) return '';
    return waypoints.reduce((acc, pt, idx) => {
      if (idx === 0) return `M ${pt.x} ${pt.y}`;
      const prev = waypoints[idx - 1];
      const midX = (prev.x + pt.x) / 2;
      const midY = (prev.y + pt.y) / 2;
      return `${acc} Q ${midX} ${midY - 2}, ${pt.x} ${pt.y}`;
    }, '');
  };

  const originWaypoint = selectedRoute.waypoints.find((w) => w.type === 'origin') || selectedRoute.waypoints[0];
  const destWaypoint =
    selectedRoute.waypoints.find((w) => w.type === 'destination') ||
    selectedRoute.waypoints[selectedRoute.waypoints.length - 1];

  return (
    <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm flex flex-col text-left">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50/80 border-b border-slate-200/80 z-10">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="cyan" size="sm">
              CORRIDOR TOPOLOGY
            </Badge>
            <span className="text-xs font-mono font-bold text-slate-500">
              {selectedRoute.originName} → {selectedRoute.destinationName}
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 font-display mt-0.5 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-600" />
            <span>Active Path: {selectedRoute.name}</span>
          </h3>
        </div>

        {/* Quick summary metrics */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Compass className="w-3.5 h-3.5 text-cyan-600" />
            <span className="font-bold">{selectedRoute.distanceKm.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-600 font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>{selectedRoute.durationHours} hrs</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <DollarSign className="w-3.5 h-3.5" />
            <span>${selectedRoute.estimatedCostUsd.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Map Viewport Area */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`relative w-full h-[440px] lg:h-[500px] select-none overflow-hidden bg-slate-50/60 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top Left Floating Legend */}
        <div className="absolute top-3.5 left-3.5 z-20 p-2.5 rounded-xl bg-white/95 border border-slate-200/90 backdrop-blur-md shadow-xs text-[11px] space-y-1.5 max-w-[220px]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Evaluated Paths ({allAlternatives.length})
          </div>
          <div className="space-y-1">
            {allAlternatives.map((alt) => {
              const isCurrent = alt.id === selectedRoute.id;
              return (
                <button
                  key={alt.id}
                  onClick={() => onSelectAlternative(alt)}
                  className={`w-full flex items-center justify-between text-[11px] p-1 rounded-md transition-colors cursor-pointer text-left ${
                    isCurrent
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate max-w-[130px]">{alt.code} - {alt.primaryMode}</span>
                  <span className="font-mono text-[10px] shrink-0 font-bold">{alt.durationHours}h</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Right Zoom Controls */}
        <div className="absolute top-3.5 right-3.5 z-20 flex flex-col gap-1 p-1 rounded-xl bg-white/95 border border-slate-200/90 shadow-xs backdrop-blur-md">
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Reset zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Pan/Zoom Canvas */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '50% 50%',
            transition: isDragging ? 'none' : 'transform 100ms ease-out',
          }}
          className="relative w-full h-full"
        >
          {/* Continental Outline */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] pointer-events-none opacity-40"
          >
            <path
              d="M 12,20 L 25,18 L 45,22 L 75,20 L 92,26 L 88,45 L 82,60 L 72,78 L 55,80 L 45,74 L 30,78 L 15,65 L 12,38 Z"
              fill="rgba(241, 245, 249, 0.75)"
              stroke="#94A3B8"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
          </svg>

          {/* SVG Routes Layer */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] overflow-visible"
          >
            <defs>
              <linearGradient id="selectedRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Inactive alternative routes (faded dashed lines) */}
            {allAlternatives
              .filter((alt) => alt.id !== selectedRoute.id)
              .map((alt) => {
                const altPath = buildSvgPath(alt.waypoints);
                return (
                  <path
                    key={alt.id}
                    d={altPath}
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="1.4"
                    strokeDasharray="3 3"
                    className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => onSelectAlternative(alt)}
                  />
                );
              })}

            {/* Active Selected Route */}
            {selectedRoute.waypoints && selectedRoute.waypoints.length > 0 && (
              <g>
                <path
                  d={buildSvgPath(selectedRoute.waypoints)}
                  fill="none"
                  stroke="url(#selectedRouteGrad)"
                  strokeWidth="2.8"
                  className="transition-all duration-300"
                />

                {/* Animated moving cargo packet */}
                <circle r="2.0" fill="#0284C7" stroke="#FFFFFF" strokeWidth="0.6">
                  <animateMotion
                    path={buildSvgPath(selectedRoute.waypoints)}
                    dur={selectedRoute.primaryMode === 'air' ? '2.5s' : '5s'}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            )}
          </svg>

          {/* Waypoints & Pins */}
          <div className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] pointer-events-none">
            {selectedRoute.waypoints.map((wp, idx) => {
              const isOrigin = wp.type === 'origin';
              const isDest = wp.type === 'destination';
              const isHub = wp.type === 'intermodal_hub';

              return (
                <div
                  key={idx}
                  style={{
                    left: `${wp.x}%`,
                    top: `${wp.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActiveHoverWaypoint(wp)}
                    onMouseLeave={() => setActiveHoverWaypoint(null)}
                    className={`group relative flex items-center justify-center transition-transform hover:scale-125 cursor-pointer ${
                      isOrigin || isDest ? 'z-30' : 'z-20'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center border shadow-xs transition-colors ${
                        isOrigin
                          ? 'bg-blue-600 border-blue-700 text-white ring-2 ring-blue-500/20'
                          : isDest
                          ? 'bg-emerald-600 border-emerald-700 text-white ring-2 ring-emerald-500/20'
                          : 'bg-white border-slate-300 text-slate-700 hover:border-blue-500'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>

                    <span
                      className={`absolute top-full mt-1 px-1.5 py-0.5 rounded text-[10px] font-mono whitespace-nowrap border shadow-xs pointer-events-none ${
                        isOrigin || isDest
                          ? 'bg-slate-900 text-white border-slate-900 font-bold'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {wp.city || wp.name}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hover Waypoint Tooltip Drawer */}
        {activeHoverWaypoint && (
          <div className="absolute bottom-3 left-3 p-3 rounded-xl bg-white/95 border border-slate-200 shadow-md backdrop-blur-md z-30 text-xs text-left max-w-xs animate-in fade-in duration-150">
            <div className="font-bold text-slate-900 font-display">{activeHoverWaypoint.name}</div>
            <div className="text-[11px] text-slate-500">
              {activeHoverWaypoint.city} • Lat {activeHoverWaypoint.lat.toFixed(2)}, Lng {activeHoverWaypoint.lng.toFixed(2)}
            </div>
            <div className="mt-1 text-[10px] font-mono uppercase font-bold text-blue-600">
              Role: {activeHoverWaypoint.type.replace('_', ' ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
