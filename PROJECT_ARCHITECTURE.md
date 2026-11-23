# FreightTwin: Intelligent Freight Transport & Digital Twin Platform
## Comprehensive System Architecture & Engineering Specifications
**Document Version:** 1.0.0  
**Status:** PROPOSED ARCHITECTURE (Pending Review & Approval)  
**Target Stack:** React 18+ · TypeScript · Vite · Tailwind CSS · React Router · Lucide React · Framer Motion · Recharts · Three.js / React Three Fiber · Mapbox GL JS  

---

## 1. Executive Project Requirement Document (PRD)

### 1.1 Platform Vision
**FreightTwin** is an enterprise-grade Digital Twin and Decision-Intelligence Platform designed to model, simulate, monitor, and optimize multi-modal freight transport networks. By bridging macroscopic geospatial logistics corridors with microscopic 3D terminal and asset operations, FreightTwin enables logistics operators, network strategists, and fleet managers to achieve end-to-end visibility, proactive disruption mitigation, and rigorous carbon accounting.

### 1.2 Core System Goals
1. **End-to-End Visibility:** Unify road, rail, maritime, and air freight corridors into a synchronized digital twin representation.
2. **Deterministic Simulation & What-If Sandbox:** Allow planners to stress-test logistics networks against disruptions (e.g., corridor closures, extreme weather, fuel price shocks, labor bottlenecks) without endangering live supply chains.
3. **Decarbonization & Green Routing:** Calculate accurate greenhouse gas (GHG) emissions based on the GLEC (Global Logistics Emissions Council) framework and optimize for both cost and carbon efficiency.
4. **Micro-Scale Yard & Terminal Intelligence:** Provide 3D spatial twin representations of intermodal yards and container terminals to optimize dwell times, crane utilization, and gate throughput.
5. **Predictive Asset Health:** Track degradation trends across fleet components using physics-informed heuristic failure models.

### 1.3 System Boundary & Strict Real-Time Policy
- **No Real-Time Hallucination:** The platform does not assume the presence of live telematics streams or external real-time IoT gateways during this phase. 
- **Time-Step Simulation Engine:** A client-side, deterministic simulation clock (`SimulationTimeEngine`) drives all telemetry, vehicle motion, and yard state updates using parametric ticks (1x, 5x, 20x, 60x).
- **Backend Decoupling:** Every feature requiring live databases, persistent queues, ML inference microservices, or external map tiling servers is isolated behind strict TypeScript service contracts (`Service Adapters`). Mock providers simulate backend delays and data structures today; real APIs plug in tomorrow with zero frontend view changes.

---

## 2. Problem Statement & Proposed Solution

### 2.1 Problem Statement
Global logistics networks operate under severe fragmentation:
- **Corridor Blind Spots:** Operators rely on static schedules and siloed telematics. When bottlenecks occur at ports or transit hubs, downstream operations experience cascading delays.
- **Micro vs. Macro Disconnect:** High-level ERP/TMS tools lack physical spatial context for terminal yards, leading to demurrage and unoptimized container dwell times.
- **Reactive Disruption Response:** Route diversions during severe disruptions (weather, strikes, infrastructure failures) are executed ad-hoc without quantified risk or carbon impact modeling.
- **ESG Compliance Burden:** Tightening cross-border carbon border adjustment mechanisms (CBAM) and Scope 3 reporting require auditable, granular emissions calculations that legacy spreadsheets cannot deliver.

### 2.2 Proposed Solution: FreightTwin Architecture
FreightTwin addresses these challenges through a tri-layer digital twin platform:
```
+-----------------------------------------------------------------------------------+
|                            FREIGHTTWIN PRESENTATION LAYER                         |
|  Executive View  |  Corridor Twin  |  3D Terminal Yard  |  What-If Sandbox  | ESG  |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
|                        SIMULATION & DECISION RUNTIME (CLIENT)                     |
|  - Simulation Clock & Ticker (useSimulationClock)                                  |
|  - Deterministic Telemetry & State Generators                                    |
|  - Heuristic Multi-Modal Routing & GLEC Carbon Estimation Engines                 |
|  - Scenario Branching & Parameterized What-If Mutator                             |
+-----------------------------------------------------------------------------------+
                                         |
+-----------------------------------------------------------------------------------+
|                       SERVICE ADAPTER LAYER (CONTRACT-DRIVEN)                     |
|        [Mock Data Store & Physics Engine]  <--->  [Future REST / WS / gRPC API]   |
+-----------------------------------------------------------------------------------+
```

---

## 3. Target Users & Role-Based Workflows

| Role | Primary Objectives | Key Modules Used | Critical Decisions Enabled |
| :--- | :--- | :--- | :--- |
| **Freight Dispatcher & Logistics Coordinator** | Day-to-day consignment dispatching, corridor monitoring, and delay exception resolution. | Consignments, Corridor Twin, Routing Optimizer | Real-time rerouting approval, emergency transshipment dispatch, customer delay notification. |
| **Fleet & Asset Operations Manager** | Vehicle readiness, EV/ICE utilization, telemetry monitoring, and maintenance scheduling. | Fleet & Asset Twin, Predictive Maintenance | Scheduling preventative overhauls, optimizing charging/fueling windows, rebalancing fleet depot allocations. |
| **Terminal & Yard Operations Lead** | Container stacking throughput, crane cycle optimization, gate queues, and berth allocation. | 3D Terminal & Yard Twin, Fleet Twin | Re-slotting containers to prevent unproductive moves, optimizing crane dispatch, smoothing gate congestion. |
| **Supply Chain Strategist & Network Planner** | Long-term resilience, corridor capacity planning, intermodal modal shifts, and risk assessment. | Network & Digital Twin Hub, Simulation Sandbox, Demand & Capacity | Evaluating ROI on new intermodal hubs, preparing continuity plans for port strikes or extreme weather. |
| **ESG & Sustainability Compliance Officer** | Auditable Scope 1/2/3 carbon accounting, green corridor adoption, and carbon offset reporting. | ESG & Compliance, Routing Optimizer | Choosing low-carbon transport modes, generating CBAM/ISO 14083 compliance reports. |
| **System Administrator** | User governance, simulation speed/parameter calibration, API gateway toggles, and data export. | System Settings & Calibration | Switching from Mock Mode to Live Gateway Mode, setting baseline cost/fuel indices. |

---

## 4. Complete Page-by-Page Frontend Requirements

### Page 1: Executive Overview Dashboard (`/`)
- **Objective:** High-level situational awareness across the entire logistics network.
- **Key Widgets:**
  - Active freight volume metric cards (Total Ton-Miles, Active Consignments, On-Time Performance rate, Network Health Index).
  - High-level multi-modal network status map snapshot.
  - Active disruption alerts ribbon (severe weather, terminal congestion, corridor blockades).
  - Fleet fuel & carbon intensity gauge (GLEC Scope 1/3 intensity trend).
  - Quick-action shortcuts (Launch What-If Simulation, Dispatch Emergency Reroute).

### Page 2: Macro Network & Digital Twin Corridor Map (`/network-twin`)
- **Objective:** Visualizing global and regional freight corridors across road, rail, maritime, and air lines.
- **Key Widgets:**
  - Full-screen Interactive Geospatial Canvas (Mapbox integration / High-fidelity SVG/Canvas fallback).
  - Layer switchers: Road corridors, Rail freight trunks, Maritime shipping lanes, Air cargo arcs, Intermodal terminals.
  - Choke point & bottleneck heatmap toggle (visualizing delays and capacity saturation).
  - Corridor inspector flyout: Clicking any link reveals flow velocity, capacity headroom, active vehicles, and weather overlays.

### Page 3: Active Fleet & Asset Management (`/fleet-assets`)
- **Objective:** Micro-level tracking of individual transport assets (tractors, railcars, cargo vessels, aircraft, intermodal containers).
- **Key Widgets:**
  - Asset catalog table with multi-criteria filtering (Mode, Fuel Type [Diesel, Electric, Hydrogen, LNG], Health Score, Status).
  - Asset Telemetry Detail Drawer: Speed, RPM/throttle, battery SOC/fuel level, payload weight, refrigeration unit temperature (reefer cargo).
  - Asset location mini-map with historical breadcrumb trajectory playback.
  - Bulk asset reassignment and maintenance flagging modal.

### Page 4: Consignment & Dispatch Management (`/consignments`)
- **Objective:** Multi-leg journey tracking from initial pickup to final delivery.
- **Key Widgets:**
  - Kanban / Master-Detail list of consignments (Booked, Dispatched, In-Transit, Transshipping, Delayed, Delivered).
  - Milestone timeline viewer (origin gate-in -> rail transfer -> port customs clearance -> destination).
  - Electronic Proof of Delivery (ePOD) viewer and bill of lading (BOL) digital document preview.
  - Delay alert indicator with automated root-cause tags (Customs Hold, Rail Congestion, Weather).

### Page 5: Dynamic Route Optimization & Green Corridors (`/routing-optimizer`)
- **Objective:** Multi-modal pathfinding comparison balancing cost, transit duration, and carbon emissions.
- **Key Widgets:**
  - Origin-Destination trip planner with cargo specification inputs (Weight, Volume, Hazard Class, Temperature control).
  - Multi-Modal Route Comparison Matrix (All-Road vs. Rail-Intermodal vs. Coastal Shipping):
    - Metrics: Transit Time (hours), Financial Cost ($), Carbon Footprint (kg CO2e), Reliability Index (%).
  - Route elevation and road quality profile charts.
  - Carbon vs. Cost Pareto frontier visualizer.

### Page 6: 3D Terminal & Yard Digital Twin (`/terminal-yard`)
- **Objective:** Micro-spatial 3D interactive model of an intermodal freight yard and container terminal.
- **Key Widgets:**
  - WebGL / Three.js Interactive 3D Canvas (React Three Fiber):
    - Container stacks arranged by yard bays, rows, and tiers.
    - Rubber-Tired Gantry (RTG) cranes, Rail-Mounted Gantry (RMG) cranes, and yard hostlers.
    - Color-coded container status (Reefer, Hazardous, High-Priority, Dwell > 48h).
  - Raycast selector: Clicking a container displays container ID, weight, destination, dwell time, and re-handling count.
  - Yard Congestion & Turnaround KPI bar (Average truck turn time, crane moves per hour).
  - Yard layout toggle (Intermodal Rail Yard vs. Maritime Container Pier).

### Page 7: Predictive Maintenance & Sensor Diagnostics (`/predictive-maintenance`)
- **Objective:** Physics-based asset degradation modeling and preventative intervention scheduling.
- **Key Widgets:**
  - Health Risk Matrix: Fleet categorized by Failure Risk (Critical, Impending, Nominal).
  - Telemetry Degradation Curves (Brake pad wear, tire pressure decay, diesel particulate filter soot loading, traction battery state-of-health).
  - Anomaly detection event log with synthetic sensor spike markers.
  - Maintenance scheduler with estimated downtime and labor/parts cost estimations.

### Page 8: Freight Demand & Capacity Balancing (`/demand-capacity`)
- **Objective:** Balancing seasonal freight shipper demand against available carrier and infrastructure capacity.
- **Key Widgets:**
  - Corridor volume forecast chart with historical actuals vs. projected seasonal demand.
  - Spot rate vs. Contract rate volatility tracker.
  - Empty backhaul index visualizer (identifying equipment imbalances and deadhead miles).
  - Dynamic capacity matching simulator (simulating lane pricing and carrier tenders).

### Page 9: Emissions, ESG & Regulatory Compliance (`/esg-compliance`)
- **Objective:** ISO 14083 / GLEC-compliant carbon emissions reporting and hazardous materials oversight.
- **Key Widgets:**
  - Carbon emissions breakdown by scope (Scope 1 direct diesel/fuel, Scope 2 electric rail/EV depot charging, Scope 3 3PL carrier footprint).
  - Modal shift decarbonization calculator (showing CO2e abatement achieved via rail/water shifts).
  - Hazardous cargo (Hazmat / ADR) compliance registry and safety inspection verification logs.
  - Exportable ESG Compliance Dossier generator (PDF/CSV structure preview).

### Page 10: Scenario Simulation & What-If Sandbox (`/simulation-sandbox`)
- **Objective:** Synthetic disruption modeling to evaluate network elasticity and business continuity.
- **Key Widgets:**
  - Disruption Injection Panel: Inject specific shocks (Corridor Closure, Port Strike, +35% Fuel Price Spike, Winter Storm).
  - Split-screen or overlay comparison: Baseline Model vs. Disturbed Scenario.
  - Network Resilience Scorecard (Vulnerability Index, Cost Impact, Reroute Delay Penalty).
  - Action plan generator: Recommended modal shifts and depot buffer adjustments.

### Page 11: System Settings & Simulation Calibration (`/settings`)
- **Objective:** Configuration of simulation clock parameters, operational units, and API endpoints.
- **Key Widgets:**
  - Simulation clock settings (Tick frequency, default speed multiplier, epoch anchor date).
  - Unit preferences (Metric: km, metric tons, liters vs. Imperial: miles, short tons, gallons).
  - Fuel price and carbon price per metric ton ($/tCO2e) baseline inputs.
  - Data Source Mode toggle (Mock Generator Mode vs. External API Endpoint Mode).

---

## 5. Detailed Feature Breakdown for All Nine Modules

### Module 1: Network & Digital Twin Hub (Macro Twin)
- **1.1 Multi-Modal Network Graph Topology:** Graph structure representing nodes (Ports, Rail Intermodal Ramps, Freight Depots, Airports, Border Checkpoints) and directed edges (Highways, Rail Lines, Inland Waterways, Shipping Lanes).
- **1.2 Real-Time Flow & Capacity Saturation Engine:** Parametric calculation of edge congestion using Volume-to-Capacity (V/C) ratios:
  $$\text{Congestion Ratio} = \frac{\text{Active Volume}}{\text{Design Capacity}}$$
- **1.3 Chokepoint & Bottleneck Detector:** Flags edges exceeding 85% capacity or experiencing simulated speed drops $> 40\%$.
- **1.4 Weather & Incident Geospatial Overlay:** Injects localized speed penalties based on weather conditions (Snow, Flooding, Fog, Gale-force winds).

### Module 2: Fleet & Asset Twin (Micro Twin)
- **2.1 Multi-Class Vehicle Schema:** Models articulated trucks, heavy freight locomotives, container feeder ships, and cargo freighters.
- **2.2 Energy & Propulsion Profile Modeling:** Distinct telemetry models for Internal Combustion (Diesel), Battery Electric (BEV), and Fuel Cell (Hydrogen).
- **2.3 Synthetic Telemetry Tick Stream:** Emits periodic snapshots (lat, lng, heading, speed, odometer, fuel/battery level, payload weight, tire pressure, engine coolant temp).
- **2.4 Asset Geo-Fencing & Boundary Events:** Fires automatic events when assets cross corridor gates or terminal perimeters.

### Module 3: Trip & Consignment Execution (Dispatch & Tracking)
- **3.1 Multi-Leg Journey Decomposition:** Breaks complex consignments into legs (First-mile drayage $\to$ Rail line-haul $\to$ Port vessel loading $\to$ Destination drayage).
- **3.2 Dynamic ETA Prediction:** Calculates remaining transit time based on live corridor speeds, driver Hours of Service (HOS) rest regulations, and mandatory terminal dwell times.
- **3.3 Exception & Deviation Management:** Automatic triggers for route deviations $> 5\text{ km}$, unapproved dwell times $> 120\text{ min}$, or reefer temperature deviations $> \pm 2^\circ\text{C}$.
- **3.4 Digital Custody Chain & ePOD:** Tracks custody handoffs with cryptographic mock signatures and condition stamps.

### Module 4: Dynamic Route Optimization & Green Corridor Engine
- **4.1 Multi-Objective Route Evaluation:** Evaluates candidates across three objective vectors:
  $$J = w_1 \cdot \text{Cost} + w_2 \cdot \text{Duration} + w_3 \cdot \text{Emissions}$$
- **4.2 GLEC-Compliant Carbon Emission Calculation:**
  $$\text{CO}_2\text{e} (\text{kg}) = \text{Distance} (\text{km}) \times \text{Payload} (\text{t}) \times \text{Emission Factor} \left(\frac{\text{g CO}_2\text{e}}{\text{t}\cdot\text{km}}\right) \times 10^{-3}$$
  - Diesel Truck: $62 - 110\text{ g/t-km}$
  - Electric Truck (Grid-dependent): $20 - 45\text{ g/t-km}$
  - Electric Freight Rail: $12 - 25\text{ g/t-km}$
  - Container Vessel: $8 - 18\text{ g/t-km}$
- **4.3 Multi-Modal Intermodal Pathfinding:** Computes transfers at verified transshipment hubs with realistic transfer delay penalties (2 - 6 hours).
- **4.4 Road Gradient & Payload Resistance Adjustment:** Compensates fuel burn and energy consumption based on topography.

### Module 5: Terminal & Yard Operations Simulator (3D Yard/Port Twin)
- **5.1 3D Spatial Grid Representation:** Coordinates based on standard TEU (Twenty-foot Equivalent Unit) slotting: `Bay (X)`, `Row (Y)`, `Tier (Z)`.
- **5.2 Crane Allocation & Movement Scheduler:** Models RTG/RMG crane movements, calculating cycle times and unproductive "digs" (moving top containers to reach a bottom container).
- **5.3 Gate Queue & Turnaround Simulator:** Poisson-distribution arrival model for drayage trucks at terminal gates to model queuing times and gate bottlenecks.
- **5.4 Dwell Time & Demurrage Hazard Heatmap:** Visually illuminates containers nearing free-time expiration to prioritize retrieval.

### Module 6: Predictive Maintenance & Sensor Diagnostics
- **6.1 Physics-Informed Degradation Curves:** Models component wear using Weibull failure probability distributions:
  $$F(t) = 1 - e^{-(t/\eta)^\beta}$$
- **6.2 Multi-Subsystem Health Telemetry:**
  - Powertrain (Engine vibration, oil pressure, motor inverter temperature).
  - Braking (Pneumatic pressure, pad thickness, regenerative braking efficiency).
  - Chassis/Running Gear (Tire pressure/temperature, axle bearing acoustics).
- **6.3 Remaining Useful Life (RUL) Estimator:** Projects remaining operational days/hours prior to crossing safety thresholds.
- **6.4 Preventative Work Order Recommendation:** Suggests maintenance grouping to minimize vehicle downtime.

### Module 7: Freight Demand & Capacity Planning (Supply-Demand Balancing)
- **7.1 Lane-Level Demand Forecasting:** Simulates forward 30/60/90-day freight demand volume across key economic corridors.
- **7.2 Carrier Equipment Balancing & Deadhead Minimization:** Identifies empty trailer/container relocation requirements.
- **7.3 Spot Market Volatility Index:** Models freight rate spikes driven by regional demand surges or supply contractions.
- **7.4 Capacity Tender Simulation:** Simulates load-to-truck matching and acceptance rates based on lane profitability.

### Module 8: Emissions, ESG & Regulatory Compliance
- **8.1 Scope 1, 2, and 3 Greenhouse Gas Accounting:** Detailed categorizations matching GHG Protocol corporate standards.
- **8.2 Cross-Border Carbon Adjustment (CBAM) Readiness:** Pre-computes embodied carbon per ton of imported goods for customs compliance.
- **8.3 Hazardous Materials (Hazmat/ADR) Tunnel & Route Enforcement:** Ensures chemical/explosive cargo avoids restricted bridges, tunnels, and dense municipal areas.
- **8.4 Sustainability Certification Ledger:** Records clean fuel certifications (HVO100 renewable diesel, green hydrogen certificates, certified bio-LNG).

### Module 9: Scenario Simulation & What-If Sandbox
- **9.1 Interactive Disturbance Injector:** User-configurable parameters for severity, duration, and geographic radius of disruptions.
- **9.2 Dual-State Network State Differencing:** Side-by-side metric diffs (Baseline vs. Perturbed state) showing delta in ton-miles, delayed cargo value, and excess carbon emissions.
- **9.3 Reroute Elasticity Index:** Measures network capacity to absorb rerouted freight without gridlocking secondary corridors.
- **9.4 Emergency Contingency Action Plan Exporter:** Summarizes actionable operational pivots for executive sign-off.

---

## 6. Dashboard Layout & Navigation Hierarchy

### 6.1 Layout Architecture
The application utilizes a persistent, mission-control layout optimized for information density, clarity, and rapid response.

```
+----------------------------------------------------------------------------------------------------+
| [Logo: FreightTwin]  | [Corridor Selector v]  | [Simulation Clock: > RUNNING 5x | 2026-11-23 09:30] | [User] |
+----------------------------------------------------------------------------------------------------+
| [Nav Sidebar]  |                                                                                  |
| - Overview     |                             PRIMARY VIEWPORT                                     |
| - Network Twin |                                                                                  |
| - Fleet Assets |   [Dynamic Page Header: Breadcrumbs + Quick KPI Bar + Filter Toolbar]            |
| - Consignments |  +------------------------------------------------------------------------------+|
| - Routing Opt. |  |                                                                              ||
| - 3D Yard      |  |                                                                              ||
| - Pred. Maint. |  |                       Core Content (Map / 3D Canvas / Data Grid)             ||
| - Demand/Cap.  |  |                                                                              ||
| - ESG & Carbon |  |                                                                              ||
| - What-If Box  |  +------------------------------------------------------------------------------+|
| - Settings     |                                                                                  |
|                |  +------------------------------------+  +-------------------------------------+ |
| [Collapse <]   |  | Secondary Panel (Charts / Metrics) |  | Flyout Inspector / Detail Drawer    | |
| [Status: MOCK] |  +------------------------------------+  +-------------------------------------+ |
+----------------------------------------------------------------------------------------------------+
```

### 6.2 Navigation Structure & URL Routes

```
/
├── dashboard                           # Executive Overview
├── network-twin                        # Macro Geospatial Corridor Twin
│   ├── ?corridor=:id                   # Deep-link to specific corridor
│   └── ?mode=road|rail|maritime        # Filter by transport mode
├── fleet-assets                        # Asset Roster & Micro Twin
│   ├── :assetId                        # Asset detail drawer / view
│   └── ?status=active|maintenance      # Filter by status
├── consignments                        # Freight Consignment Tracking
│   ├── :consignmentId                  # Multi-leg journey breakdown
│   └── ?view=kanban|table              # Display toggle
├── routing-optimizer                   # Dynamic Pathfinding & Green Corridors
│   └── ?origin=:o&destination=:d       # Pre-loaded routing query
├── terminal-yard                       # 3D Micro Yard & Port Twin
│   ├── :terminalId                     # Specific yard facility selector
│   └── ?view=3d|2d-schematic           # Render mode
├── predictive-maintenance              # Sensor Health & Telemetry Diagnostics
│   └── :assetId/diagnostics            # Deep diagnostic breakdown
├── demand-capacity                     # Supply-Demand Balancing & Rates
├── esg-compliance                      # GLEC Emissions & Regulatory Ledger
├── simulation-sandbox                  # What-If Disruption Scenario Modeler
│   └── ?scenarioId=:id                 # Load saved scenario preset
└── settings                            # System Configuration & Clock Toggles
```

### 6.3 Global App Header Controls
- **Global Simulation Controller:** Play, Pause, Step-Forward (1 tick = 15 simulated minutes), and Speed Multiplier (`1x`, `5x`, `20x`, `60x`).
- **Active Scenario Indicator:** Visual pill indicating whether the user is viewing the `LIVE BASELINE` or an active `WHAT-IF EXPERIMENT`.
- **System Alert Bell:** Notification drawer badge aggregating high-priority threshold breaches (e.g., Reefer Temp Alert, Corridor Failure, Emergency Brake Wear).
- **Data Mode Badge:** Explicit indicator showing `SIMULATION ENGINE (MOCK)` with a tooltip detailing synthetic data parameters.

---

## 7. Scalable React + TypeScript Folder Structure

The project adopts a **Domain-Driven Feature Slice Architecture**. All features are self-contained with their own components, state hooks, and API adapters, ensuring strict modularity and zero spaghetti dependencies.

```
FreightTwin/
├── .gitignore
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── public/
│   ├── favicon.svg
│   └── assets/
│       ├── 3d/                     # Low-poly GLTF models (containers, cranes, trucks)
│       └── geo/                    # GeoJSON boundaries and base corridor coordinates
├── src/
│   ├── main.tsx                    # Application entry point
│   ├── App.tsx                     # Top-level Router & Provider Tree
│   ├── index.css                   # Tailwind directives & theme variables
│   │
│   ├── core/                       # Core infrastructure & cross-cutting concerns
│   │   ├── config/                 # App configuration & environment constants
│   │   │   ├── app.config.ts
│   │   │   └── navigation.config.ts
│   │   ├── constants/              # System constants (GLEC factors, vehicle limits)
│   │   │   ├── emissionFactors.ts
│   │   │   └── vehicleTypes.ts
│   │   ├── context/                # Global contexts
│   │   │   ├── SimulationContext.tsx # Central simulation clock & tick dispatcher
│   │   │   ├── ScenarioContext.tsx   # Active what-if experiment state
│   │   │   └── ThemeContext.tsx      # Dark/Light industrial theme
│   │   ├── hooks/                  # Global utility hooks
│   │   │   ├── useSimulationClock.ts
│   │   │   ├── useDebounce.ts
│   │   │   └── useLocalStorage.ts
│   │   └── utils/                  # Mathematical, geographic, and formatting utilities
│   │       ├── geoUtils.ts         # Haversine distance, bearing calculations
│   │       ├── formatters.ts       # Ton-miles, currency, CO2 formatting
│   │       └── physicsEngine.ts    # Heuristic fuel and degradation calculations
│   │
│   ├── types/                      # Central TypeScript Domain Interfaces
│   │   ├── network.types.ts        # Nodes, Edges, Corridors, Chokepoints
│   │   ├── fleet.types.ts          # Vehicles, Propulsion, Telemetry
│   │   ├── consignment.types.ts    # Trips, Legs, Cargo, Milestones
│   │   ├── routing.types.ts        # Path finding queries, routes, alternatives
│   │   ├── terminal.types.ts       # 3D Yard layout, Container slots, Cranes
│   │   ├── maintenance.types.ts    # Degradation telemetry, Work orders
│   │   ├── market.types.ts         # Demand forecasting, Spot/contract rates
│   │   ├── esg.types.ts            # Emissions, GLEC factors, Compliance
│   │   ├── simulation.types.ts     # Disruption inputs, Scenario parameters
│   │   └── api.types.ts            # Common API envelope & response wrappers
│   │
│   ├── services/                   # Service Layer (Contract-Driven Decoupling)
│   │   ├── contracts/              # Service Interface definitions (TypeScript)
│   │   │   ├── INetworkService.ts
│   │   │   ├── IFleetService.ts
│   │   │   ├── IConsignmentService.ts
│   │   │   ├── IRoutingService.ts
│   │   │   ├── ITerminalService.ts
│   │   │   ├── IMaintenanceService.ts
│   │   │   ├── IMarketService.ts
│   │   │   └── ISimulationService.ts
│   │   ├── mock/                   # In-memory Mock Data & Generator Implementations
│   │   │   ├── mockNetworkService.ts
│   │   │   ├── mockFleetService.ts
│   │   │   ├── mockConsignmentService.ts
│   │   │   ├── mockRoutingService.ts
│   │   │   ├── mockTerminalService.ts
│   │   │   ├── mockMaintenanceService.ts
│   │   │   ├── mockMarketService.ts
│   │   │   ├── mockSimulationService.ts
│   │   │   └── generators/         # Synthetic data seeds & procedural math
│   │   │       ├── networkSeed.ts
│   │   │       ├── vehicleSeed.ts
│   │   │       ├── consignmentSeed.ts
│   │   │       └── yardLayoutSeed.ts
│   │   └── api/                    # Future Live Backend API Clients (Stubs)
│   │       ├── apiClient.ts        # Axios/Fetch base client with interceptors
│   │       ├── networkApi.ts
│   │       ├── fleetApi.ts
│   │       └── routingApi.ts
│   │
│   ├── components/                 # Reusable UI Component Library
│   │   ├── ui/                     # Base design system primitives (Tailwind + Radix style)
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Spinner.tsx
│   │   ├── common/                 # Composite generic widgets
│   │   │   ├── MetricCard.tsx
│   │   │   ├── StatusIndicator.tsx
│   │   │   ├── TimeScrubber.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── layout/                 # Shell & Chrome components
│   │   │   ├── MainLayout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SimulationBar.tsx
│   │   │   └── DetailDrawer.tsx
│   │   ├── maps/                   # Mapbox & Geo Visualization Wrappers
│   │   │   ├── MapboxContainer.tsx # Core map container with token fallback
│   │   │   ├── CorridorLayer.tsx   # Multi-modal path renderers
│   │   │   ├── VehicleMarker.tsx   # Animated vehicle position markers
│   │   │   ├── ChokepointHeatmap.tsx
│   │   │   └── MapFallbackView.tsx # Lightweight Canvas/SVG 2D fallback
│   │   └── three/                  # 3D Digital Twin Visualizers (Three.js/R3F)
│   │       ├── YardCanvas.tsx      # R3F Canvas container with lighting & shadows
│   │       ├── ContainerBlock.tsx  # Instanced mesh container representation
│   │       ├── GantryCrane.tsx     # Animated crane structure
│   │       ├── YardGround.tsx      # Pavement markings, rail tracks, berth docks
│   │       └── YardCameraRig.tsx   # OrbitControls & preset view transitions
│   │
│   └── modules/                    # Domain Feature Modules (Pages + Sub-features)
│       ├── dashboard/              # Executive Overview
│       │   ├── DashboardPage.tsx
│       │   └── components/
│       ├── network/                # Macro Network Corridor Twin
│       │   ├── NetworkTwinPage.tsx
│       │   └── components/
│       ├── fleet/                  # Fleet & Asset Management
│       │   ├── FleetAssetsPage.tsx
│       │   └── components/
│       ├── consignments/           # Consignment & Journey Tracking
│       │   ├── ConsignmentsPage.tsx
│       │   └── components/
│       ├── routing/                # Dynamic Routing & Green Engine
│       │   ├── RoutingOptimizerPage.tsx
│       │   └── components/
│       ├── terminal/               # 3D Yard & Terminal Digital Twin
│       │   ├── TerminalYardPage.tsx
│       │   └── components/
│       ├── maintenance/            # Predictive Maintenance
│       │   ├── PredictiveMaintenancePage.tsx
│       │   └── components/
│       ├── market/                 # Demand, Capacity & Spot Rates
│       │   ├── DemandCapacityPage.tsx
│       │   └── components/
│       ├── esg/                    # Emissions & ESG Compliance
│       │   ├── EsgCompliancePage.tsx
│       │   └── components/
│       ├── simulation/             # What-If Disruption Sandbox
│       │   ├── SimulationSandboxPage.tsx
│       │   └── components/
│       └── settings/               # System & Simulation Preferences
│           └── SettingsPage.tsx
```

---

## 8. Reusable Component Architecture

To guarantee consistency, accessibility, and high performance across the 9 modules, the presentation layer follows an atomic, composable design pattern.

### 8.1 Atomic Primitives (`src/components/ui/`)
- **`Button`:** Variants (`primary`, `secondary`, `outline`, `danger`, `ghost`). Supports loading spinner, icon slotting, and accessible keyboard focus states.
- **`Badge`:** Status pill supporting semantic tones (`success`, `warning`, `danger`, `info`, `neutral`) and pulsating live dots for active simulation states.
- **`Card`:** Glassmorphic/industrial container with header, body, footer slots, and optional border-glow for anomalous metrics.
- **`Slider`:** Accessible range input used for what-if simulation parameters (e.g., fuel price offset, speed limits).
- **`Tabs`:** Segmented controls with animated active pill transitions via Framer Motion.
- **`Table`:** Virtualized, accessible data table supporting column sort, multi-key search, row selection, and density toggles.

### 8.2 Composite Domain Widgets (`src/components/common/`)
- **`MetricCard`:** Displays a KPI title, current numerical value, trend delta percentage ($\pm X\%$), sparkline chart (Recharts), and alert indicator.
- **`TimeScrubber`:** Horizontal timeline control enabling historical playback, real-time tracking, or future projection scrubbing.
- **`DetailDrawer`:** Slide-over drawer (Framer Motion) that presents granular diagnostics for any selected entity without losing map or 3D canvas context.
- **`StatusIndicator`:** Standardized visual representation of operational states (`En Route`, `Delayed`, `Charging`, `Critical Failure`, `Optimal`).

### 8.3 Specialized Visualization Wrappers
- **`MapboxContainer`:** Encapsulates the Mapbox GL JS lifecycle. If an API token is absent, it gracefully falls back to `MapFallbackView.tsx` (an interactive vector SVG map of major freight corridors) without breaking the application.
- **`YardCanvas`:** Wraps `@react-three/fiber` canvas, providing WebGL context loss handling, responsive canvas sizing, ambient/directional lighting, and shadow mapping.

---

## 9. TypeScript Data Model Requirements

The entire application relies on strict, end-to-end type safety. Below are the canonical TypeScript contracts:

```typescript
// ============================================================================
// 1. NETWORK & TOPOLOGY TYPES
// ============================================================================
export type TransportMode = 'road' | 'rail' | 'maritime' | 'air' | 'intermodal';

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
  elevationMeters?: number;
}

export interface NetworkNode {
  id: string;
  code: string;
  name: string;
  type: 'port' | 'rail_terminal' | 'logistics_hub' | 'airport' | 'border_crossing';
  location: GeoCoordinate;
  capacityTEUorTons: number;
  currentThroughput: number;
  averageDwellHours: number;
  status: 'nominal' | 'congested' | 'blocked';
}

export interface NetworkEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  mode: TransportMode;
  distanceKm: number;
  designSpeedKmh: number;
  currentAverageSpeedKmh: number;
  designCapacityVehiclesPerHour: number;
  activeVehicleCount: number;
  tollCostUsd: number;
  averageGradientPercent: number;
  status: 'open' | 'congested' | 'restricted' | 'closed';
  coordinates: GeoCoordinate[]; // Polyline vertices
}

// ============================================================================
// 2. FLEET & ASSET TYPES
// ============================================================================
export type PropulsionType = 'diesel_ice' | 'battery_electric' | 'hydrogen_fuel_cell' | 'lng';
export type AssetStatus = 'in_transit' | 'idle' | 'loading' | 'unloading' | 'maintenance' | 'out_of_service';

export interface TelemetrySnapshot {
  timestamp: string; // ISO-8601
  location: GeoCoordinate;
  speedKmh: number;
  headingDegrees: number;
  energyLevelPercent: number; // Fuel or Battery SOC
  payloadWeightKg: number;
  engineTemperatureCelsius: number;
  tirePressurePsi: [number, number, number, number]; // Multi-wheel array
  odometerKm: number;
  reeferTemperatureCelsius?: number; // Optional reefer cargo sensor
}

export interface FreightAsset {
  id: string;
  assetNumber: string;
  mode: TransportMode;
  propulsion: PropulsionType;
  maxPayloadCapacityKg: number;
  tareWeightKg: number;
  status: AssetStatus;
  currentConsignmentId?: string;
  assignedDriverOrOperator?: string;
  latestTelemetry: TelemetrySnapshot;
  healthScore: number; // 0 - 100
}

// ============================================================================
// 3. CONSIGNMENT & TRIP TYPES
// ============================================================================
export interface CargoSpecification {
  cargoId: string;
  description: string;
  weightTons: number;
  volumeCbm: number;
  isHazardous: boolean;
  hazardClass?: string; // ADR / IMDG Class
  requiresReefer: boolean;
  targetTemperatureCelsius?: number;
}

export interface JourneyLeg {
  legIndex: number;
  originNodeId: string;
  destinationNodeId: string;
  mode: TransportMode;
  assignedAssetId?: string;
  scheduledDeparture: string;
  actualDeparture?: string;
  scheduledArrival: string;
  estimatedArrival: string;
  status: 'pending' | 'active' | 'completed' | 'delayed';
  distanceKm: number;
  carbonEmittedKgCO2e: number;
}

export interface Consignment {
  id: string;
  trackingNumber: string;
  shipper: string;
  consignee: string;
  cargo: CargoSpecification;
  status: 'booked' | 'in_transit' | 'customs_hold' | 'transshipping' | 'delivered' | 'exception';
  originNodeId: string;
  destinationNodeId: string;
  overallDeparture: string;
  targetDelivery: string;
  predictedDelivery: string;
  delayMinutes: number;
  legs: JourneyLeg[];
}

// ============================================================================
// 4. ROUTING & GREEN CORRIDOR TYPES
// ============================================================================
export interface RouteOption {
  routeId: string;
  name: string;
  modesInvolved: TransportMode[];
  totalDistanceKm: number;
  totalDurationHours: number;
  totalCostUsd: number;
  carbonEmissionKgCO2e: number;
  reliabilityScorePercent: number;
  waypoints: GeoCoordinate[];
  legs: Array<{
    mode: TransportMode;
    from: string;
    to: string;
    distanceKm: number;
    hours: number;
    emissionsKg: number;
  }>;
}

// ============================================================================
// 5. 3D TERMINAL & YARD TYPES
// ============================================================================
export interface ContainerSlot {
  id: string;
  bay: number;
  row: number;
  tier: number;
  containerId?: string;
  containerType?: 'standard_20' | 'standard_40' | 'high_cube_40' | 'reefer_40' | 'tank';
  weightGrossTons?: number;
  dwellHours?: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  destinationPortCode?: string;
}

export interface YardBlock {
  id: string;
  blockCode: string; // e.g., "A", "B", "C"
  maxBays: number;
  maxRows: number;
  maxTiers: number;
  slots: ContainerSlot[];
}

// ============================================================================
// 6. PREDICTIVE MAINTENANCE TYPES
// ============================================================================
export interface SubsystemHealth {
  name: string; // e.g., "Braking System", "Traction Inverter", "Diesel Injection"
  wearPercent: number; // 0 = New, 100 = Total Failure
  predictedFailureDays: number;
  vibrationAnomalyScore: number;
  status: 'nominal' | 'warning' | 'critical';
}

export interface MaintenanceRecord {
  id: string;
  assetId: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  title: string;
  description: string;
  subsystems: SubsystemHealth[];
  estimatedCostUsd: number;
  estimatedLaborHours: number;
  status: 'recommended' | 'scheduled' | 'in_progress' | 'resolved';
}

// ============================================================================
// 7. SIMULATION & WHAT-IF TYPES
// ============================================================================
export interface DisruptionEvent {
  id: string;
  name: string;
  type: 'corridor_closure' | 'port_strike' | 'fuel_price_hike' | 'severe_storm';
  affectedNodeIds: string[];
  affectedEdgeIds: string[];
  capacityReductionPercent: number;
  speedPenaltyPercent: number;
  fuelPriceMultiplier: number;
  activeFromTimestamp: string;
  durationHours: number;
}

export interface SimulationState {
  currentSimulatedTime: string; // ISO-8601
  timeSpeedMultiplier: number; // 1, 5, 20, 60
  isPaused: boolean;
  activeDisruptions: DisruptionEvent[];
  scenarioName: string;
  comparisonBaselineActive: boolean;
}
```

---

## 10. Mock Data vs. Future Backend API Architecture

To ensure FreightTwin can operate standalone as an impressive simulation platform today while remaining 100% ready for enterprise backend integration, all data requests pass through **Abstract Service Interfaces**.

### 10.1 Architecture Decoupling Diagram

```
+-----------------------------------------------------------------------------------+
|                           REACT COMPONENTS / HOOKS                                |
|        (e.g., useNetworkData(), useFleetAssets(), useRoutingOptimizer())          |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                            SERVICE ADAPTER FACTORY                                |
|   Provides implementation based on config.VITE_DATA_SOURCE ('MOCK' vs 'LIVE')     |
+-----------------------------------------------------------------------------------+
                 /                                                   \
                v                                                     v
+-----------------------------------+             +----------------------------------+
|      MOCK SERVICE ADAPTER         |             |      LIVE API SERVICE ADAPTER    |
| - Deterministic In-Memory Stores  |             | - Axios / Fetch HTTP Client      |
| - Physics Calculation Models      |             | - WebSocket / SSE Telemetry Feed |
| - LocalStorage Scenario Cache     |             | - gRPC / Protobuf Web Gateways   |
+-----------------------------------+             +----------------------------------+
```

### 10.2 Feature-by-Feature Backend Integration Matrix

| Module & Feature | Current Frontend Mock Implementation | Production Backend API Requirement |
| :--- | :--- | :--- |
| **Network Corridors** | Seeded GeoJSON graph with math-based dynamic congestion fluctuations based on simulation clock. | `GET /api/v1/network/graph`<br>`GET /api/v1/network/corridors/status` (PostGIS / Neo4j spatial graph). |
| **Fleet Telemetry** | Parametric step interpolator advancing coordinates along edge polylines with synthetic sensor noise. | `WSS /api/v1/telemetry/stream` (Kafka / MQTT IoT message broker ingestion). |
| **Consignment Tracking** | In-memory relational array linked to mock network nodes with simulated timestamp progression. | `GET /api/v1/consignments/:id`<br>`POST /api/v1/consignments/dispatch` (Core TMS database). |
| **Multi-Modal Routing** | Client-side heuristic multi-criteria path search approximating Dijkstra/A* across modes. | `POST /api/v1/routing/solve` (Dedicated routing engine such as OSRM / OpenTripPlanner / GraphHopper). |
| **3D Terminal Yard** | Procedural 3D matrix generator placing container meshes with mock TEU attributes in R3F. | `GET /api/v1/terminals/:id/yard-manifest` (TOS - Terminal Operating System like Navis N4). |
| **Predictive Diagnostics**| Heuristic Weibull wear calculations decaying assets based on simulated mileage ticks. | `GET /api/v1/maintenance/predictive-scores` (ML inference service on telemetry lakehouse). |
| **Market Rates & Demand** | Sine-wave seasonal generator with randomized spot rate volatility multipliers. | `GET /api/v1/market/rates/historical`<br>`GET /api/v1/market/demand-forecast` (Time-series DB). |
| **GLEC Carbon Accounting** | Client-side GLEC v3.0 mathematical emission calculator using mode-specific t-km factors. | `POST /api/v1/esg/audit-report` (Certified carbon calculation microservice). |
| **What-If Sandbox** | In-memory clone of baseline graph applying edge closures and cost weight penalties. | `POST /api/v1/simulation/scenarios/run` (Distributed compute cluster / AnyLogic / SimPy engine). |

---

## 11. Map, Simulation, Analytics & 3D Visualization Architecture

### 11.1 Geospatial Map Architecture (Mapbox GL JS + SVG Fallback)
1. **Container Isolation:** The Mapbox canvas is isolated in `src/components/maps/MapboxContainer.tsx`.
2. **Resilience Strategy (No-Token Graceful Degradation):**
   - If `VITE_MAPBOX_ACCESS_TOKEN` is missing or invalid, the container automatically swaps to `MapFallbackView.tsx`.
   - `MapFallbackView` renders a high-performance, dark-themed SVG map with pan-and-zoom controls displaying the identical corridor network and animated markers.
3. **Map Layers:**
   - **Base Layer:** Dark Carto/Mapbox Vector Tiles.
   - **Corridor Edges:** Color-coded polylines categorized by transport mode (Teal for Rail, Cyan for Road, Deep Blue for Maritime, Amber for Air).
   - **Chokepoint Heatmap:** Dynamic heatmap layer weighted by the $V/C$ congestion ratio.
   - **Vehicle Pins:** Rendered via Mapbox HTML Markers or GeoJSON symbol layers with heading-based rotation.

### 11.2 In-Browser Simulation Engine (`useSimulationClock`)
The simulation does not rely on arbitrary real-world timers. Instead, it utilizes an enterprise tick-based architecture:
- **Simulation Time Unit:** 1 Base Tick = 15 Simulated Operational Minutes.
- **Clock Frequencies:**
  - `1x`: 1 tick every 1000ms.
  - `5x`: 1 tick every 200ms.
  - `20x`: 1 tick every 50ms.
  - `60x`: 1 tick every 16ms (matches requestAnimationFrame).
- **Subscribed Consumers:**
  - Vehicles move along route edges by `speed * deltaHours`.
  - Fuel/battery levels decrease proportionally.
  - Yard cranes step through pick-and-place animation states.
  - Consignment milestone timers advance toward delivery.

### 11.3 Analytics Architecture (Recharts)
- **Unified Theme Styling:** Standardized dark-slate palette with neon telemetry accents (`#06b6d4` Cyan, `#10b981` Emerald, `#f59e0b` Amber, `#ef4444` Rose).
- **Responsive Wrappers:** All charts are enclosed in `<ResponsiveContainer width="100%" height={...}>`.
- **Custom Tooltips:** Glassmorphic tooltips displaying precise units (e.g., "$14,250", "342.5 tCO2e", "88.4%").

### 11.4 3D Digital Twin Architecture (Three.js / React Three Fiber)
- **Canvas Pipeline:**
  - `<Canvas camera={{ position: [60, 45, 60], fov: 45 }}>` with `<OrbitControls maxPolarAngle={Math.PI / 2.1} minDistance={10} maxDistance={150} />`.
  - Soft directional shadows to deliver depth and spatial realism.
- **Performance Optimization (Instanced Mesh):**
  - Rendering 2,000 individual container meshes causes severe draw-call overhead.
  - Instead, containers utilize **InstancedMesh** buffers, allowing thousands of containers to be drawn in a single WebGL draw call while dynamically updating color buffers to highlight high-dwell or hazardous cargo.
- **Interactive Raycasting:** Hovering or clicking on a container calculates the raycast hit against instance matrices, extracting the exact `(bay, row, tier)` coordinates to populate the side inspector drawer.

---

## 12. Responsive Design Strategy

FreightTwin is engineered primarily as a mission-critical **Operations Center Desktop Application**, but it provides seamless responsiveness across multi-monitor setups, standard laptops, and field tablets.

### 12.1 Breakpoint Strategy
- **`2xl` (1920px - 3840px / 4K Operations Center Displays):**
  - Expanded three-column layout: Navigation Sidebar + Primary Map/3D Canvas + Persistent Live Analytics & Telemetry Inspector.
  - Enhanced font contrast and high-density data tables.
- **`xl` / `lg` (1024px - 1919px / Standard Desktops & Laptops):**
  - Two-column standard layout: Collapsible Sidebar + Primary Viewport.
  - Inspector panels operate as smooth slide-over flyout drawers (`DetailDrawer`).
- **`md` (768px - 1023px / Field Tablets & iPads):**
  - Sidebar collapses to an icon rail or slide-in mobile drawer.
  - Split views (Map + Table) convert to tabbed segment views.
- **`sm` (< 768px / Mobile Fallback):**
  - Read-only operational summaries, consignment lookup, and push alert feeds. Heavy 3D yard canvas offers a simplified 2D schematic layout for touch ergonomics.

### 12.2 Ergonomics & Theme System
- **Industrial Dark Theme (Default):** Deep slate background (`#0b0f19`), surface elevations (`#111827`, `#1f2937`), and crisp borders (`#374151`) designed to prevent eye fatigue during continuous 12-hour dispatch shifts.
- **High-Contrast Data Semantics:** Universal color language across all 9 modules:
  - Green (`#10b981`): Nominal / On-Time / Eco-Optimal.
  - Yellow (`#f59e0b`): Warning / Minor Delay / Capacity Saturation > 80%.
  - Red (`#ef4444`): Critical Exception / Blocked Corridor / Dwell Exceeded.
  - Cyan (`#06b6d4`): Electric / Telemetry Signal / Active Selection.

---

## 13. Development Milestones & Testing Strategy

### 13.1 Phased Implementation Roadmap

```
+-------------------------------------------------------------------------------------------------+
| MILESTONE 1: Core Foundation & Design System (Sprint 1)                                         |
| - Project initialization (Vite + React + TypeScript + Tailwind)                                 |
| - Design system primitive components (Cards, Buttons, Badges, Tables, Modal)                    |
| - Master Layout shell (Header, Sidebar, Simulation Controller, Detail Drawer)                  |
| - Simulation Clock Context & Tick Engine implementation                                         |
+-------------------------------------------------------------------------------------------------+
                                                |
                                                v
+-------------------------------------------------------------------------------------------------+
| MILESTONE 2: Macro Network Twin & Fleet Operations (Sprint 2)                                   |
| - Network Corridor Map (Mapbox integration + interactive 2D SVG fallback)                       |
| - Corridor bottleneck & flow velocity analysis                                                  |
| - Fleet & Asset Management table with multi-criteria filtering                                  |
| - Asset telemetry detail drawer with breadcrumb playback                                        |
| - Executive Overview Dashboard with live KPI aggregations                                       |
+-------------------------------------------------------------------------------------------------+
                                                |
                                                v
+-------------------------------------------------------------------------------------------------+
| MILESTONE 3: Dynamic Routing, Consignments & ESG (Sprint 3)                                     |
| - Consignment dispatch Kanban and multi-leg milestone tracking                                  |
| - Multi-Modal Routing Engine with Green Corridor optimization                                   |
| - GLEC-compliant carbon emissions calculator & modal shift comparison                          |
| - ESG & Compliance reporting dashboard                                                          |
+-------------------------------------------------------------------------------------------------+
                                                |
                                                v
+-------------------------------------------------------------------------------------------------+
| MILESTONE 4: 3D Yard Twin, Predictive Diagnostics & Sandbox (Sprint 4)                          |
| - Three.js / React Three Fiber 3D Terminal & Yard digital twin                                  |
| - Instanced container mesh rendering & interactive raycasting                                   |
| - Predictive Maintenance failure curves & sensor diagnostics                                    |
| - Demand & Capacity market balancing tools                                                      |
| - What-If Disruption Scenario Sandbox (Corridor closures, fuel shocks)                          |
+-------------------------------------------------------------------------------------------------+
                                                |
                                                v
+-------------------------------------------------------------------------------------------------+
| MILESTONE 5: Polish, Optimization & Verification (Sprint 5)                                     |
| - 60 FPS rendering optimization on 3D canvas and Map layers                                     |
| - Comprehensive test suite (Unit, Component, Integration)                                       |
| - Accessibility audit (WCAG 2.1 AA keyboard navigation)                                         |
| - Production build verification & architecture documentation sync                               |
+-------------------------------------------------------------------------------------------------+
```

### 13.2 Testing Strategy
1. **Mathematical & Heuristic Logic (Unit Testing with Vitest):**
   - Verify GLEC carbon formulas across road, rail, maritime, and air modes.
   - Verify Haversine distance and geospatial bounding algorithms.
   - Test simulation clock tick increments, pause/resume, and speed multipliers.
2. **Component & Interaction Testing (React Testing Library):**
   - Test UI primitive states (Button loading, table column sorting, modal open/close).
   - Test Map token fallback: Ensure `MapFallbackView` renders smoothly when token is missing.
   - Test detail drawer synchronization when entities are selected on maps or tables.
3. **Performance Benchmarks:**
   - Maintain 60 FPS on the 3D Yard Canvas with 2,000+ instanced containers.
   - Ensure zero memory leaks during extended simulation clock runs (> 1,000 ticks).
   - Bundle size constraint: Keep primary vendor chunk under 500kB via lazy-loading of Three.js and Mapbox chunks.

---

## 15. Final Integration, Quality Assurance & Project Readiness Audit (Step 10 Complete)

### 15.1 Implementation Status Across All Modules
All ten planned development phases have been executed and integrated into the production build:

| Module / Screen | Route | Status | Key Subsystems & Features |
| :--- | :--- | :--- | :--- |
| **Landing Page** | `#/` | **Complete** | Hero with 3D-inspired SVG freight network, Platform Pillars, Core Features, Interactive Multi-Modal Timeline, ROI Metrics, Sign-In & Onboarding Modal. |
| **Command Center Dashboard** | `#/dashboard` | **Complete** | Live KPI StatCards, Interactive GIS Corridor Map Preview, Active Dispatch Table with modal inspection, Multi-Metric Analytics Trends, Real-time Activity Feed, Slide-over Alerts Drawer. |
| **GIS Digital Twin Map** | `#/digital-twin` | **Complete** | Interactive pan/zoom SVG map canvas, 8 multi-modal hubs (LAX, CHI, DAL, NYC, SAV, MEM, SEA, DEN), 6 active corridor routes with alternative diversions, vehicle beacons, interactive Entity Inspector Drawer. |
| **Fleet Management** | `#/fleet` | **Complete** | Vehicle health KPI cards (142 total, 118 active, 16 idle, 8 maintenance), multi-criteria filtering (status, powertrain/class), search, sorting, slide-over telemetry & diagnostic inspector drawer. |
| **Route Planning** | `#/routing` | **Complete** | Multi-modal origin/destination routing engine, freight category and weight parameters, multi-route generator with cost, duration, distance, reliability, and GLEC v3 carbon emission estimates, route comparison matrix. |
| **Transport Simulation** | `#/simulation` | **Complete** | Deterministic simulation sandbox with 5 operational disruption scenarios (Normal, Severe Winter Blizzard, Diesel Price Spike +35%, Rail Intermodal Blockage, Port Bottleneck Strike), speed controls (1x, 2x, 5x, 10x), impact deltas, JSON export. |
| **Analytics & KPIs** | `#/analytics` | **Complete** | Multi-dimensional freight analytics, monthly shipment volume breakdown, on-time vs delayed performance, modal split distribution, spend analytics by cost category and transport mode, interactive date range/category filters. |
| **Enterprise ESG Reports** | `#/reports` | **Complete** | GLEC Framework v3 & ISO 14083 carbon accounting summaries, Scope 3 freight emission intensity, RFC 4180 CSV export generation, browser print preview audit dossiers. |
| **Notifications Center** | `#/notifications` | **Complete** | System alerts, corridor disruptions, fleet maintenance breaches, shipment delay feeds, read/unread filtering, search, individual dismiss, mark all as read. |
| **User Profile** | `#/profile` | **Complete** | User avatar, organization hierarchy, editable profile fields, role switcher (`LOGISTICS DISPATCHER`, `FLEET CONTROLLER`, `SUPPLY CHAIN DIRECTOR`, `CHIEF ANALYTICS OFFICER`) with real-time UI synchronization and `localStorage` persistence. |
| **System Settings** | `#/settings` | **Complete** | Simulation clock calibration, telemetry auto-refresh interval, mock data engine mode, UI accessibility switches (high contrast, radar glow effects, dense table rows), audio toggle, units (km/miles, USD/EUR/GBP), reset defaults. |
| **Help & Support** | `#/help` | **Complete** | Searchable knowledge base, categorized accordion FAQs (Platform Overview, Simulation Engine, GLEC Carbon, Reports, GIS Map), interactive support ticket simulation modal with submission feedback. |
| **Design System Gallery** | `#/gallery` | **Complete** | Enterprise component showcase with live previews of Badges, Buttons, StatCards, SearchBars, Inputs, Dropdowns, Tables, Alerts, Modals, and Skeletons. |

### 15.2 Quality Assurance & Build Verification
- **TypeScript Compiler (`tsc`):** 0 errors, full strict-mode compliance.
- **Production Bundling (`vite build`):** Fully optimized production bundle built in 15.6s with manual code-splitting chunks (`vendor`, `motion`, `icons`, `index`).
- **Navigation Verification:** HashRouter architecture verified for smooth URL routing, browser refresh tolerance on static hosts, and mobile drawer accessibility.
- **Data Integrity:** 100% transparent synthetic labeling; zero ungrounded claims of live GPS or cloud telematics.

**Result: All modules fully integrated, verified, and ready for production preview.**
