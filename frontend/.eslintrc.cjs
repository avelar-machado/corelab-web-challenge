module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier', // Desativa regras que conflitam com Prettier
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // não necessário com Vite
    'react/prop-types': 'off', // usamos TypeScript
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-console': 'warn',
  },
};
