# FreightTwin — Features, Operational Models & Limitations

This document provides a transparent, comprehensive accounting of all operational features, mathematical models, architectural boundaries, and known limitations within the **FreightTwin** application.

---

## 1. Transparency & Ethical Modeling Statement

> [!IMPORTANT]
> **FreightTwin is an enterprise simulation prototype and digital twin interface.**
> All telematics feeds, sensor readings, vehicle coordinates, weather disruptions, and market freight rates are deterministically simulated on the client side using realistic logistics heuristics.
> 
> The platform does **not** make false claims of live satellite GPS uplinks, real-time proprietary carrier API integrations, or real backend database connections. All simulated data is clearly labeled throughout the user interface.

---

## 2. Module-by-Module Feature Breakdown

### 2.1 Landing Page (`#/`)
- **Interactive Freight Network Visual:** Custom SVG vector illustration with pulsing hub nodes (LAX, CHI, SAV, NYC) and animated multi-modal transit corridors.
- **Value Proposition Breakdown:** Highlights 4 core pillars: Macro Corridor Digital Twin, Fleet Telematics Micro Twin, Multi-Modal Green Routing, and What-If Disruption Sandbox.
- **Interactive Multi-Modal Timeline:** Visualizing 5 operational phases from consignment booking to yard arrival and ESG reporting.
- **Quantified ROI Cards:** Simulated operational improvements (+18.4% on-time delivery, -14.2% fuel spend, -22.7% carbon intensity).
- **Authentication & Onboarding Modal:** Role selection simulation (`Logistics Dispatcher`, `Fleet Controller`, `Supply Chain Director`, `Chief Analytics Officer`).

### 2.2 Command Center Dashboard (`#/dashboard`)
- **Key Performance Indicators:** 4 real-time operational cards (Active Fleet: 118/142; Active Corridors: 24; On-Time Delivery: 94.2%; Daily Spend: $148,200).
- **GIS Network Map Preview:** Live corridor network with status indicators and a direct link to the full spatial GIS twin.
- **Active Consignment Ledger:** Searchable, status-filtered dispatch table featuring real-time consignment status pills and a modal consignment inspector.
- **Multi-Metric Analytics:** Custom responsive SVG vector charts showing monthly tonnage throughput and on-time vs delayed performance.
- **Incident Drawer:** Slide-over notification panel with individual alert dismissal, mark all as read, and direct action jumping.

### 2.3 GIS Digital Twin Map (`#/digital-twin`)
- **Spatial Map Canvas:** Interactive SVG vector canvas with smooth pan, zoom (0.8x to 3.0x), and reset controls.
- **Multi-Modal Hub Beacons:** 8 strategic US logistics nodes (LAX, CHI, DAL, NYC, SAV, MEM, SEA, DEN) spanning Air Cargo, Intermodal Rail, Ocean Terminal, and Highway Freight.
- **Corridor Networks:** 6 active multi-modal routes featuring animated cyan transit pulses and dashed alternative diversion paths.
- **Entity Inspector Drawer:** Clickable hub and route markers reveal granular storage capacity, dwell times, and inbound/outbound throughput.

### 2.4 Fleet Management (`#/fleet`)
- **Fleet Health Overview:** KPI summary cards for Total Assets (142), Active (118), Idle (16), and Under Maintenance (8).
- **Vehicle Telemetry Table:** Tabular view of registration numbers, vehicle classes, assigned drivers, and active routes with column sorting.
- **Multi-Criteria Filter Engine:** Instant client-side filtering by powertrain (Electric, Hybrid, Heavy Diesel), operational status, and global text search.
- **Diagnostic Telemetry Drawer:** Deep-dive modal inspecting battery state of charge (SoC), brake pad wear, tire pressure, and scheduled maintenance history.

### 2.5 Multi-Modal Route Planning (`#/routing`)
- **Origin / Destination Engine:** Route computation between major intermodal gateways with freight categorization and payload weight inputs.
- **Route Alternatives Generation:** Computes 3 distinct modal paths per query (Direct Highway Express, Intermodal Rail Green Corridor, Air/Road Hybrid).
- **Multi-Criteria Scoring:** Calculates transit distance (km), estimated duration (hours), transportation spend ($), reliability index (%), and GLEC carbon footprint (kg CO2e).
- **Comparison Matrix:** Side-by-side modal trade-off analysis highlighting fastest vs most cost-efficient vs lowest-carbon options.

### 2.6 Transport Simulation Sandbox (`#/simulation`)
- **Deterministic Disruption Engine:** Simulates the ripple effect of operational shocks on logistics networks:
  - *Normal Traffic Baseline* (Nominal operations)
  - *Severe Winter Blizzard* (+45% travel time, +18% fuel spend)
  - *Diesel Fuel Price Shock* (+35% fuel surcharge, +22% cost)
  - *Rail Intermodal Bottleneck* (+30% delay, traffic diverted to highway)
  - *Port Terminal Strike* (+72h vessel dwell, container shortages)
- **Interactive Controls:** Simulation speed multipliers (1x, 2x, 5x, 10x), scenario selector, baseline reset, and RFC 4180 JSON plan export.

### 2.7 Analytics & KPI Intelligence (`#/analytics`)
- **Throughput Volume Trends:** Monthly freight tonnage categorized by road, rail, air, and ocean.
- **Service Level Distribution:** On-time, delayed, and critical exception percentages with interactive tooltips.
- **Granular Spend Breakdown:** Visualizing transportation spend across linehaul, fuel surcharges, driver wages, and maintenance.

### 2.8 Enterprise ESG & Carbon Reports (`#/reports`)
- **Standardized Carbon Accounting:** Full alignment with the **GLEC Framework v3.0** and **ISO 14083** logistics accounting standard.
- **Scope 3 Freight Intensity:** Tracking grams of CO2e per ton-kilometer (gCO2e/t-km) across all transport modes.
- **One-Click CSV Export:** Generates standards-compliant RFC 4180 CSV files directly in the browser for all data tables.
- **Print Dossier:** Native browser print styling optimized for executive PDF generation and auditing.

### 2.9 Notifications Center (`#/notifications`)
- **Categorized Alert Streams:** Filter by Corridor Disruptions, Telemetry Breaches, Transit Delays, and System ESG notices.
- **Workflow Actions:** Mark as read, mark all as read, dismiss alert, and deep-link to affected vehicles or routes.

### 2.10 User Profile & Role-Based Access (`#/profile`)
- **Operator Identity:** Customizable user profile with organization, business unit, and contact information.
- **Role Switcher:** Toggle between 4 operational roles (`Logistics Dispatcher`, `Fleet Controller`, `Supply Chain Director`, `Chief Analytics Officer`).
- **Real-Time Cross-App Sync:** Changing roles immediately updates the TopNav role badge and is persisted in `localStorage`.

### 2.11 System Settings & Help Desk (`#/settings` & `#/help`)
- **Engine Calibration:** Configurable simulation tick rates (1s–60s) and data refresh intervals.
- **Accessibility Preferences:** High-contrast color mode, radar glow effect toggles, and dense table row options.
- **Support Knowledge Base:** Searchable multi-category FAQ accordion answering common operational questions.
- **Interactive Ticket Simulator:** Working form with real-time feedback and validation.

---

## 3. Documented Limitations & Architectural Boundaries

| Area | Current Implementation | Production Enterprise Requirement |
| :--- | :--- | :--- |
| **Telemetry Ingestion** | Deterministic client-side clock with simulated sensor jitter. | Distributed MQTT / Apache Kafka cluster streaming real CAN-bus / OBD-II packets from IoT hardware. |
| **GIS Mapping** | High-performance interactive SVG vector canvas. | Mapbox GL JS / Deck.gl vector tile server with live Mapbox / OpenStreetMap satellite layers. |
| **Data Persistence** | Browser `localStorage` (`freighttwin_user_profile`, `freighttwin_settings`). | Distributed PostgreSQL / TimescaleDB with PostGIS spatial indexing and Redis caching. |
| **Authentication** | Client-side role simulator with immediate state update. | OAuth2 / OIDC / SAML 2.0 single sign-on (SSO) integrated with enterprise identity providers (Okta, Azure AD). |
| **Report Generation** | In-browser client-side RFC 4180 CSV Blob generation and browser `window.print()`. | Asynchronous backend report generation workers (Apache Flink / Celery) producing cryptographically signed PDF/XLSX audit dossiers. |
| **Corridor Routing** | Precomputed heuristic multi-modal routing algorithms based on US hub networks. | Real-time graph routing engines (Open Source Routing Machine, pgRouting, or GraphHopper) incorporating live traffic APIs. |

---

## 4. Extensibility & Future Production Roadmap

FreightTwin was architected using clean separation of concerns to allow seamless migration to live backend APIs:

1. **Service Interfaces:** All mock data sources are isolated in modular `mock*Data.ts` files and type definitions. Replacing mock sources with `fetch()` calls to REST or GraphQL endpoints requires zero changes to the presentation components.
2. **Standardized Data Formats:** Data models (consignments, vehicles, hubs, routes) use standard UN/LOCODE, ISO 6346 container identifiers, and GLEC v3 carbon metrics ready for enterprise EDI/API mapping.
3. **Containerized Deployment:** The compiled `dist/` directory can be packaged into a lightweight Docker image running Nginx Alpine with minimal resource consumption (< 20MB RAM).
