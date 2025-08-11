import path from 'node:path';
import { mergeConfig, searchForWorkspaceRoot } from 'vite';

export default {
  stories: ['../stories/*.stories.js'],
  staticDirs: ['../static'],

  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },

  async viteFinal(config) {
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
