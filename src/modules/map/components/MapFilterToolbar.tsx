import React from 'react';
import {
  Truck,
  Warehouse,
  Navigation,
  AlertTriangle,
  Compass,
  SlidersHorizontal,
} from 'lucide-react';
import { MapFilterState } from '../types/map.types';

export interface MapFilterToolbarProps {
  filters: MapFilterState;
  onChange: (newFilters: MapFilterState) => void;
  counts: {
    vehicles: number;
    hubs: number;
    routes: number;
    delayed: number;
  };
}

export const MapFilterToolbar: React.FC<MapFilterToolbarProps> = ({
  filters,
  onChange,
  counts,
}) => {
  const toggle = (key: keyof MapFilterState) => {
    onChange({
      ...filters,
      [key]: !filters[key],
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-xs">
      <div className="hidden sm:flex items-center gap-1.5 px-2 text-slate-500 font-mono font-bold">
        <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
        <span className="text-[11px] uppercase tracking-wider">GIS Layers:</span>
      </div>

      {/* 1. Vehicles Filter */}
      <button
        type="button"
        onClick={() => toggle('showVehicles')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer font-bold text-xs ${
          filters.showVehicles
            ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-xs'
            : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800'
        }`}
      >
        <Truck className="w-3.5 h-3.5" />
        <span>Vehicles</span>
        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-white border border-slate-200 text-slate-700">
          {counts.vehicles}
        </span>
      </button>

      {/* 2. Warehouses / Hubs Filter */}
      <button
        type="button"
        onClick={() => toggle('showWarehouses')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer font-bold text-xs ${
          filters.showWarehouses
            ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-xs'
            : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800'
        }`}
      >
        <Warehouse className="w-3.5 h-3.5" />
        <span>Hubs & Warehouses</span>
        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-white border border-slate-200 text-slate-700">
          {counts.hubs}
        </span>
      </button>

      {/* 3. Active Corridors Filter */}
      <button
        type="button"
        onClick={() => toggle('showActiveRoutes')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer font-bold text-xs ${
          filters.showActiveRoutes
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-xs'
            : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800'
        }`}
      >
        <Navigation className="w-3.5 h-3.5" />
        <span>Active Corridors</span>
        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-white border border-slate-200 text-slate-700">
          {counts.routes}
        </span>
      </button>

      {/* 4. Alternative Routes Filter */}
      <button
        type="button"
        onClick={() => toggle('showAlternativeRoutes')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer font-bold text-xs ${
          filters.showAlternativeRoutes
            ? 'bg-teal-50 text-teal-700 border-teal-200 shadow-xs'
            : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800'
        }`}
      >
        <Compass className="w-3.5 h-3.5" />
        <span>Alternative Green Paths</span>
      </button>

      {/* 5. Delayed Exceptions Filter */}
      <button
        type="button"
        onClick={() => toggle('showDelayedOnly')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer font-bold text-xs ${
          filters.showDelayedOnly
            ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-xs'
            : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800'
        }`}
      >
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>Delayed Exceptions</span>
        {counts.delayed > 0 && (
          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-amber-100 text-amber-800 font-bold">
            {counts.delayed}
          </span>
        )}
      </button>
    </div>
  );
};
