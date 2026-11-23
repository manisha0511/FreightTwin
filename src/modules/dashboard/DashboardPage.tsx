import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Layers,
  Truck,
  Compass,
  Sliders,
  BarChart3,
  FileText,
  Settings,
  ArrowLeft,
  Info,
  Bell,
  User,
  HelpCircle,
  Sparkles,
  Calendar,
} from 'lucide-react';
import {
  NavigationLayout,
  NavSection,
  Button,
  PageHeader,
  Badge,
} from '../../design-system';
import { getAppNavSections } from '../../core/navigation/navigationItems';
import { DashboardStats } from './components/DashboardStats';
import { NetworkMapPreview } from './components/NetworkMapPreview';
import { ShipmentTable } from './components/ShipmentTable';
import { DashboardAnalytics } from './components/DashboardAnalytics';
import { RecentActivity } from './components/RecentActivity';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { ModulePreviewModal } from './components/ModulePreviewModal';
import { MOCK_ALERTS, MOCK_DATA_DISCLAIMER } from './data/mockDashboardData';
import { DashboardAlert } from './types/dashboard.types';

export interface DashboardPageProps {
  onBackToLanding?: () => void;
  onNavigateToDigitalTwin?: () => void;
  onNavigateToFleet?: () => void;
  onNavigateToRouting?: () => void;
  onNavigateToSimulation?: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToReports?: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToHelp?: () => void;
  userRole?: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onBackToLanding,
  onNavigateToDigitalTwin,
  onNavigateToFleet,
  onNavigateToRouting,
  onNavigateToSimulation,
  onNavigateToAnalytics,
  onNavigateToReports,
  onNavigateToNotifications,
  onNavigateToProfile,
  onNavigateToSettings,
  onNavigateToHelp,
  userRole = 'LOGISTICS DISPATCHER',
}) => {
  // Navigation State
  const [activeNav, setActiveNav] = useState('overview');
  const [previewModuleId, setPreviewModuleId] = useState<string | null>(null);

  // Search & Simulation State
  const [searchValue, setSearchValue] = useState('');
  const [isSimulating, setIsSimulating] = useState(true);

  // Alerts State
  const [alerts, setAlerts] = useState<DashboardAlert[]>(MOCK_ALERTS);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  const unreadAlertCount = alerts.filter((a) => !a.isRead).length;

  // Unified cross-platform navigation definition
  const navSections = getAppNavSections(unreadAlertCount);

  const handleNavSelect = (id: string) => {
    if (id === 'overview') {
      setActiveNav('overview');
    } else if (id === 'digital_twin' && onNavigateToDigitalTwin) {
      onNavigateToDigitalTwin();
    } else if (id === 'fleet' && onNavigateToFleet) {
      onNavigateToFleet();
    } else if (id === 'routing' && onNavigateToRouting) {
      onNavigateToRouting();
    } else if (id === 'simulation' && onNavigateToSimulation) {
      onNavigateToSimulation();
    } else if (id === 'analytics') {
      if (onNavigateToAnalytics) {
        onNavigateToAnalytics();
      } else {
        setActiveNav('overview');
        const el = document.getElementById('dashboard-analytics-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (id === 'reports' && onNavigateToReports) {
      onNavigateToReports();
    } else if (id === 'notifications' && onNavigateToNotifications) {
      onNavigateToNotifications();
    } else if (id === 'profile' && onNavigateToProfile) {
      onNavigateToProfile();
    } else if (id === 'settings' && onNavigateToSettings) {
      onNavigateToSettings();
    } else if (id === 'help' && onNavigateToHelp) {
      onNavigateToHelp();
    } else {
      // Open preview modal for modules scheduled in subsequent steps
      setPreviewModuleId(id);
    }
  };

  const handleMarkAsRead = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, isRead: true } : a)));
  };

  const handleMarkAllAsRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, isRead: true })));
  };

  const handleClearAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const handleAlertAction = (alert: DashboardAlert) => {
    setIsAlertsOpen(false);
    if (alert.category === 'corridor') {
      if (onNavigateToSimulation) {
        onNavigateToSimulation();
      } else {
        setPreviewModuleId('simulation');
      }
    } else if (alert.category === 'maintenance') {
      if (onNavigateToFleet) {
        onNavigateToFleet();
      } else {
        setPreviewModuleId('fleet');
      }
    }
  };

  const scrollToShipments = () => {
    const el = document.getElementById('shipments-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <NavigationLayout
      sections={navSections}
      activeItemId={activeNav}
      onSelect={handleNavSelect}
      breadcrumbs={['FreightTwin', 'Command Center', 'Logistics Operations']}
      searchValue={searchValue}
      onSearchChange={(e) => setSearchValue(e.target.value)}
      isSimulating={isSimulating}
      onToggleSimulation={() => setIsSimulating(!isSimulating)}
      roleLabel={userRole}
      unreadAlertCount={unreadAlertCount}
      onAlertClick={onNavigateToNotifications || (() => setIsAlertsOpen(true))}
      onProfileClick={onNavigateToProfile}
    >
      <div className="max-w-7xl mx-auto space-y-6 pb-12 text-left">
        {/* Top Disclaimer / Simulation Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 px-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-xs"
        >
          <div className="flex items-center gap-2.5 text-slate-600">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="text-[11px] font-mono text-blue-600 font-bold tracking-wide">
              SIMULATED DIGITAL TWIN:
            </span>
            <span className="text-[11px] text-slate-500 truncate">
              {MOCK_DATA_DISCLAIMER}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onBackToLanding && (
              <Button
                variant="ghost"
                size="xs"
                leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
                onClick={onBackToLanding}
              >
                Landing Page
              </Button>
            )}
            <button
              onClick={() => setIsAlertsOpen(true)}
              className="text-[11px] font-mono font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer transition-colors"
            >
              <Bell className="w-3 h-3 text-amber-500" />
              <span>{unreadAlertCount} System Alerts</span>
            </button>
          </div>
        </motion.div>

        {/* Command Center Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <PageHeader
            title="Freight Command Center"
            description="Multi-modal logistics digital twin • Live corridor telematics • Shift Bravo"
            actions={
              <div className="flex items-center gap-2.5">
                {onNavigateToSimulation && (
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Sliders className="w-3.5 h-3.5 text-amber-500" />}
                    onClick={onNavigateToSimulation}
                  >
                    What-If Sandbox
                  </Button>
                )}
                {onNavigateToRouting && (
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Compass className="w-3.5 h-3.5" />}
                    onClick={onNavigateToRouting}
                  >
                    Plan Corridor
                  </Button>
                )}
              </div>
            }
          />
        </motion.div>

        {/* 1. Statistics Cards (Total Shipments, Active Fleet, On-Time Delivery, Avg Transit Time) */}
        <motion.section
          aria-label="Key Operational Statistics"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <DashboardStats
            onNavigateToFleet={onNavigateToFleet}
            onNavigateToRouting={onNavigateToRouting}
            onNavigateToAnalytics={onNavigateToAnalytics}
            onScrollToShipments={scrollToShipments}
          />
        </motion.section>

        {/* 2. Main Transport Network Map & Operations Feed (Split Grid) */}
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          {/* Main corridor digital twin map (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <NetworkMapPreview
              onOpenFullMap={() => {
                if (onNavigateToDigitalTwin) {
                  onNavigateToDigitalTwin();
                } else {
                  setPreviewModuleId('digital_twin');
                }
              }}
              onNavigateToRouting={onNavigateToRouting}
            />
          </div>

          {/* Operational alerts & events timeline (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <RecentActivity
              onNavigateToSimulation={onNavigateToSimulation}
              onNavigateToFleet={onNavigateToFleet}
              onSelectEvent={(event) => {
                if (event.relatedEntityId?.startsWith('SHP-')) {
                  scrollToShipments();
                } else if (event.relatedEntityId?.startsWith('TRK-') && onNavigateToFleet) {
                  onNavigateToFleet();
                }
              }}
            />
          </div>
        </motion.section>

        {/* 3. Shipment Activity Ledger with Search, Filter & Detail Modal */}
        <motion.section
          id="shipments-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ShipmentTable />
        </motion.section>

        {/* 4. Performance Analytics (Volume Over Time & Transport Mode Distribution) */}
        <motion.section
          id="dashboard-analytics-section"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          <DashboardAnalytics />
        </motion.section>
      </div>

      {/* Notifications Slide-over Drawer */}
      <NotificationsDrawer
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        alerts={alerts}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAlert={handleClearAlert}
        onActionClick={handleAlertAction}
      />

      {/* Module Preview Modal for Scheduled Future Modules */}
      <ModulePreviewModal
        moduleId={previewModuleId}
        onClose={() => setPreviewModuleId(null)}
      />
    </NavigationLayout>
  );
};

export default DashboardPage;
