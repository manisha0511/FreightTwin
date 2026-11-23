import React, { useState, useMemo } from 'react';
import {
  Bell,
  CheckCheck,
  Trash2,
  AlertTriangle,
  Zap,
  Wrench,
  Clock,
  Shield,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import {
  NavigationLayout,
  Button,
  Badge,
  PageHeader,
} from '../../design-system';
import {
  FreightNotification,
  NotificationType,
  NotificationFilter,
} from './types/notification.types';
import {
  INITIAL_NOTIFICATIONS,
  MOCK_NOTIFICATIONS_DISCLAIMER,
} from './data/mockNotificationsData';
import { getAppNavSections } from '../../core/navigation/navigationItems';

export interface NotificationsPageProps {
  onBackToDashboard: () => void;
  onNavigateToDigitalTwin: () => void;
  onNavigateToFleet: () => void;
  onNavigateToRouting: () => void;
  onNavigateToSimulation: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToReports: () => void;
  onNavigateToProfile: () => void;
  onNavigateToSettings: () => void;
  onNavigateToHelp: () => void;
  onBackToLanding: () => void;
  userRole?: string;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  onBackToDashboard,
  onNavigateToDigitalTwin,
  onNavigateToFleet,
  onNavigateToRouting,
  onNavigateToSimulation,
  onNavigateToAnalytics,
  onNavigateToReports,
  onNavigateToProfile,
  onNavigateToSettings,
  onNavigateToHelp,
  userRole = 'Logistics Dispatcher',
}) => {
  const [notifications, setNotifications] = useState<FreightNotification[]>(
    INITIAL_NOTIFICATIONS
  );
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>('all');
  const [searchValue, setSearchValue] = useState('');

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  // Filter logic
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      // Category Filter
      if (activeFilter === 'unread' && n.isRead) return false;
      if (
        activeFilter !== 'all' &&
        activeFilter !== 'unread' &&
        n.type !== activeFilter
      )
        return false;

      // Search Query
      if (searchValue.trim() !== '') {
        const q = searchValue.toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          n.message.toLowerCase().includes(q) ||
          (n.relatedEntityName && n.relatedEntityName.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [notifications, activeFilter, searchValue]);

  // Actions
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleActionClick = (notif: FreightNotification) => {
    handleMarkAsRead(notif.id);
    if (notif.type === 'fleet_maintenance') {
      onNavigateToFleet();
    } else if (notif.type === 'route_disruption') {
      onNavigateToSimulation();
    } else if (notif.type === 'shipment_delay') {
      onNavigateToDigitalTwin();
    } else if (notif.type === 'system') {
      onNavigateToReports();
    }
  };

  const navSections = getAppNavSections(unreadCount);

  const handleNavSelect = (id: string) => {
    if (id === 'overview') onBackToDashboard();
    else if (id === 'digital_twin') onNavigateToDigitalTwin();
    else if (id === 'fleet') onNavigateToFleet();
    else if (id === 'routing') onNavigateToRouting();
    else if (id === 'simulation') onNavigateToSimulation();
    else if (id === 'analytics') onNavigateToAnalytics();
    else if (id === 'reports') onNavigateToReports();
    else if (id === 'profile') onNavigateToProfile();
    else if (id === 'settings') onNavigateToSettings();
    else if (id === 'help') onNavigateToHelp();
  };

  const filterTabs: { id: NotificationFilter; label: string; count?: number }[] = [
    { id: 'all', label: 'All Alerts', count: notifications.length },
    { id: 'unread', label: 'Unread Only', count: unreadCount },
    {
      id: 'route_disruption',
      label: 'Corridor Disruptions',
      count: notifications.filter((n) => n.type === 'route_disruption').length,
    },
    {
      id: 'fleet_maintenance',
      label: 'Fleet Telemetry',
      count: notifications.filter((n) => n.type === 'fleet_maintenance').length,
    },
    {
      id: 'shipment_delay',
      label: 'Transit Delays',
      count: notifications.filter((n) => n.type === 'shipment_delay').length,
    },
    {
      id: 'system',
      label: 'System & ESG',
      count: notifications.filter((n) => n.type === 'system').length,
    },
  ];

  const getTypeVisual = (type: NotificationType) => {
    switch (type) {
      case 'route_disruption':
        return {
          icon: <Zap className="w-4 h-4 text-rose-600" />,
          bg: 'bg-rose-50 border-rose-200',
        };
      case 'fleet_maintenance':
        return {
          icon: <Wrench className="w-4 h-4 text-amber-600" />,
          bg: 'bg-amber-50 border-amber-200',
        };
      case 'shipment_delay':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-blue-600" />,
          bg: 'bg-blue-50 border-blue-200',
        };
      case 'system':
        return {
          icon: <Shield className="w-4 h-4 text-cyan-600" />,
          bg: 'bg-cyan-50 border-cyan-200',
        };
    }
  };

  return (
    <NavigationLayout
      sections={navSections}
      activeItemId="notifications"
      onSelect={handleNavSelect}
      breadcrumbs={['FreightTwin', 'System & Support', 'Notifications & Alerts Center']}
      searchValue={searchValue}
      onSearchChange={(e) => setSearchValue(e.target.value)}
      roleLabel={userRole}
      unreadAlertCount={unreadCount}
      onAlertClick={() => setActiveFilter('unread')}
      onProfileClick={onNavigateToProfile}
    >
      <div className="max-w-5xl mx-auto space-y-6 pb-12 text-left">
        {/* Page Header */}
        <PageHeader
          title="Notifications & Alerts Center"
          description="Real-time corridor disruption notices, telemetry diagnostic alarms, and automated multi-modal dispatch logs."
          actions={
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                onClick={onBackToDashboard}
              >
                Dashboard
              </Button>
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<CheckCheck className="w-4 h-4" />}
                  onClick={handleMarkAllAsRead}
                >
                  Mark All Read
                </Button>
              )}
            </div>
          }
        />

        {/* Top Disclaimer Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 px-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-radar-pulse absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span className="text-[11px] font-mono text-blue-700 font-bold uppercase">
              Simulated Dispatch Alerts:
            </span>
            <span className="text-[11px] text-slate-600 truncate">
              {MOCK_NOTIFICATIONS_DISCLAIMER}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] text-slate-500">
            <span>Active Alerts:</span>
            <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-blue-200">
              {notifications.length} Total ({unreadCount} Unread)
            </span>
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-1">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200/90 rounded-2xl shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3 opacity-90" />
              <h3 className="text-sm font-bold text-slate-900">
                No Notifications Found
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No active notifications match the selected filter criteria. All logistics corridors and fleet assets are nominal.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setActiveFilter('all')}
              >
                Show All Notifications
              </Button>
            </div>
          ) : (
            filteredNotifications.map((notif) => {
              const visual = getTypeVisual(notif.type);

              return (
                <div
                  key={notif.id}
                  className={`relative p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                    !notif.isRead
                      ? 'bg-blue-50/20 border-blue-300 shadow-sm ring-1 ring-blue-500/20'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  {/* Left Indicator bar if unread */}
                  {!notif.isRead && (
                    <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-blue-600 rounded-r-md" />
                  )}

                  {/* Icon & Message Body */}
                  <div className="flex items-start gap-3.5 min-w-0 pl-1">
                    <div className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${visual.bg}`}>
                      {visual.icon}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                          {notif.id}
                        </span>
                        <Badge
                          variant={
                            notif.priority === 'critical'
                              ? 'danger'
                              : notif.priority === 'warning'
                              ? 'warning'
                              : 'cyan'
                          }
                          size="sm"
                        >
                          {notif.priority.toUpperCase()}
                        </Badge>
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {notif.timeAgo}
                        </span>
                        {!notif.isRead && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-700 border border-blue-200">
                            NEW
                          </span>
                        )}
                      </div>

                      <h4
                        className={`text-sm leading-snug ${
                          !notif.isRead
                            ? 'font-bold text-slate-900'
                            : 'font-semibold text-slate-700'
                        }`}
                      >
                        {notif.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {notif.message}
                      </p>

                      {notif.relatedEntityName && (
                        <div className="text-[11px] text-slate-500 font-mono pt-1">
                          Affiliated Entity:{' '}
                          <span className="text-blue-700 font-semibold">
                            {notif.relatedEntityName}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                    {notif.actionLabel && (
                      <Button
                        variant="primary"
                        size="xs"
                        rightIcon={<ExternalLink className="w-3 h-3" />}
                        onClick={() => handleActionClick(notif)}
                      >
                        {notif.actionLabel}
                      </Button>
                    )}

                    <div className="flex items-center gap-1">
                      {!notif.isRead && (
                        <button
                          type="button"
                          onClick={() => handleMarkAsRead(notif.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Mark as read"
                          aria-label="Mark as read"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDelete(notif.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Dismiss notification"
                        aria-label="Dismiss notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </NavigationLayout>
  );
};

export default NotificationsPage;
