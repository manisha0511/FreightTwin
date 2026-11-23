# FreightTwin — Multi-Modal Freight Transport Digital Twin Platform

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Standards](https://img.shields.io/badge/Carbon_Accounting-GLEC_v3_|_ISO_14083-22C55E?style=flat)](https://smartfreightcentre.org/)

**FreightTwin** is an enterprise-grade web application and logistics command center that provides multi-modal freight transport modeling, spatial network digital twining, fleet telematics diagnostics, dynamic green routing, and what-if disruption scenario simulation.

Designed with a high-density, command-center aesthetic inspired by modern aerospace and maritime dispatch rooms, FreightTwin synchronizes macroscopic freight corridor networks with microscopic asset, warehouse terminal, and ESG compliance intelligence.

---

## 🚀 Key Modules & Architecture

FreightTwin consists of 11 fully integrated modules accessible via single-page hash routing:

| Module | Route | Description |
| :--- | :--- | :--- |
| **Landing Page** | `#/` | Platform value proposition, interactive multi-modal logistics timeline, platform pillars, quantified ROI statistics, and role-based onboarding modal. |
| **Command Center Dashboard** | `#/dashboard` | Executive operational cockpit displaying real-time KPI cards, transport network map preview, shipment dispatch ledger, recent events feed, and slide-over alert center. |
| **GIS Digital Twin Map** | `#/digital-twin` | Interactive spatial network visualization featuring pan/zoom controls, multi-modal transport hubs (Air, Rail, Sea, Intermodal), active freight corridors, alternative diversions, vehicle beacons, and deep-dive Entity Inspector. |
| **Fleet Management** | `#/fleet` | Complete fleet telemetry oversight for 142 multi-modal assets. Filter by powertrain (Electric, Hybrid, Heavy Diesel), operating status, search by registration/driver, and inspect real-time battery, engine, and maintenance telemetry. |
| **Route Planning** | `#/routing` | Multi-criteria logistics route generation engine. Evaluates origin/destination pairs across road, rail, air, and ocean, calculating transit duration, freight rates, reliability scores, and GLEC-compliant carbon emissions. |
| **Transport Simulation** | `#/simulation` | What-If sandbox simulating operational shocks: Severe Winter Blizzard, Diesel Fuel Shocks (+35%), Rail Intermodal Blockages, and Coastal Port Strikes with adjustable speed multipliers (1x–10x) and JSON plan exports. |
| **Analytics & KPIs** | `#/analytics` | Multi-dimensional freight analytics dashboard visualizing monthly tonnage throughput, on-time delivery rates, modal shift split, and granular operational expense breakdowns. |
| **Enterprise ESG Reports** | `#/reports` | Scope 3 supply chain carbon accounting compliant with ISO 14083 / GLEC Framework v3. Includes one-click RFC 4180 CSV export generation and browser-native audit dossiers. |
| **Notifications Center** | `#/notifications` | Incident management and real-time alerts categorized by Corridor Disruptions, Telemetry Threshold Breaches, Shipment Delays, and System ESG notices with filter and dismiss controls. |
| **User Profile & RBAC** | `#/profile` | Operator account profile, organizational hierarchy assignment, and role switcher (`LOGISTICS DISPATCHER`, `FLEET CONTROLLER`, `SUPPLY CHAIN DIRECTOR`, `CHIEF ANALYTICS OFFICER`) with persistent local storage. |
| **System Settings** | `#/settings` | Platform calibration including simulation clock rate, auto-refresh frequency, data engine modes, accessibility switches (high contrast, radar glow), distance/currency units, and factory reset. |
| **Help & Support** | `#/help` | Comprehensive searchable documentation knowledge base, categorized FAQs, and an interactive support ticket submission simulator. |
| **Design System Gallery** | `#/gallery` | Live component catalog showcasing all reusable UI tokens, buttons, inputs, modals, cards, badges, and notification primitives. |

---

## 🎨 Enterprise Design System

FreightTwin features a custom-built, WCAG 2.1 AA accessible design system crafted specifically for high-stress logistics environments:

- **Primary Background:** `#0B1120` (Industrial Deep Slate)
- **Secondary Surface:** `#111C30` (Surface Elevation 1)
- **Card / Panel Background:** `#17243A` (Elevated Command Card)
- **Primary Accent:** `#22D3EE` (Cyber Cyan / Active Signal Glow)
- **Secondary Accent:** `#3B82F6` (Operational Blue)
- **Status Semantics:**
  - Success / On-Time: `#22C55E`
  - Warning / Minor Delay: `#F59E0B`
  - Critical / Blocked / Overdue: `#EF4444`
- **Typography:** Clean sans-serif hierarchy with monospaced tabular numerals for telemetry and metrics.

---

## 🛠️ Technology Stack

- **Framework:** [React 18.3.1](https://react.dev/) + [TypeScript 5.6.3](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 5.4.11](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3.4.15](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Routing:** [React Router 7](https://reactrouter.com/) (`HashRouter` for zero-configuration static hosting and bookmarkable hash navigation)
- **Icons:** [Lucide React 0.460.0](https://lucide.dev/)
- **Animations:** [Framer Motion 11.11.17](https://www.framer.com/motion/)
- **Data Visualizations:** Custom SVG vector components with animated metric bars, responsive viewBox geometry, and zero heavy external charting dependencies.

---

## ⚡ Quickstart & Local Installation

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Trifold
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Compile production build:**
   ```bash
   npm run build
   ```
   Outputs an optimized production bundle to the `dist/` folder.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🛡️ Data Integrity & Transparent Simulation Model

> [!IMPORTANT]
> **FreightTwin is an advanced digital twin simulation prototype.**
> All telematics data, vehicle GPS coordinates, freight corridor delays, sensor streams, and ESG carbon values are computed deterministically via realistic mathematical heuristics and client-side models.
> 
> - **Zero Fabricated Feeds:** The platform does not claim live satellite GPS connectivity or active backend server synchronization.
> - **Standardized Carbon Accounting:** Carbon calculations adhere to the **GLEC Framework v3.0** and **ISO 14083** standard modal factors (e.g., 62–110 gCO2e/t-km for heavy road freight, 12–25 gCO2e/t-km for electric rail).
> - **Client-Side Persistence:** Role settings and user preferences utilize browser `localStorage` (`freighttwin_user_profile` and `freighttwin_settings`) without sending confidential corporate credentials over third-party networks.

---

## 📄 Documentation Directory

- [`PROJECT_ARCHITECTURE.md`](PROJECT_ARCHITECTURE.md) — Comprehensive technical architecture, data contracts, and implementation milestones.
- [`SETUP_GUIDE.md`](SETUP_GUIDE.md) — Detailed developer setup, environment prerequisites, and deployment walkthrough.
- [`FEATURES_AND_LIMITATIONS.md`](FEATURES_AND_LIMITATIONS.md) — Exhaustive feature breakdown, heuristic model explanations, and enterprise production roadmap.

---

## ⚖️ License
FreightTwin is proprietary software developed for freight transport digital twin research, multi-modal logistics planning, and operational modeling.
