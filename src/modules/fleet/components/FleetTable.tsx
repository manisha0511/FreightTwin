import React, { useState } from 'react';
import {
  Truck,
  Train,
  Anchor,
  Compass,
  Eye,
  ChevronLeft,
  ChevronRight,
  BatteryCharging,
  Fuel,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MapPin,
  Clock,
  Layers,
  ArrowRight,
  Activity,
  User,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Table, Badge, Button, FreightModeIcon } from '../../../design-system';
import { FleetVehicle, VehicleStatus, VehicleType } from '../types/fleet.types';

export interface FleetTableProps {
  vehicles: FleetVehicle[];
  selectedVehicleId: string | null;
  onSelectVehicle: (vehicle: FleetVehicle) => void;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: any) => void;
  viewMode?: 'grid' | 'table';
}

export const FleetTable: React.FC<FleetTableProps> = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  sortField,
  sortDirection,
  onSort,
  viewMode = 'grid',
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = viewMode === 'grid' ? 6 : 8;

  const totalPages = Math.ceil(vehicles.length / pageSize) || 1;
  const paginatedVehicles = vehicles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getVehicleIconMode = (type: VehicleType): 'road' | 'rail' | 'ocean' | 'container' => {
    switch (type) {
      case 'intermodal_train':
        return 'rail';
      case 'container_vessel':
        return 'ocean';
      case 'yard_hostler':
        return 'container';
      default:
        return 'road';
    }
  };

  const formatTypeName = (type: VehicleType) => {
    switch (type) {
      case 'heavy_truck_bev':
        return 'Electric Truck (BEV)';
      case 'heavy_truck_diesel':
        return 'Heavy Diesel Hauler';
      case 'heavy_truck_hydrogen':
        return 'Hydrogen Hauler (FCEV)';
      case 'intermodal_train':
        return 'Electric Freight Train';
      case 'container_vessel':
        return 'Container Feeder Vessel';
      case 'yard_hostler':
        return 'Yard Hostler (AGV)';
      default:
        return type;
    }
  };

  const renderStatusBadge = (status: VehicleStatus, delayMinutes?: number) => {
    switch (status) {
      case 'active':
        return <Badge variant="cyan" size="sm" hasPulseDot>ACTIVE (IN TRANSIT)</Badge>;
      case 'delayed':
        return (
          <Badge variant="warning" size="sm" hasPulseDot>
            DELAYED {delayMinutes ? `(+${delayMinutes}m)` : ''}
          </Badge>
        );
      case 'maintenance':
        return <Badge variant="danger" size="sm">SERVICE BAY</Badge>;
      case 'charging':
        return <Badge variant="success" size="sm" hasPulseDot>FAST CHARGING</Badge>;
      case 'idle':
        return <Badge variant="neutral" size="sm">IDLE (DEPOT)</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs flex flex-col text-left">
      {/* 1. VISUAL VEHICLE GRID (Primary View) */}
      {viewMode === 'grid' ? (
        <div className="p-4 sm:p-5">
          {paginatedVehicles.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-xs">
              No vehicles found matching current filter criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedVehicles.map((vehicle) => {
                const isSelected = selectedVehicleId === vehicle.id;
                const capacityPercent = Math.round(
                  (vehicle.currentPayloadTons / vehicle.capacity.maxPayloadTons) * 100
                );
                const isElectric =
                  vehicle.propulsion === 'battery_electric' ||
                  vehicle.propulsion === 'hydrogen_fuel_cell';

                return (
                  <div
                    key={vehicle.id}
                    onClick={() => onSelectVehicle(vehicle)}
                    className={`group relative rounded-2xl p-4.5 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-50/50 border-blue-400 ring-2 ring-blue-500/20 shadow-md'
                        : 'bg-white hover:bg-slate-50/80 border-slate-200/90 shadow-xs hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Top Row: Asset ID, Reg Tag & Status */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-extrabold text-blue-600">
                            {vehicle.id}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="font-mono text-[11px] text-slate-500 font-semibold">
                            {vehicle.registrationNumber}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 font-display mt-0.5 truncate max-w-[200px]">
                          {vehicle.name}
                        </h4>
                      </div>
                      <div>{renderStatusBadge(vehicle.status, vehicle.delayMinutes)}</div>
                    </div>

                    {/* Mode Visual Illustration Banner */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 my-2">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                        <FreightModeIcon mode={getVehicleIconMode(vehicle.vehicleType)} size="md" />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 block truncate">
                          {formatTypeName(vehicle.vehicleType)}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          {isElectric ? (
                            <Zap className="w-3 h-3 text-cyan-500 shrink-0" />
                          ) : (
                            <Fuel className="w-3 h-3 text-amber-500 shrink-0" />
                          )}
                          <span className="capitalize truncate">
                            {vehicle.propulsion.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Route Progression */}
                    <div className="space-y-1.5 my-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-bold flex items-center gap-1">
                          <span>{vehicle.assignedRoute.originCode}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                          <span>{vehicle.assignedRoute.destCode}</span>
                        </span>
                        <span className="font-mono text-[11px] font-bold text-blue-600">
                          {vehicle.assignedRoute.progressPercent}% Transit
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            vehicle.status === 'delayed'
                              ? 'bg-amber-500'
                              : 'bg-gradient-to-r from-cyan-500 to-blue-600'
                          }`}
                          style={{ width: `${vehicle.assignedRoute.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Capacity Utilization & Energy Gauges */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                      {/* Capacity Meter */}
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold">
                          <span>PAYLOAD</span>
                          <span className="text-slate-700">{capacityPercent}%</span>
                        </div>
                        <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mt-1">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                          />
                        </div>
                        <div className="text-[10px] font-mono text-slate-600 mt-1">
                          {vehicle.currentPayloadTons}t / {vehicle.capacity.maxPayloadTons}t
                        </div>
                      </div>

                      {/* Energy / Battery Meter */}
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold">
                          <span>{isElectric ? 'BATTERY SOC' : 'FUEL TANK'}</span>
                          <span className="text-slate-700">{vehicle.energyLevelPercent}%</span>
                        </div>
                        <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full ${
                              vehicle.energyLevelPercent < 25
                                ? 'bg-red-500'
                                : vehicle.energyLevelPercent < 50
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${vehicle.energyLevelPercent}%` }}
                          />
                        </div>
                        <div className="text-[10px] font-mono text-slate-600 mt-1">
                          Health: {vehicle.healthScore}/100
                        </div>
                      </div>
                    </div>

                    {/* Card Action Button */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500 truncate max-w-[150px]">
                        Driver: {vehicle.assignedDriver.name.split(' ')[0]}
                      </span>
                      <Button
                        variant="outline"
                        size="xs"
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectVehicle(vehicle);
                        }}
                        className="group-hover:border-blue-400 group-hover:text-blue-600"
                      >
                        Inspect
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* 2. COMPACT TABLE VIEW */
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeadCell
                sortable
                sortDirection={sortField === 'id' ? sortDirection : null}
                onSort={() => onSort('id')}
              >
                Vehicle ID
              </Table.HeadCell>
              <Table.HeadCell
                sortable
                sortDirection={sortField === 'type' ? sortDirection : null}
                onSort={() => onSort('type')}
              >
                Vehicle Type
              </Table.HeadCell>
              <Table.HeadCell
                sortable
                sortDirection={sortField === 'registration' ? sortDirection : null}
                onSort={() => onSort('registration')}
              >
                Registration
              </Table.HeadCell>
              <Table.HeadCell>Location Hub</Table.HeadCell>
              <Table.HeadCell>Assigned Route</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Payload (t)</Table.HeadCell>
              <Table.HeadCell className="text-right">Action</Table.HeadCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paginatedVehicles.map((vehicle) => (
              <Table.Row
                key={vehicle.id}
                onClick={() => onSelectVehicle(vehicle)}
                className="cursor-pointer hover:bg-slate-50"
              >
                <Table.Cell className="font-mono font-bold text-blue-600">
                  {vehicle.id}
                </Table.Cell>
                <Table.Cell className="text-slate-800 font-semibold">
                  {formatTypeName(vehicle.vehicleType)}
                </Table.Cell>
                <Table.Cell className="font-mono text-xs text-slate-600">
                  {vehicle.registrationNumber}
                </Table.Cell>
                <Table.Cell>
                  <div className="font-medium text-slate-900">{vehicle.currentLocation.hubName}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{vehicle.currentLocation.city}</div>
                </Table.Cell>
                <Table.Cell>
                  <div className="font-mono text-xs font-bold text-slate-800">
                    {vehicle.assignedRoute.originCode} → {vehicle.assignedRoute.destCode}
                  </div>
                  <div className="text-[10px] text-blue-600 font-mono">
                    {vehicle.assignedRoute.progressPercent}% Transit
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {renderStatusBadge(vehicle.status, vehicle.delayMinutes)}
                </Table.Cell>
                <Table.Cell className="font-mono text-xs font-semibold">
                  {vehicle.currentPayloadTons} / {vehicle.capacity.maxPayloadTons}
                </Table.Cell>
                <Table.Cell className="text-right">
                  <Button
                    variant="ghost"
                    size="xs"
                    leftIcon={<Eye className="w-3.5 h-3.5" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVehicle(vehicle);
                    }}
                  >
                    Details
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      {/* Pagination Footer */}
      <div className="flex items-center justify-between p-3.5 border-t border-slate-200/80 bg-slate-50/50 text-xs text-slate-500">
        <div>
          Showing {paginatedVehicles.length} of {vehicles.length} fleet units
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </Button>
          <span className="font-mono text-[11px] px-2 text-slate-600 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="xs"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
