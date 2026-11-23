import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart2,
  PieChart,
  Activity,
  Leaf,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Card, Badge, FreightModeIcon } from '../../../design-system';

interface ModeDistribution {
  mode: 'rail' | 'road' | 'maritime' | 'air';
  label: string;
  sharePercent: number;
  teuVolume: number;
  carbonIntensity: string;
  color: string;
  bgTint: string;
  borderTint: string;
}

export const DashboardAnalytics: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [hoveredMode, setHoveredMode] = useState<string | null>(null);

  // 7-day shipment volume trend data
  const trendData = [
    { day: 'Mon', volume: 1640, onTime: 94 },
    { day: 'Tue', volume: 1720, onTime: 93 },
    { day: 'Wed', volume: 1890, onTime: 96 },
    { day: 'Thu', volume: 1810, onTime: 91 },
    { day: 'Fri', volume: 1950, onTime: 92 },
    { day: 'Sat', volume: 1580, onTime: 95 },
    { day: 'Sun', volume: 1420, onTime: 97 },
  ];

  const maxVolume = 2100;

  // Transport Mode Distribution Data
  const modeData: ModeDistribution[] = [
    {
      mode: 'rail',
      label: 'Rail Intermodal',
      sharePercent: 44,
      teuVolume: 628,
      carbonIntensity: '22 g CO2e/t-km',
      color: '#2563EB',
      bgTint: 'bg-blue-50 text-blue-700',
      borderTint: 'border-blue-200',
    },
    {
      mode: 'road',
      label: 'Highway Freight',
      sharePercent: 32,
      teuVolume: 457,
      carbonIntensity: '110 g CO2e/t-km',
      color: '#06B6D4',
      bgTint: 'bg-cyan-50 text-cyan-700',
      borderTint: 'border-cyan-200',
    },
    {
      mode: 'maritime',
      label: 'Maritime Feeder',
      sharePercent: 18,
      teuVolume: 257,
      carbonIntensity: '15 g CO2e/t-km',
      color: '#0D9488',
      bgTint: 'bg-teal-50 text-teal-700',
      borderTint: 'border-teal-200',
    },
    {
      mode: 'air',
      label: 'Air Express',
      sharePercent: 6,
      teuVolume: 86,
      carbonIntensity: '650 g CO2e/t-km',
      color: '#8B5CF6',
      bgTint: 'bg-purple-50 text-purple-700',
      borderTint: 'border-purple-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
      {/* 1. Shipment Volume Over Time (7 cols) */}
      <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200/90 p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
                <BarChart2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Weekly Freight Volume Trends
                </h3>
                <p className="text-[11px] text-slate-500">
                  Daily dispatched TEU throughput across all corridors
                </p>
              </div>
            </div>
            <Badge variant="cyan" size="sm">
              7-DAY AGGREGATION
            </Badge>
          </div>

          <div className="flex items-baseline justify-between mt-4">
            <div className="space-y-0.5">
              <span className="text-2xl font-extrabold font-display text-slate-900 tabular-nums">
                12,010 <span className="text-xs font-semibold text-slate-500 font-sans">Total Dispatched TEU</span>
              </span>
              <p className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+8.4% volume growth across multi-modal trunks</span>
              </p>
            </div>

            {hoveredDay !== null && (
              <div className="text-right text-xs p-2 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
                <span className="font-mono text-blue-600 font-bold">
                  {trendData[hoveredDay].day}: {trendData[hoveredDay].volume.toLocaleString()} TEU
                </span>
                <span className="text-slate-500 ml-1.5 font-medium">
                  ({trendData[hoveredDay].onTime}% on-time SLA)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Interactive SVG Bar Chart */}
        <div className="h-48 w-full flex items-end justify-between gap-3 pt-6 px-1">
          {trendData.map((item, idx) => {
            const heightPercent = Math.round((item.volume / maxVolume) * 100);
            const isHovered = hoveredDay === idx;

            return (
              <div
                key={item.day}
                className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                onMouseEnter={() => setHoveredDay(idx)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                <div className="relative w-full flex items-end justify-center h-32">
                  {/* Subtle Background Guide Track */}
                  <div className="w-full max-w-[32px] h-full bg-slate-100 rounded-lg absolute inset-0 mx-auto" />

                  {/* Active Bar with Gradient and Hover Glow */}
                  <div
                    className={`w-full max-w-[32px] rounded-lg transition-all duration-200 relative z-10 ${
                      isHovered
                        ? 'bg-gradient-to-t from-blue-600 to-cyan-500 shadow-md scale-y-105'
                        : 'bg-gradient-to-t from-blue-700 to-blue-500'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                <div className="text-center">
                  <span
                    className={`text-[11px] font-mono transition-colors block ${
                      isHovered ? 'text-blue-600 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {item.day}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {item.volume}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Transport Mode Distribution (5 cols) */}
      <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200/90 p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                <PieChart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Transport Mode Distribution
                </h3>
                <p className="text-[11px] text-slate-500">
                  Multi-modal freight share & carbon intensity
                </p>
              </div>
            </div>
            <Badge variant="success" size="sm">
              GLEC v3.0
            </Badge>
          </div>

          {/* Segmented Distribution Bar */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Modal Volume Split</span>
              <span className="text-slate-500 font-mono font-medium">1,428 Total TEU</span>
            </div>

            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex p-0.5 border border-slate-200">
              {modeData.map((m) => (
                <div
                  key={m.mode}
                  style={{
                    width: `${m.sharePercent}%`,
                    backgroundColor: m.color,
                  }}
                  className={`h-full first:rounded-l-full last:rounded-r-full transition-all duration-200 cursor-pointer ${
                    hoveredMode === m.mode ? 'opacity-100 scale-y-110' : 'opacity-90 hover:opacity-100'
                  }`}
                  onMouseEnter={() => setHoveredMode(m.mode)}
                  onMouseLeave={() => setHoveredMode(null)}
                  title={`${m.label}: ${m.sharePercent}% (${m.teuVolume} TEU)`}
                />
              ))}
            </div>
          </div>

          {/* Mode Details Grid */}
          <div className="grid grid-cols-2 gap-2.5 mt-4">
            {modeData.map((m) => {
              const isSelected = hoveredMode === m.mode;
              return (
                <div
                  key={m.mode}
                  onMouseEnter={() => setHoveredMode(m.mode)}
                  onMouseLeave={() => setHoveredMode(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? `${m.bgTint} ${m.borderTint} shadow-xs scale-102`
                      : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <FreightModeIcon mode={m.mode === 'maritime' ? 'ocean' : m.mode} size="sm" />
                      <span className="text-xs font-bold text-slate-800 truncate">
                        {m.label}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold font-mono text-slate-900">
                      {m.sharePercent}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono">{m.teuVolume} TEU</span>
                    <span className="text-[10px] text-slate-400 font-mono">{m.carbonIntensity}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* GLEC Decarbonization Metric Banner */}
        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 mt-4 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
            <Leaf className="w-4 h-4" />
          </div>
          <div className="text-[11px] text-emerald-900 leading-snug">
            <strong className="font-bold">GLEC Decarbonization Target: </strong>
            Modal shifting to electrified rail saved{' '}
            <span className="font-mono font-bold text-emerald-800">318.4 kg CO2e / 1,000 t-km</span> this cycle.
          </div>
        </div>
      </div>
    </div>
  );
};
