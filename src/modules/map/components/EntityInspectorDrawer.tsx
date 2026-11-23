import React from 'react';
import {
  X,
  Truck,
  MapPin,
  Compass,
  Navigation,
  Clock,
  BatteryCharging,
  Fuel,
  User,
  ShieldCheck,
  AlertTriangle,
  Leaf,
  Layers,
  Activity,
  ArrowRight,
  Anchor,
  Train,
  Plane,
} from 'lucide-react';
import { Badge, Button, FreightModeIcon } from '../../../design-system';
import { MapHub, MapVehicle, MapRoute } from '../types/map.types';

export interface EntityInspectorDrawerProps {
  selectedHub: MapHub | null;
  selectedVehicle: MapVehicle | null;
  selectedRoute: MapRoute | null;
  routes?: MapRoute[];
  onClose: () => void;
  onFocusEntity?: (coords: { x: number; y: number }) => void;
}

export const EntityInspectorDrawer: React.FC<EntityInspectorDrawerProps> = ({
  selectedHub,
  selectedVehicle,
  selectedRoute,
  routes = [],
  onClose,
  onFocusEntity,
}) => {
  if (!selectedHub && !selectedVehicle && !selectedRoute) return null;

  // Find connected routes for the selected hub
  const connectedRoutes = selectedHub
    ? routes.filter(
        (r) => r.sourceHubId === selectedHub.id || r.targetHubId === selectedHub.id
      )
    : [];

  return (
    <div className="absolute top-3 right-3 bottom-3 sm:bottom-auto sm:max-h-[calc(100%-1.5rem)] w-84 sm:w-96 rounded-2xl bg-white/95 border border-slate-200/90 shadow-xl backdrop-blur-md z-30 flex flex-col overflow-hidden text-left animate-in slide-in-from-right duration-200">
      {/* 1. INSPECTING A TRANSPORT HUB */}
      {selectedHub && (
        <>
          {/* Header */}
          <div className="flex items-start justify-between p-4 border-b border-slate-200/80 bg-slate-50/70">
            <div>
              <div className="flex items-center gap-2">
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
              <h3 className="text-sm font-bold text-slate-900 font-display mt-0.5 truncate">
                {selectedHub.name}
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{selectedHub.city}, {selectedHub.stateCountry}</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close inspector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {/* Capacity Utilization Visual Gauge */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Capacity Utilization</span>
                <span className="font-mono font-extrabold text-blue-600">
                  {Math.round((selectedHub.currentThroughputTEU / selectedHub.capacityTEUorTons) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    selectedHub.currentThroughputTEU / selectedHub.capacityTEUorTons > 0.85
                      ? 'bg-amber-500'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600'
                  }`}
                  style={{
                    width: `${Math.min(
                      Math.round((selectedHub.currentThroughputTEU / selectedHub.capacityTEUorTons) * 100),
                      100
                    )}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>{selectedHub.currentThroughputTEU.toLocaleString()} TEU Staged</span>
                <span>Max: {selectedHub.capacityTEUorTons.toLocaleString()} TEU</span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Associated Fleet</div>
                <div className="text-base font-extrabold text-blue-600 font-display mt-0.5">
                  {selectedHub.activeVehiclesCount} <span className="text-xs font-normal text-slate-500">units</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Staged or in turnaround</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Average Dwell</div>
                <div className="text-base font-extrabold text-amber-600 font-display mt-0.5">
                  {selectedHub.averageDwellHours}h
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Gate Queue: ~{selectedHub.gateQueueMinutes}m</div>
              </div>
            </div>

            {/* Connected Corridors List */}
            {connectedRoutes.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase font-bold text-slate-400">
                  <span>Connected Corridors ({connectedRoutes.length})</span>
                </div>
                <div className="space-y-1 max-h-36 overflow-y-auto">
                  {connectedRoutes.map((cr) => {
                    const isSource = cr.sourceHubId === selectedHub.id;
                    const otherHubId = isSource ? cr.targetHubId : cr.sourceHubId;
                    return (
                      <div
                        key={cr.id}
                        className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[11px]"
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              cr.mode === 'rail'
                                ? 'bg-cyan-500'
                                : cr.mode === 'maritime'
                                ? 'bg-teal-500'
                                : cr.mode === 'air'
                                ? 'bg-purple-500'
                                : 'bg-blue-500'
                            }`}
                          />
                          <span className="font-semibold text-slate-800 capitalize">
                            {cr.mode}
                          </span>
                          <span className="text-slate-400">→</span>
                          <span className="font-mono text-slate-600">{otherHubId}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 font-bold">
                          {cr.distanceKm.toLocaleString()} km
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Operating metadata */}
            <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200/80 text-[11px] text-blue-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Shift: {selectedHub.operatingHours}</span>
              </div>
              <p className="text-blue-700/90 text-[10px]">
                Facility Class: {selectedHub.type.replace('_', ' ').toUpperCase()} • Lat {selectedHub.location.lat.toFixed(2)}, Lng {selectedHub.location.lng.toFixed(2)}
              </p>
            </div>
          </div>
        </>
      )}

      {/* 2. INSPECTING A VEHICLE ASSET */}
      {selectedVehicle && (
        <>
          <div className="flex items-start justify-between p-4 border-b border-slate-200/80 bg-slate-50/70">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wide">
                  {selectedVehicle.assetNumber}
                </span>
                <Badge
                  variant={
                    selectedVehicle.status === 'in_transit'
                      ? 'cyan'
                      : selectedVehicle.status === 'delayed'
                      ? 'warning'
                      : selectedVehicle.status === 'charging'
                      ? 'success'
                      : 'neutral'
                  }
                  size="sm"
                  hasPulseDot={selectedVehicle.status === 'in_transit' || selectedVehicle.status === 'delayed'}
                >
                  {selectedVehicle.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-display mt-0.5 truncate">
                {selectedVehicle.name}
              </h3>
              <p className="text-xs text-slate-500 capitalize">
                {selectedVehicle.propulsion.replace('_', ' ')} • {selectedVehicle.mode}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close inspector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {/* Speed & Heading */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Telemetry Speed</div>
                <div className="text-base font-extrabold text-blue-600 font-display mt-0.5">
                  {selectedVehicle.speedKmh} <span className="text-xs font-normal text-slate-500">km/h</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Energy Level (SOC)</div>
                <div className="text-base font-extrabold text-emerald-600 font-display mt-0.5">
                  {selectedVehicle.energyLevelPercent}%
                </div>
              </div>
            </div>

            {/* Cargo & Assignment */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Cargo & Itinerary</div>
              <div className="font-bold text-slate-900">{selectedVehicle.cargoDescription}</div>
              <div className="text-slate-500 text-[11px]">
                Payload: <strong>{selectedVehicle.payloadWeightTons} tons</strong> • {selectedVehicle.originHubId} → {selectedVehicle.destinationHubId}
              </div>
              <div className="text-[10px] font-mono text-blue-600 pt-1">
                Driver: {selectedVehicle.assignedDriver}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 3. INSPECTING A CORRIDOR ROUTE */}
      {selectedRoute && (
        <>
          <div className="flex items-start justify-between p-4 border-b border-slate-200/80 bg-slate-50/70">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wide">
                  {selectedRoute.id}
                </span>
                <Badge
                  variant={
                    selectedRoute.status === 'optimal'
                      ? 'success'
                      : selectedRoute.status === 'congested'
                      ? 'warning'
                      : 'danger'
                  }
                  size="sm"
                >
                  {selectedRoute.status.toUpperCase()}
                </Badge>
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-display mt-0.5 truncate">
                {selectedRoute.name}
              </h3>
              <p className="text-xs text-slate-500 capitalize">
                {selectedRoute.mode} Corridor • {selectedRoute.sourceHubId} → {selectedRoute.targetHubId}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close inspector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Track Distance</div>
                <div className="text-base font-extrabold text-slate-900 font-display mt-0.5">
                  {selectedRoute.distanceKm.toLocaleString()} <span className="text-xs font-normal text-slate-500">km</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Transit Duration</div>
                <div className="text-base font-extrabold text-blue-600 font-display mt-0.5">
                  {selectedRoute.durationHours}h
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Carbon & Economics</div>
              <div className="text-slate-700 flex items-center justify-between">
                <span>GLEC Carbon Footprint</span>
                <span className="font-mono font-bold text-emerald-600">{selectedRoute.carbonEmissionKgCO2e} kg CO2e</span>
              </div>
              <div className="text-slate-700 flex items-center justify-between pt-1">
                <span>Active Consignments</span>
                <span className="font-mono font-bold text-blue-600">{selectedRoute.activeVehiclesCount} units</span>
              </div>
            </div>

            {selectedRoute.description && (
              <p className="text-slate-500 text-[11px] leading-relaxed italic">
                "{selectedRoute.description}"
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
