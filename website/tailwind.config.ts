import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Dark luxury background palette
        dark: {
          900: '#08111F',
          800: '#0D1B2E',
          700: '#132238',
          600: '#1A2E48',
          500: '#243B57',
        },
        // Orange accent — #FF6A00
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
        // Muted text
        muted: '#A8B2C5',
        // Legacy aliases kept for pages not yet redesigned
        brand: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe',
          500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
        },
        isa: {
          50: '#fff7ed', 100: '#ffedd5', 400: '#fb923c',
          500: '#FF6A00', 600: '#FF6A00', 700: '#c2410c',
        },
        navy: '#08111F',
      },
    },
  },
  plugins: [],
} satisfies Config
