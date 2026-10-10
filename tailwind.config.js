import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars,
  })
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        noir: '#0C0B0A',
        panel: '#171310',
        panel2: '#1F1A15',
        line: 'rgba(245,241,232,0.12)',
        gold: '#F0A93E',
        goldDeep: '#D6871F',
        goldSoft: '#E9CB93',
        cream: '#F5EFE3',
        muted: '#B4AA98',
        sand: '#B29664',
        sandLight: '#FDECD4',
      },
      fontFamily: {
        display: ['"Archivo Variable"', '"Vazirmatn Variable"', 'sans-serif'],
        sans: ['"Vazirmatn Variable"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 24px 48px -18px rgba(0,0,0,0.55)',
      },
      keyframes: {
        bump: { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.2)' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(14px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        bump: 'bump 0.35s ease-out',
        fadeUp: 'fadeUp 0.7s ease-out both',
      },
    },
  },
  plugins: [addVariablesForColors],
}
