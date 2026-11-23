export type VehicleType =
  | 'heavy_truck_bev'
  | 'heavy_truck_diesel'
  | 'heavy_truck_hydrogen'
  | 'intermodal_train'
  | 'container_vessel'
  | 'yard_hostler';

export type PropulsionType =
  | 'battery_electric'
  | 'diesel_ice'
  | 'hydrogen_fuel_cell'
  | 'lng';

export type VehicleStatus =
  | 'active'
  | 'idle'
  | 'maintenance'
  | 'charging'
  | 'delayed';

export interface SubsystemHealth {
  name: string;
  wearPercent: number; // 0 = New, 100 = Critical Failure
  status: 'nominal' | 'warning' | 'critical';
  lastInspected: string;
}

export interface FleetVehicle {
  id: string;
  name: string;
  vehicleType: VehicleType;
  registrationNumber: string;
  vin: string;
  propulsion: PropulsionType;
  status: VehicleStatus;
  currentLocation: {
    hubId: string;
    hubName: string;
    city: string;
    stateCountry: string;
    lat: number;
    lng: number;
  };
  assignedRoute: {
    id: string;
    name: string;
    originCode: string;
    destCode: string;
    distanceKm: number;
    progressPercent: number;
  };
  assignedDriver: {
    id: string;
    name: string;
    contact: string;
    licenseCategory: string;
    shiftHoursRemaining: number;
  };
  capacity: {
    maxPayloadTons: number;
    tareWeightTons: number;
    volumeCbm: number;
  };
  currentPayloadTons: number;
  cargoDescription: string;
  energyLevelPercent: number; // Battery SOC or Fuel level
  speedKmh: number;
  odometerKm: number;
  healthScore: number; // 0 - 100
  subsystems: SubsystemHealth[];
  lastUpdated: string;
  nextMaintenanceDate: string;
  maintenanceNotes?: string;
  delayMinutes?: number;
  delayReason?: string;
}

export interface FleetSummaryStats {
  totalVehicles: number;
  activeVehicles: number;
  idleVehicles: number;
  maintenanceVehicles: number;
  chargingVehicles: number;
  delayedVehicles: number;
  averageHealthScore: number;
  averageEnergyLevel: number;
}

export interface FleetFilterState {
  searchQuery: string;
  statusFilter: 'all' | VehicleStatus;
  typeFilter: 'all' | VehicleType;
  sortField: 'id' | 'type' | 'registration' | 'status' | 'updated' | 'payload' | 'health';
  sortDirection: 'asc' | 'desc';
}
