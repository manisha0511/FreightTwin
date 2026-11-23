import React, { useState } from 'react';
import {
  Truck,
  Activity,
  Layers,
  Compass,
  Box,
  Wrench,
  TrendingUp,
  Leaf,
  Sliders,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Search,
  Check,
  Download,
  Eye,
  Plus,
  ArrowLeft,
  Info,
  Palette,
  Ship,
  Train,
  Plane,
  Warehouse,
} from 'lucide-react';
import {
  Button,
  Input,
  SearchBar,
  Select,
  Card,
  StatCard,
  Badge,
  Table,
  Tabs,
  FilterBar,
  Modal,
  Dropdown,
  Alert,
  Toast,
  Spinner,
  Skeleton,
  EmptyState,
  Tooltip,
  PageHeader,
  AnimatedNumber,
  FreightModeIcon,
  VisualMetricGauge,
  MicroSparkline,
  MovingFreightPulse,
  NavigationLayout,
  NavSection,
  FilterChip,
} from './index';

export interface DesignSystemGalleryProps {
  onBackToLanding?: () => void;
  userRole?: string;
}

export const DesignSystemGallery: React.FC<DesignSystemGalleryProps> = ({
  onBackToLanding,
  userRole = 'LOGISTICS DISPATCHER',
}) => {
  // Navigation State
  const [activeNav, setActiveNav] = useState('components');
  const [isSimulating, setIsSimulating] = useState(true);

  // Search State
  const [searchValue, setSearchValue] = useState('');

  // Selected Mode State
  const [selectedMode, setSelectedMode] = useState<'road' | 'rail' | 'ocean' | 'air' | 'hub' | 'container'>('road');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Table Sort State
  const [sortField, setSortField] = useState<'id' | 'speed' | 'health'>('speed');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedRowId, setSelectedRowId] = useState<string | null>('ASSET-102');

  // Navigation Items Structure
  const navSections: NavSection[] = [
    {
      title: 'Design System',
      items: [
        { id: 'components', label: 'Visual UI Kit', icon: Sparkles, href: '#/gallery', badge: 'v2.0', badgeVariant: 'cyan' },
        { id: 'overview', label: 'Command Center', icon: Activity, href: '#/dashboard' },
        { id: 'digital_twin', label: 'Digital Twin GIS', icon: Layers, href: '#/digital-twin' },
        { id: 'fleet', label: 'Fleet Management', icon: Truck, href: '#/fleet' },
      ],
    },
    {
      title: 'Planning & Decision',
      items: [
        { id: 'routing', label: 'Route Planning', icon: Compass, href: '#/routing' },
        { id: 'simulation', label: 'Transport Sandbox', icon: Sliders, href: '#/simulation' },
      ],
    },
  ];

  // Dummy Table Data
  const tableData = [
    { id: 'TRUCK-809', mode: 'road' as const, name: 'Volvo FH Electric (BEV)', origin: 'Chicago Hub', dest: 'Detroit Ramp', speed: 88, status: 'In Transit', health: 96 },
    { id: 'RAIL-412', mode: 'rail' as const, name: 'BNSF Double-Stack Intermodal', origin: 'LA Port Ramp', dest: 'Dallas Gate', speed: 64, status: 'Nominal', health: 91 },
    { id: 'VESSEL-03', mode: 'ocean' as const, name: 'Maersk Triple-E (18,000 TEU)', origin: 'Rotterdam Terminal', dest: 'NYC Gateway', speed: 22, status: 'Customs Hold', health: 84 },
    { id: 'AIR-904', mode: 'air' as const, name: 'Boeing 777F Air Cargo', origin: 'Frankfurt Airport', dest: 'Chicago ORD', speed: 780, status: 'En Route', health: 98 },
  ];

  const handleSort = (field: 'id' | 'speed' | 'health') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <NavigationLayout
      sections={navSections}
      activeItemId={activeNav}
      onSelect={setActiveNav}
      breadcrumbs={['FreightTwin 2.0', 'Visual Design System', 'Component Showcase']}
      searchValue={searchValue}
      onSearchChange={(e) => setSearchValue(e.target.value)}
      isSimulating={isSimulating}
      onToggleSimulation={() => setIsSimulating(!isSimulating)}
      roleLabel={userRole}
    >
      <div className="max-w-7xl mx-auto space-y-10 pb-16 text-left">
        {/* Page Header (Concise, Visual) */}
        <PageHeader
          title="FreightTwin 2.0 Visual Foundation"
          description="Light Premium design foundation. Visual-first ergonomics, domain-specific freight illustrations, radial telemetry gauges, and interactive micro-sparklines."
          badge={
            <Badge variant="cyan" hasPulseDot size="sm">
              VISUAL 2.0
            </Badge>
          }
          actions={
            <div className="flex items-center gap-2.5">
              {onBackToLanding && (
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
                  onClick={onBackToLanding}
                >
                  Landing
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Plus className="w-3.5 h-3.5" />}
                onClick={() => setIsModalOpen(true)}
              >
                Inspect Dialog
              </Button>
            </div>
          }
        />

        {/* Section 1: Freight Domain Visual Assets */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-text-primary font-display flex items-center gap-2">
                <Truck className="w-4 h-4 text-accent-primary" />
                <span>1. Freight Transport Visual Assets</span>
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Purposeful multi-modal illustrations replacing generic icons. Click to select active mode.
              </p>
            </div>
            <Badge variant="info" size="sm">
              6 Modes
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { mode: 'road' as const, label: 'Heavy Road Haul', badge: 'Class 8 / BEV' },
              { mode: 'rail' as const, label: 'Intermodal Rail', badge: 'Double Stack' },
              { mode: 'ocean' as const, label: 'Maritime Vessel', badge: 'Container Ship' },
              { mode: 'air' as const, label: 'Air Cargo Jet', badge: 'Wide-Body 777F' },
              { mode: 'hub' as const, label: 'Terminal Hub', badge: 'Automated Yard' },
              { mode: 'container' as const, label: 'ISO Container', badge: '40ft High-Cube' },
            ].map((item) => (
              <div
                key={item.mode}
                onClick={() => setSelectedMode(item.mode)}
                className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer flex flex-col items-center text-center gap-2.5 ${
                  selectedMode === item.mode
                    ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-command-md -translate-y-0.5'
                    : 'border-command-border hover:border-slate-300 shadow-premium-xs'
                }`}
              >
                <FreightModeIcon mode={item.mode} size="lg" active={selectedMode === item.mode} />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-text-primary">{item.label}</div>
                  <div className="text-[10px] font-mono font-semibold text-text-muted">{item.badge}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Large Visual Section (CommandSection / Hero Variant) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-text-primary font-display flex items-center gap-2">
              <Compass className="w-4 h-4 text-accent-primary" />
              <span>2. Large Visual Canvas (Replacing Box Clutter)</span>
            </h2>
            <span className="text-xs text-text-muted font-mono">Variant: "hero"</span>
          </div>

          <Card variant="hero" className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Visual Corridor Flow */}
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200/80">
                    TRANSIT DYNAMICS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-text-primary font-display">
                    US Transcontinental Intermodal Corridor
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Live simulation of dynamic multi-modal freight flow between LA Gateway Terminal and Chicago Intermodal Ramp.
                  </p>
                </div>

                <MovingFreightPulse
                  mode={selectedMode === 'ocean' || selectedMode === 'air' || selectedMode === 'rail' ? selectedMode : 'road'}
                  originName="Port of Los Angeles (USLAX)"
                  destName="Chicago BNSF Logistics Park"
                  distanceKm={3240}
                  durationHours={46.5}
                  statusLabel="PRIORITY FREIGHT CORRIDOR"
                />
              </div>

              {/* Right Column: Visual Telemetry Radial Gauges */}
              <div className="lg:col-span-5 flex items-center justify-around p-5 rounded-2xl bg-white/80 border border-command-border shadow-premium-sm">
                <VisualMetricGauge
                  value={94.6}
                  size="md"
                  label="On-Time"
                  statusVariant="success"
                  sublabel="Reliability Rate"
                />
                <VisualMetricGauge
                  value={78.2}
                  size="md"
                  label="V/C Sat"
                  statusVariant="warning"
                  sublabel="Capacity Threshold"
                />
                <VisualMetricGauge
                  value={98}
                  size="md"
                  label="Battery"
                  statusVariant="cyan"
                  sublabel="Fleet SoC Avg"
                />
              </div>
            </div>
          </Card>
        </section>

        {/* Section 3: StatCards with Interactive Sparklines & 3D Tilt */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-text-primary font-display flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent-primary" />
              <span>3. StatCards with Sparklines & 3D Hover Depth</span>
            </h2>
            <span className="text-xs text-text-muted font-mono">Interactive Curve Tooltips</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Active Fleet"
              value={<AnimatedNumber value={118} />}
              unit="/ 142"
              changePercent={4.2}
              changePeriodLabel="vs shift"
              statusVariant="cyan"
              badgeText="Live"
              icon={<Truck className="w-4 h-4 text-accent-secondary" />}
              sparkline={
                <MicroSparkline
                  data={[92, 98, 104, 112, 108, 115, 118]}
                  color="#06B6D4"
                  valueFormatter={(v) => `${v} units`}
                />
              }
            />

            <StatCard
              title="Throughput Volume"
              value={<AnimatedNumber value={1428} />}
              unit="TEU"
              changePercent={12.8}
              changePeriodLabel="vs 7d"
              statusVariant="default"
              icon={<Box className="w-4 h-4 text-accent-primary" />}
              sparkline={
                <MicroSparkline
                  data={[1120, 1190, 1260, 1310, 1380, 1428]}
                  color="#2563EB"
                  valueFormatter={(v) => `${v} TEU`}
                />
              }
            />

            <StatCard
              title="Network Speed"
              value={<AnimatedNumber value={68.4} formatter={(n) => n.toFixed(1)} />}
              unit="km/h"
              changePercent={-2.1}
              changePeriodLabel="target 70"
              statusVariant="warning"
              icon={<TrendingUp className="w-4 h-4 text-status-warning" />}
              sparkline={
                <MicroSparkline
                  data={[72, 71, 69, 70, 67, 68.4]}
                  color="#D97706"
                  valueFormatter={(v) => `${v} km/h`}
                />
              }
            />

            <StatCard
              title="GLEC Carbon Intensity"
              value={<AnimatedNumber value={42.8} formatter={(n) => n.toFixed(1)} />}
              unit="g/t-km"
              changePercent={-14.2}
              changePeriodLabel="Scope 3"
              statusVariant="success"
              icon={<Leaf className="w-4 h-4 text-status-success" />}
              sparkline={
                <MicroSparkline
                  data={[52, 49, 47, 46, 44, 42.8]}
                  color="#059669"
                  valueFormatter={(v) => `${v} g/t-km`}
                />
              }
            />
          </div>
        </section>

        {/* Section 4: Data Table with Domain Visuals */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-text-primary font-display">
                4. Data Table with Mode Visuals & Visual Health
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Replaces plain text table cells with illustrated mode markers and radial health meters.
              </p>
            </div>
            <span className="text-xs text-text-muted font-mono">Row Selection Active</span>
          </div>

          <Table density="comfortable">
            <Table.Header>
              <tr>
                <Table.HeadCell sortable sortDirection={sortField === 'id' ? sortDirection : null} onSort={() => handleSort('id')}>
                  Asset
                </Table.HeadCell>
                <Table.HeadCell>Mode & Class</Table.HeadCell>
                <Table.HeadCell>Route Corridor</Table.HeadCell>
                <Table.HeadCell sortable sortDirection={sortField === 'speed' ? sortDirection : null} onSort={() => handleSort('speed')}>
                  Velocity
                </Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell sortable sortDirection={sortField === 'health' ? sortDirection : null} onSort={() => handleSort('health')}>
                  Telemetry Health
                </Table.HeadCell>
              </tr>
            </Table.Header>
            <Table.Body>
              {tableData.map((row) => (
                <Table.Row
                  key={row.id}
                  isSelected={selectedRowId === row.id}
                  onClick={() => setSelectedRowId(row.id)}
                  className="cursor-pointer"
                >
                  <Table.Cell>
                    <div className="flex items-center gap-2.5">
                      <FreightModeIcon mode={row.mode} size="sm" />
                      <div>
                        <div className="font-mono font-bold text-accent-primary text-xs">{row.id}</div>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="font-semibold text-text-primary text-xs">{row.name}</div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="text-xs text-text-secondary">
                      <span className="font-semibold text-text-primary">{row.origin}</span> → {row.dest}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="font-mono font-bold text-xs">{row.speed} km/h</Table.Cell>
                  <Table.Cell>
                    <Badge
                      variant={
                        row.status === 'In Transit' || row.status === 'Nominal' || row.status === 'En Route'
                          ? 'success'
                          : row.status === 'Customs Hold'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                    >
                      {row.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <VisualMetricGauge
                        value={row.health}
                        size="sm"
                        statusVariant={row.health > 90 ? 'success' : row.health > 75 ? 'warning' : 'danger'}
                      />
                      <span className="font-mono text-xs font-bold text-text-primary">{row.health}%</span>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </section>

        {/* Section 5: Buttons, Tooltips & Form Controls */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-text-primary font-display">
            5. High-Impact Actions & Tooltips
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card>
              <Card.Header>
                <Card.Title>Form Select & Search</Card.Title>
              </Card.Header>
              <Card.Body className="space-y-3.5">
                <Select
                  label="Freight Routing Priority"
                  options={[
                    { value: 'green', label: 'Green Corridor (ISO 14083 / Lowest CO2e)' },
                    { value: 'fast', label: 'Express Velocity (Shortest Transit Hours)' },
                    { value: 'cost', label: 'Lowest Freight Rate (Optimal Cost/Ton)' },
                  ]}
                />
                <SearchBar
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Instant node search..."
                />
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title>Interactive Tooltips</Card.Title>
              </Card.Header>
              <Card.Body className="space-y-3">
                <p className="text-xs text-text-secondary">
                  Rich tooltips provide instant technical clarity without cluttering page real estate:
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Tooltip content="ISO 14083 Freight Emission Standard" position="top">
                    <Button variant="secondary" size="sm" leftIcon={<Info className="w-3.5 h-3.5 text-accent-primary" />}>
                      GLEC v3 Info
                    </Button>
                  </Tooltip>
                  <Tooltip content="Deterministic Simulation Clock: 5x Speed" position="bottom">
                    <Badge variant="cyan" hasPulseDot>
                      Simulation 5x
                    </Badge>
                  </Tooltip>
                  <Tooltip content="Class 8 Battery Electric Heavy Hauler" position="right">
                    <FreightModeIcon mode="road" size="sm" interactive />
                  </Tooltip>
                </div>
              </Card.Body>
            </Card>
          </div>
        </section>
      </div>

      {/* Test Modal Dialog */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="FreightTwin 2.0 Visual Inspection"
        description="Inspect multi-modal telemetry parameters and spatial corridor layers."
        size="md"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
              Apply Settings
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-sm text-text-secondary">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-command-border">
            <FreightModeIcon mode={selectedMode} size="md" />
            <div>
              <div className="font-bold text-text-primary text-sm uppercase">Selected Mode: {selectedMode}</div>
              <div className="text-xs text-text-muted">Multi-modal digital twin node synchronization active.</div>
            </div>
          </div>
          <Input label="Corridor Gateway Address" defaultValue="USLAX-INTERMODAL-RAMP-04" />
        </div>
      </Modal>
    </NavigationLayout>
  );
};

export default DesignSystemGallery;
