// Route Planning & Transport Simulation Type Definitions
// FreightTwin Logistics Digital Twin Platform

export type TransportMode = 'all' | 'road' | 'rail' | 'air' | 'water';

export type FreightCategory =
  | 'general_dry'
  | 'reefer_cold_chain'
  | 'hazmat_adr'
  | 'heavy_industrial'
  | 'high_value_express';

export type RouteStatusType = 'optimal' | 'fast' | 'eco_saver' | 'budget' | 'congested';

export interface RouteWaypoint {
  name: string;
  city: string;
  x: number; // 0-100% SVG coordinate
  y: number; // 0-100% SVG coordinate
  lat: number;
  lng: number;
  type: 'origin' | 'destination' | 'intermodal_hub' | 'waypoint' | 'checkpoint';
}

export interface RouteAlternative {
  id: string;
  name: string;
  code: string;
  originId: string;
  originName: string;
  destinationId: string;
  destinationName: string;
  primaryMode: TransportMode;
  modesInvolved: TransportMode[];
  status: RouteStatusType;
  statusLabel: string;
  statusBadgeVariant: 'cyan' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  
  // Baseline Metrics
  distanceKm: number;
  durationHours: number;
  estimatedCostUsd: number;
  carbonEmissionKgCO2e: number;
  reliabilityScorePercent: number;
  
  // Route details
  intermediateStopsCount: number;
  transshipmentPoints: string[];
  waypoints: RouteWaypoint[];
  
  // Trade-off Analysis
  advantages: string[];
  disadvantages: string[];
  recommendedFor: string;
}

export interface RoutePlanningInput {
  originHubId: string;
  destinationHubId: string;
  preferredMode: TransportMode;
  freightCategory: FreightCategory;
  shipmentWeightTons: number;
}

// Transport Simulation Scenarios
export type SimulationScenarioId =
  | 'normal_traffic'
  | 'heavy_traffic'
  | 'route_disruption'
  | 'increased_demand'
  | 'alternative_route';

export interface SimulationScenarioConfig {
  id: SimulationScenarioId;
  name: string;
  tagline: string;
  description: string;
  severity: 'nominal' | 'moderate' | 'critical' | 'informational';
  timeMultiplier: number;
  costMultiplier: number;
  distanceMultiplier: number; // > 1 only if detour
  efficiencyMultiplier: number;
  typicalDelayHours: number;
  factorsExplanation: string[];
}

export interface SimulationResultMetrics {
  scenarioId: SimulationScenarioId;
  scenarioName: string;
  
  // Baseline metrics
  baselineDistanceKm: number;
  baselineDurationHours: number;
  baselineCostUsd: number;
  baselineEfficiencyScore: number;
  
  // Simulated updated metrics
  simulatedDistanceKm: number;
  simulatedDurationHours: number;
  simulatedCostUsd: number;
  simulatedEfficiencyScore: number;
  
  // Calculated deltas
  delayHours: number;
  costDeltaUsd: number;
  costDeltaPercent: number;
  distanceDeltaKm: number;
  efficiencyDeltaPercent: number;
  
  // Cost breakdown
  costBreakdown: {
    fuelOrEnergy: number;
    carrierLinehaul: number;
    tollsAndAccessFees: number;
    delayOrCongestionSurcharges: number;
  };
  
  summaryNarrative: string;
}
