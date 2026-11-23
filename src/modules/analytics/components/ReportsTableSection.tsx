import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Table as TableIcon,
} from 'lucide-react';
import { Badge, Button } from '../../../design-system';
import { ReportType } from '../types/analytics.types';
import { MOCK_REPORT_CATALOG, MOCK_SUSTAINABILITY_DATA } from '../data/mockAnalyticsData';
import { FilteredAnalyticsOutput, exportReportToCsv } from '../utils/analyticsCalculations';

export interface ReportsTableSectionProps {
  filteredData: FilteredAnalyticsOutput;
}

export const ReportsTableSection: React.FC<ReportsTableSectionProps> = ({ filteredData }) => {
  const [selectedReportType, setSelectedReportType] =
    useState<ReportType>('freight_performance');
  const [isExporting, setIsExporting] = useState(false);

  const selectedReportInfo =
    MOCK_REPORT_CATALOG.find((r) => r.type === selectedReportType) ||
    MOCK_REPORT_CATALOG[0];

  const handleDownloadCsv = () => {
    setIsExporting(true);
    setTimeout(() => {
      exportReportToCsv(selectedReportType, filteredData);
      setIsExporting(false);
    }, 300);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-5 lg:p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm text-left space-y-6">
      {/* Header & Export Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
              <FileText className="w-4 h-4" />
            </span>
            Enterprise Freight & Compliance Reports Catalog
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Export audit-ready multi-modal performance, linehaul expenditures, corridor velocity, and carbon ledgers.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Printer className="w-3.5 h-3.5" />}
            onClick={handlePrint}
          >
            Print Dossier
          </Button>

          <Button
            variant="primary"
            size="sm"
            isLoading={isExporting}
            leftIcon={<Download className="w-3.5 h-3.5" />}
            onClick={handleDownloadCsv}
          >
            Export Filtered CSV
          </Button>
        </div>
      </div>

      {/* 4 Report Catalog Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {MOCK_REPORT_CATALOG.map((report) => {
          const isSelected = selectedReportType === report.type;

          return (
            <div
              key={report.id}
              onClick={() => setSelectedReportType(report.type)}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/20 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                  <span className="font-bold">{report.id}</span>
                  <Badge variant={isSelected ? 'cyan' : 'neutral'} size="sm">
                    {report.fileSizeEstimate}
                  </Badge>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-snug mb-1">
                  {report.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {report.subtitle}
                </p>
              </div>

              <div className="pt-2.5 mt-3 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Updated: {report.generatedDate}</span>
                <span className={isSelected ? 'text-blue-600 font-bold' : 'text-slate-400'}>
                  {isSelected ? 'ACTIVE VIEW' : 'SELECT'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Structured Report Preview Data Table */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-900">
              {selectedReportInfo.title}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Previewing active dataset based on applied filters
          </span>
        </div>

        <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
          {/* 1. Freight Performance Table */}
          {selectedReportType === 'freight_performance' && (
            <table className="w-full text-xs text-left">
              <thead className="sticky top-0 bg-slate-100 text-slate-600 text-[11px] font-mono uppercase border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Month</th>
                  <th className="py-2.5 px-3 text-right">Total Units</th>
                  <th className="py-2.5 px-3 text-right">On-Time</th>
                  <th className="py-2.5 px-3 text-right">Delayed</th>
                  <th className="py-2.5 px-3 text-right">Road Volume</th>
                  <th className="py-2.5 px-3 text-right">Rail Volume</th>
                  <th className="py-2.5 px-3 text-right">Air Volume</th>
                  <th className="py-2.5 px-3 text-right">Water Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                {filteredData.monthlyVolumes.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-blue-600">{row.month}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">{row.volume.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 font-semibold">{row.onTimeDeliveries.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-rose-700 font-semibold">{row.delayedDeliveries.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">{row.roadVolume.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">{row.railVolume.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">{row.airVolume.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">{row.waterVolume.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 2. Transportation Cost Table */}
          {selectedReportType === 'transportation_cost' && (
            <table className="w-full text-xs text-left">
              <thead className="sticky top-0 bg-slate-100 text-slate-600 text-[11px] font-mono uppercase border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Period</th>
                  <th className="py-2.5 px-3 text-right">Total Spend ($)</th>
                  <th className="py-2.5 px-3 text-right">Fuel & Energy ($)</th>
                  <th className="py-2.5 px-3 text-right">Carrier Linehaul ($)</th>
                  <th className="py-2.5 px-3 text-right">Tolls & Access ($)</th>
                  <th className="py-2.5 px-3 text-right">Congestion Surcharges ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                {filteredData.monthlyCosts.map((c) => (
                  <tr key={c.period} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-emerald-700">{c.period}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700">${c.totalCostUsd.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-amber-700 font-semibold">${c.fuelOrEnergyCostUsd.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-blue-600 font-semibold">${c.carrierLinehaulCostUsd.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">${c.tollsAndAccessCostUsd.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-rose-700 font-semibold">${c.delaySurchargesUsd.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 3. Route Efficiency Table */}
          {selectedReportType === 'route_efficiency' && (
            <table className="w-full text-xs text-left">
              <thead className="sticky top-0 bg-slate-100 text-slate-600 text-[11px] font-mono uppercase border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Corridor</th>
                  <th className="py-2.5 px-3">Mode</th>
                  <th className="py-2.5 px-3 text-right">Volume</th>
                  <th className="py-2.5 px-3 text-right">Distance</th>
                  <th className="py-2.5 px-3 text-right">Transit Time</th>
                  <th className="py-2.5 px-3 text-right">On-Time</th>
                  <th className="py-2.5 px-3 text-right">Efficiency Score</th>
                  <th className="py-2.5 px-3 text-right">Cost/Ton-Km</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                {filteredData.corridors.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                      {c.corridorName}
                      <span className="block text-[10px] text-slate-400 font-mono">{c.originCity} → {c.destinationCity}</span>
                    </td>
                    <td className="py-2.5 px-3 uppercase text-[10px] font-bold text-slate-700">{c.primaryMode}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">{c.totalShipmentsVolume.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">{c.avgDistanceKm.toLocaleString()} km</td>
                    <td className="py-2.5 px-3 text-right text-blue-600 font-semibold">{c.avgTransitHours}h</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 font-bold">{c.onTimeRatePercent}%</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 font-bold">{c.efficiencyScore}%</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">${c.costPerTonKm.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 4. Sustainability Table */}
          {selectedReportType === 'sustainability' && (
            <table className="w-full text-xs text-left">
              <thead className="sticky top-0 bg-slate-100 text-slate-600 text-[11px] font-mono uppercase border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Month</th>
                  <th className="py-2.5 px-3 text-right">Actual Estimated Emissions</th>
                  <th className="py-2.5 px-3 text-right">Target Baseline</th>
                  <th className="py-2.5 px-3 text-right">Modal Shift Abatement</th>
                  <th className="py-2.5 px-3 text-right">Reduction %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                {MOCK_SUSTAINABILITY_DATA.monthlyEmissionTrend.map((row) => {
                  const saved = row.targetBaselineKg - row.actualEmissionsKg;
                  const pct = Math.round((saved / row.targetBaselineKg) * 100);

                  return (
                    <tr key={row.month} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-emerald-700">{row.month}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-emerald-700">
                        {(row.actualEmissionsKg / 1000).toFixed(1)} tons CO2e
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-600">
                        {(row.targetBaselineKg / 1000).toFixed(1)} tons CO2e
                      </td>
                      <td className="py-2.5 px-3 text-right text-cyan-700 font-semibold">
                        {(saved / 1000).toFixed(1)} tons abated
                      </td>
                      <td className="py-2.5 px-3 text-right text-emerald-700 font-bold">
                        -{pct}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
