const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        // 3: 'repeat(3, minmax(0, 1fr))',
        3: '1fr, 3fr, minmax(0, 3fr)',
        sm3: '1fr, 1fr, 1fr',

        // Complex site-specific column configuration
        footer: '200px minmax(900px, 1fr) 100px',
      },
      colors: {
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
      },
      boxShadow: {
        xxl: '0 45px 60px -15px rgba(0, 0, 0, 0.65)',
      },
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('foc', '&[data-focused=true]');
    }),
  ],
};
