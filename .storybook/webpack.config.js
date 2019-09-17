const { plugins: postCssPlugins } = require('../postcss.config');

module.exports = ({ config }) => {
  const svelteLoader = config.module.rules.find(
    r => r.loader && r.loader.includes('svelte-loader'),
  );

  try {
    const postCssLoader = config.module.rules
      .find(r => r.test.toString().includes('.css$'))
      .use.find(
        l => typeof l !== 'string' && l.loader.includes('postcss-loader'),
      );
    postCssLoader.options.plugins = () => postCssPlugins;
  } catch (error) {
    console.log('Failed to update PostCSS plugins');
    throw new Error(error);
  }

  svelteLoader.options = {
    ...svelteLoader.options,
    preprocess: require('svelte-preprocess')({
      postcss: true,
    }),
  };

  config.module.rules.push({
    test: /\.ya?ml$/i,
    use: 'raw-loader',
  });

  return config;
};
