import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Ship, Plane, Layers, Sparkles, Compass } from 'lucide-react';

interface HubNode {
  name: string;
  code: string;
  lat: number;
  lon: number;
  type: 'air' | 'ocean' | 'rail' | 'road';
}

interface CorridorRoute {
  from: HubNode;
  to: HubNode;
  mode: 'air' | 'ocean' | 'rail' | 'road';
  color: string;
}

const LOGISTICS_HUBS: HubNode[] = [
  { name: 'Los Angeles Gateway', code: 'USLAX', lat: 34.05, lon: -118.24, type: 'ocean' },
  { name: 'Chicago Intermodal', code: 'USCHI', lat: 41.87, lon: -87.62, type: 'rail' },
  { name: 'New York Container Port', code: 'USNYC', lat: 40.71, lon: -74.0, type: 'ocean' },
  { name: 'Rotterdam Europort', code: 'NLRTM', lat: 51.92, lon: 4.47, type: 'ocean' },
  { name: 'Frankfurt Air Cargo', code: 'DEFRA', lat: 50.11, lon: 8.68, type: 'air' },
  { name: 'Shanghai Gateway', code: 'CNSHA', lat: 31.23, lon: 121.47, type: 'ocean' },
  { name: 'Singapore Straits', code: 'SGSIN', lat: 1.35, lon: 103.81, type: 'ocean' },
  { name: 'Dubai Global Logistics', code: 'AEDXB', lat: 25.2, lon: 55.27, type: 'air' },
];

const CORRIDORS: CorridorRoute[] = [
  { from: LOGISTICS_HUBS[5], to: LOGISTICS_HUBS[0], mode: 'ocean', color: '#2563EB' }, // SHA -> LAX (Transpacific)
  { from: LOGISTICS_HUBS[0], to: LOGISTICS_HUBS[1], mode: 'rail', color: '#06B6D4' },  // LAX -> CHI (Intermodal)
  { from: LOGISTICS_HUBS[1], to: LOGISTICS_HUBS[2], mode: 'road', color: '#2563EB' },  // CHI -> NYC (Highway)
  { from: LOGISTICS_HUBS[2], to: LOGISTICS_HUBS[3], mode: 'ocean', color: '#059669' }, // NYC -> RTM (Transatlantic)
  { from: LOGISTICS_HUBS[3], to: LOGISTICS_HUBS[4], mode: 'rail', color: '#06B6D4' },  // RTM -> FRA (European Trunk)
  { from: LOGISTICS_HUBS[4], to: LOGISTICS_HUBS[7], mode: 'air', color: '#4F46E5' },   // FRA -> DXB (Air Express)
  { from: LOGISTICS_HUBS[7], to: LOGISTICS_HUBS[6], mode: 'ocean', color: '#2563EB' }, // DXB -> SIN (Maritime)
  { from: LOGISTICS_HUBS[6], to: LOGISTICS_HUBS[5], mode: 'ocean', color: '#059669' }, // SIN -> SHA (East Asia Lane)
  { from: LOGISTICS_HUBS[5], to: LOGISTICS_HUBS[4], mode: 'air', color: '#4F46E5' },   // SHA -> FRA (Direct Cargo Jet)
];

// Pre-generated coastline dot clusters for clean continents
function generateGlobeDots(): Array<{ lat: number; lon: number }> {
  const dots: Array<{ lat: number; lon: number }> = [];
  // Sample dot mesh around major continental landmasses
  // North America
  for (let lat = 25; lat <= 55; lat += 4) {
    for (let lon = -125; lon <= -70; lon += 5) {
      if ((lat > 48 && lon < -110) || (lat < 32 && lon < -105)) continue;
      dots.push({ lat, lon });
    }
  }
  // Europe
  for (let lat = 36; lat <= 60; lat += 4) {
    for (let lon = -10; lon <= 35; lon += 5) {
      dots.push({ lat, lon });
    }
  }
  // East Asia
  for (let lat = 15; lat <= 45; lat += 4) {
    for (let lon = 100; lon <= 140; lon += 5) {
      dots.push({ lat, lon });
    }
  }
  // South Asia & Middle East
  for (let lat = 10; lat <= 32; lat += 4) {
    for (let lon = 45; lon <= 90; lon += 5) {
      dots.push({ lat, lon });
    }
  }
  // Lat/Long meridian rings
  for (let lat = -60; lat <= 60; lat += 20) {
    for (let lon = -180; lon <= 180; lon += 20) {
      dots.push({ lat, lon });
    }
  }
  return dots;
}

export const HeroVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Rotation angles
  const rotYRef = useRef(0.8);
  const rotXRef = useRef(0.25);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const [activeHoverMode, setActiveHoverMode] = useState<'all' | 'air' | 'ocean' | 'rail' | 'road'>('all');
  const [isCanvasSupported, setIsCanvasSupported] = useState(true);

  // Mouse tilt perspective state
  const [mouseTilt, setMouseTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsCanvasSupported(false);
      return;
    }

    const globeDots = generateGlobeDots();
    let animationId: number;
    let lastTime = performance.now();

    // Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Responsive sizing
    const setCanvasDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Floating particles around globe
    const particles = Array.from({ length: 45 }, () => ({
      x: (Math.random() - 0.5) * 440,
      y: (Math.random() - 0.5) * 440,
      z: (Math.random() - 0.5) * 120,
      radius: Math.random() * 1.8 + 0.8,
      speed: Math.random() * 0.4 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    // Math 3D projection helpers
    const project3D = (
      lat: number,
      lon: number,
      r: number,
      rotX: number,
      rotY: number
    ): { x: number; y: number; z: number; visible: boolean } => {
      const radLat = (lat * Math.PI) / 180;
      const radLon = (lon * Math.PI) / 180 + rotY;

      // Spherical to Cartesian
      let x = r * Math.cos(radLat) * Math.sin(radLon);
      let y = -r * Math.sin(radLat);
      let z = r * Math.cos(radLat) * Math.cos(radLon);

      // Rotate around X axis
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const yRot = y * cosX - z * sinX;
      const zRot = y * sinX + z * cosX;

      return {
        x,
        y: yRot,
        z: zRot,
        visible: zRot > -10, // Visible on front half
      };
    };

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;
      const globeRadius = Math.min(width, height) * 0.38;

      ctx.clearRect(0, 0, width, height);

      // Auto-rotation when not dragging
      if (!isDraggingRef.current && !prefersReducedMotion) {
        rotYRef.current += 0.22 * dt;
      }

      const rotX = rotXRef.current;
      const rotY = rotYRef.current;

      // 1. Draw Outer Atmospheric Glow Halo
      const outerGlow = ctx.createRadialGradient(cx, cy, globeRadius * 0.85, cx, cy, globeRadius * 1.35);
      outerGlow.addColorStop(0, 'rgba(37, 99, 235, 0.08)');
      outerGlow.addColorStop(0.6, 'rgba(6, 182, 212, 0.05)');
      outerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Sphere Base Surface (Soft Alabaster White Gradient with subtle shadow)
      const sphereGrad = ctx.createRadialGradient(
        cx - globeRadius * 0.35,
        cy - globeRadius * 0.4,
        globeRadius * 0.1,
        cx,
        cy,
        globeRadius
      );
      sphereGrad.addColorStop(0, '#FFFFFF');
      sphereGrad.addColorStop(0.75, '#F8FAFC');
      sphereGrad.addColorStop(1, '#E2E8F0');

      ctx.save();
      ctx.shadowColor = 'rgba(15, 23, 42, 0.08)';
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 8;
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Sphere Outline Border
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Draw Continental Dots
      ctx.fillStyle = '#94A3B8';
      for (const dot of globeDots) {
        const p = project3D(dot.lat, dot.lon, globeRadius, rotX, rotY);
        if (p.visible && p.z > 5) {
          const depthAlpha = Math.max(0.15, p.z / globeRadius);
          ctx.fillStyle = `rgba(100, 116, 139, ${depthAlpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(cx + p.x, cy + p.y, Math.max(1, 1.8 * (p.z / globeRadius)), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Draw Arced Logistics Routes (Great Circles)
      const animProgress = (time * 0.0006) % 1;

      for (const route of CORRIDORS) {
        const p1 = project3D(route.from.lat, route.from.lon, globeRadius, rotX, rotY);
        const p2 = project3D(route.to.lat, route.to.lon, globeRadius, rotX, rotY);

        if (p1.visible || p2.visible) {
          const numSteps = 24;
          const arcPoints: Array<{ x: number; y: number; z: number }> = [];

          for (let i = 0; i <= numSteps; i++) {
            const frac = i / numSteps;
            const lat = route.from.lat + (route.to.lat - route.from.lat) * frac;
            const lon = route.from.lon + (route.to.lon - route.from.lon) * frac;
            // Arc elevation peak in mid-air
            const elevation = Math.sin(frac * Math.PI) * 22;
            const pt = project3D(lat, lon, globeRadius + elevation, rotX, rotY);
            arcPoints.push({ x: cx + pt.x, y: cy + pt.y, z: pt.z });
          }

          // Draw the arc line
          ctx.beginPath();
          ctx.moveTo(arcPoints[0].x, arcPoints[0].y);
          for (let i = 1; i < arcPoints.length; i++) {
            ctx.lineTo(arcPoints[i].x, arcPoints[i].y);
          }

          const isFront = (p1.z + p2.z) / 2 > -5;
          ctx.strokeStyle = route.color;
          ctx.lineWidth = isFront ? 2 : 1;
          ctx.globalAlpha = isFront ? 0.85 : 0.25;
          ctx.stroke();
          ctx.globalAlpha = 1;

          // Moving Vehicle Indicator along the corridor
          if (isFront) {
            const vehicleIdx = Math.floor(animProgress * numSteps);
            const vPt = arcPoints[vehicleIdx];
            if (vPt && vPt.z > 0) {
              // Glowing beacon dot
              ctx.beginPath();
              ctx.arc(vPt.x, vPt.y, 4.5, 0, Math.PI * 2);
              ctx.fillStyle = '#FFFFFF';
              ctx.fill();
              ctx.strokeStyle = route.color;
              ctx.lineWidth = 2.5;
              ctx.stroke();

              // Moving pulse wave
              ctx.beginPath();
              ctx.arc(vPt.x, vPt.y, 8, 0, Math.PI * 2);
              ctx.strokeStyle = route.color;
              ctx.globalAlpha = 0.45;
              ctx.lineWidth = 1.2;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      }

      // 5. Draw Hub Pins
      for (const hub of LOGISTICS_HUBS) {
        const p = project3D(hub.lat, hub.lon, globeRadius, rotX, rotY);
        if (p.visible && p.z > 15) {
          const x = cx + p.x;
          const y = cy + p.y;

          // Outer pulse ring
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.strokeStyle = hub.type === 'air' ? '#4F46E5' : hub.type === 'rail' ? '#06B6D4' : '#2563EB';
          ctx.globalAlpha = 0.4;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.globalAlpha = 1;

          // Solid Hub Pin
          ctx.beginPath();
          ctx.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = hub.type === 'air' ? '#4F46E5' : hub.type === 'rail' ? '#06B6D4' : '#2563EB';
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Hub Code Pill
          ctx.font = '600 10px JetBrains Mono, monospace';
          ctx.fillStyle = '#0F172A';
          ctx.fillText(hub.code, x + 8, y + 3);
        }
      }

      // 6. Draw Subtle Ambient Dust Particles
      for (const part of particles) {
        part.y -= part.speed * 0.4;
        if (part.y < -220) part.y = 220;

        ctx.beginPath();
        ctx.arc(cx + part.x, cy + part.y, part.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${part.opacity * 0.35})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // 3D Tilt perspective on hover
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const xRel = (e.clientX - rect.left) / rect.width - 0.5;
      const yRel = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseTilt({
        rotateX: -yRel * 12,
        rotateY: xRel * 14,
      });
    }

    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    rotYRef.current += dx * 0.007;
    rotXRef.current = Math.max(-0.8, Math.min(0.8, rotXRef.current - dy * 0.007));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMousePosRef.current.x;
    const dy = e.touches[0].clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    rotYRef.current += dx * 0.007;
    rotXRef.current = Math.max(-0.8, Math.min(0.8, rotXRef.current - dy * 0.007));
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        handleMouseUp();
        setMouseTilt({ rotateX: 0, rotateY: 0 });
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      animate={{
        rotateX: mouseTilt.rotateX,
        rotateY: mouseTilt.rotateY,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="relative w-full max-w-xl mx-auto h-[440px] sm:h-[500px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing rounded-3xl bg-gradient-to-b from-white via-slate-50/80 to-blue-50/30 border border-slate-200/90 p-4 shadow-premium-float overflow-hidden"
    >
      {/* Background Subtle Grid & Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Mode Pill Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-premium-xs text-xs font-semibold text-text-primary">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
        </span>
        <span className="font-mono text-[11px] tracking-wide text-blue-700">3D FREIGHT TWIN</span>
      </div>

      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border border-slate-200 text-[11px] font-medium text-text-muted font-mono">
        <Compass className="w-3 h-3 text-accent-primary" />
        <span>Drag to orbit</span>
      </div>

      {/* Canvas 3D Globe */}
      {isCanvasSupported ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full max-w-[480px] max-h-[480px] object-contain drop-shadow-[0_12px_24px_rgba(15,23,42,0.06)]"
        />
      ) : (
        /* Lightweight Fallback if Canvas / WebGL is unavailable */
        <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
          <div className="w-48 h-48 rounded-full border-2 border-dashed border-blue-400/60 flex items-center justify-center animate-spin">
            <Compass className="w-16 h-16 text-accent-primary" />
          </div>
          <div className="text-xs font-semibold text-text-secondary">
            Multi-Modal Global Freight Network
          </div>
        </div>
      )}

      {/* Bottom Floating Hub Indicator Cards */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between gap-2 p-2 px-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-premium-sm text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
            <Plane className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-mono font-bold text-text-muted">AIR CARGO</div>
            <div className="text-xs font-bold text-text-primary">FRA → ORD (780 km/h)</div>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Ship className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-mono font-bold text-text-muted">MARITIME</div>
            <div className="text-xs font-bold text-text-primary">SHA → LAX (18,000 TEU)</div>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-100">
            <Truck className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-mono font-bold text-text-muted">INTERMODAL</div>
            <div className="text-xs font-bold text-text-primary">LAX → CHI (Double-Stack)</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
