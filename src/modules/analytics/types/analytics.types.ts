// Analytics & Reports Domain Types
// FreightTwin Logistics Digital Twin Platform

import { TransportMode, FreightCategory } from '../../routing/types/routing.types';

export type DateRangePreset = 'last_30_days' | 'last_quarter' | 'ytd' | 'all_time';

export type ShipmentStatusFilter = 'all' | 'delivered' | 'in_transit' | 'delayed';

export interface AnalyticsFilterState {
  dateRange: DateRangePreset;
  transportMode: TransportMode;
  freightCategory: FreightCategory | 'all';
  shipmentStatus: ShipmentStatusFilter;
}

export interface AnalyticsKpiMetrics {
  totalShipments: number;
  totalShipmentsDeltaPct: number;
  
  onTimeDeliveryRate: number; // percentage, e.g. 94.2
  onTimeRateDeltaPct: number;
  
  avgTransitTimeHours: number;
  avgTransitTimeDeltaHours: number;
  
  totalTransportationCostUsd: number;
  totalCostDeltaPct: number;
  
  fleetUtilizationRate: number; // percentage, e.g. 88.5
  fleetUtilizationDeltaPct: number;
  
  estimatedEmissionsCO2eTons: number;
  emissionsAbatedCO2eTons: number; // emissions saved via rail/water shifts
  emissionsDeltaPct: number;
}

export interface MonthlyVolumeRecord {
  month: string;
  volume: number;
  onTimeDeliveries: number;
  delayedDeliveries: number;
  roadVolume: number;
  railVolume: number;
  airVolume: number;
  waterVolume: number;
}

export interface CostBreakdownRecord {
  period: string;
  totalCostUsd: number;
  fuelOrEnergyCostUsd: number;
  carrierLinehaulCostUsd: number;
  tollsAndAccessCostUsd: number;
  delaySurchargesUsd: number;
}

export interface RouteCorridorAnalytics {
  id: string;
  corridorName: string;
  originCity: string;
  destinationCity: string;
  primaryMode: TransportMode;
  totalShipmentsVolume: number;
  avgDistanceKm: number;
  avgTransitHours: number;
  onTimeRatePercent: number;
  efficiencyScore: number;
  costPerTonKm: number;
}

export interface DelayRootCauseRecord {
  cause: string;
  delayHours: number;
  incidentCount: number;
  pctShare: number;
  primaryAffectedMode: string;
}

export interface SustainabilityMetrics {
  totalEstimatedEmissionsKg: number;
  avgEmissionPerTonKmGrams: number;
  emissionsSavedByModalShiftKg: number;
  modeBreakdown: {
    roadKg: number;
    railKg: number;
    airKg: number;
    waterKg: number;
  };
  monthlyEmissionTrend: {
    month: string;
    actualEmissionsKg: number;
    targetBaselineKg: number;
  }[];
}

export type ReportType =
  | 'freight_performance'
  | 'transportation_cost'
  | 'route_efficiency'
  | 'sustainability';

export interface ReportItem {
  id: string;
  title: string;
  subtitle: string;
  type: ReportType;
  generatedDate: string;
  rowCount: number;
  fileSizeEstimate: string;
}
