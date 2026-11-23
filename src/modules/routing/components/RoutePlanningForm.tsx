import React, { useState } from 'react';
import {
  MapPin,
  ArrowRightLeft,
  Truck,
  Train,
  Plane,
  Anchor,
  Layers,
  Box,
  Scale,
  Sparkles,
  Info,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { Card, Button, Input, Badge, FreightModeIcon } from '../../../design-system';
import {
  RoutePlanningInput,
  TransportMode,
  FreightCategory,
} from '../types/routing.types';
import {
  MOCK_PLANNING_HUBS,
  FREIGHT_CATEGORY_DETAILS,
} from '../data/mockRoutingData';

export interface RoutePlanningFormProps {
  initialValues: RoutePlanningInput;
  isLoading: boolean;
  onPlanRoute: (values: RoutePlanningInput) => void;
}

export const RoutePlanningForm: React.FC<RoutePlanningFormProps> = ({
  initialValues,
  isLoading,
  onPlanRoute,
}) => {
  const [originHubId, setOriginHubId] = useState(initialValues.originHubId);
  const [destinationHubId, setDestinationHubId] = useState(
    initialValues.destinationHubId
  );
  const [preferredMode, setPreferredMode] = useState<TransportMode>(
    initialValues.preferredMode
  );
  const [freightCategory, setFreightCategory] = useState<FreightCategory>(
    initialValues.freightCategory
  );
  const [shipmentWeightTons, setShipmentWeightTons] = useState(
    initialValues.shipmentWeightTons
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  // Swap Origin & Destination
  const handleSwapLocations = () => {
    const temp = originHubId;
    setOriginHubId(destinationHubId);
    setDestinationHubId(temp);
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (originHubId === destinationHubId) {
      setValidationError('Origin and Destination must be different logistics hubs.');
      return;
    }

    if (shipmentWeightTons <= 0 || isNaN(shipmentWeightTons)) {
      setValidationError('Shipment weight must be greater than 0 metric tons.');
      return;
    }

    setValidationError(null);
    onPlanRoute({
      originHubId,
      destinationHubId,
      preferredMode,
      freightCategory,
      shipmentWeightTons,
    });
  };

  const transportModes: { id: TransportMode; label: string; modeIcon: 'road' | 'rail' | 'air' | 'ocean' | 'container' }[] = [
    { id: 'all', label: 'Multi-Modal', modeIcon: 'container' },
    { id: 'rail', label: 'Intermodal Rail', modeIcon: 'rail' },
    { id: 'road', label: 'Highway Trucking', modeIcon: 'road' },
    { id: 'air', label: 'Air Express', modeIcon: 'air' },
    { id: 'water', label: 'Coastal Water', modeIcon: 'ocean' },
  ];

  const freightCategories: { id: FreightCategory; label: string; badge: string }[] = [
    { id: 'general_dry', label: 'General Dry Freight', badge: 'Standard' },
    { id: 'reefer_cold_chain', label: 'Reefer Cold-Chain (+4°C)', badge: 'Temperature' },
    { id: 'hazmat_adr', label: 'Hazmat / ADR Chemicals', badge: 'Regulated' },
    { id: 'heavy_industrial', label: 'Heavy Industrial Machinery', badge: 'Oversize' },
    { id: 'high_value_express', label: 'High-Value Electronics', badge: 'High-Security' },
  ];

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 p-5 lg:p-6 shadow-xs text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <Compass className="w-4 h-4" />
            </span>
            Multi-Modal Route Planner & Pathfinding
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure origin, destination, preferred modes, cargo type, and payload weight.
          </p>
        </div>
        <Badge variant="cyan" size="sm">
          DYNAMIC HEURISTIC ENGINE
        </Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Origin and Destination Row */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
          {/* Origin Selection (5 cols) */}
          <div className="md:col-span-5 space-y-1.5 text-left">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Origin Logistics Hub
            </label>
            <div className="relative">
              <select
                value={originHubId}
                onChange={(e) => {
                  setOriginHubId(e.target.value);
                  setValidationError(null);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer appearance-none"
              >
                {MOCK_PLANNING_HUBS.map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    {hub.city}, {hub.state} ({hub.code}) — {hub.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Swap Button (1 col) */}
          <div className="md:col-span-1 flex justify-center pt-4">
            <button
              type="button"
              onClick={handleSwapLocations}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 border border-slate-200 text-slate-600 hover:text-blue-600 transition-colors shadow-xs cursor-pointer"
              title="Swap Origin and Destination"
              aria-label="Swap Origin and Destination"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Destination Selection (5 cols) */}
          <div className="md:col-span-5 space-y-1.5 text-left">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Destination Logistics Hub
            </label>
            <div className="relative">
              <select
                value={destinationHubId}
                onChange={(e) => {
                  setDestinationHubId(e.target.value);
                  setValidationError(null);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer appearance-none"
              >
                {MOCK_PLANNING_HUBS.map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    {hub.city}, {hub.state} ({hub.code}) — {hub.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Validation error notice */}
        {validationError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {validationError}
          </div>
        )}

        {/* Transport Mode Visual Icon Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            Transport Mode Preference
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {transportModes.map((mode) => {
              const isSelected = preferredMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setPreferredMode(mode.id)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all text-xs font-bold cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 border-blue-400 text-blue-700 ring-2 ring-blue-500/20 shadow-xs'
                      : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  <FreightModeIcon mode={mode.modeIcon} size="sm" />
                  <span className="truncate">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cargo Classification & Payload Weight Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cargo Classification Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-blue-600" />
              Cargo Category
            </label>
            <select
              value={freightCategory}
              onChange={(e) => setFreightCategory(e.target.value as FreightCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              {freightCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label} ({cat.badge})
                </option>
              ))}
            </select>
          </div>

          {/* Shipment Weight Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              Consignment Payload Weight (Metric Tons)
            </label>
            <div className="relative">
              <input
                type="number"
                min={1}
                max={500}
                value={shipmentWeightTons}
                onChange={(e) => setShipmentWeightTons(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="22"
              />
              <span className="absolute inset-y-0 right-3.5 flex items-center text-xs font-semibold text-slate-400 pointer-events-none">
                tons (t)
              </span>
            </div>
          </div>
        </div>

        {/* Submit Action Bar */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>Computes distance, transit speed, tolls, and GLEC Scope 3 carbon intensity.</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            leftIcon={<Sparkles className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Compute Optimal Routes
          </Button>
        </div>
      </form>
    </div>
  );
};
