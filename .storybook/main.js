const path = require('path');
const { mergeConfig, searchForWorkspaceRoot } = require('vite');

module.exports = {
  stories: ['../stories/*.stories.js'],
  staticDirs: ['../static'],
  addons: [{ name: '@storybook/addon-essentials' }],
  docs: { autodocs: 'tag' },
  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },
  async viteFinal(config, { configType }) {
    config.resolve.alias = {
      $src: path.resolve(__dirname, '../src'),
      $components: path.resolve(__dirname, '../src/components'),
      $lib: path.resolve(__dirname, '../src/lib'),
      $data: path.resolve(__dirname, '../data'),
    };

    return mergeConfig(config, {
      define: { 'process.env': {} },
      server: {
        fs: {
          allow: [searchForWorkspaceRoot(process.cwd())],
        },
      },
    });
  },
};
