/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core Command / Theme Tokens (Light Premium 2.0 Foundation)
        command: {
          base: '#F8FAFC',          // Primary light background (Soft Alabaster)
          surface: '#FFFFFF',       // Primary surface (Pure White)
          card: '#FFFFFF',          // Card surface (Pure White)
          'card-hover': '#F1F5F9',  // Subtle hover surface
          subdued: '#F1F5F9',       // Subdued surface (Table headers, inputs)
          border: '#E2E8F0',        // Primary delicate borders
          'border-subtle': '#CBD5E1',// Interactive & focus borders
        },
        // Semantic Canvas Aliases
        canvas: {
          base: '#F8FAFC',
          surface: '#FFFFFF',
          subtle: '#F1F5F9',
          border: '#E2E8F0',
        },
        // Accents
        accent: {
          primary: '#2563EB',       // Primary Royal Blue
          'primary-hover': '#1D4ED8',
          'primary-muted': 'rgba(37, 99, 235, 0.08)',
          secondary: '#06B6D4',     // Digital Twin Cyan
          'secondary-hover': '#0891B2',
          'secondary-muted': 'rgba(6, 182, 212, 0.08)',
          indigo: '#4F46E5',        // Luminous Indigo
          'indigo-hover': '#4338CA',
          'indigo-muted': 'rgba(79, 70, 229, 0.08)',
        },
        // Status Semantics (Light Theme Optimized)
        status: {
          success: '#059669',       // Emerald Success
          'success-muted': 'rgba(5, 150, 105, 0.08)',
          warning: '#D97706',       // Amber Warning
          'warning-muted': 'rgba(217, 119, 6, 0.08)',
          danger: '#DC2626',        // Crimson Danger
          'danger-muted': 'rgba(220, 38, 38, 0.08)',
          info: '#2563EB',          // Blue Info
          'info-muted': 'rgba(37, 99, 235, 0.08)',
        },
        // Typography Colors (Navy & Slate Hierarchy)
        text: {
          primary: '#0F172A',       // Deep Slate Navy (Headings, primary metrics)
          secondary: '#334155',     // Slate Navy (Body text, subtitles)
          muted: '#64748B',         // Neutral Muted Slate (Labels, metadata)
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      boxShadow: {
        // Light diffuse shadows replacing dark glows
        'command-sm': '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'command-md': '0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'command-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
        'premium-xs': '0 1px 2px 0 rgba(15, 23, 42, 0.03)',
        'premium-sm': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.03)',
        'premium-md': '0 4px 8px -2px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'premium-lg': '0 12px 20px -4px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
        'premium-float': '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.03)',
        'blue-glow': '0 4px 14px 0 rgba(37, 99, 235, 0.22)',
        'cyan-glow': '0 4px 14px 0 rgba(6, 182, 212, 0.22)',
      },
      borderRadius: {
        'sm': '6px',
        'DEFAULT': '8px',
        'md': '10px',
        'lg': '12px',
        'xl': '14px',
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'radar-pulse': 'radarPulse 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        radarPulse: {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '70%': { transform: 'scale(2.2)', opacity: '0' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
