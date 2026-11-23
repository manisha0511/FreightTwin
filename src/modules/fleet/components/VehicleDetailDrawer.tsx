import React from 'react';
import {
  X,
  Truck,
  MapPin,
  Compass,
  BatteryCharging,
  Fuel,
  User,
  Wrench,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Activity,
  CheckCircle2,
  FileText,
  Weight,
  Calendar,
  Zap,
} from 'lucide-react';
import { Badge, Button } from '../../../design-system';
import { FleetVehicle } from '../types/fleet.types';

export interface VehicleDetailDrawerProps {
  vehicle: FleetVehicle | null;
  onClose: () => void;
  onScheduleService?: (vehicleId: string) => void;
}

export const VehicleDetailDrawer: React.FC<VehicleDetailDrawerProps> = ({
  vehicle,
  onClose,
  onScheduleService,
}) => {
  if (!vehicle) return null;

  const isDelayed = vehicle.status === 'delayed';
  const isMaintenance = vehicle.status === 'maintenance';
  const isCharging = vehicle.status === 'charging';

  const formatVehicleTypeName = (type: FleetVehicle['vehicleType']) => {
    switch (type) {
      case 'heavy_truck_bev':
        return 'Battery Electric Heavy Tractor (BEV)';
      case 'heavy_truck_diesel':
        return 'Heavy Duty Clean Diesel Hauler';
      case 'heavy_truck_hydrogen':
        return 'Hydrogen Fuel Cell Heavy Hauler (FCEV)';
      case 'intermodal_train':
        return 'Intermodal Electric Freight Train';
      case 'container_vessel':
        return 'Coastal Container Feeder Vessel';
      case 'yard_hostler':
        return 'Terminal Yard Hostler (AGV Autonomous)';
      default:
        return type;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer (Right side) */}
      <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col text-left animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-start justify-between p-4.5 border-b border-slate-200 bg-slate-50">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-extrabold text-blue-600 uppercase tracking-wide">
                {vehicle.id}
              </span>
              <span className="text-slate-300 font-mono text-xs">•</span>
              <span className="text-xs font-mono font-semibold text-slate-500">
                {vehicle.registrationNumber}
              </span>
              <Badge
                variant={
                  vehicle.status === 'active'
                    ? 'cyan'
                    : vehicle.status === 'delayed'
                    ? 'warning'
                    : vehicle.status === 'maintenance'
                    ? 'danger'
                    : vehicle.status === 'charging'
                    ? 'success'
                    : 'neutral'
                }
                size="sm"
                hasPulseDot={vehicle.status === 'active' || vehicle.status === 'delayed'}
              >
                {vehicle.status.toUpperCase()}
              </Badge>
            </div>

            <h3 className="text-base font-bold text-slate-900 font-display">
              {vehicle.name}
            </h3>
            <p className="text-xs text-slate-500 leading-snug">
              {formatVehicleTypeName(vehicle.vehicleType)}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close vehicle details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4.5 space-y-4 text-xs">
          {/* Mock Data Integrity Disclaimer */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 font-mono flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Simulated Asset Diagnostics (Weibull Heuristic Model). No live OBD-II or GPS connection.</span>
          </div>

          {/* Delay alert banner if vehicle is delayed */}
          {isDelayed && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Corridor Exception: +{vehicle.delayMinutes} mins delay</span>
              </div>
              <p className="text-[11px] text-amber-700 leading-relaxed pl-5">
                {vehicle.delayReason || 'Operational delay encountered on assigned corridor.'}
              </p>
            </div>
          )}

          {/* Key Metrics Dashboard (Speed, Energy, Health Score, Odometer) */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Live Telemetry Speed</div>
              <div className="text-lg font-extrabold text-blue-600 font-display mt-0.5">
                {vehicle.speedKmh} <span className="text-xs font-normal text-slate-400">km/h</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 capitalize">
                Status: {vehicle.status.replace('_', ' ')}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono uppercase font-bold text-slate-400 flex items-center gap-1">
                {vehicle.propulsion === 'battery_electric' ? (
                  <Zap className="w-3.5 h-3.5 text-cyan-600" />
                ) : (
                  <Fuel className="w-3.5 h-3.5 text-amber-600" />
                )}
                <span>Energy Gauge (SOC)</span>
              </div>
              <div className="text-lg font-extrabold text-emerald-600 font-display mt-0.5">
                {vehicle.energyLevelPercent}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 capitalize">
                Propulsion: {vehicle.propulsion.replace('_', ' ')}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Overall Health Score</div>
              <div className="text-lg font-extrabold text-slate-900 font-display mt-0.5">
                {vehicle.healthScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Predictive RUL: Nominal
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Total Odometer</div>
              <div className="text-lg font-extrabold text-slate-900 font-display mt-0.5">
                {vehicle.odometerKm.toLocaleString()} <span className="text-xs font-normal text-slate-400 font-sans">km</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Updated: {vehicle.lastUpdated}
              </div>
            </div>
          </div>

          {/* Current Location & Assigned Route Card */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                Spatial Location & Route
              </span>
              <span className="text-[10px] font-mono font-bold text-blue-600">
                {vehicle.assignedRoute.originCode} → {vehicle.assignedRoute.destCode}
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900">{vehicle.currentLocation.hubName}</div>
                <div className="text-[11px] text-slate-600">{vehicle.currentLocation.city}, {vehicle.currentLocation.stateCountry}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  GPS: {vehicle.currentLocation.lat.toFixed(4)}, {vehicle.currentLocation.lng.toFixed(4)}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-slate-600 font-medium">{vehicle.assignedRoute.name}</span>
                <span className="font-mono font-bold text-blue-600">{vehicle.assignedRoute.progressPercent}% Completed</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                  style={{ width: `${vehicle.assignedRoute.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Capacity & Active Payload Specification */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
              Cargo & Load Capacity
            </span>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="text-[9px] uppercase font-mono font-bold text-slate-400">Max Payload</div>
                <div className="text-xs font-extrabold text-slate-900 font-display mt-0.5">
                  {vehicle.capacity.maxPayloadTons}t
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="text-[9px] uppercase font-mono font-bold text-slate-400">Current Load</div>
                <div className="text-xs font-extrabold text-blue-600 font-display mt-0.5">
                  {vehicle.currentPayloadTons}t
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="text-[9px] uppercase font-mono font-bold text-slate-400">Tare Weight</div>
                <div className="text-xs font-bold text-slate-600 font-display mt-0.5">
                  {vehicle.capacity.tareWeightTons}t
                </div>
              </div>
            </div>

            <div className="pt-1 text-[11px] text-slate-600">
              <strong className="text-slate-900">Cargo Manifest:</strong> {vehicle.cargoDescription}
            </div>
          </div>

          {/* Subsystem Health Degradation Diagnostics */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                Subsystem Wear & Degradation
              </span>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">PREDICTIVE SENSORS</span>
            </div>

            <div className="space-y-2">
              {vehicle.subsystems.map((sub, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-800 font-semibold">{sub.name}</span>
                    <span
                      className={`font-mono text-[10px] font-bold ${
                        sub.status === 'nominal'
                          ? 'text-emerald-600'
                          : sub.status === 'warning'
                          ? 'text-amber-600'
                          : 'text-red-600'
                      }`}
                    >
                      {sub.wearPercent}% Wear ({sub.status.toUpperCase()})
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        sub.status === 'nominal'
                          ? 'bg-emerald-500'
                          : sub.status === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${sub.wearPercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {vehicle.maintenanceNotes && (
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                <strong className="text-slate-900">Technician Notes:</strong> {vehicle.maintenanceNotes}
              </div>
            )}

            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 font-mono">
              <span>Next Scheduled Overhaul:</span>
              <span className="text-slate-900 font-bold">{vehicle.nextMaintenanceDate}</span>
            </div>
          </div>

          {/* Assigned Driver Details */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white border border-slate-200 text-blue-600 shadow-xs">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">{vehicle.assignedDriver.name}</div>
                <div className="text-[10px] text-slate-500 font-mono">{vehicle.assignedDriver.licenseCategory}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">HOS Shift Remaining</div>
              <div className="text-xs font-extrabold font-mono text-blue-600 mt-0.5">
                {vehicle.assignedDriver.shiftHoursRemaining} hrs
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Action Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          <div className="flex items-center gap-2">
            {onScheduleService && (
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Wrench className="w-3.5 h-3.5" />}
                onClick={() => onScheduleService(vehicle.id)}
              >
                Log Work Order
              </Button>
            )}
            <Button
              variant="primary"
              size="sm"
              onClick={() => alert(`Digital Twin telematics synchronized for asset ${vehicle.id}.`)}
            >
              Sync Asset Twin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
