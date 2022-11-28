module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:tailwindcss/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'tailwindcss'],
  rules: {},
};
