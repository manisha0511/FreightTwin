import React, { useState } from 'react';
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Clock,
  ArrowRight,
  Package,
  Layers,
  Calendar,
} from 'lucide-react';
import { Badge, Button, SearchBar, FreightModeIcon } from '../../../design-system';
import { Shipment, ShipmentStatus } from '../types/dashboard.types';
import { MOCK_SHIPMENTS } from '../data/mockDashboardData';
import { ShipmentDetailModal } from './ShipmentDetailModal';

export const ShipmentTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ShipmentStatus>('all');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter Shipments
  const filteredShipments = MOCK_SHIPMENTS.filter((s) => {
    const matchesSearch =
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.carrier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.cargoDescription.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredShipments.length / pageSize) || 1;
  const paginatedShipments = filteredShipments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderStatusBadge = (status: ShipmentStatus, delayMinutes?: number) => {
    switch (status) {
      case 'in_transit':
        return <Badge variant="cyan" size="sm" hasPulseDot>IN TRANSIT</Badge>;
      case 'delayed':
        return (
          <Badge variant="warning" size="sm" hasPulseDot>
            DELAYED {delayMinutes ? `(+${delayMinutes}m)` : ''}
          </Badge>
        );
      case 'customs_hold':
        return <Badge variant="danger" size="sm">CUSTOMS HOLD</Badge>;
      case 'delivered':
        return <Badge variant="success" size="sm">DELIVERED</Badge>;
      case 'pending':
        return <Badge variant="neutral" size="sm">PENDING</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-sm flex flex-col text-left">
      {/* Activity List Header & Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 border-b border-slate-200/80 bg-slate-50/70">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
            <span>Active Consignment Itineraries</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200/80">
              {filteredShipments.length} Active
            </span>
          </h3>
          <p className="text-[11px] text-slate-500">
            Real-time transit progression, intermodal line-hauls, and exceptions.
          </p>
        </div>

        {/* Search & Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="w-full sm:w-64">
            <SearchBar
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              onClear={() => setSearchQuery('')}
              placeholder="Search shipment, route, carrier..."
              className="h-8.5 text-xs"
            />
          </div>

          <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-xs">
            <button
              onClick={() => {
                setStatusFilter('all');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setStatusFilter('in_transit');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === 'in_transit'
                  ? 'bg-white text-cyan-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              In Transit
            </button>
            <button
              onClick={() => {
                setStatusFilter('delayed');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === 'delayed'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Delayed
            </button>
          </div>
        </div>
      </div>

      {/* Shipment Activity Stream / Compact Rows */}
      <div className="divide-y divide-slate-100">
        {paginatedShipments.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            No consignments found matching your filter criteria.
          </div>
        ) : (
          paginatedShipments.map((shipment) => (
            <div
              key={shipment.id}
              onClick={() => setSelectedShipment(shipment)}
              className="group p-4 hover:bg-slate-50/80 transition-all duration-150 flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer"
            >
              {/* Left Column: Mode Icon + Consignment ID & Route */}
              <div className="flex items-start sm:items-center gap-3.5 min-w-[280px]">
                <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-blue-50 border border-slate-200/80 text-blue-600 shrink-0 transition-colors">
                  <FreightModeIcon mode={shipment.mode === 'maritime' ? 'ocean' : shipment.mode} size="md" />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-extrabold text-blue-600">
                      {shipment.id}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {shipment.trackingNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <span title={shipment.origin}>{shipment.originCode}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span title={shipment.destination}>{shipment.destinationCode}</span>
                    <span className="text-[11px] font-normal text-slate-500 ml-1 truncate max-w-[140px]">
                      • {shipment.carrier}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 truncate max-w-[280px]">
                    {shipment.cargoDescription} ({shipment.weightTons}t)
                  </div>
                </div>
              </div>

              {/* Center Column: Transit Progress Bar & Status */}
              <div className="flex-1 max-w-md space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">
                    {shipment.progressPercent}% Transit Complete
                  </span>
                  <div>{renderStatusBadge(shipment.status, shipment.delayMinutes)}</div>
                </div>

                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/70">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      shipment.status === 'delayed'
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                        : shipment.status === 'delivered'
                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                        : shipment.status === 'customs_hold'
                        ? 'bg-gradient-to-r from-red-400 to-red-500'
                        : 'bg-gradient-to-r from-cyan-400 to-blue-600'
                    }`}
                    style={{ width: `${shipment.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Right Column: ETA & Inspect Action Button */}
              <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="text-left lg:text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                    Estimated Arrival
                  </div>
                  <div className="text-xs font-bold text-slate-800 font-mono flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{shipment.estimatedArrival}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="xs"
                  leftIcon={<Eye className="w-3.5 h-3.5" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedShipment(shipment);
                  }}
                  className="group-hover:border-blue-400 group-hover:text-blue-600"
                >
                  Details
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between p-3.5 border-t border-slate-200/80 bg-slate-50/50 text-xs text-slate-500">
        <div>
          Showing {paginatedShipments.length} of {filteredShipments.length} consignments
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

      {/* Shipment Detail Modal */}
      <ShipmentDetailModal
        shipment={selectedShipment}
        isOpen={Boolean(selectedShipment)}
        onClose={() => setSelectedShipment(null)}
        onSimulateReroute={(id) => {
          alert(`Simulating dynamic corridor reroute for consignment ${id}. Reroute computation complete: -35% delay penalty.`);
          setSelectedShipment(null);
        }}
      />
    </div>
  );
};
