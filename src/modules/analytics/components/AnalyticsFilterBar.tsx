import React from 'react';
import {
  Calendar,
  Layers,
  Box,
  CheckCircle2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../../design-system';
import {
  AnalyticsFilterState,
  DateRangePreset,
  ShipmentStatusFilter,
} from '../types/analytics.types';
import { TransportMode, FreightCategory } from '../../routing/types/routing.types';

export interface AnalyticsFilterBarProps {
  filters: AnalyticsFilterState;
  onFilterChange: (updated: Partial<AnalyticsFilterState>) => void;
  onResetFilters: () => void;
}

export const AnalyticsFilterBar: React.FC<AnalyticsFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const isFiltered =
    filters.dateRange !== 'all_time' ||
    filters.transportMode !== 'all' ||
    filters.freightCategory !== 'all' ||
    filters.shipmentStatus !== 'all';

  const datePresets: { id: DateRangePreset; label: string }[] = [
    { id: 'last_30_days', label: 'Last 30 Days' },
    { id: 'last_quarter', label: 'Last Quarter (Q3)' },
    { id: 'ytd', label: 'Year-to-Date (6M)' },
    { id: 'all_time', label: 'Full 12-Month Year' },
  ];

  const modeOptions: { id: TransportMode; label: string }[] = [
    { id: 'all', label: 'All Modes' },
    { id: 'road', label: 'Road Trucking' },
    { id: 'rail', label: 'Intermodal Rail' },
    { id: 'air', label: 'Air Cargo' },
    { id: 'water', label: 'Coastal Feeder' },
  ];

  const categoryOptions: { id: FreightCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Freight Classes' },
    { id: 'general_dry', label: 'General Dry Van' },
    { id: 'reefer_cold_chain', label: 'Reefer Cold Chain' },
    { id: 'hazmat_adr', label: 'Hazmat / ADR' },
    { id: 'heavy_industrial', label: 'Heavy Industrial' },
    { id: 'high_value_express', label: 'High-Value Express' },
  ];

  const statusOptions: { id: ShipmentStatusFilter; label: string }[] = [
    { id: 'all', label: 'All Shipment Statuses' },
    { id: 'delivered', label: 'Delivered (On-Time)' },
    { id: 'in_transit', label: 'In-Transit Active' },
    { id: 'delayed', label: 'Delayed / Exception' },
  ];

  return (
    <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-sm text-left">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Filter Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
          {/* 1. Date Range Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Reporting Period
            </label>
            <div className="relative">
              <select
                value={filters.dateRange}
                onChange={(e) =>
                  onFilterChange({ dateRange: e.target.value as DateRangePreset })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer appearance-none font-medium"
              >
                {datePresets.map((preset) => (
                  <option key={preset.id} value={preset.id} className="bg-white text-slate-800">
                    {preset.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-[10px]">
                ▼
              </div>
            </div>
          </div>

          {/* 2. Transport Mode Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-600" />
              Transport Mode
            </label>
            <div className="relative">
              <select
                value={filters.transportMode}
                onChange={(e) =>
                  onFilterChange({ transportMode: e.target.value as TransportMode })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer appearance-none font-medium"
              >
                {modeOptions.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-white text-slate-800">
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-[10px]">
                ▼
              </div>
            </div>
          </div>

          {/* 3. Freight Category Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-indigo-600" />
              Freight Cargo Class
            </label>
            <div className="relative">
              <select
                value={filters.freightCategory}
                onChange={(e) =>
                  onFilterChange({
                    freightCategory: e.target.value as FreightCategory | 'all',
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer appearance-none font-medium"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-white text-slate-800">
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-[10px]">
                ▼
              </div>
            </div>
          </div>

          {/* 4. Shipment Status Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Delivery SLA Status
            </label>
            <div className="relative">
              <select
                value={filters.shipmentStatus}
                onChange={(e) =>
                  onFilterChange({
                    shipmentStatus: e.target.value as ShipmentStatusFilter,
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer appearance-none font-medium"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-white text-slate-800">
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-[10px]">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Right: Reset Action & Status Tag */}
        <div className="flex items-center gap-2 shrink-0 self-end lg:self-center pt-2 lg:pt-0">
          {isFiltered && (
            <Button
              variant="outline"
              size="xs"
              leftIcon={<RotateCcw className="w-3 h-3" />}
              onClick={onResetFilters}
            >
              Reset Filters
            </Button>
          )}

          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>Interactive Multi-Param Query</span>
          </div>
        </div>
      </div>
    </div>
  );
};
