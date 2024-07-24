import path from 'node:path';
import { mergeConfig, searchForWorkspaceRoot } from 'vite';
import Icons from 'unplugin-icons/vite';

function workaroundSvelteDocgenPluginConflictWithUnpluginIcons(config) {
  const [_internalPlugins, ...userPlugins] = config.plugins;
  const docgenPlugin = userPlugins.find(
    (plugin) => plugin.name === 'storybook:svelte-docgen-plugin',
  );
  if (docgenPlugin) {
    const origTransform = docgenPlugin.transform;
    const newTransform = (code, id, options) => {
      if (id.startsWith('~icons/')) {
        return;
      }
      return origTransform?.call(docgenPlugin, code, id, options);
    };
    docgenPlugin.transform = newTransform;
    docgenPlugin.enforce = 'post';
  }
}

export default {
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

    // https://github.com/storybookjs/storybook/issues/20562
    workaroundSvelteDocgenPluginConflictWithUnpluginIcons(config);

    return mergeConfig(config, {
      define: { 'process.env': {} },
      plugins: [
        Icons({
          compiler: 'none',
        }),
      ],
      server: {
        fs: {
          allow: [searchForWorkspaceRoot(process.cwd())],
        },
      },
    });
  },
};
