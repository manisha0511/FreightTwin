import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Anchor,
  Train,
  Warehouse,
  Building2,
  Plane,
  Truck,
  HelpCircle,
} from 'lucide-react';

export const MapLegend: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-md shadow-md text-xs text-left max-w-xs select-none">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer"
        aria-label="Toggle GIS map legend"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-bold text-slate-900 text-[11px] font-display uppercase tracking-wider">
            GIS Legend & Symbology
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>

      {isExpanded && (
        <div className="p-3 pt-1 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
          {/* 1. Facility Types */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Facility Class
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Anchor className="w-3 h-3" />
                </span>
                <span>Container Port</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
                  <Train className="w-3 h-3" />
                </span>
                <span>Rail Terminal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                  <Plane className="w-3 h-3" />
                </span>
                <span>Air Freight Ramp</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                  <Warehouse className="w-3 h-3" />
                </span>
                <span>Logistics Hub</span>
              </div>
            </div>
          </div>

          {/* 2. Corridors */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Corridor Lanes
            </span>
            <div className="space-y-1 text-[11px] text-slate-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
                  <span>Rail Trunk</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 font-bold">-42% CO2e</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-1 border-t-2 border-dashed border-blue-500" />
                  <span>Highway Feeder</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Primary</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-1 border-t-2 border-dashed border-teal-500" />
                  <span>Coastal Sea Lane</span>
                </div>
                <span className="text-[10px] font-mono text-teal-600 font-bold">Maritime</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-1 border-t-2 border-dotted border-purple-500" />
                  <span>Air Express Lane</span>
                </div>
                <span className="text-[10px] font-mono text-purple-600 font-bold">Priority</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-1 bg-red-500 rounded-full" />
                  <span>Chokepoint Queue</span>
                </div>
                <span className="text-[10px] font-mono text-red-600 font-bold">Delay Alert</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
