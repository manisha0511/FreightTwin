import { FreightNotification } from '../types/notification.types';

export const MOCK_NOTIFICATIONS_DISCLAIMER =
  'Simulated Alert Center: Notifications represent simulated logistics exceptions and scheduled telemetry thresholds. No live SMS gateways or real-world dispatch incidents are connected.';

export const INITIAL_NOTIFICATIONS: FreightNotification[] = [
  {
    id: 'NOTIF-01',
    title: 'Severe Mountain Blizzard: I-80 Donner Pass Restricted',
    message:
      'Chains mandatory and speed restricted to 35 km/h on I-80 corridor. Estimated delay +4.2 hours for 6 active westbound consignments.',
    type: 'route_disruption',
    priority: 'critical',
    timestamp: '2026-11-23T09:30:00Z',
    timeAgo: '15m ago',
    isRead: false,
    relatedEntityId: 'CORR-02',
    relatedEntityName: 'I-80 Midwest-Northeast Corridor',
    actionLabel: 'Inspect Route Shock',
  },
  {
    id: 'NOTIF-02',
    title: 'Critical Reefer Cold-Chain Temperature Variance (+6.8°C)',
    message:
      'Unit FLT-809 (Freightliner eCascadia) reports refrigeration compartment temperature spike exceeding pharmaceutical cold-chain SLA (-20°C threshold).',
    type: 'fleet_maintenance',
    priority: 'critical',
    timestamp: '2026-11-23T09:12:00Z',
    timeAgo: '33m ago',
    isRead: false,
    relatedEntityId: 'FLT-809',
    relatedEntityName: 'Freightliner eCascadia 809',
    actionLabel: 'View Vehicle Telemetry',
  },
  {
    id: 'NOTIF-03',
    title: 'Intermodal Gate Queue Surges to 85m at Port of LA Pier 400',
    message:
      'Vessel discharge congestion has extended terminal drayage truck gate turnaround times to 85 minutes. Demurrage risk flagged.',
    type: 'shipment_delay',
    priority: 'warning',
    timestamp: '2026-11-23T08:45:00Z',
    timeAgo: '1h ago',
    isRead: false,
    relatedEntityId: 'HUB-LAX',
    relatedEntityName: 'Port of Los Angeles Pier 400',
    actionLabel: 'Open GIS Hub Details',
  },
  {
    id: 'NOTIF-04',
    title: 'Consignment SHP-8921 Rerouted via Southern Transcon Rail',
    message:
      'Automated dispatch optimization successfully shifted dry container load from highway to rail bypass, saving $420 in linehaul costs.',
    type: 'shipment_delay',
    priority: 'info',
    timestamp: '2026-11-23T07:20:00Z',
    timeAgo: '2h ago',
    isRead: false,
    relatedEntityId: 'SHP-8921',
    relatedEntityName: 'Consignment SHP-8921',
    actionLabel: 'View Route Alternative',
  },
  {
    id: 'NOTIF-05',
    title: 'Scheduled Brake Pad Inspection Due: Kenworth T680 (FLT-102)',
    message:
      'Remaining useful brake lining at 24% (nominal threshold 25%). Preventative service work order recommended prior to cross-dock dispatch.',
    type: 'fleet_maintenance',
    priority: 'warning',
    timestamp: '2026-11-22T22:15:00Z',
    timeAgo: '11h ago',
    isRead: true,
    relatedEntityId: 'FLT-102',
    relatedEntityName: 'Kenworth T680 Heavy Hauler',
    actionLabel: 'Schedule Service',
  },
  {
    id: 'NOTIF-06',
    title: 'GLEC v3 Decarbonization Monthly Digest Ready for Download',
    message:
      'November Scope 1, 2, and 3 emissions accounting finalized. Multi-modal rail shifts achieved -17.8% carbon abatement against target baseline.',
    type: 'system',
    priority: 'info',
    timestamp: '2026-11-22T18:00:00Z',
    timeAgo: '15h ago',
    isRead: true,
    actionLabel: 'Download ESG Dossier',
  },
  {
    id: 'NOTIF-07',
    title: 'Simulation Clock Calibrated to 5x Multiplier',
    message:
      'Digital twin time epoch synchronized with central dispatch terminal. Synthetic vehicle positions proceeding at standard tick cadence.',
    type: 'system',
    priority: 'info',
    timestamp: '2026-11-22T14:30:00Z',
    timeAgo: '19h ago',
    isRead: true,
    actionLabel: 'Adjust Simulation Settings',
  },
];
