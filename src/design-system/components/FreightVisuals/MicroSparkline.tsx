import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface MicroSparklineProps {
  data: number[];
  width?: number | string;
  height?: number;
  color?: string;
  fillOpacity?: number;
  showArea?: boolean;
  interactive?: boolean;
  valueFormatter?: (v: number) => string;
  className?: string;
}

export const MicroSparkline: React.FC<MicroSparklineProps> = ({
  data = [12, 19, 14, 22, 18, 25, 29],
  width = '100%',
  height = 38,
  color = '#2563EB',
  fillOpacity = 0.12,
  showArea = true,
  interactive = true,
  valueFormatter = (v) => String(v),
  className,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const paddingX = 4;
  const paddingY = 4;
  const graphWidth = 100;
  const graphHeight = 36;

  // Generate normalized coordinates for SVG viewBox (100 x 36)
  const points = data.map((val, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * (graphWidth - paddingX * 2);
    const y = graphHeight - paddingY - ((val - min) / range) * (graphHeight - paddingY * 2);
    return { x, y, val };
  });

  // Build curved path (Cubic Bézier)
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const cpx1 = curr.x + (next.x - curr.x) / 2;
    const cpy1 = curr.y;
    const cpx2 = curr.x + (next.x - curr.x) / 2;
    const cpy2 = next.y;
    pathD += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${next.x} ${next.y}`;
  }

  const areaD = `${pathD} L ${points[points.length - 1].x} ${graphHeight} L ${points[0].x} ${graphHeight} Z`;
  const gradientId = `sparkline-grad-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      className={cn('relative flex items-center select-none', className)}
      style={{ width: typeof width === 'number' ? `${width}px` : width, height }}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <svg
        viewBox={`0 0 ${graphWidth} ${graphHeight}`}
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={fillOpacity} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Shaded Area */}
        {showArea && <path d={areaD} fill={`url(#${gradientId})`} />}

        {/* Curved Line */}
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Interactive Hover Point & Vertical Indicator */}
        {interactive && hoverIndex !== null && points[hoverIndex] && (
          <g>
            <line
              x1={points[hoverIndex].x}
              y1={0}
              x2={points[hoverIndex].x}
              y2={graphHeight}
              stroke="#94A3B8"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <circle
              cx={points[hoverIndex].x}
              cy={points[hoverIndex].y}
              r="3.5"
              fill="#FFFFFF"
              stroke={color}
              strokeWidth="2.5"
            />
          </g>
        )}

        {/* Invisible Hover Slices */}
        {interactive &&
          points.map((p, idx) => (
            <rect
              key={idx}
              x={p.x - 5}
              y={0}
              width={10}
              height={graphHeight}
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() => setHoverIndex(idx)}
            />
          ))}
      </svg>

      {/* Floating Hover Value Tooltip */}
      {interactive && hoverIndex !== null && points[hoverIndex] && (
        <div
          className="absolute -top-7 transform -translate-x-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-white shadow-premium-sm pointer-events-none z-20 whitespace-nowrap"
          style={{
            left: `${(points[hoverIndex].x / graphWidth) * 100}%`,
          }}
        >
          {valueFormatter(points[hoverIndex].val)}
        </div>
      )}
    </div>
  );
};
