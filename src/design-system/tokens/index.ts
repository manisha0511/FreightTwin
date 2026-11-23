/**
 * FreightTwin 2.0 Design Tokens
 * Single source of truth for color constants, spacing, typography, elevations and motion
 */

export const COLOR_TOKENS = {
  command: {
    base: '#F8FAFC',          // Soft Alabaster background
    surface: '#FFFFFF',       // Pure White primary surface
    card: '#FFFFFF',          // Card surface
    cardHover: '#F1F5F9',     // Hover state
    subdued: '#F1F5F9',       // Subdued surface (inputs, table headers)
    border: '#E2E8F0',        // Primary card & divider border
    borderSubtle: '#CBD5E1',  // Subtle focus border
  },
  accent: {
    primary: '#2563EB',       // Royal Cobalt Blue
    primaryHover: '#1D4ED8',
    primaryMuted: 'rgba(37, 99, 235, 0.08)',
    secondary: '#06B6D4',     // Digital Twin Cyan
    secondaryHover: '#0891B2',
    secondaryMuted: 'rgba(6, 182, 212, 0.08)',
    indigo: '#4F46E5',        // Luminous Indigo
    indigoHover: '#4338CA',
    indigoMuted: 'rgba(79, 70, 229, 0.08)',
  },
  status: {
    success: '#059669',       // Emerald Success
    successMuted: 'rgba(5, 150, 105, 0.08)',
    warning: '#D97706',       // Amber Warning
    warningMuted: 'rgba(217, 119, 6, 0.08)',
    danger: '#DC2626',        // Crimson Danger
    dangerMuted: 'rgba(220, 38, 38, 0.08)',
    info: '#2563EB',          // Blue Info
    infoMuted: 'rgba(37, 99, 235, 0.08)',
  },
  text: {
    primary: '#0F172A',       // Deep Slate Navy
    secondary: '#334155',     // Slate Navy
    muted: '#64748B',         // Neutral Muted Slate
  },
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const TYPOGRAPHY = {
  fontFamilies: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    display: 'Plus Jakarta Sans, Inter, sans-serif',
    mono: 'JetBrains Mono, Menlo, monospace',
  },
  scales: {
    displayLg: { size: '3.75rem', lineHeight: '1.1', tracking: '-0.03em' },
    displayMd: { size: '2.5rem', lineHeight: '1.15', tracking: '-0.025em' },
    headingLg: { size: '1.875rem', lineHeight: '1.2', tracking: '-0.02em' },
    headingMd: { size: '1.25rem', lineHeight: '1.3', tracking: '-0.015em' },
    headingSm: { size: '1rem', lineHeight: '1.4', tracking: '-0.01em' },
    bodyLg: { size: '1.125rem', lineHeight: '1.6' },
    bodyMd: { size: '0.875rem', lineHeight: '1.55' },
    bodySm: { size: '0.75rem', lineHeight: '1.5' },
    caption: { size: '0.6875rem', lineHeight: '1.4', tracking: '0.04em' },
  },
} as const;

export const SHADOWS = {
  xs: '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
  sm: '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.03)',
  md: '0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
  lg: '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
  float: '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.03)',
  blueGlow: '0 4px 14px 0 rgba(37, 99, 235, 0.22)',
} as const;

export const MOTION = {
  springStandard: { type: 'spring', stiffness: 350, damping: 25 },
  springGentle: { type: 'spring', stiffness: 220, damping: 20 },
  transitionQuick: { duration: 0.15, ease: 'easeOut' },
  transitionSmooth: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
} as const;
