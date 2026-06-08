import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Primary navy — ISA Dark Navy #071B2E
        dark: {
          950: '#030d18',
          900: '#071B2E',
          800: '#091f36',
          700: '#0d2844',
          600: '#173554',
          500: '#1f4268',
        },
        // ISA Engineering Blue — #0066CC
        blue: {
          700: '#004499',
          600: '#0055b3',
          500: '#0066CC',
          400: '#2280e0',
          300: '#55a0f0',
          200: '#88c0ff',
          100: '#ccdfff',
        },
        // ISA Orange — #FF8A00
        accent: {
          50:  '#fff5e6',
          100: '#ffe4bf',
          200: '#ffc980',
          300: '#ffac40',
          400: '#ff9c20',
          500: '#FF8A00',
          600: '#e07800',
          700: '#c06600',
        },
        // Neutral text
        muted: '#A8B2C5',
        slate: {
          150: '#eef1f6',
        },
        // Legacy aliases kept for unredesigned pages
        brand: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe',
          500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
        },
        isa: {
          50: '#fff7ed', 100: '#ffedd5', 300: '#fdba74', 400: '#fb923c',
          500: '#f97316', 600: '#ea580c', 700: '#c2410c',
        },
        navy: '#081D42',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config
