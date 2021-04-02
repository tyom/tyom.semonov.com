module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['svelte3'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
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
  settings: {
    'svelte3/ignore-styles': () => true,
  },
};
