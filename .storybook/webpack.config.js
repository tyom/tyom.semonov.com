module.exports = ({ config }) => {
  const svelteLoader = config.module.rules.find(
    (r) => r.loader && r.loader.includes('svelte-loader'),
  );
  svelteLoader.options = {
    ...svelteLoader.options,
    preprocess: require('svelte-preprocess')({
      postcss: true,
    }),
  };

  config.module.rules.push({
    test: /\.css$/,
    loaders: [
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.ya?ml$/i,
    use: 'raw-loader',
  });

  return config;
};
