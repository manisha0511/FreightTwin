import React, { useState, useMemo } from 'react';
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
  Plus,
  RotateCcw,
} from 'lucide-react';
import { NavigationLayout, NavSection, Button, PageHeader } from '../../design-system';
import { FleetOverviewCards } from './components/FleetOverviewCards';
import { FleetFilterBar } from './components/FleetFilterBar';
import { FleetTable } from './components/FleetTable';
import { VehicleDetailDrawer } from './components/VehicleDetailDrawer';
import {
  MOCK_FLEET_VEHICLES,
  MOCK_FLEET_SUMMARY,
  MOCK_FLEET_DATA_DISCLAIMER,
} from './data/mockFleetData';
import { FleetVehicle, FleetFilterState } from './types/fleet.types';
import { getAppNavSections } from '../../core/navigation/navigationItems';

export interface FleetManagementPageProps {
  onBackToDashboard: () => void;
  onNavigateToDigitalTwin: () => void;
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

export const FleetManagementPage: React.FC<FleetManagementPageProps> = ({
  onBackToDashboard,
  onNavigateToDigitalTwin,
  onNavigateToRouting,
  onNavigateToSimulation,
  onNavigateToAnalytics,
  onNavigateToReports,
  onNavigateToNotifications,
  onNavigateToProfile,
  onNavigateToSettings,
  onNavigateToHelp,
  onBackToLanding,
  userRole = 'FLEET OPERATIONS CHIEF',
}) => {
  // Navigation State
  const [activeNav, setActiveNav] = useState('fleet');

  // Search & Simulation State
  const [searchValue, setSearchValue] = useState('');
  const [isSimulating, setIsSimulating] = useState(true);

  // View Mode: 'grid' (Primary Visual Cards) vs 'table' (Compact List)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter State
  const [filters, setFilters] = useState<FleetFilterState>({
    searchQuery: '',
    statusFilter: 'all',
    typeFilter: 'all',
    sortField: 'id',
    sortDirection: 'asc',
  });

  // Selected Vehicle for Drawer
  const [selectedVehicle, setSelectedVehicle] = useState<FleetVehicle | null>(null);

  // Sidebar navigation configuration
  const navSections = getAppNavSections(4);

  const handleNavSelect = (id: string) => {
    if (id === 'overview') {
      onBackToDashboard();
    } else if (id === 'digital_twin') {
      onNavigateToDigitalTwin();
    } else if (id === 'fleet') {
      setActiveNav('fleet');
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

  // Filter & Sort Logic
  const filteredVehicles = useMemo(() => {
    return MOCK_FLEET_VEHICLES.filter((vehicle) => {
      // Search Query
      const q = filters.searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        vehicle.id.toLowerCase().includes(q) ||
        vehicle.name.toLowerCase().includes(q) ||
        vehicle.registrationNumber.toLowerCase().includes(q) ||
        vehicle.assignedDriver.name.toLowerCase().includes(q) ||
        vehicle.currentLocation.hubName.toLowerCase().includes(q);

      // Status Filter
      const matchesStatus =
        filters.statusFilter === 'all' || vehicle.status === filters.statusFilter;

      // Type Filter
      const matchesType =
        filters.typeFilter === 'all' || vehicle.vehicleType === filters.typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    }).sort((a, b) => {
      const dir = filters.sortDirection === 'asc' ? 1 : -1;
      switch (filters.sortField) {
        case 'id':
          return a.id.localeCompare(b.id) * dir;
        case 'type':
          return a.vehicleType.localeCompare(b.vehicleType) * dir;
        case 'registration':
          return a.registrationNumber.localeCompare(b.registrationNumber) * dir;
        case 'status':
          return a.status.localeCompare(b.status) * dir;
        case 'updated':
          return a.lastUpdated.localeCompare(b.lastUpdated) * dir;
        case 'payload':
          return (a.currentPayloadTons - b.currentPayloadTons) * dir;
        case 'health':
          return (a.healthScore - b.healthScore) * dir;
        default:
          return 0;
      }
    });
  }, [filters]);

  const handleSort = (field: FleetFilterState['sortField']) => {
    if (filters.sortField === field) {
      setFilters((prev) => ({
        ...prev,
        sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        sortField: field,
        sortDirection: 'asc',
      }));
    }
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      statusFilter: 'all',
      typeFilter: 'all',
      sortField: 'id',
      sortDirection: 'asc',
    });
  };

  return (
    <NavigationLayout
      sections={navSections}
      activeItemId={activeNav}
      onSelect={handleNavSelect}
      breadcrumbs={['FreightTwin', 'Command Center', 'Multi-Modal Fleet & Asset Twin']}
      searchValue={searchValue}
      onSearchChange={(e) => setSearchValue(e.target.value)}
      isSimulating={isSimulating}
      onToggleSimulation={() => setIsSimulating(!isSimulating)}
      roleLabel={userRole}
      unreadAlertCount={4}
      onAlertClick={onNavigateToNotifications}
      onProfileClick={onNavigateToProfile}
    >
      <div className="max-w-7xl mx-auto space-y-5 pb-12 text-left">
        {/* Top Disclaimer / Status Header */}
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
              FLEET TELEMETRY TWIN:
            </span>
            <span className="text-[11px] text-slate-500 truncate">
              {MOCK_FLEET_DATA_DISCLAIMER}
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
            <Button
              variant="primary"
              size="xs"
              leftIcon={<Compass className="w-3.5 h-3.5" />}
              onClick={onNavigateToDigitalTwin}
            >
              Digital Twin Map
            </Button>
          </div>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <PageHeader
            title="Multi-Modal Fleet & Asset Twin"
            description="Physics-informed vehicle telemetry, energy storage degradation, and predictive overhaul planning"
          />
        </motion.div>

        {/* 1. Fleet Overview Summary Cards */}
        <motion.section
          aria-label="Fleet Summary Metrics"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <FleetOverviewCards
            summary={MOCK_FLEET_SUMMARY}
            onFilterStatus={(status) => setFilters((prev) => ({ ...prev, statusFilter: status as any }))}
          />
        </motion.section>

        {/* 2. Search and Filter Bar */}
        <motion.section
          aria-label="Fleet Search & Filter Controls"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <FleetFilterBar
            filters={filters}
            onChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
            onClearFilters={handleClearFilters}
            totalCount={MOCK_FLEET_VEHICLES.length}
            filteredCount={filteredVehicles.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </motion.section>

        {/* 3. Fleet Grid / Table View */}
        <motion.section
          aria-label="Vehicle Roster View"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FleetTable
            vehicles={filteredVehicles}
            selectedVehicleId={selectedVehicle ? selectedVehicle.id : null}
            onSelectVehicle={setSelectedVehicle}
            sortField={filters.sortField}
            sortDirection={filters.sortDirection}
            onSort={handleSort}
            viewMode={viewMode}
          />
        </motion.section>
      </div>

      {/* 4. Slide-over Vehicle Detail Drawer */}
      <VehicleDetailDrawer
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        onScheduleService={(id) => {
          alert(`Maintenance work order successfully generated for vehicle ${id}. Bay technician dispatched.`);
        }}
      />
    </NavigationLayout>
  );
};

export default FleetManagementPage;
