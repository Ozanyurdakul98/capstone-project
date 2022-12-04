const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        3: 'repeat(3, minmax(0, 1fr))',
        landingpage: '2.5fr, 1fr',
        smbgbg: '1fr, 2fr, 2fr',
        smbgsm: '1fr, 2fr, 1fr',
        smbg: '80px, 2fr',
        sm3: '1fr, 1fr, 1fr',
        footer: '200px minmax(900px, 1fr) 100px',
      },
      gridTemplateRows: {
        smbgsm: '50px, 1fr, 50px',
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
    require('@tailwindcss/line-clamp'),
    require('tw-elements/dist/plugin'),
    plugin(({ addVariant }) => {
      addVariant('foc', '&[data-focused=true]');
    }),
  ],
};
