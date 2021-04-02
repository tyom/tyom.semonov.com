require('dotenv').config();
const sveltePreprocess = require('svelte-preprocess');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  preprocess: sveltePreprocess({
    postcss: true,
    defaults: {
      style: 'postcss',
    },
    replace: [
      [
        'process.env.GA_TRACKING_ID',
        JSON.stringify(process.env.GA_TRACKING_ID),
      ],
    ],
  }),
  kit: {
    appDir: 'app',
    adapter: require('@sveltejs/adapter-static')(),
    target: '#container',
  },
};
