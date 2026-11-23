import {
  AnalyticsFilterState,
  AnalyticsKpiMetrics,
  MonthlyVolumeRecord,
  CostBreakdownRecord,
  RouteCorridorAnalytics,
  ReportType,
} from '../types/analytics.types';
import {
  MOCK_MONTHLY_VOLUMES,
  MOCK_MONTHLY_COSTS,
  MOCK_CORRIDORS_ANALYTICS,
  MOCK_DELAY_CAUSES,
  MOCK_SUSTAINABILITY_DATA,
} from '../data/mockAnalyticsData';

export interface FilteredAnalyticsOutput {
  kpis: AnalyticsKpiMetrics;
  monthlyVolumes: MonthlyVolumeRecord[];
  monthlyCosts: CostBreakdownRecord[];
  corridors: RouteCorridorAnalytics[];
  modeDistribution: { mode: string; volume: number; pct: number }[];
  statusDistribution: { status: string; count: number; pct: number }[];
}

export function filterAnalyticsData(filters: AnalyticsFilterState): FilteredAnalyticsOutput {
  // 1. Slice date range
  let volumeSlice = [...MOCK_MONTHLY_VOLUMES];
  let costSlice = [...MOCK_MONTHLY_COSTS];

  if (filters.dateRange === 'last_30_days') {
    volumeSlice = volumeSlice.slice(-1);
    costSlice = costSlice.slice(-1);
  } else if (filters.dateRange === 'last_quarter') {
    volumeSlice = volumeSlice.slice(-3);
    costSlice = costSlice.slice(-3);
  } else if (filters.dateRange === 'ytd') {
    volumeSlice = volumeSlice.slice(-6);
    costSlice = costSlice.slice(-6);
  }

  // 2. Adjust for Transport Mode filter
  const modeMultiplier = filters.transportMode === 'all' ? 1.0 : 0.38;

  // 3. Compute Aggregated Totals
  const totalShipments = Math.round(
    volumeSlice.reduce((sum, item) => {
      if (filters.transportMode === 'road') return sum + item.roadVolume;
      if (filters.transportMode === 'rail') return sum + item.railVolume;
      if (filters.transportMode === 'air') return sum + item.airVolume;
      if (filters.transportMode === 'water') return sum + item.waterVolume;
      return sum + item.volume;
    }, 0)
  );

  const totalOnTime = Math.round(
    volumeSlice.reduce((sum, item) => sum + item.onTimeDeliveries * modeMultiplier, 0)
  );

  const onTimeDeliveryRate = totalShipments > 0 ? +((totalOnTime / totalShipments) * 100).toFixed(1) : 94.2;

  const totalCostUsd = Math.round(
    costSlice.reduce((sum, item) => sum + item.totalCostUsd * modeMultiplier, 0)
  );

  // Filter corridors
  let filteredCorridors = MOCK_CORRIDORS_ANALYTICS.filter((c) => {
    if (filters.transportMode !== 'all' && c.primaryMode !== filters.transportMode) {
      return false;
    }
    return true;
  });

  if (filteredCorridors.length === 0) {
    filteredCorridors = MOCK_CORRIDORS_ANALYTICS;
  }

  // Compute Mode Distribution
  const totalAllModes = volumeSlice.reduce((sum, item) => sum + item.volume, 0);
  const roadSum = volumeSlice.reduce((sum, item) => sum + item.roadVolume, 0);
  const railSum = volumeSlice.reduce((sum, item) => sum + item.railVolume, 0);
  const airSum = volumeSlice.reduce((sum, item) => sum + item.airVolume, 0);
  const waterSum = volumeSlice.reduce((sum, item) => sum + item.waterVolume, 0);

  const modeDistribution = [
    { mode: 'Road Freight', volume: roadSum, pct: Math.round((roadSum / totalAllModes) * 100) },
    { mode: 'Rail Intermodal', volume: railSum, pct: Math.round((railSum / totalAllModes) * 100) },
    { mode: 'Air Cargo', volume: airSum, pct: Math.round((airSum / totalAllModes) * 100) },
    { mode: 'Coastal / Water', volume: waterSum, pct: Math.round((waterSum / totalAllModes) * 100) },
  ];

  // Shipment status distribution
  const deliveredCount = Math.round(totalShipments * 0.91);
  const inTransitCount = Math.round(totalShipments * 0.06);
  const delayedCount = totalShipments - (deliveredCount + inTransitCount);

  const statusDistribution = [
    { status: 'Delivered', count: deliveredCount, pct: 91 },
    { status: 'In-Transit', count: inTransitCount, pct: 6 },
    { status: 'Delayed / Exception', count: Math.max(0, delayedCount), pct: 3 },
  ];

  // Sustainability estimations
  const emissionsTons = Math.round((totalShipments * 98 * 0.052) / 1000);
  const abatedTons = Math.round(emissionsTons * 0.38);

  const kpis: AnalyticsKpiMetrics = {
    totalShipments,
    totalShipmentsDeltaPct: 8.4,
    onTimeDeliveryRate: Math.min(99.4, onTimeDeliveryRate),
    onTimeRateDeltaPct: 1.8,
    avgTransitTimeHours: filters.transportMode === 'air' ? 7.2 : filters.transportMode === 'rail' ? 44.5 : 22.4,
    avgTransitTimeDeltaHours: -1.2,
    totalTransportationCostUsd: totalCostUsd,
    totalCostDeltaPct: -3.4,
    fleetUtilizationRate: 88.5,
    fleetUtilizationDeltaPct: 4.2,
    estimatedEmissionsCO2eTons: emissionsTons,
    emissionsAbatedCO2eTons: abatedTons,
    emissionsDeltaPct: -14.6,
  };

  return {
    kpis,
    monthlyVolumes: volumeSlice,
    monthlyCosts: costSlice,
    corridors: filteredCorridors,
    modeDistribution,
    statusDistribution,
  };
}

// Client-side CSV Exporter
export function exportReportToCsv(reportType: ReportType, filteredData: FilteredAnalyticsOutput): void {
  let headers: string[] = [];
  let rows: (string | number)[][] = [];
  let fileName = `freighttwin-${reportType}-${new Date().toISOString().slice(0, 10)}.csv`;

  switch (reportType) {
    case 'freight_performance':
      headers = [
        'Month',
        'Total Shipments',
        'On-Time Deliveries',
        'Delayed Deliveries',
        'Road Volume',
        'Rail Volume',
        'Air Volume',
        'Water Volume',
      ];
      rows = filteredData.monthlyVolumes.map((v) => [
        v.month,
        v.volume,
        v.onTimeDeliveries,
        v.delayedDeliveries,
        v.roadVolume,
        v.railVolume,
        v.airVolume,
        v.waterVolume,
      ]);
      break;

    case 'transportation_cost':
      headers = [
        'Period',
        'Total Freight Cost ($)',
        'Fuel & Energy Cost ($)',
        'Carrier Linehaul ($)',
        'Tolls & Access Fees ($)',
        'Delay Surcharges ($)',
      ];
      rows = filteredData.monthlyCosts.map((c) => [
        c.period,
        c.totalCostUsd,
        c.fuelOrEnergyCostUsd,
        c.carrierLinehaulCostUsd,
        c.tollsAndAccessCostUsd,
        c.delaySurchargesUsd,
      ]);
      break;

    case 'route_efficiency':
      headers = [
        'Corridor ID',
        'Corridor Name',
        'Origin',
        'Destination',
        'Mode',
        'Volume (Units)',
        'Avg Distance (km)',
        'Avg Transit (hrs)',
        'On-Time Rate (%)',
        'Efficiency Score',
        'Cost/Ton-Km ($)',
      ];
      rows = filteredData.corridors.map((c) => [
        c.id,
        `"${c.corridorName}"`,
        `"${c.originCity}"`,
        `"${c.destinationCity}"`,
        c.primaryMode.toUpperCase(),
        c.totalShipmentsVolume,
        c.avgDistanceKm,
        c.avgTransitHours,
        c.onTimeRatePercent,
        c.efficiencyScore,
        c.costPerTonKm,
      ]);
      break;

    case 'sustainability':
      headers = [
        'Month',
        'Actual Estimated Emissions (kg CO2e)',
        'Target Baseline Emissions (kg CO2e)',
        'Abated Decarbonization (kg CO2e)',
      ];
      rows = MOCK_SUSTAINABILITY_DATA.monthlyEmissionTrend.map((t) => [
        t.month,
        t.actualEmissionsKg,
        t.targetBaselineKg,
        t.targetBaselineKg - t.actualEmissionsKg,
      ]);
      break;
  }

  // Construct CSV String
  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  // Trigger Download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
