import React from 'react';
import {
  Truck,
  Box,
  MapPin,
  Calendar,
  AlertTriangle,
  ShieldCheck,
  Leaf,
  FileText,
  Clock,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import { Modal, Badge, Button, Alert, FreightModeIcon } from '../../../design-system';
import { Shipment } from '../types/dashboard.types';

export interface ShipmentDetailModalProps {
  shipment: Shipment | null;
  isOpen: boolean;
  onClose: () => void;
  onSimulateReroute?: (shipmentId: string) => void;
}

export const ShipmentDetailModal: React.FC<ShipmentDetailModalProps> = ({
  shipment,
  isOpen,
  onClose,
  onSimulateReroute,
}) => {
  if (!shipment) return null;

  const isDelayed = shipment.status === 'delayed';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Consignment ${shipment.trackingNumber}`}
      description={`Multi-Modal Itinerary Breakdown: ${shipment.originCode} → ${shipment.destinationCode}`}
      size="lg"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close Inspector
          </Button>
          {isDelayed && onSimulateReroute && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<AlertTriangle className="w-3.5 h-3.5" />}
              onClick={() => onSimulateReroute(shipment.id)}
            >
              Simulate Reroute
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            leftIcon={<FileText className="w-3.5 h-3.5" />}
            onClick={() => alert(`Bill of Lading manifest generated for ${shipment.trackingNumber}`)}
          >
            Digital Bill of Lading
          </Button>
        </>
      }
    >
      <div className="space-y-5 text-left text-xs">
        {/* Delay alert banner if delayed */}
        {isDelayed && (
          <Alert severity="warning" title="Active Corridor Delay Warning">
            {shipment.delayReason || 'Operational bottleneck detected on primary corridor.'} (Estimated delay: +{shipment.delayMinutes} minutes).
          </Alert>
        )}

        {/* Origin / Destination Visual Track */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono font-semibold uppercase">Transport Progress</span>
            <span className="font-mono font-bold text-blue-600">{shipment.progressPercent}% COMPLETED</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden border border-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isDelayed
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600'
              }`}
              style={{ width: `${shipment.progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">ORIGIN GATE</div>
              <div className="text-sm font-bold text-slate-900 font-display">{shipment.origin}</div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">{shipment.departureTime}</div>
            </div>

            <div className="flex flex-col items-center px-4">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
                <FreightModeIcon mode={shipment.mode === 'maritime' ? 'ocean' : shipment.mode} size="sm" />
                <span className="text-[10px] font-mono uppercase font-bold">
                  {shipment.mode} line-haul
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-500 my-1.5" />
              <span className="text-[10px] text-slate-500 font-medium">{shipment.carrier}</span>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">DESTINATION GATE</div>
              <div className="text-sm font-bold text-slate-900 font-display">{shipment.destination}</div>
              <div className="text-[11px] text-emerald-600 font-mono font-bold mt-0.5">
                ETA: {shipment.estimatedArrival}
              </div>
            </div>
          </div>
        </div>

        {/* Cargo Specification & GLEC Carbon Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Cargo Details</div>
            <div className="font-bold text-slate-900 truncate">{shipment.cargoDescription}</div>
            <div className="text-[11px] text-slate-600 mt-1">
              Gross Weight: <strong className="text-slate-900">{shipment.weightTons} tons</strong>
            </div>
            {shipment.isHazardous && (
              <div className="mt-2">
                <Badge variant="danger" size="sm">HAZMAT / ADR</Badge>
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">GLEC Carbon Index</div>
            <div className="flex items-center gap-1.5 font-bold text-emerald-600 text-sm font-mono">
              <Leaf className="w-4 h-4" />
              <span>{shipment.carbonEmissionKg} kg CO2e</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              GLEC v3.0 Scope 1/3 certified
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">Digital Custody (ePOD)</div>
            <div className="flex items-center gap-1.5 font-semibold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Chain of Custody OK</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Hash: <span className="font-mono text-slate-400">0x9f4a...2c81</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
