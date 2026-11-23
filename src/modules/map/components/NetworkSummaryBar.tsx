import React from 'react';
import {
  MapPin,
  Truck,
  Navigation,
  AlertTriangle,
  Compass,
  Leaf,
} from 'lucide-react';
import { NetworkSummaryStats } from '../types/map.types';

export interface NetworkSummaryBarProps {
  stats: NetworkSummaryStats;
}

export const NetworkSummaryBar: React.FC<NetworkSummaryBarProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/90 text-xs shadow-xs">
      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/70">
        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
          <MapPin className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Hubs Staged</div>
          <div className="text-sm font-extrabold text-slate-900 font-display">{stats.totalHubs} <span className="text-[10px] text-slate-400 font-normal">nodes</span></div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/70">
        <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600">
          <Truck className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Active Units</div>
          <div className="text-sm font-extrabold text-blue-600 font-display">{stats.activeVehicles} <span className="text-[10px] text-slate-400 font-normal">units</span></div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/70">
        <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
          <Navigation className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Open Corridors</div>
          <div className="text-sm font-extrabold text-slate-900 font-display">{stats.activeCorridors} <span className="text-[10px] text-slate-400 font-normal">trunks</span></div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/70">
        <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
          <Compass className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Total Track</div>
          <div className="text-sm font-extrabold text-slate-900 font-display">{stats.totalNetworkKm.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">km</span></div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/70">
        <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
          <AlertTriangle className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Exceptions</div>
          <div className="text-sm font-extrabold text-amber-600 font-display">{stats.delayedExceptions} <span className="text-[10px] text-slate-400 font-normal">delayed</span></div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/70">
        <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
          <Leaf className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Carbon Abated</div>
          <div className="text-sm font-extrabold text-emerald-700 font-display">{stats.totalCarbonSavedKg.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">kg</span></div>
        </div>
      </div>
    </div>
  );
};
