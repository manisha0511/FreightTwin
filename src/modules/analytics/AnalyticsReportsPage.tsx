import React, { useState, useMemo } from 'react';
import {
  BarChart2,
  FileText,
  ArrowLeft,
  Download,
} from 'lucide-react';
import {
  NavigationLayout,
  Button,
  Tabs,
  TabItem,
  PageHeader,
} from '../../design-system';
import {
  AnalyticsFilterState,
} from './types/analytics.types';
import { MOCK_ANALYTICS_DISCLAIMER } from './data/mockAnalyticsData';
import {
  filterAnalyticsData,
  exportReportToCsv,
} from './utils/analyticsCalculations';
import { AnalyticsKpiCards } from './components/AnalyticsKpiCards';
import { AnalyticsFilterBar } from './components/AnalyticsFilterBar';
import { PerformanceCharts } from './components/PerformanceCharts';
import { CostAnalyticsView } from './components/CostAnalyticsView';
import { RouteEfficiencyView } from './components/RouteEfficiencyView';
import { SustainabilityAnalyticsView } from './components/SustainabilityAnalyticsView';
import { ReportsTableSection } from './components/ReportsTableSection';
import { getAppNavSections } from '../../core/navigation/navigationItems';

export interface AnalyticsReportsPageProps {
  initialTab?: 'analytics' | 'reports';
  onBackToDashboard: () => void;
  onNavigateToDigitalTwin: () => void;
  onNavigateToFleet: () => void;
  onNavigateToRouting: () => void;
  onNavigateToSimulation: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToHelp?: () => void;
  onBackToLanding: () => void;
  userRole?: string;
}

export const AnalyticsReportsPage: React.FC<AnalyticsReportsPageProps> = ({
  initialTab = 'analytics',
  onBackToDashboard,
  onNavigateToDigitalTwin,
  onNavigateToFleet,
  onNavigateToRouting,
  onNavigateToSimulation,
  onNavigateToNotifications,
  onNavigateToProfile,
  onNavigateToSettings,
  onNavigateToHelp,
  onBackToLanding,
  userRole = 'Chief Analytics Officer',
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'reports'>(initialTab);
  const [activeNav, setActiveNav] = useState<string>(
    initialTab === 'reports' ? 'reports' : 'analytics'
  );
  const [searchValue, setSearchValue] = useState('');

  // Primary Filter State
  const [filters, setFilters] = useState<AnalyticsFilterState>({
    dateRange: 'all_time',
    transportMode: 'all',
    freightCategory: 'all',
    shipmentStatus: 'all',
  });

  const handleFilterChange = (updated: Partial<AnalyticsFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: 'all_time',
      transportMode: 'all',
      freightCategory: 'all',
      shipmentStatus: 'all',
    });
  };

  // Dynamically compute filtered analytics data
  const filteredData = useMemo(() => {
    return filterAnalyticsData(filters);
  }, [filters]);

  // Sidebar navigation configuration
  const navSections = getAppNavSections(4);

  const handleNavSelect = (id: string) => {
    if (id === 'overview') {
      onBackToDashboard();
    } else if (id === 'digital_twin') {
      onNavigateToDigitalTwin();
    } else if (id === 'fleet') {
      onNavigateToFleet();
    } else if (id === 'routing') {
      onNavigateToRouting();
    } else if (id === 'simulation') {
      onNavigateToSimulation();
    } else if (id === 'analytics') {
      setActiveNav('analytics');
      setActiveTab('analytics');
    } else if (id === 'reports') {
      setActiveNav('reports');
      setActiveTab('reports');
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

  const tabs: TabItem[] = [
    {
      id: 'analytics',
      label: 'Performance & Cost Analytics',
      icon: <BarChart2 className="w-4 h-4" />,
      badge: 'Interactive',
    },
    {
      id: 'reports',
      label: 'Enterprise Reports Catalog (CSV Export)',
      icon: <FileText className="w-4 h-4" />,
      badge: '4 Dossiers',
    },
  ];

  return (
    <NavigationLayout
      sections={navSections}
      activeItemId={activeNav}
      onSelect={handleNavSelect}
      breadcrumbs={[
        'FreightTwin',
        'Decision Intelligence',
        activeTab === 'analytics'
          ? 'Performance & Cost Analytics'
          : 'Enterprise Reports Catalog',
      ]}
      searchValue={searchValue}
      onSearchChange={(e) => setSearchValue(e.target.value)}
      roleLabel={userRole}
      unreadAlertCount={4}
      onAlertClick={onNavigateToNotifications}
      onProfileClick={onNavigateToProfile}
    >
      <div className="max-w-7xl mx-auto space-y-6 pb-12 text-left">
        {/* Page Header */}
        <PageHeader
          title={
            activeTab === 'analytics'
              ? 'Freight Analytics & Performance'
              : 'Enterprise Compliance & Reports Catalog'
          }
          description={
            activeTab === 'analytics'
              ? 'Multi-modal shipment velocity, linehaul carrier spend, corridor reliability benchmarks, and Scope 1-3 decarbonization.'
              : 'Audit-ready multi-modal performance dossiers, corridor efficiency ledgers, and carbon accounting sheets with 1-click CSV export.'
          }
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
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download className="w-4 h-4" />}
                onClick={() => exportReportToCsv('freight_performance', filteredData)}
              >
                Quick CSV
              </Button>
            </div>
          }
        />

        {/* Top Disclaimer Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 px-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-radar-pulse absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span className="text-[11px] font-mono text-blue-700 font-bold uppercase">
              Simulated Logistics Analytics:
            </span>
            <span className="text-[11px] text-slate-600 truncate">
              {MOCK_ANALYTICS_DISCLAIMER}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-[11px] font-mono text-slate-500">
            <span>Aggregated Period:</span>
            <span className="font-semibold text-blue-600 bg-white px-2 py-0.5 rounded border border-blue-200 uppercase">
              {filters.dateRange.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Tab Switcher & Context Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Tabs
            items={tabs}
            activeTabId={activeTab}
            onChange={(id) => {
              const tab = id as 'analytics' | 'reports';
              setActiveTab(tab);
              setActiveNav(tab === 'analytics' ? 'analytics' : 'reports');
            }}
            variant="pill"
          />
        </div>

        {/* Dynamic Interactive Filter Bar */}
        <section aria-label="Analytics Filters">
          <AnalyticsFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
        </section>

        {/* TAB 1: Analytics & Visual Intelligence */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* 1. Six Executive KPI Cards */}
            <section aria-label="Executive KPI Metrics">
              <AnalyticsKpiCards metrics={filteredData.kpis} />
            </section>

            {/* 2. Freight Performance & Dispatch Analytics */}
            <section aria-label="Freight Performance Analytics">
              <PerformanceCharts
                monthlyVolumes={filteredData.monthlyVolumes}
                modeDistribution={filteredData.modeDistribution}
                statusDistribution={filteredData.statusDistribution}
              />
            </section>

            {/* 3. Cost & Spend Analytics */}
            <section aria-label="Transportation Cost Analytics">
              <CostAnalyticsView monthlyCosts={filteredData.monthlyCosts} />
            </section>

            {/* 4. Corridor Route Efficiency & Bottlenecks */}
            <section aria-label="Route Efficiency Analytics">
              <RouteEfficiencyView corridors={filteredData.corridors} />
            </section>

            {/* 5. Sustainability & Decarbonization Ledger */}
            <section aria-label="Sustainability Analytics">
              <SustainabilityAnalyticsView />
            </section>
          </div>
        )}

        {/* TAB 2: Enterprise Reports & Export */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <section aria-label="Enterprise Reports Catalog">
              <ReportsTableSection filteredData={filteredData} />
            </section>
          </div>
        )}
      </div>
    </NavigationLayout>
  );
};

export default AnalyticsReportsPage;
