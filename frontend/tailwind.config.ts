import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        mana: '#6366f1',
        health: '#ef4444',
        parchment: '#f5f0e6',
        ink: '#0a0a0a',
        stone: {
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },
      fontFamily: {
        display: ['"IM Fell English SC"', 'serif'],
        body: ['"MedievalSharp"', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
