module.exports = {
  darkMode: 'class',
  content: ['./index.html', './public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        cloudflare: 'hsl(var(--cloudflare) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
