module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:tailwindcss/recommended', 'next/core-web-vitals', 'plugin:react/recommended', 'eslint:recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'tailwindcss'],
  rules: {
    'react/prop-types': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
};
