import {
  RouteAlternative,
  SimulationScenarioConfig,
  FreightCategory,
  TransportMode,
} from '../types/routing.types';

export const MOCK_ROUTING_DISCLAIMER =
  'Simulated Planning & Heuristic Models: Route paths, durations, rates, and scenario estimates are generated using deterministic mock calculations. No live GPS traffic feeds, carrier spot markets, or toll authority APIs are queried.';

export interface PlanningHubOption {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
  x: number; // 0-100% SVG coordinates matching DigitalTwinMap
  y: number;
  lat: number;
  lng: number;
  supportedModes: TransportMode[];
}

export const MOCK_PLANNING_HUBS: PlanningHubOption[] = [
  {
    id: 'HUB-LAX',
    name: 'Port of Los Angeles (Pier 400)',
    code: 'LAX-09',
    city: 'Los Angeles',
    state: 'CA',
    x: 16,
    y: 64,
    lat: 33.7432,
    lng: -118.2673,
    supportedModes: ['road', 'rail', 'water'],
  },
  {
    id: 'HUB-CHI',
    name: 'Chicago Intermodal Logistics Hub',
    code: 'CHI-01',
    city: 'Chicago',
    state: 'IL',
    x: 58,
    y: 36,
    lat: 41.8781,
    lng: -87.6298,
    supportedModes: ['road', 'rail', 'air'],
  },
  {
    id: 'HUB-NYC',
    name: 'New York / Newark Distribution Hub',
    code: 'NYC-04',
    city: 'Newark',
    state: 'NJ',
    x: 84,
    y: 34,
    lat: 40.7357,
    lng: -74.1724,
    supportedModes: ['road', 'rail', 'water', 'air'],
  },
  {
    id: 'HUB-DFW',
    name: 'Alliance Texas Logistics Warehouse',
    code: 'DFW-02',
    city: 'Fort Worth',
    state: 'TX',
    x: 49,
    y: 72,
    lat: 32.9859,
    lng: -97.3168,
    supportedModes: ['road', 'rail', 'air'],
  },
  {
    id: 'HUB-SEA',
    name: 'Seattle Pacific Gateway Terminal',
    code: 'SEA-07',
    city: 'Seattle',
    state: 'WA',
    x: 14,
    y: 16,
    lat: 47.6062,
    lng: -122.3321,
    supportedModes: ['road', 'rail', 'water'],
  },
  {
    id: 'HUB-ATL',
    name: 'Atlanta Inland Southeast Distribution Park',
    code: 'ATL-05',
    city: 'Atlanta',
    state: 'GA',
    x: 72,
    y: 66,
    lat: 33.749,
    lng: -84.388,
    supportedModes: ['road', 'rail', 'air'],
  },
  {
    id: 'HUB-DEN',
    name: 'Denver Rocky Mountain Cross-Dock',
    code: 'DEN-03',
    city: 'Denver',
    state: 'CO',
    x: 37,
    y: 44,
    lat: 39.7392,
    lng: -104.9903,
    supportedModes: ['road', 'rail'],
  },
];

export const FREIGHT_CATEGORY_DETAILS: Record<
  FreightCategory,
  { label: string; costMultiplier: number; description: string }
> = {
  general_dry: {
    label: 'General Dry Van (Standard Container)',
    costMultiplier: 1.0,
    description: 'Ambient goods, manufactured dry merchandise, non-perishable packages.',
  },
  reefer_cold_chain: {
    label: 'Temperature-Controlled Reefer (-20°C to +4°C)',
    costMultiplier: 1.35,
    description: 'Chilled perishables, pharmaceuticals, dairy, deep-frozen proteins.',
  },
  hazmat_adr: {
    label: 'Hazardous Materials (Hazmat / ADR Class 3/8)',
    costMultiplier: 1.6,
    description: 'Regulated chemical solvents, flammable liquids, industrial batteries.',
  },
  heavy_industrial: {
    label: 'Heavy Industrial & Machinery (Oversized/Bulk)',
    costMultiplier: 1.45,
    description: 'Structural steel components, earth-moving equipment, bulk raw minerals.',
  },
  high_value_express: {
    label: 'High-Value Security Express (Bonded)',
    costMultiplier: 1.5,
    description: 'Semiconductors, luxury goods, aerospace components with GPS seal locking.',
  },
};

// Route alternatives connecting key corridors (LA to Chicago as reference baseline, plus adaptable generator)
export const MOCK_ROUTE_ALTERNATIVES: RouteAlternative[] = [
  {
    id: 'ALT-OPT-01',
    name: 'Electrified Intermodal Rail Trunk (Southern Transcon)',
    code: 'TRANSCON-RAIL',
    originId: 'HUB-LAX',
    originName: 'Port of Los Angeles (Pier 400)',
    destinationId: 'HUB-CHI',
    destinationName: 'Chicago Intermodal Logistics Hub',
    primaryMode: 'rail',
    modesInvolved: ['rail', 'road'],
    status: 'optimal',
    statusLabel: 'Balanced Best Choice',
    statusBadgeVariant: 'cyan',
    distanceKm: 3360,
    durationHours: 48.5,
    estimatedCostUsd: 2840,
    carbonEmissionKgCO2e: 840,
    reliabilityScorePercent: 96,
    intermediateStopsCount: 2,
    transshipmentPoints: ['Flagstaff Rail Siding', 'Kansas City Intermodal Ramp'],
    waypoints: [
      { name: 'Port of LA Pier 400', city: 'Los Angeles', x: 16, y: 64, lat: 33.74, lng: -118.26, type: 'origin' },
      { name: 'Flagstaff Siding', city: 'Flagstaff', x: 26, y: 58, lat: 35.19, lng: -111.65, type: 'waypoint' },
      { name: 'Kansas City Ramp', city: 'Kansas City', x: 48, y: 44, lat: 39.09, lng: -94.57, type: 'intermodal_hub' },
      { name: 'Chicago Intermodal Yard', city: 'Chicago', x: 58, y: 36, lat: 41.87, lng: -87.62, type: 'destination' },
    ],
    advantages: [
      'Lowest carbon footprint (-64% vs all-road freight)',
      'Highly resistant to highway weather disruptions',
      'Consistent scheduled velocity across Class-1 double-stack corridors',
      'Lowest cost per ton-kilometer for heavy and bulk shipments',
    ],
    disadvantages: [
      'Longer dwell time at intermodal rail transfer ramp (+3.5 hours)',
      'Requires last-mile drayage truck connection in Chicago',
      'Fixed daily train departure windows',
    ],
    recommendedFor: 'Best overall balance of cost, carbon reduction, and predictable schedule.',
  },
  {
    id: 'ALT-HWY-02',
    name: 'Interstate Highway I-40 Express Drayage (Team Drivers)',
    code: 'I40-EXPRESS',
    originId: 'HUB-LAX',
    originName: 'Port of Los Angeles (Pier 400)',
    destinationId: 'HUB-CHI',
    destinationName: 'Chicago Intermodal Logistics Hub',
    primaryMode: 'road',
    modesInvolved: ['road'],
    status: 'fast',
    statusLabel: 'Fastest Transit',
    statusBadgeVariant: 'info',
    distanceKm: 3410,
    durationHours: 35.0,
    estimatedCostUsd: 4620,
    carbonEmissionKgCO2e: 2320,
    reliabilityScorePercent: 91,
    intermediateStopsCount: 3,
    transshipmentPoints: ['Barstow Logistics Plaza', 'Albuquerque Fuel Terminal', 'St. Louis Gateway'],
    waypoints: [
      { name: 'Port of LA Pier 400', city: 'Los Angeles', x: 16, y: 64, lat: 33.74, lng: -118.26, type: 'origin' },
      { name: 'Barstow Plaza', city: 'Barstow', x: 20, y: 61, lat: 34.89, lng: -117.02, type: 'waypoint' },
      { name: 'Albuquerque Terminal', city: 'Albuquerque', x: 33, y: 60, lat: 35.08, lng: -106.65, type: 'waypoint' },
      { name: 'Oklahoma City Hub', city: 'Oklahoma City', x: 44, y: 59, lat: 35.46, lng: -97.51, type: 'waypoint' },
      { name: 'Chicago Intermodal Yard', city: 'Chicago', x: 58, y: 36, lat: 41.87, lng: -87.62, type: 'destination' },
    ],
    advantages: [
      'Fastest transit time (13.5 hours faster than rail alternative)',
      'Direct door-to-door without intermediate intermodal container transfer',
      'Continuous real-time temperature telemetry for Cold Chain Reefer',
      'Flexible dispatch on-demand without train departure cutoffs',
    ],
    disadvantages: [
      '+176% higher carbon emissions penalty',
      '+62% higher total freight cost due to team driver rates and fuel burn',
      'Susceptible to interstate road maintenance and metro congestion',
    ],
    recommendedFor: 'Time-critical shipments, urgent just-in-time components, and fresh perishables.',
  },
  {
    id: 'ALT-ECO-03',
    name: 'Green Corridor Rail & Short-Sea Coastal Feeder',
    code: 'GREEN-CORRIDOR',
    originId: 'HUB-LAX',
    originName: 'Port of Los Angeles (Pier 400)',
    destinationId: 'HUB-CHI',
    destinationName: 'Chicago Intermodal Logistics Hub',
    primaryMode: 'rail',
    modesInvolved: ['rail', 'water'],
    status: 'eco_saver',
    statusLabel: 'Lowest Carbon Footprint',
    statusBadgeVariant: 'success',
    distanceKm: 3490,
    durationHours: 54.0,
    estimatedCostUsd: 2650,
    carbonEmissionKgCO2e: 620,
    reliabilityScorePercent: 94,
    intermediateStopsCount: 2,
    transshipmentPoints: ['Tucson Eco-Park', 'Des Moines Green Transload'],
    waypoints: [
      { name: 'Port of LA Pier 400', city: 'Los Angeles', x: 16, y: 64, lat: 33.74, lng: -118.26, type: 'origin' },
      { name: 'Tucson Eco-Park', city: 'Tucson', x: 28, y: 68, lat: 32.22, lng: -110.97, type: 'intermodal_hub' },
      { name: 'Des Moines Green Transload', city: 'Des Moines', x: 51, y: 39, lat: 41.58, lng: -93.62, type: 'intermodal_hub' },
      { name: 'Chicago Intermodal Yard', city: 'Chicago', x: 58, y: 36, lat: 41.87, lng: -87.62, type: 'destination' },
    ],
    advantages: [
      'Maximum ESG compliance (qualifies for Scope 3 low-emission rebates)',
      'Lowest overall monetary cost ($2,650 baseline)',
      'Priority green slotting at municipal eco-depots',
    ],
    disadvantages: [
      'Longest transit duration (54.0 hours)',
      'Limited daily equipment allocation for low-emission rail cars',
    ],
    recommendedFor: 'Cost-sensitive consignments and enterprise shippers with aggressive ESG net-zero mandates.',
  },
  {
    id: 'ALT-AIR-04',
    name: 'High-Speed Air Cargo Freighter Arc (B777-F)',
    code: 'AIR-FREIGHT-ARC',
    originId: 'HUB-LAX',
    originName: 'Port of Los Angeles (Pier 400)',
    destinationId: 'HUB-CHI',
    destinationName: 'Chicago Intermodal Logistics Hub',
    primaryMode: 'air',
    modesInvolved: ['air', 'road'],
    status: 'budget',
    statusLabel: 'Ultra-Fast Cargo Flight',
    statusBadgeVariant: 'info',
    distanceKm: 2820,
    durationHours: 6.5,
    estimatedCostUsd: 7950,
    carbonEmissionKgCO2e: 4890,
    reliabilityScorePercent: 98,
    intermediateStopsCount: 1,
    transshipmentPoints: ['Chicago O’Hare Cargo Transfer'],
    waypoints: [
      { name: 'Port of LA Pier 400', city: 'Los Angeles', x: 16, y: 64, lat: 33.74, lng: -118.26, type: 'origin' },
      { name: 'LAX Air Cargo Ramp', city: 'Los Angeles', x: 17, y: 63, lat: 33.94, lng: -118.4, type: 'intermodal_hub' },
      { name: 'O’Hare Air Cargo Ramp', city: 'Chicago', x: 57, y: 34, lat: 41.97, lng: -87.9, type: 'intermodal_hub' },
      { name: 'Chicago Intermodal Yard', city: 'Chicago', x: 58, y: 36, lat: 41.87, lng: -87.62, type: 'destination' },
    ],
    advantages: [
      'Same-day express delivery within 6.5 hours door-to-ramp',
      '98% on-time flight schedule reliability',
      'Maximum physical cargo protection and sealed pallet tracking',
    ],
    disadvantages: [
      'Highest freight rate ($7,950)',
      'Heavy carbon footprint (+482% vs rail)',
      'Weight restrictions on oversized or hazardous cargo categories',
    ],
    recommendedFor: 'Critical semiconductor wafers, emergency replacement parts, and biological supplies.',
  },
];

// Transport Simulation Scenarios Configuration
export const SIMULATION_SCENARIOS: SimulationScenarioConfig[] = [
  {
    id: 'normal_traffic',
    name: 'Normal Traffic (Baseline)',
    tagline: 'Standard Operational Baseline',
    description:
      'Nominal weather conditions, standard highway flow, and scheduled rail dispatch slots with zero incident delays.',
    severity: 'nominal',
    timeMultiplier: 1.0,
    costMultiplier: 1.0,
    distanceMultiplier: 1.0,
    efficiencyMultiplier: 1.0,
    typicalDelayHours: 0.0,
    factorsExplanation: [
      'Standard volume-to-capacity (V/C) ratio of 0.52',
      'Average highway speed maintained at nominal 98 km/h',
      'Zero terminal gate queues or demurrage charges',
    ],
  },
  {
    id: 'heavy_traffic',
    name: 'Heavy Traffic Congestion',
    tagline: 'Peak Choke-Point Bottlenecks',
    description:
      'Major urban corridor congestion, interstate construction slowdowns, and extended highway transit times.',
    severity: 'moderate',
    timeMultiplier: 1.28, // +28% duration
    costMultiplier: 1.16, // +16% cost (fuel idling & driver overtime)
    distanceMultiplier: 1.0, // Same distance
    efficiencyMultiplier: 0.82, // -18% efficiency
    typicalDelayHours: 9.8,
    factorsExplanation: [
      'Corridor volume-to-capacity ratio surges to 0.91',
      'Stop-and-go diesel idling increases fuel burn by +22%',
      'Driver Hours-of-Service (HOS) rest break penalties triggered',
    ],
  },
  {
    id: 'route_disruption',
    name: 'Route Disruption (Detour Required)',
    tagline: 'Severe Weather / Corridor Closure',
    description:
      'Interstate mountain pass closure or rail switch freeze forcing a mandatory 380 km southern regional detour.',
    severity: 'critical',
    timeMultiplier: 1.45, // +45% duration
    costMultiplier: 1.32, // +32% cost
    distanceMultiplier: 1.15, // +15% distance detour
    efficiencyMultiplier: 0.65, // -35% efficiency
    typicalDelayHours: 15.5,
    factorsExplanation: [
      '+15% detour distance (+450 km) around closed mountain pass',
      'Additional municipal tolls and secondary route transit fees',
      'Supply chain buffer exhaustion warning',
    ],
  },
  {
    id: 'increased_demand',
    name: 'Increased Freight Demand (Peak Surge)',
    tagline: 'Terminal Congestion & Capacity Crunch',
    description:
      'Seasonal pre-holiday freight volume spike causing cross-dock yard queuing and carrier spot-rate surcharges.',
    severity: 'moderate',
    timeMultiplier: 1.14, // +14% duration (yard queuing)
    costMultiplier: 1.38, // +38% cost (carrier demand premium)
    distanceMultiplier: 1.0,
    efficiencyMultiplier: 0.78,
    typicalDelayHours: 4.8,
    factorsExplanation: [
      'Carrier tender rejection rate doubles due to equipment shortage',
      'Intermodal terminal gate wait time extends from 20m to 140m',
      'Spot rate surge pricing applied to linehaul contracts',
    ],
  },
  {
    id: 'alternative_route',
    name: 'Alternative Multimodal Route',
    tagline: 'Dynamic Modal Shift & Bypass',
    description:
      'Simulates shifting highway cargo onto the electrified rail corridor to completely circumvent highway delays.',
    severity: 'informational',
    timeMultiplier: 1.08, // slight schedule buffer for rail
    costMultiplier: 0.88, // -12% cost savings
    distanceMultiplier: 0.98, // optimized rail alignment
    efficiencyMultiplier: 0.96, // 96% optimal efficiency
    typicalDelayHours: 1.2,
    factorsExplanation: [
      'Bypasses congested interstate choke-points via rail right-of-way',
      '12% financial savings through consolidated bulk freight rail',
      '-54% carbon footprint reduction compared to highway drayage',
    ],
  },
];
