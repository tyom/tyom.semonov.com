const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.js', '../stories/*.stories.js'],
  svelteOptions: {
    preprocess: require('../svelte.config.cjs').preprocess,
  },
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    '@storybook/addon-svelte-csf',
  ],
  webpackFinal(config) {
    config.module.rules.push({
      test: /\.ya?ml$/i,
      use: 'raw-loader',
    });

    config.resolve.alias.$lib = path.resolve(__dirname, '../src/lib');

    return config;
  },
};
