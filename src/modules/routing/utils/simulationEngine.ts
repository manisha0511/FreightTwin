import {
  RouteAlternative,
  SimulationScenarioConfig,
  SimulationResultMetrics,
  FreightCategory,
  RouteWaypoint,
} from '../types/routing.types';
import {
  MOCK_PLANNING_HUBS,
  FREIGHT_CATEGORY_DETAILS,
  MOCK_ROUTE_ALTERNATIVES,
  SIMULATION_SCENARIOS,
} from '../data/mockRoutingData';

// Generate dynamic route alternatives between any selected Origin and Destination hubs
export function generateRouteAlternatives(
  originHubId: string,
  destinationHubId: string,
  category: FreightCategory = 'general_dry',
  weightTons: number = 22
): RouteAlternative[] {
  const origin = MOCK_PLANNING_HUBS.find((h) => h.id === originHubId) || MOCK_PLANNING_HUBS[0];
  const dest = MOCK_PLANNING_HUBS.find((h) => h.id === destinationHubId) || MOCK_PLANNING_HUBS[1];

  // Calculate approximate Euclidean distance on SVG map scale, converted to km
  const dx = dest.x - origin.x;
  const dy = dest.y - origin.y;
  const mapDistance = Math.sqrt(dx * dx + dy * dy);
  
  // Calibrate mapDistance: 1 unit ~ 60 km
  const baseDistanceKm = Math.max(350, Math.round(mapDistance * 62));
  const categoryMultiplier = FREIGHT_CATEGORY_DETAILS[category]?.costMultiplier || 1.0;
  const weightFactor = 1 + (weightTons - 10) * 0.015; // +1.5% cost per ton above 10t

  // Waypoints helper
  const createWaypoints = (
    midPoints: { xRatio: number; yRatio: number; name: string; city: string; type: RouteWaypoint['type'] }[]
  ): RouteWaypoint[] => {
    const list: RouteWaypoint[] = [
      {
        name: origin.name,
        city: origin.city,
        x: origin.x,
        y: origin.y,
        lat: origin.lat,
        lng: origin.lng,
        type: 'origin',
      },
    ];

    midPoints.forEach((pt) => {
      list.push({
        name: pt.name,
        city: pt.city,
        x: Math.round(origin.x + (dest.x - origin.x) * pt.xRatio),
        y: Math.round(origin.y + (dest.y - origin.y) * pt.yRatio),
        lat: +(origin.lat + (dest.lat - origin.lat) * pt.xRatio).toFixed(2),
        lng: +(origin.lng + (dest.lng - origin.lng) * pt.xRatio).toFixed(2),
        type: pt.type,
      });
    });

    list.push({
      name: dest.name,
      city: dest.city,
      x: dest.x,
      y: dest.y,
      lat: dest.lat,
      lng: dest.lng,
      type: 'destination',
    });

    return list;
  };

  // Alternative 1: Balanced Intermodal Rail
  const alt1Distance = baseDistanceKm;
  const alt1Hours = +(baseDistanceKm / 70 + 4).toFixed(1); // 70 km/h rail + 4h transfer
  const alt1Cost = Math.round(baseDistanceKm * 0.85 * categoryMultiplier * weightFactor);
  const alt1Emissions = Math.round(baseDistanceKm * weightTons * 0.018);

  // Alternative 2: Direct Highway Trucking
  const alt2Distance = Math.round(baseDistanceKm * 1.05);
  const alt2Hours = +(alt2Distance / 95 + 1.5).toFixed(1); // 95 km/h truck + 1.5h breaks
  const alt2Cost = Math.round(alt2Distance * 1.35 * categoryMultiplier * weightFactor);
  const alt2Emissions = Math.round(alt2Distance * weightTons * 0.075);

  // Alternative 3: Eco Green Corridor
  const alt3Distance = Math.round(baseDistanceKm * 1.08);
  const alt3Hours = +(alt3Distance / 65 + 6).toFixed(1);
  const alt3Cost = Math.round(alt3Distance * 0.78 * categoryMultiplier * weightFactor);
  const alt3Emissions = Math.round(alt3Distance * weightTons * 0.012);

  // Alternative 4: Air Cargo Express Arc
  const alt4Distance = Math.round(baseDistanceKm * 0.88);
  const alt4Hours = +(alt4Distance / 750 + 3.0).toFixed(1); // 750 km/h flight + 3h ramp
  const alt4Cost = Math.round(alt4Distance * 2.85 * categoryMultiplier * weightFactor);
  const alt4Emissions = Math.round(alt4Distance * weightTons * 0.22);

  return [
    {
      id: `ALT-OPT-${origin.code}-${dest.code}`,
      name: `Electrified Intermodal Rail (${origin.city} to ${dest.city})`,
      code: 'TRANSCON-RAIL',
      originId: origin.id,
      originName: origin.name,
      destinationId: dest.id,
      destinationName: dest.name,
      primaryMode: 'rail',
      modesInvolved: ['rail', 'road'],
      status: 'optimal',
      statusLabel: 'Balanced Best Choice',
      statusBadgeVariant: 'cyan',
      distanceKm: alt1Distance,
      durationHours: Number(alt1Hours),
      estimatedCostUsd: alt1Cost,
      carbonEmissionKgCO2e: alt1Emissions,
      reliabilityScorePercent: 96,
      intermediateStopsCount: 2,
      transshipmentPoints: ['Midwest Logistics Interchange', 'Central Intermodal Ramp'],
      waypoints: createWaypoints([
        { xRatio: 0.35, yRatio: 0.3, name: 'Western Staging Yard', city: 'Transit Hub A', type: 'waypoint' },
        { xRatio: 0.7, yRatio: 0.65, name: 'Central Intermodal Ramp', city: 'Transit Hub B', type: 'intermodal_hub' },
      ]),
      advantages: [
        'Lowest carbon footprint (-64% vs all-road freight)',
        'Resistant to highway weather disruptions and congestion',
        'Consistent scheduled velocity across Class-1 double-stack corridors',
        'Lowest cost per ton-kilometer for standard containerized freight',
      ],
      disadvantages: [
        'Requires intermediate intermodal rail transfer (+3.5 hours dwell)',
        'Fixed daily train departure schedules',
      ],
      recommendedFor: 'Best overall balance of cost, carbon reduction, and predictable schedule.',
    },
    {
      id: `ALT-HWY-${origin.code}-${dest.code}`,
      name: `Direct Interstate Highway (${origin.city} to ${dest.city})`,
      code: 'DIRECT-HIGHWAY',
      originId: origin.id,
      originName: origin.name,
      destinationId: dest.id,
      destinationName: dest.name,
      primaryMode: 'road',
      modesInvolved: ['road'],
      status: 'fast',
      statusLabel: 'Fastest Ground Transit',
      statusBadgeVariant: 'info',
      distanceKm: alt2Distance,
      durationHours: Number(alt2Hours),
      estimatedCostUsd: alt2Cost,
      carbonEmissionKgCO2e: alt2Emissions,
      reliabilityScorePercent: 91,
      intermediateStopsCount: 3,
      transshipmentPoints: ['Rest Area Plaza Alpha', 'State Line Fuel Depot', 'Metro Cross-Dock'],
      waypoints: createWaypoints([
        { xRatio: 0.25, yRatio: 0.2, name: 'Interstate Plaza Alpha', city: 'Corridor Post 1', type: 'waypoint' },
        { xRatio: 0.55, yRatio: 0.5, name: 'State Line Fuel Depot', city: 'Corridor Post 2', type: 'waypoint' },
        { xRatio: 0.85, yRatio: 0.8, name: 'Metro Cross-Dock', city: 'Corridor Post 3', type: 'waypoint' },
      ]),
      advantages: [
        'Fastest ground transit time (direct point-to-point without rail transfers)',
        'Door-to-door flexibility with immediate on-demand driver dispatch',
        'Continuous cold chain temperature telematics and seal integrity monitoring',
      ],
      disadvantages: [
        '+176% higher carbon emissions penalty than rail',
        '+55% higher linehaul freight cost due to team driver rates and fuel burn',
        'Susceptible to highway congestion, work zones, and weather slowdowns',
      ],
      recommendedFor: 'Time-sensitive deliveries, perishable cold-chain products, and high-priority cargo.',
    },
    {
      id: `ALT-ECO-${origin.code}-${dest.code}`,
      name: `Green Corridor & Low-Carbon Bypass (${origin.city} to ${dest.city})`,
      code: 'GREEN-CORRIDOR',
      originId: origin.id,
      originName: origin.name,
      destinationId: dest.id,
      destinationName: dest.name,
      primaryMode: 'rail',
      modesInvolved: ['rail', 'water'],
      status: 'eco_saver',
      statusLabel: 'Lowest Carbon Footprint',
      statusBadgeVariant: 'success',
      distanceKm: alt3Distance,
      durationHours: Number(alt3Hours),
      estimatedCostUsd: alt3Cost,
      carbonEmissionKgCO2e: alt3Emissions,
      reliabilityScorePercent: 94,
      intermediateStopsCount: 2,
      transshipmentPoints: ['Clean Energy Logistics Park', 'Inland Waterway Transload'],
      waypoints: createWaypoints([
        { xRatio: 0.4, yRatio: 0.45, name: 'Clean Energy Park', city: 'Green Terminal 1', type: 'intermodal_hub' },
        { xRatio: 0.75, yRatio: 0.7, name: 'Inland Waterway Transload', city: 'Green Terminal 2', type: 'intermodal_hub' },
      ]),
      advantages: [
        'Maximum ESG compliance: qualifies for corporate Scope 3 decarbonization credits',
        'Lowest overall monetary freight spend (-12% vs standard rail, -45% vs road)',
        'Priority green slotting at municipal logistics depots',
      ],
      disadvantages: [
        'Longest transit duration due to green consolidation windows',
        'Requires certified low-carbon equipment booking in advance',
      ],
      recommendedFor: 'Cost-conscious shippers with stringent net-zero environmental targets.',
    },
    {
      id: `ALT-AIR-${origin.code}-${dest.code}`,
      name: `Air Cargo Express Freighter Arc (${origin.city} to ${dest.city})`,
      code: 'AIR-CARGO-ARC',
      originId: origin.id,
      originName: origin.name,
      destinationId: dest.id,
      destinationName: dest.name,
      primaryMode: 'air',
      modesInvolved: ['air', 'road'],
      status: 'budget',
      statusLabel: 'Ultra-Fast Cargo Flight',
      statusBadgeVariant: 'info',
      distanceKm: alt4Distance,
      durationHours: Number(alt4Hours),
      estimatedCostUsd: alt4Cost,
      carbonEmissionKgCO2e: alt4Emissions,
      reliabilityScorePercent: 98,
      intermediateStopsCount: 1,
      transshipmentPoints: ['Airport Air Cargo Freight Ramp'],
      waypoints: createWaypoints([
        { xRatio: 0.5, yRatio: 0.25, name: 'Flight Path Apex', city: 'Cruising Altitude', type: 'waypoint' },
      ]),
      advantages: [
        'Same-day delivery within hours regardless of continental distance',
        'Highest on-time arrival reliability (98%)',
        'Continuous security monitoring and tamper-evident container locks',
      ],
      disadvantages: [
        'Highest freight cost index (3x - 4x ground transportation)',
        'High carbon emission footprint per ton-km',
        'Strict payload weight and hazardous material restrictions',
      ],
      recommendedFor: 'High-value electronics, medical biologics, and emergency production line spares.',
    },
  ];
}

// Calculate deterministic simulation results for a route and scenario
export function calculateSimulation(
  route: RouteAlternative,
  scenarioConfig: SimulationScenarioConfig
): SimulationResultMetrics {
  const baselineDistance = route.distanceKm;
  const baselineDuration = route.durationHours;
  const baselineCost = route.estimatedCostUsd;
  const baselineEfficiency = route.reliabilityScorePercent;

  // Apply deterministic multipliers
  const simulatedDistance = Math.round(baselineDistance * scenarioConfig.distanceMultiplier);
  const simulatedDuration = +(baselineDuration * scenarioConfig.timeMultiplier).toFixed(1);
  const simulatedCost = Math.round(baselineCost * scenarioConfig.costMultiplier);
  const simulatedEfficiency = Math.max(
    10,
    Math.min(100, Math.round(baselineEfficiency * scenarioConfig.efficiencyMultiplier))
  );

  // Deltas
  const delayHours = +(simulatedDuration - baselineDuration).toFixed(1);
  const costDeltaUsd = simulatedCost - baselineCost;
  const costDeltaPercent = Math.round(((simulatedCost - baselineCost) / baselineCost) * 100);
  const distanceDeltaKm = simulatedDistance - baselineDistance;
  const efficiencyDeltaPercent = simulatedEfficiency - baselineEfficiency;

  // Detailed simulated cost breakdown
  const fuelFactor = scenarioConfig.id === 'heavy_traffic' ? 0.38 : scenarioConfig.id === 'route_disruption' ? 0.42 : 0.3;
  const delayFactor = scenarioConfig.id === 'normal_traffic' ? 0 : 0.15;
  const carrierFactor = 0.45;
  const tollsFactor = Math.max(0.05, 1 - (fuelFactor + delayFactor + carrierFactor));

  const costBreakdown = {
    fuelOrEnergy: Math.round(simulatedCost * fuelFactor),
    carrierLinehaul: Math.round(simulatedCost * carrierFactor),
    tollsAndAccessFees: Math.round(simulatedCost * tollsFactor),
    delayOrCongestionSurcharges: Math.round(simulatedCost * delayFactor),
  };

  // Generate dynamic simulation narrative
  let summaryNarrative = '';
  switch (scenarioConfig.id) {
    case 'normal_traffic':
      summaryNarrative = `Baseline conditions confirmed: ${route.name} is operating at normal efficiency (${baselineEfficiency}%). No unexpected traffic delays or cost variances detected. Estimated transit time remains ${baselineDuration} hours at $${baselineCost.toLocaleString()}.`;
      break;
    case 'heavy_traffic':
      summaryNarrative = `Heavy traffic congestion detected along primary highway bottlenecks. Transit time increases by ${delayHours} hours (+${Math.round(
        (delayHours / baselineDuration) * 100
      )}%) to ${simulatedDuration} hours. Idle fuel consumption and driver overtime add $${costDeltaUsd.toLocaleString()} (+${costDeltaPercent}%) in congestion surcharges. Route efficiency declines to ${simulatedEfficiency}%.`;
      break;
    case 'route_disruption':
      summaryNarrative = `Corridor disruption / severe weather requires a mandatory ${distanceDeltaKm} km detour around affected segments. Total distance expands to ${simulatedDistance.toLocaleString()} km. The detour adds ${delayHours} hours of transit delay and $${costDeltaUsd.toLocaleString()} in secondary routing costs. Efficiency drops to ${simulatedEfficiency}%.`;
      break;
    case 'increased_demand':
      summaryNarrative = `Peak seasonal freight surge creates terminal gate congestion and spot-rate inflation. Transit time increases by ${delayHours} hours due to cross-dock wait queues. Carrier capacity crunch adds a $${costDeltaUsd.toLocaleString()} (+${costDeltaPercent}%) spot-rate premium, bringing estimated freight cost to $${simulatedCost.toLocaleString()}.`;
      break;
    case 'alternative_route':
      summaryNarrative = `Dynamic multimodal shift activated: Cargo is rerouted via the electrified rail bypass corridor. By transferring volume off congested highways, transportation costs are reduced by $${Math.abs(
        costDeltaUsd
      ).toLocaleString()} (${costDeltaPercent}%), while maintaining high reliability (${simulatedEfficiency}%) with a minimal transit buffer of +${delayHours} hrs.`;
      break;
  }

  return {
    scenarioId: scenarioConfig.id,
    scenarioName: scenarioConfig.name,
    baselineDistanceKm: baselineDistance,
    baselineDurationHours: baselineDuration,
    baselineCostUsd: baselineCost,
    baselineEfficiencyScore: baselineEfficiency,
    simulatedDistanceKm: simulatedDistance,
    simulatedDurationHours: simulatedDuration,
    simulatedCostUsd: simulatedCost,
    simulatedEfficiencyScore: simulatedEfficiency,
    delayHours,
    costDeltaUsd,
    costDeltaPercent,
    distanceDeltaKm,
    efficiencyDeltaPercent,
    costBreakdown,
    summaryNarrative,
  };
}
