const config = {
  head: {
    title: 'Tyom Semonov CV',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      { rel: 'icon', type: 'image/png', href: 'favicon.png' },
    ]
  },
  css: [
    '~/assets/main.css',
  ],
  build: {
    vendor: ['vue-markdown'],
    extend (config) {
      const urlLoader = config.module.rules.find((rule) => rule.loader === 'url-loader')
      urlLoader.exclude = /(assets\/svg|node_modules\/simple-icons)/

      config.module.rules.push(
        {
          test: /\.yaml$/,
          use: ['json-loader', 'yaml-loader'],
        },
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader',
          options: {
            svgo: {
              plugins: [
                { removeDoctype: true },
                { removeComments: true },
              ],
            },
          },
        },
      )
    },
  },
  plugins: ['~/plugins/vue-markdown'],
  modules: [],
}

if (process.env.GA_TRACKING_ID) {
  config.modules.push(
    ['@nuxtjs/google-analytics', {
      id: process.env.GA_TRACKING_ID,
    }]
  )
}

module.exports = config
