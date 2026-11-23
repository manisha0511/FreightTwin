export type TransportMode = 'road' | 'rail' | 'maritime' | 'air';

export type ShipmentStatus = 'in_transit' | 'delayed' | 'delivered' | 'customs_hold' | 'pending';

export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  mode: TransportMode;
  status: ShipmentStatus;
  carrier: string;
  cargoDescription: string;
  weightTons: number;
  departureTime: string;
  estimatedArrival: string;
  progressPercent: number;
  delayMinutes?: number;
  delayReason?: string;
  carbonEmissionKg: number;
  isHazardous?: boolean;
}

export interface TransportHub {
  id: string;
  name: string;
  code: string;
  type: 'port' | 'rail_terminal' | 'logistics_hub' | 'airport';
  coordinates: { x: number; y: number }; // Relative canvas % coordinates (0-100)
  status: 'nominal' | 'congested' | 'restricted';
  throughputTEU: number;
  activeVehicles: number;
  averageDwellHours: number;
}

export interface NetworkRouteLine {
  id: string;
  sourceHubId: string;
  targetHubId: string;
  mode: TransportMode;
  status: 'optimal' | 'congested' | 'delayed';
  distanceKm: number;
  activeShipmentCount: number;
}

export interface DashboardMetric {
  title: string;
  value: string | number;
  unit?: string;
  changePercent: number;
  changePeriodLabel: string;
  statusVariant: 'default' | 'success' | 'warning' | 'danger' | 'cyan';
  badgeText: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  type: 'milestone' | 'delay' | 'telemetry' | 'route' | 'maintenance';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'danger' | 'success';
  relatedEntityId?: string;
}

export interface DashboardAlert {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'danger';
  isRead: boolean;
  category: 'corridor' | 'customs' | 'reefer' | 'maintenance';
  actionLabel?: string;
}
