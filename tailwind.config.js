/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FAFAFA',
          dark: '#0A0A0A',
        },
        foreground: {
          DEFAULT: '#0A0A0A',
          dark: '#FAFAFA',
        },
        muted: {
          DEFAULT: '#F5F5F4',
          foreground: '#737373',
          dark: '#171717',
          'dark-foreground': '#A3A3A3',
        },
        border: {
          DEFAULT: '#E5E5E5',
          dark: '#262626',
        },
        accent: {
          DEFAULT: '#F97316',
          hover: '#EA580C',
          muted: '#FFF7ED',
          'muted-dark': '#431407',
        },
        success: {
          DEFAULT: '#16A34A',
          light: '#22C55E',
          muted: '#F0FDF4',
          'muted-dark': '#052E16',
        },
        error: {
          DEFAULT: '#DC2626',
          light: '#EF4444',
          muted: '#FEF2F2',
          'muted-dark': '#450A0A',
        },
        match: {
          '1-light': '#FEF3C7',
          '1-dark': '#78350F',
          '2-light': '#DBEAFE',
          '2-dark': '#1E3A5F',
          '3-light': '#D1FAE5',
          '3-dark': '#064E3B',
          '4-light': '#FCE7F3',
          '4-dark': '#831843',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '6px',
        lg: '8px',
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgb(0 0 0 / 0.03)',
        soft: '0 2px 8px -2px rgb(0 0 0 / 0.06)',
        card: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
      },
    },
  },
  plugins: [],
};