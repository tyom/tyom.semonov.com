const sveltePreprocess = require('svelte-preprocess');
const path = require('path');

module.exports = {
  stories: ['../stories/*.stories.js'],
  staticDirs: ['../static'],
  svelteOptions: {
    preprocess: sveltePreprocess({
      postcss: true,
    }),
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
  ],
  webpackFinal(config) {
    config.module.rules.push({
      test: /\.ya?ml$/i,
      use: 'raw-loader',
    });

    config.resolve.alias.$lib = path.resolve(__dirname, '../src/lib');
    config.resolve.alias.$src = path.resolve(__dirname, '../src');
    config.resolve.alias.$data = path.resolve(__dirname, '../data');

    return config;
  },
};
