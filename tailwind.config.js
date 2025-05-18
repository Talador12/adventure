module.exports = {
  darkMode: 'class',
  content: ['./index.html', './public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#F38020',
        cloudflare: '#F38020',
      },
      ringColor: {
        accent: '#F38020',
        cloudflare: '#F38020',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
