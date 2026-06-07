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
        // Primary navy — #081D42 (ISA brand)
        dark: {
          950: '#040e22',
          900: '#081D42',
          800: '#0a2352',
          700: '#0d2b66',
          600: '#1a3a7a',
          500: '#244d8f',
        },
        // Engineering blue — #006DFF
        blue: {
          700: '#0047cc',
          600: '#0055cc',
          500: '#006DFF',
          400: '#338fff',
          300: '#66aaff',
          200: '#99ccff',
          100: '#cce5ff',
        },
        // ISA Orange — #FF6A00
        accent: {
          50:  '#fff3e6',
          100: '#ffe0bf',
          200: '#ffc280',
          300: '#ffa040',
          400: '#ff8520',
          500: '#FF6A00',
          600: '#e05e00',
          700: '#c05200',
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
          50: '#fff7ed', 100: '#ffedd5', 400: '#fb923c',
          500: '#FF6A00', 600: '#FF6A00', 700: '#c2410c',
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
