import React from 'react';
import { Search, Filter, RotateCcw, X, Layers, LayoutGrid, List } from 'lucide-react';
import { SearchBar, Button } from '../../../design-system';
import { VehicleStatus, VehicleType, FleetFilterState } from '../types/fleet.types';

export interface FleetFilterBarProps {
  filters: FleetFilterState;
  onChange: (updated: Partial<FleetFilterState>) => void;
  onClearFilters: () => void;
  totalCount: number;
  filteredCount: number;
  viewMode?: 'grid' | 'table';
  onViewModeChange?: (mode: 'grid' | 'table') => void;
}

export const FleetFilterBar: React.FC<FleetFilterBarProps> = ({
  filters,
  onChange,
  onClearFilters,
  totalCount,
  filteredCount,
  viewMode = 'grid',
  onViewModeChange,
}) => {
  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.statusFilter !== 'all' ||
    filters.typeFilter !== 'all';

  const statusOptions: { value: 'all' | VehicleStatus; label: string }[] = [
    { value: 'all', label: 'All Units' },
    { value: 'active', label: 'Active' },
    { value: 'idle', label: 'Idle' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'charging', label: 'Charging' },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-xs">
      {/* Left: Search input */}
      <div className="flex-1 max-w-md">
        <SearchBar
          value={filters.searchQuery}
          onChange={(e) => onChange({ searchQuery: e.target.value })}
          onClear={() => onChange({ searchQuery: '' })}
          placeholder="Search by Vehicle ID, Registration, Driver, or Hub..."
          className="h-9 text-xs"
        />
      </div>

      {/* Center: Status Filter Pills */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange({ statusFilter: opt.value })}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filters.statusFilter === opt.value
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Right: Type Dropdown + View Toggle + Clear Button */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Type Filter */}
        <select
          value={filters.typeFilter}
          onChange={(e) => onChange({ typeFilter: e.target.value as any })}
          className="h-8.5 px-2.5 rounded-lg text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-800 hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-colors cursor-pointer"
        >
          <option value="all">All Modes & Types</option>
          <option value="heavy_truck_bev">Electric Truck (BEV)</option>
          <option value="heavy_truck_diesel">Heavy Diesel Hauler</option>
          <option value="heavy_truck_hydrogen">Hydrogen Hauler (FCEV)</option>
          <option value="intermodal_train">Electric Freight Train</option>
          <option value="container_vessel">Container Feeder Vessel</option>
          <option value="yard_hostler">Yard Hostler (AGV)</option>
        </select>

        {/* View Mode Toggle */}
        {onViewModeChange && (
          <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Visual Cards View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Compact Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="xs"
            onClick={onClearFilters}
            leftIcon={<RotateCcw className="w-3 h-3 text-amber-600" />}
            className="text-amber-700 hover:bg-amber-50"
          >
            Reset
          </Button>
        )}

        {/* Filtered Count indicator */}
        <div className="border-l border-slate-200 pl-2 text-[11px] font-mono text-slate-500">
          <span className="font-bold text-blue-600">{filteredCount}</span>/{totalCount}
        </div>
      </div>
    </div>
  );
};
