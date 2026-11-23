// Notifications Center Domain Types
// FreightTwin Logistics Digital Twin Platform

export type NotificationType =
  | 'shipment_delay'
  | 'route_disruption'
  | 'fleet_maintenance'
  | 'system';

export type NotificationPriority = 'critical' | 'warning' | 'info';

export interface FreightNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  timestamp: string;
  timeAgo: string;
  isRead: boolean;
  relatedEntityId?: string;
  relatedEntityName?: string;
  actionUrl?: string;
  actionLabel?: string;
}

export type NotificationFilter = 'all' | 'unread' | NotificationType;
