import React, { useState } from 'react';
import {
  Settings,
  Sliders,
  Moon,
  Bell,
  Globe,
  Save,
  RotateCcw,
  Check,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import {
  NavigationLayout,
  Button,
  PageHeader,
} from '../../design-system';
import { getAppNavSections } from '../../core/navigation/navigationItems';

export interface SettingsPageProps {
  onBackToDashboard: () => void;
  onNavigateToDigitalTwin: () => void;
  onNavigateToFleet: () => void;
  onNavigateToRouting: () => void;
  onNavigateToSimulation: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToReports: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToProfile: () => void;
  onNavigateToHelp: () => void;
  onBackToLanding: () => void;
  userRole?: string;
}

interface AppSettingsState {
  // General
  simulationClockSpeed: string;
  autoRefreshInterval: string;
  dataEngineMode: 'mock' | 'api_mock';
  
  // Theme & Visuals
  highContrastMode: boolean;
  radarGlowEffects: boolean;
  denseTableRows: boolean;

  // Notification Rules
  audioAlerts: boolean;
  delayAlertThresholdMinutes: string;
  maintenanceBreachAlerts: boolean;
  weeklyCarbonDigest: boolean;

  // Regional
  distanceUnit: 'km' | 'miles';
  currency: 'USD' | 'EUR' | 'GBP';
  timeFormat: '24h' | '12h';
}

const DEFAULT_SETTINGS: AppSettingsState = {
  simulationClockSpeed: '5x',
  autoRefreshInterval: '30s',
  dataEngineMode: 'mock',
  highContrastMode: false,
  radarGlowEffects: true,
  denseTableRows: false,
  audioAlerts: true,
  delayAlertThresholdMinutes: '30',
  maintenanceBreachAlerts: true,
  weeklyCarbonDigest: true,
  distanceUnit: 'km',
  currency: 'USD',
  timeFormat: '24h',
};

export const SettingsPage: React.FC<SettingsPageProps> = ({
  onBackToDashboard,
  onNavigateToDigitalTwin,
  onNavigateToFleet,
  onNavigateToRouting,
  onNavigateToSimulation,
  onNavigateToAnalytics,
  onNavigateToReports,
  onNavigateToNotifications,
  onNavigateToProfile,
  onNavigateToHelp,
  userRole = 'Logistics Dispatcher',
}) => {
  const [settings, setSettings] = useState<AppSettingsState>(() => {
    try {
      const saved = localStorage.getItem('freighttwin_settings');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_SETTINGS;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('freighttwin_settings', JSON.stringify(settings));
    } catch {
      // Ignore
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem('freighttwin_settings');
    } catch {
      // Ignore
    }
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
    else if (id === 'help') onNavigateToHelp();
  };

  return (
    <NavigationLayout
      sections={navSections}
      activeItemId="settings"
      onSelect={handleNavSelect}
      breadcrumbs={['FreightTwin', 'System & Support', 'Platform Preferences & Calibration']}
      searchValue={searchValue}
      onSearchChange={(e) => setSearchValue(e.target.value)}
      roleLabel={userRole}
      onAlertClick={onNavigateToNotifications}
      onProfileClick={onNavigateToProfile}
    >
      <div className="max-w-4xl mx-auto space-y-6 pb-12 text-left">
        {/* Page Header */}
        <PageHeader
          title="Platform Preferences & Engine Calibration"
          description="Customize digital twin simulation clock rates, telemetry refresh cadences, display aesthetics, and dispatch alert thresholds."
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

        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 px-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="p-1 rounded-md bg-blue-100 text-blue-600">
              <Settings className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-blue-700 font-bold uppercase">
              Preferences Persistence:
            </span>
            <span className="text-slate-600 truncate">
              Settings are saved directly to browser local storage.
            </span>
          </div>

          <span className="text-[11px] font-mono font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-blue-200">
            LOCAL ENGINE CONFIG
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: General & Simulation Engine Calibration */}
          <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
                  <Sliders className="w-4 h-4" />
                </span>
                1. General Engine & Simulation Parameters
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Calibrates central tick frequency, speed multipliers, and auto-refresh cadence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {/* Simulation Clock Multiplier */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">
                  Simulation Clock Speed
                </label>
                <div className="relative">
                  <select
                    value={settings.simulationClockSpeed}
                    onChange={(e) =>
                      setSettings({ ...settings, simulationClockSpeed: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none font-medium"
                  >
                    <option value="1x">1x (Real-time speed)</option>
                    <option value="5x">5x (Standard recommended)</option>
                    <option value="20x">20x (Fast corridor transit)</option>
                    <option value="60x">60x (High-speed batch simulation)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Telemetry Refresh */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">
                  Telemetry Refresh Cadence
                </label>
                <div className="relative">
                  <select
                    value={settings.autoRefreshInterval}
                    onChange={(e) =>
                      setSettings({ ...settings, autoRefreshInterval: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none font-medium"
                  >
                    <option value="manual">Manual Refresh Only</option>
                    <option value="15s">Every 15 Seconds</option>
                    <option value="30s">Every 30 Seconds (Default)</option>
                    <option value="60s">Every 60 Seconds</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Data Engine Mode */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">
                  Data Source Mode
                </label>
                <div className="relative">
                  <select
                    value={settings.dataEngineMode}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        dataEngineMode: e.target.value as 'mock' | 'api_mock',
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none font-medium"
                  >
                    <option value="mock">In-Memory Synthetic Mock Engine</option>
                    <option value="api_mock">External REST API Mock Adapter</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-[10px]">
                    ▼
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Display & Visual Controls */}
          <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-200">
                  <Moon className="w-4 h-4" />
                </span>
                2. Command Center Display & Visual Preferences
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure radar animations, table density, and high-contrast styling.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              {/* Toggle 1: Cyan Radar Pulse */}
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <div>
                  <span className="font-bold text-slate-900 block">
                    Cyan Radar Pulse & Motion Visuals
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Displays animated radar pings on active digital twin nodes and route lines.
                  </span>
                </div>
                <div className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                  <input
                    type="checkbox"
                    checked={settings.radarGlowEffects}
                    onChange={(e) =>
                      setSettings({ ...settings, radarGlowEffects: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </div>
              </label>

              {/* Toggle 2: High Contrast Palette */}
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <div>
                  <span className="font-bold text-slate-900 block">
                    High-Contrast Metric Outlines
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Enhances border visibility and metric distinction on large command center displays.
                  </span>
                </div>
                <div className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                  <input
                    type="checkbox"
                    checked={settings.highContrastMode}
                    onChange={(e) =>
                      setSettings({ ...settings, highContrastMode: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </div>
              </label>

              {/* Toggle 3: Compact Table Density */}
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
                <div>
                  <span className="font-bold text-slate-900 block">
                    Compact Table Density
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Reduces vertical padding in consignment and fleet tables to display more rows.
                  </span>
                </div>
                <div className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                  <input
                    type="checkbox"
                    checked={settings.denseTableRows}
                    onChange={(e) =>
                      setSettings({ ...settings, denseTableRows: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </div>
              </label>
            </div>
          </div>

          {/* Section 3: Notification Rules & Alert Thresholds */}
          <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
                  <Bell className="w-4 h-4" />
                </span>
                3. Notification Thresholds & Dispatch Alert Rules
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Set sensitivity for corridor delay warnings and vehicle telemetry breaches.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">
                  Corridor Delay Alert Threshold
                </label>
                <div className="relative">
                  <select
                    value={settings.delayAlertThresholdMinutes}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        delayAlertThresholdMinutes: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none font-medium"
                  >
                    <option value="15">Delay &gt; 15 Minutes (High Sensitivity)</option>
                    <option value="30">Delay &gt; 30 Minutes (Recommended)</option>
                    <option value="60">Delay &gt; 60 Minutes (Critical Only)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">
                  Audio Alert on Critical Shocks
                </label>
                <div className="relative">
                  <select
                    value={settings.audioAlerts ? 'enabled' : 'disabled'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        audioAlerts: e.target.value === 'enabled',
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none font-medium"
                  >
                    <option value="enabled">Enabled (Sound ping on critical alert)</option>
                    <option value="disabled">Muted / Silent visual alerts only</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-[10px]">
                    ▼
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Regional Preferences */}
          <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200">
                  <Globe className="w-4 h-4" />
                </span>
                4. Regional Units & Measurement Standards
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose between international metric logistics units and imperial standards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">
                  Distance & Payload Units
                </label>
                <div className="relative">
                  <select
                    value={settings.distanceUnit}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        distanceUnit: e.target.value as 'km' | 'miles',
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none font-medium"
                  >
                    <option value="km">Metric (Kilometers & Metric Tons)</option>
                    <option value="miles">Imperial (Miles & Short Tons)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">
                  Currency Standard
                </label>
                <div className="relative">
                  <select
                    value={settings.currency}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        currency: e.target.value as 'USD' | 'EUR' | 'GBP',
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none font-medium"
                  >
                    <option value="USD">USD ($) — United States Dollar</option>
                    <option value="EUR">EUR (€) — Euro</option>
                    <option value="GBP">GBP (£) — British Pound</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">
                  Time Format
                </label>
                <div className="relative">
                  <select
                    value={settings.timeFormat}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        timeFormat: e.target.value as '24h' | '12h',
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none font-medium"
                  >
                    <option value="24h">24-Hour Military Dispatch (e.g. 17:45)</option>
                    <option value="12h">12-Hour AM/PM (e.g. 05:45 PM)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-[10px]">
                    ▼
                  </div>
                </div>
              </div>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Platform settings updated and cached to browser storage.</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={handleReset}
            >
              Reset to Defaults
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save & Apply Settings
            </Button>
          </div>
        </form>
      </div>
    </NavigationLayout>
  );
};

export default SettingsPage;
