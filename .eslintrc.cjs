module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:svelte/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['*.cjs'],
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
};
