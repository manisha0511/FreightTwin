import React, { useState, useMemo } from 'react';
import {
  Compass,
  Sliders,
  ArrowLeft,
  Download,
  Info,
} from 'lucide-react';
import {
  NavigationLayout,
  Button,
  Badge,
  Tabs,
  TabItem,
  PageHeader,
} from '../../design-system';
import {
  RoutePlanningInput,
  RouteAlternative,
  SimulationScenarioId,
} from './types/routing.types';
import {
  MOCK_PLANNING_HUBS,
  MOCK_ROUTE_ALTERNATIVES,
  MOCK_ROUTING_DISCLAIMER,
  SIMULATION_SCENARIOS,
} from './data/mockRoutingData';
import {
  generateRouteAlternatives,
  calculateSimulation,
} from './utils/simulationEngine';
import { RoutePlanningForm } from './components/RoutePlanningForm';
import { RouteAlternativesList } from './components/RouteAlternativesList';
import { RouteComparisonMatrix } from './components/RouteComparisonMatrix';
import { RouteVisualizerMap } from './components/RouteVisualizerMap';
import { SimulationScenarioPanel } from './components/SimulationScenarioPanel';
import { SimulationResultsView } from './components/SimulationResultsView';
import { getAppNavSections } from '../../core/navigation/navigationItems';

export interface RoutePlanningPageProps {
  initialTab?: 'planning' | 'simulation';
  onBackToDashboard: () => void;
  onNavigateToDigitalTwin: () => void;
  onNavigateToFleet: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToReports?: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToHelp?: () => void;
  onBackToLanding: () => void;
  userRole?: string;
}

export const RoutePlanningPage: React.FC<RoutePlanningPageProps> = ({
  initialTab = 'planning',
  onBackToDashboard,
  onNavigateToDigitalTwin,
  onNavigateToFleet,
  onNavigateToAnalytics,
  onNavigateToReports,
  onNavigateToNotifications,
  onNavigateToProfile,
  onNavigateToSettings,
  onNavigateToHelp,
  onBackToLanding,
  userRole = 'Logistics Optimization Director',
}) => {
  // Navigation active state
  const [activeTab, setActiveTab] = useState<'planning' | 'simulation'>(initialTab);
  const [activeNav, setActiveNav] = useState<string>(
    initialTab === 'simulation' ? 'simulation' : 'routing'
  );

  // Planning Form Inputs State
  const [planningInputs, setPlanningInputs] = useState<RoutePlanningInput>({
    originHubId: 'HUB-LAX',
    destinationHubId: 'HUB-CHI',
    preferredMode: 'all',
    freightCategory: 'general_dry',
    shipmentWeightTons: 22,
  });

  const [isPlanningLoading, setIsPlanningLoading] = useState(false);

  // Computed Route Alternatives
  const [alternatives, setAlternatives] = useState<RouteAlternative[]>(() =>
    generateRouteAlternatives('HUB-LAX', 'HUB-CHI', 'general_dry', 22)
  );

  // Selected Route for Map and Simulation
  const [selectedRoute, setSelectedRoute] = useState<RouteAlternative>(
    alternatives[0]
  );

  // Active Simulation Scenario
  const [activeScenarioId, setActiveScenarioId] =
    useState<SimulationScenarioId>('normal_traffic');

  // Trigger Plan Route
  const handlePlanRoute = (newInputs: RoutePlanningInput) => {
    setIsPlanningLoading(true);
    setPlanningInputs(newInputs);

    setTimeout(() => {
      const generated = generateRouteAlternatives(
        newInputs.originHubId,
        newInputs.destinationHubId,
        newInputs.freightCategory,
        newInputs.shipmentWeightTons
      );
      setAlternatives(generated);
      setSelectedRoute(generated[0]);
      setIsPlanningLoading(false);
    }, 400);
  };

  // Switch to Simulation tab for a specific route
  const handleProceedToSimulation = (route: RouteAlternative) => {
    setSelectedRoute(route);
    setActiveTab('simulation');
    setActiveNav('simulation');
  };

  // Active scenario config
  const activeScenarioConfig = useMemo(() => {
    return (
      SIMULATION_SCENARIOS.find((s) => s.id === activeScenarioId) ||
      SIMULATION_SCENARIOS[0]
    );
  }, [activeScenarioId]);

  // Computed Simulation Results
  const simulationResults = useMemo(() => {
    return calculateSimulation(selectedRoute, activeScenarioConfig);
  }, [selectedRoute, activeScenarioConfig]);

  // Reset simulation to baseline
  const handleResetSimulation = () => {
    setActiveScenarioId('normal_traffic');
  };

  // Export mock plan summary
  const handleExportPlan = () => {
    const summary = {
      project: 'FreightTwin',
      timestamp: new Date().toISOString(),
      disclaimer: MOCK_ROUTING_DISCLAIMER,
      plan: {
        origin: selectedRoute.originName,
        destination: selectedRoute.destinationName,
        activeRoute: selectedRoute.name,
        mode: selectedRoute.primaryMode,
        distanceKm: selectedRoute.distanceKm,
        durationHours: selectedRoute.durationHours,
        costUsd: selectedRoute.estimatedCostUsd,
        carbonKgCO2e: selectedRoute.carbonEmissionKgCO2e,
        reliability: selectedRoute.reliabilityScorePercent,
      },
      simulation: {
        activeScenario: simulationResults.scenarioName,
        simulatedHours: simulationResults.simulatedDurationHours,
        simulatedCost: simulationResults.simulatedCostUsd,
        delayHours: simulationResults.delayHours,
      },
    };

    const blob = new Blob([JSON.stringify(summary, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `freight-route-plan-${selectedRoute.code}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
      setActiveNav('routing');
      setActiveTab('planning');
    } else if (id === 'simulation') {
      setActiveNav('simulation');
      setActiveTab('simulation');
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

  const tabs: TabItem[] = [
    {
      id: 'planning',
      label: 'Route Planning & Alternatives',
      icon: <Compass className="w-4 h-4" />,
      badge: `${alternatives.length} Paths`,
    },
    {
      id: 'simulation',
      label: 'Transport Disruption Simulation',
      icon: <Sliders className="w-4 h-4" />,
      badge: activeScenarioId !== 'normal_traffic' ? 'Active Shock' : undefined,
    },
  ];

  const [searchValue, setSearchValue] = useState('');

  return (
    <NavigationLayout
      sections={navSections}
      activeItemId={activeNav}
      onSelect={handleNavSelect}
      breadcrumbs={[
        'FreightTwin',
        'Command Center',
        activeTab === 'planning'
          ? 'Route Planning & Optimization'
          : 'Transport Disruption Simulation',
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
            activeTab === 'planning'
              ? 'Multi-Modal Route Planning'
              : 'What-If Disruption Simulation Studio'
          }
          description={
            activeTab === 'planning'
              ? 'Evaluate multimodal corridor alternatives, compare trade-offs, and inspect transit stages across the logistics digital twin.'
              : 'Inject synthetic traffic shocks, capacity surges, and weather disruptions to evaluate network elasticity.'
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
                onClick={handleExportPlan}
              >
                Export Plan JSON
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
              Simulated Planning Engine:
            </span>
            <span className="text-[11px] text-slate-600 truncate">
              {MOCK_ROUTING_DISCLAIMER}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-[11px] font-mono text-slate-500">
            <span>Selected Corridor:</span>
            <span className="font-semibold text-blue-600 bg-white px-2 py-0.5 rounded border border-blue-200">
              {selectedRoute.name}
            </span>
          </div>
        </div>

        {/* Tab Switcher & Quick Context */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Tabs
            items={tabs}
            activeTabId={activeTab}
            onChange={(id) => {
              const tab = id as 'planning' | 'simulation';
              setActiveTab(tab);
              setActiveNav(tab === 'planning' ? 'routing' : 'simulation');
            }}
            variant="pill"
          />
        </div>

        {/* TAB 1: Route Planning & Alternatives */}
        {activeTab === 'planning' && (
          <div className="space-y-6">
            {/* 1. Route Planning Inputs Form */}
            <section aria-label="Route Planning Configuration">
              <RoutePlanningForm
                initialValues={planningInputs}
                isLoading={isPlanningLoading}
                onPlanRoute={handlePlanRoute}
              />
            </section>

            {/* 2. Interactive Route Visualization Map */}
            <section aria-label="Interactive Route Map">
              <RouteVisualizerMap
                selectedRoute={selectedRoute}
                allAlternatives={alternatives}
                onSelectAlternative={(route) => setSelectedRoute(route)}
              />
            </section>

            {/* 3. Route Alternatives Cards */}
            <section aria-label="Evaluated Route Alternatives">
              <RouteAlternativesList
                alternatives={alternatives}
                selectedRouteId={selectedRoute.id}
                onSelectRoute={(route) => setSelectedRoute(route)}
                onProceedToSimulation={handleProceedToSimulation}
              />
            </section>

            {/* 4. Side-by-Side Trade-off Comparison Matrix */}
            <section aria-label="Multi-Modal Comparison Matrix">
              <RouteComparisonMatrix
                alternatives={alternatives}
                selectedRouteId={selectedRoute.id}
                onSelectRoute={(route) => setSelectedRoute(route)}
              />
            </section>
          </div>
        )}

        {/* TAB 2: Transport Simulation & What-If Sandbox */}
        {activeTab === 'simulation' && (
          <div className="space-y-6">
            {/* 1. Interactive Route Map with Scenario Context */}
            <section aria-label="Corridor Prototype Map">
              <RouteVisualizerMap
                selectedRoute={selectedRoute}
                allAlternatives={alternatives}
                onSelectAlternative={(route) => setSelectedRoute(route)}
              />
            </section>

            {/* 2. Disruption & Demand Scenario Injection Panel */}
            <section aria-label="Disruption Scenarios">
              <SimulationScenarioPanel
                activeScenarioId={activeScenarioId}
                onSelectScenario={(id) => setActiveScenarioId(id)}
                onResetSimulation={handleResetSimulation}
              />
            </section>

            {/* 3. Before vs After Results and Impact Metrics */}
            <section aria-label="Simulation Analysis Results">
              <SimulationResultsView
                simulationResults={simulationResults}
                selectedRoute={selectedRoute}
                onResetSimulation={handleResetSimulation}
              />
            </section>

            {/* 4. Alternative Corridors Quick-Select */}
            <section aria-label="Corridor Switcher">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-left">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Switch Evaluated Route for Simulation
                  </h4>
                  <span className="text-xs text-slate-500">
                    Click any alternative below to rerun active scenario shocks on it
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {alternatives.map((alt) => {
                    const isSelected = alt.id === selectedRoute.id;
                    return (
                      <button
                        key={alt.id}
                        type="button"
                        onClick={() => setSelectedRoute(alt)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 text-blue-950 ring-2 ring-blue-500/20 shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold truncate text-slate-900">{alt.name}</div>
                        <div className="text-[11px] font-mono text-slate-500 mt-1">
                          {alt.durationHours}h • ${alt.estimatedCostUsd.toLocaleString()} • {alt.primaryMode.toUpperCase()}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </NavigationLayout>
  );
};

export default RoutePlanningPage;
