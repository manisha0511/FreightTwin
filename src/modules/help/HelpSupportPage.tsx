import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  Send,
  Headphones,
  Mail,
  Phone,
  Layers,
  Activity,
  Truck,
  Compass,
  Sliders,
  BarChart2,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import {
  NavigationLayout,
  Button,
  Badge,
  Input,
  PageHeader,
} from '../../design-system';
import { getAppNavSections } from '../../core/navigation/navigationItems';

export interface HelpSupportPageProps {
  onBackToDashboard: () => void;
  onNavigateToDigitalTwin: () => void;
  onNavigateToFleet: () => void;
  onNavigateToRouting: () => void;
  onNavigateToSimulation: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToReports: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToProfile: () => void;
  onNavigateToSettings: () => void;
  onBackToLanding: () => void;
  userRole?: string;
}

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Digital Twin Model',
    question: 'What is FreightTwin and how does the digital twin model transport corridors?',
    answer:
      'FreightTwin creates a multi-modal digital twin of freight logistics networks. It models Macro Corridors (interstate highways, electrified rail trunks, coastal shipping lanes) using dynamic volume-to-capacity (V/C) ratios and Micro Assets (tractors, railcars, barges) using physics-informed telematics (speed, battery SOC/fuel burn, cold chain temperature).',
  },
  {
    id: 'faq-2',
    category: 'Route Planning',
    question: 'How are multi-modal route alternatives and trade-offs calculated?',
    answer:
      'When you select an origin, destination, cargo class, and payload weight, FreightTwin evaluates 4 distinct alternatives: Electrified Intermodal Rail (balanced low-carbon choice), Direct Interstate Highway (fastest ground transit), Green Coastal/Barge Corridor (maximum ESG decarbonization), and Air Cargo Arc (express high-value delivery). Each alternative is ranked across distance, transit time, freight cost, and reliability.',
  },
  {
    id: 'faq-3',
    category: 'Transport Simulation',
    question: 'What calculation rules govern the What-If Disruption Scenarios?',
    answer:
      'The Transport Simulation sandbox applies deterministic heuristic penalty curves. For instance, "Heavy Traffic" applies a +28% transit time multiplier and +16% fuel/driver surcharge; "Route Disruption" forces a +15% distance detour and +45% delay; and "Alternative Route" models transferring cargo onto rail to achieve a 12% financial savings.',
  },
  {
    id: 'faq-4',
    category: 'Emissions & ESG',
    question: 'What methodology is used for GLEC-compliant carbon emissions reporting?',
    answer:
      'Carbon calculations follow the ISO 14083 / GLEC Framework v3 standard, multiplying distance (km) × payload weight (tons) × modal emission factors (e.g. 62-110 g/t-km for diesel trucks vs 12-25 g/t-km for electric rail). These numbers are simulated estimates and are clearly marked as non-certified mock figures.',
  },
  {
    id: 'faq-5',
    category: 'Reports & Exports',
    question: 'Can I export filtered datasets to CSV or print audit dossiers?',
    answer:
      'Yes! The Enterprise Reports module allows one-click export of RFC 4180 CSV files directly to your browser for Freight Performance, Transportation Spend, Route Efficiency, and Sustainability. You can also generate browser print summaries.',
  },
  {
    id: 'faq-6',
    category: 'Mapping & Telemetry',
    question: 'Is an external Mapbox API token required to view the map?',
    answer:
      'No API token is required. FreightTwin includes an interactive GIS vector prototype with pan, zoom, waypoint beacons, animated cyan corridors, and alternative paths. If you have a personal Mapbox token, you can optionally configure it in the Digital Twin settings.',
  },
];

export const HelpSupportPage: React.FC<HelpSupportPageProps> = ({
  onBackToDashboard,
  onNavigateToDigitalTwin,
  onNavigateToFleet,
  onNavigateToRouting,
  onNavigateToSimulation,
  onNavigateToAnalytics,
  onNavigateToReports,
  onNavigateToNotifications,
  onNavigateToProfile,
  onNavigateToSettings,
  userRole = 'Logistics Dispatcher',
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [faqSearch, setFaqSearch] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const filteredFaqs = useMemo(() => {
    if (!faqSearch.trim()) return FAQ_LIST;
    const q = faqSearch.toLowerCase();
    return FAQ_LIST.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );
  }, [faqSearch]);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketSubject('');
      setTicketMessage('');
    }, 4000);
  };

  const navSections = getAppNavSections(4);

  const handleNavSelect = (id: string) => {
    if (id === 'overview') onBackToDashboard();
    else if (id === 'digital_twin') onNavigateToDigitalTwin();
    else if (id === 'fleet') onNavigateToFleet();
    else if (id === 'routing') onNavigateToRouting();
    else if (id === 'simulation') onNavigateToSimulation();
    else if (id === 'analytics') onNavigateToAnalytics();
    else if (id === 'reports') onNavigateToReports();
    else if (id === 'notifications') onNavigateToNotifications();
    else if (id === 'profile') onNavigateToProfile();
    else if (id === 'settings') onNavigateToSettings();
  };

  return (
    <NavigationLayout
      sections={navSections}
      activeItemId="help"
      onSelect={handleNavSelect}
      breadcrumbs={['FreightTwin', 'System & Support', 'Help Documentation & Support Desk']}
      searchValue={searchValue}
      onSearchChange={(e) => setSearchValue(e.target.value)}
      roleLabel={userRole}
      onAlertClick={onNavigateToNotifications}
      onProfileClick={onNavigateToProfile}
    >
      <div className="max-w-5xl mx-auto space-y-8 pb-12 text-left">
        {/* Page Header */}
        <PageHeader
          title="Help Documentation & Support Desk"
          description="Explore FreightTwin's multi-modal digital twin architecture, read frequently asked operational questions, or submit support inquiries."
          actions={
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={onBackToDashboard}
            >
              Dashboard
            </Button>
          }
        />

        {/* Top Disclaimer Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 px-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="p-1 rounded-md bg-blue-100 text-blue-600">
              <HelpCircle className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-blue-700 font-bold uppercase">
              Documentation & Support Desk:
            </span>
            <span className="text-slate-600 truncate">
              User guide and simulated dispatch assistance desk.
            </span>
          </div>

          <span className="text-[11px] font-mono font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-blue-200">
            KNOWLEDGE BASE V2.0
          </span>
        </div>

        {/* Section 1: Platform Overview & Digital Twin Architecture */}
        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <Badge variant="cyan" size="sm" className="mb-2">
                PLATFORM ARCHITECTURE
              </Badge>
              <h2 className="text-lg font-bold text-slate-900">
                FreightTwin: Multi-Modal Freight Transport Digital Twin
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                FreightTwin pairs macro corridor digital twins with micro asset telematics, enabling proactive bottleneck mitigation, automated multi-modal pathfinding, and GLEC-compliant carbon accounting.
              </p>
            </div>
            <div className="hidden md:flex p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:bg-slate-100/70 transition-colors">
              <div className="flex items-center gap-2 text-blue-600 font-bold">
                <Layers className="w-4 h-4" />
                <span>Macro Corridor Twin</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Geospatial network topology modeling Volume-to-Capacity saturation across road, rail, and waterways.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:bg-slate-100/70 transition-colors">
              <div className="flex items-center gap-2 text-cyan-600 font-bold">
                <Truck className="w-4 h-4" />
                <span>Micro Asset Twin</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Subsystem health telemetry, fuel burn, battery state-of-charge, and cold-chain reefer monitoring.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:bg-slate-100/70 transition-colors">
              <div className="flex items-center gap-2 text-indigo-600 font-bold">
                <Compass className="w-4 h-4" />
                <span>Multi-Modal Routing</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Evaluates point-to-point road vs intermodal rail vs barge vs air cargo to balance cost and delivery speed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:bg-slate-100/70 transition-colors">
              <div className="flex items-center gap-2 text-emerald-600 font-bold">
                <Sliders className="w-4 h-4" />
                <span>What-If Sandbox</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Predictive disruption modeling injecting traffic chokepoints, storm closures, and freight surges.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Quick Jump Module Directory */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">
            Platform Modules Quick Navigation
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                title: 'Main Logistics Dashboard',
                desc: 'KPI statistics, interactive mini-map, active consignments table, and alert feed.',
                action: onBackToDashboard,
                icon: Activity,
              },
              {
                title: 'GIS Digital Twin Map',
                desc: 'Full-screen continental network map with pan, zoom, hub inspection, and vehicle tracking.',
                action: onNavigateToDigitalTwin,
                icon: Layers,
              },
              {
                title: 'Fleet & Asset Management',
                desc: 'Vehicle telemetry table, diagnostics drawer, fuel/energy gauges, and subsystem health.',
                action: onNavigateToFleet,
                icon: Truck,
              },
              {
                title: 'Route Planning & Pathfinding',
                desc: 'Multi-modal trip planner comparing road, rail, air, and water alternatives.',
                action: onNavigateToRouting,
                icon: Compass,
              },
              {
                title: 'Transport Disruption Simulation',
                desc: 'What-If sandbox testing congestion, weather closures, and surge demand penalties.',
                action: onNavigateToSimulation,
                icon: Sliders,
              },
              {
                title: 'Analytics & ESG Reports',
                desc: '12-month performance trends, cost audits, route efficiency, and CSV dossier exports.',
                action: onNavigateToAnalytics,
                icon: BarChart2,
              },
            ].map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div
                  key={idx}
                  onClick={mod.action}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {mod.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      {mod.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Interactive FAQ Accordion */}
        <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                  <HelpCircle className="w-3.5 h-3.5" />
                </span>
                Frequently Asked Questions (FAQ)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Answers to common operational and architectural questions.
              </p>
            </div>

            <div className="w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="text-xs"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Badge variant="cyan" size="sm">
                        {faq.category}
                      </Badge>
                      <span className="text-xs font-semibold text-slate-900">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-200/70 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Contact Support Desk Simulation Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Support Channels Card */}
          <div className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                <Headphones className="w-3.5 h-3.5" />
              </span>
              Dispatch Assistance Desk
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">
                  Simulated Dispatch Hotline
                </span>
                <span className="font-mono font-bold text-blue-600 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  +1 (800) 555-TWIN
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Available 24/7 during simulation runs
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-mono font-bold block">
                  Operations Desk Email
                </span>
                <span className="font-mono font-bold text-cyan-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  ops@freighttwin.internal
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Average simulation response: &lt; 15 mins
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-500">
              <strong>Demo Disclaimer:</strong> Support channels and contact addresses are fictional placeholders for UI demonstration.
            </div>
          </div>

          {/* Support Ticket Simulation Form (2 cols) */}
          <div className="md:col-span-2 p-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                <Send className="w-3.5 h-3.5" />
              </span>
              Submit Dispatch Support Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Submit a support ticket regarding corridor closures, telemetry anomalies, or simulation calibration.
            </p>

            <form onSubmit={handleTicketSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-semibold">Inquiry Category</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none font-medium">
                      <option>Route Optimization & GIS Corridor</option>
                      <option>Fleet Telemetry & Diagnostics</option>
                      <option>Simulation Sandbox Calibration</option>
                      <option>GLEC Emissions Report Inquiry</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-[10px]">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-semibold">Subject Line</label>
                  <Input
                    type="text"
                    placeholder="Brief description of the inquiry..."
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-semibold">Inquiry Details</label>
                <textarea
                  rows={3}
                  placeholder="Detail the corridor, vehicle ID, or simulation scenario..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none font-sans"
                />
              </div>

              {ticketSubmitted && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Support ticket logged successfully! Assigned reference #TKT-8902.</span>
                </div>
              )}

              <div className="flex justify-end pt-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  leftIcon={<Send className="w-3.5 h-3.5" />}
                >
                  Dispatch Ticket
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
};

export default HelpSupportPage;
