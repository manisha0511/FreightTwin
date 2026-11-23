# FreightTwin — Developer Setup & Operational Guide

This document provides complete instructions for setting up, building, running, and extending the **FreightTwin** application in any development or staging environment.

---

## 1. System Requirements & Prerequisites

Ensure the host machine satisfies the following minimum requirements:

| Component | Minimum Version | Recommended Version |
| :--- | :--- | :--- |
| **Node.js** | `v18.18.0` | `v20.x LTS` |
| **Package Manager** | `npm v9.0.0` | `npm v10.x` or `pnpm v8+` |
| **Operating System** | Windows 10/11, macOS 12+, Ubuntu 20.04+ | Any modern 64-bit OS |
| **RAM** | 4 GB | 8 GB+ |
| **Browser** | Chromium 100+, Firefox 100+, Safari 16+ | Latest Chrome or Edge |

To verify your installed Node and npm versions:
```bash
node -v
npm -v
```

---

## 2. Step-by-Step Local Installation

### Step 2.1: Clone or Navigate to Project
```bash
cd c:\Users\Manisha\Downloads\Trifold
```

### Step 2.2: Install Dependencies
Install all production and development dependencies:
```bash
npm install
```
*Note: FreightTwin uses strictly pinned dependencies to guarantee reproducible builds across developer machines.*

### Step 2.3: Start Local Development Server
```bash
npm run dev
```
By default, the Vite development server launches at:
```
  VITE v5.4.11  ready in ~250 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```
Hot Module Replacement (HMR) is active; any code modifications will reflect instantly in the browser.

---

## 3. Production Build & Deployment

### Step 3.1: Execute Type Checking and Bundling
Run the automated build script:
```bash
npm run build
```
This triggers:
1. `tsc`: TypeScript compiler verifying strict type safety across all components and data models.
2. `vite build`: Rollup-powered bundling with CSS minification and manual chunk splitting.

### Step 3.2: Verify Build Output
The compiled production assets reside in the `dist/` directory:
```
dist/
├── assets/
│   ├── index-[hash].css      # Minified Tailwind CSS tokens & layout classes
│   ├── icons-[hash].js       # Lucide React vector icons chunk
│   ├── motion-[hash].js      # Framer Motion animation engine chunk
│   ├── vendor-[hash].js      # Core React & React Router libraries
│   └── index-[hash].js       # FreightTwin application logic & modules
├── favicon.svg               # Application branding icon
└── index.html                # Single-page application entry point
```

### Step 3.3: Preview the Production Build Locally
```bash
npm run preview
```
Serves the `dist/` directory at `http://localhost:4173` for testing caching, bundle load times, and production behavior.

---

## 4. Codebase Directory Map

```
Trifold/
├── public/                       # Static public assets & favicons
├── src/
│   ├── core/                     # Application-wide core infrastructure
│   │   └── navigation/           # Central navigation model (getAppNavSections)
│   ├── design-system/            # Reusable UI component library & tokens
│   │   ├── components/           # Button, Card, Table, Modal, Input, Badge, Sidebar, etc.
│   │   ├── tokens/               # Color palette, spacing, and typography tokens
│   │   └── utils/                # cn() class merging utility
│   ├── modules/                  # Business logic domain modules
│   │   ├── dashboard/            # Command Center Overview & KPI telemetry
│   │   ├── map/                  # Spatial GIS Digital Twin canvas & hub inspector
│   │   ├── fleet/                # Asset management table & diagnostic drawer
│   │   ├── routing/              # Multi-modal route generator & simulation sandbox
│   │   ├── analytics/            # Spend, volume, and modal analytics
│   │   ├── notifications/        # Incident management & alert filters
│   │   ├── profile/              # User account & RBAC role switcher
│   │   ├── settings/             # System calibration & accessibility preferences
│   │   └── help/                 # Documentation knowledge base & support tickets
│   ├── pages/
│   │   └── landing/              # Marketing & platform onboarding page
│   ├── App.tsx                   # HashRouter routing registry
│   ├── index.css                 # Global CSS and custom animations
│   ├── main.tsx                  # React DOM entry point
│   └── vite-env.d.ts             # Vite client types declaration
├── package.json                  # NPM scripts & dependencies
├── tailwind.config.js            # Design system theme extensions & colors
├── tsconfig.json                 # Strict TypeScript configuration
└── vite.config.ts                # Build configuration with chunk splitting
```

---

## 5. Architecture Notes & Configuration

### 5.1 Routing Strategy (`HashRouter`)
The application utilizes `HashRouter` (`/#/dashboard`, `/#/fleet`, etc.) instead of standard path routing:
- **Zero Server Configuration:** Can be deployed to static hosting providers (GitHub Pages, AWS S3, Vercel, Netlify, Apache, Nginx) without URL rewriting or 404 fallback configuration.
- **Deep Linking:** All routes are directly bookmarkable and survive manual browser refresh.

### 5.2 Local Storage Keys
FreightTwin stores user preferences and profile state in browser `localStorage`:
- `'freighttwin_user_profile'`: Stores name, email, department, and active operator role.
- `'freighttwin_settings'`: Stores simulation speed, refresh intervals, high-contrast mode, and display units.

---

## 6. Troubleshooting Common Issues

### Issue 1: PowerShell Script Execution Restricted
If running `npm run dev` fails on Windows with an `ExecutionPolicy` error:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Issue 2: Port 5173 Already in Use
Vite will automatically attempt the next sequential port (`5174`, `5175`). Alternatively, specify a port explicitly:
```bash
npx vite --port 3000
```

### Issue 3: Stale Vite Cache
If asset changes do not seem to update:
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules\.vite
npm run dev
```
