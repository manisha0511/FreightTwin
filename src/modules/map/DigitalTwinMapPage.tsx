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
  Maximize2,
  Info,
  SlidersHorizontal,
} from 'lucide-react';
import { NavigationLayout, NavSection, Button, PageHeader } from '../../design-system';
import { NetworkSummaryBar } from './components/NetworkSummaryBar';
import { MapFilterToolbar } from './components/MapFilterToolbar';
import { MapLegend } from './components/MapLegend';
import { EntityInspectorDrawer } from './components/EntityInspectorDrawer';
import { DigitalTwinMapCanvas } from './components/DigitalTwinMapCanvas';
import {
  MOCK_MAP_HUBS,
  MOCK_MAP_VEHICLES,
  MOCK_MAP_ROUTES,
  MOCK_NETWORK_SUMMARY,
  MOCK_GIS_DATA_DISCLAIMER,
} from './data/mockMapData';
import {
  MapHub,
  MapVehicle,
  MapRoute,
  MapFilterState,
} from './types/map.types';
import { getAppNavSections } from '../../core/navigation/navigationItems';

export interface DigitalTwinMapPageProps {
  onBackToDashboard: () => void;
  onNavigateToFleet?: () => void;
  onNavigateToRouting?: () => void;
  onNavigateToSimulation?: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToReports?: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToHelp?: () => void;
  onBackToLanding: () => void;
  userRole?: string;
}

export const DigitalTwinMapPage: React.FC<DigitalTwinMapPageProps> = ({
  onBackToDashboard,
  onNavigateToFleet,
  onNavigateToRouting,
  onNavigateToSimulation,
  onNavigateToAnalytics,
  onNavigateToReports,
  onNavigateToNotifications,
  onNavigateToProfile,
  onNavigateToSettings,
  onNavigateToHelp,
  onBackToLanding,
  userRole = 'LOGISTICS DISPATCHER',
}) => {
  // Navigation State
  const [activeNav, setActiveNav] = useState('digital_twin');

  // Search & Simulation State
  const [searchValue, setSearchValue] = useState('');
  const [isSimulating, setIsSimulating] = useState(true);

  // Map Filter State
  const [filters, setFilters] = useState<MapFilterState>({
    showVehicles: true,
    showWarehouses: true,
    showActiveRoutes: true,
    showAlternativeRoutes: true,
    showDelayedOnly: false,
    modeFilter: 'all',
  });

  // Selected Entities for Inspector Drawer
  const [selectedHub, setSelectedHub] = useState<MapHub | null>(MOCK_MAP_HUBS[0]);
  const [selectedVehicle, setSelectedVehicle] = useState<MapVehicle | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<MapRoute | null>(null);

  // Navigation Items
  const navSections = getAppNavSections(4);

  const handleNavSelect = (id: string) => {
    if (id === 'overview') {
      onBackToDashboard();
    } else if (id === 'digital_twin') {
      setActiveNav('digital_twin');
    } else if (id === 'fleet' && onNavigateToFleet) {
      onNavigateToFleet();
    } else if (id === 'routing' && onNavigateToRouting) {
      onNavigateToRouting();
    } else if (id === 'simulation' && onNavigateToSimulation) {
      onNavigateToSimulation();
    } else if (id === 'analytics' && onNavigateToAnalytics) {
      onNavigateToAnalytics();
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
      onBackToDashboard();
    }
  };

  const counts = {
    vehicles: MOCK_MAP_VEHICLES.length,
    hubs: MOCK_MAP_HUBS.length,
    routes: MOCK_MAP_ROUTES.filter((r) => !r.isAlternative).length,
    delayed: MOCK_MAP_VEHICLES.filter((v) => v.status === 'delayed').length,
  };

  return (
    <NavigationLayout
      sections={navSections}
      activeItemId={activeNav}
      onSelect={handleNavSelect}
      breadcrumbs={['FreightTwin', 'Digital Twin', 'Multi-Modal Spatial Network GIS']}
      searchValue={searchValue}
      onSearchChange={(e) => setSearchValue(e.target.value)}
      isSimulating={isSimulating}
      onToggleSimulation={() => setIsSimulating(!isSimulating)}
      roleLabel={userRole}
      unreadAlertCount={4}
      onAlertClick={onNavigateToNotifications}
      onProfileClick={onNavigateToProfile}
    >
      <div className="max-w-7xl mx-auto space-y-4 pb-12 text-left">
        {/* Top Disclaimer / Bar */}
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
              GIS DIGITAL TWIN:
            </span>
            <span className="text-[11px] text-slate-500 truncate">
              {MOCK_GIS_DATA_DISCLAIMER}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="xs"
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
              onClick={onBackToDashboard}
            >
              Dashboard
            </Button>
            {onNavigateToRouting && (
              <Button
                variant="primary"
                size="xs"
                leftIcon={<Compass className="w-3.5 h-3.5" />}
                onClick={onNavigateToRouting}
              >
                Plan Corridor
              </Button>
            )}
          </div>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <PageHeader
            title="Multi-Modal Network Digital Twin"
            description="Interactive spatial GIS topology • Rail trunks, highways, coastal sea lanes, and air corridors"
          />
        </motion.div>

        {/* 1. Network Summary Stats Bar */}
        <motion.section
          aria-label="Network Summary Metrics"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <NetworkSummaryBar stats={MOCK_NETWORK_SUMMARY} />
        </motion.section>

        {/* 2. Layer Filter Toolbar */}
        <motion.section
          aria-label="GIS Layer Controls"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <MapFilterToolbar
            filters={filters}
            onChange={setFilters}
            counts={counts}
          />
        </motion.section>

        {/* 3. Main Interactive GIS Map Canvas Viewport */}
        <motion.section
          className="relative w-full h-[620px] lg:h-[700px]"
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <DigitalTwinMapCanvas
            hubs={MOCK_MAP_HUBS}
            vehicles={MOCK_MAP_VEHICLES}
            routes={MOCK_MAP_ROUTES}
            filters={filters}
            selectedHub={selectedHub}
            selectedVehicle={selectedVehicle}
            selectedRoute={selectedRoute}
            onSelectHub={setSelectedHub}
            onSelectVehicle={setSelectedVehicle}
            onSelectRoute={setSelectedRoute}
            onModeFilterChange={(mode) => setFilters((prev) => ({ ...prev, modeFilter: mode }))}
          />

          {/* Floating Collapsible Map Legend (Bottom Left) */}
          <div className="absolute bottom-3.5 left-3.5 z-30 pointer-events-auto">
            <MapLegend />
          </div>

          {/* Floating Selected Entity Inspector Drawer (Right Side) */}
          <EntityInspectorDrawer
            selectedHub={selectedHub}
            selectedVehicle={selectedVehicle}
            selectedRoute={selectedRoute}
            routes={MOCK_MAP_ROUTES}
            onClose={() => {
              setSelectedHub(null);
              setSelectedVehicle(null);
              setSelectedRoute(null);
            }}
          />
        </motion.section>
      </div>
    </NavigationLayout>
  );
};

export default DigitalTwinMapPage;
