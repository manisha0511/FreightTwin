export type HubType = 'port' | 'rail_terminal' | 'warehouse' | 'distribution_center' | 'airport';

export type TransportMode = 'road' | 'rail' | 'maritime' | 'air';

export type VehicleStatus = 'in_transit' | 'delayed' | 'charging' | 'loading' | 'maintenance' | 'idle';

export type CorridorStatus = 'optimal' | 'congested' | 'blocked' | 'delayed' | 'alternative';

export interface GeoPoint {
  x: number; // Normalized coordinate percentage (0 - 100)
  y: number; // Normalized coordinate percentage (0 - 100)
  lat: number;
  lng: number;
}

export interface MapHub {
  id: string;
  name: string;
  code: string;
  type: HubType;
  location: GeoPoint;
  city: string;
  stateCountry: string;
  status: 'nominal' | 'congested' | 'restricted';
  capacityTEUorTons: number;
  currentThroughputTEU: number;
  averageDwellHours: number;
  activeVehiclesCount: number;
  gateQueueMinutes: number;
  contactChannel?: string;
  operatingHours?: string;
}

export interface MapVehicle {
  id: string;
  assetNumber: string;
  name: string;
  mode: TransportMode;
  propulsion: 'diesel_ice' | 'battery_electric' | 'hydrogen_fuel_cell' | 'lng';
  status: VehicleStatus;
  speedKmh: number;
  headingDegrees: number;
  currentLocation: GeoPoint;
  originHubId: string;
  destinationHubId: string;
  activeConsignmentId: string;
  cargoDescription: string;
  payloadWeightTons: number;
  energyLevelPercent: number; // Fuel or Battery SOC
  assignedDriver: string;
  odometerKm: number;
  delayMinutes?: number;
  delayReason?: string;
}

export interface MapRoute {
  id: string;
  name: string;
  sourceHubId: string;
  targetHubId: string;
  mode: TransportMode;
  status: CorridorStatus;
  isAlternative?: boolean;
  distanceKm: number;
  durationHours: number;
  carbonEmissionKgCO2e: number;
  activeVehiclesCount: number;
  averageSpeedKmh: number;
  tollCostUsd: number;
  waypoints: GeoPoint[];
  description?: string;
}

export interface MapFilterState {
  showVehicles: boolean;
  showWarehouses: boolean;
  showActiveRoutes: boolean;
  showAlternativeRoutes: boolean;
  showDelayedOnly: boolean;
  modeFilter?: 'all' | 'road' | 'rail' | 'maritime' | 'air';
}

export interface NetworkSummaryStats {
  totalHubs: number;
  activeVehicles: number;
  activeCorridors: number;
  alternativeCorridors: number;
  totalNetworkKm: number;
  delayedExceptions: number;
  avgNetworkFlowEfficiency: number;
  totalCarbonSavedKg: number;
}
