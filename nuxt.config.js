const config = {
  head: {
    title: 'Tyom Semonov CV',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto',
      },
      { rel: 'icon', type: 'image/png', href: 'favicon.png' },
    ],
  },
  loading: false,
  css: ['~/css/global.css'],
  plugins: ['~/plugins/global'],
  modules: ['@nuxtjs/markdownit', '@nuxtjs/axios'],
  markdownit: {
    injected: true,
  },
  build: {
    transpile: [/vue-awesome/],
    postcss: {
      plugins: {
        'postcss-preset-env': {
          stage: 1,
          features: {
            'nesting-rules': true,
            'custom-properties': { preserve: false },
          },
        },
        'rucksack-css': {},
        'postcss-normalize': {},
      },
    },
  },
};

if (process.env.GA_TRACKING_ID) {
  config.modules.push([
    '@nuxtjs/google-analytics',
    {
      id: process.env.GA_TRACKING_ID,
    },
  ]);
}

module.exports = config;
