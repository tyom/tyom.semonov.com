// require('dotenv').config();
import staticAdapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: sveltePreprocess({
    postcss: true,
    replace: [
      [
        'process.env.GA_TRACKING_ID',
        JSON.stringify(process.env.GA_TRACKING_ID),
      ],
    ],
  }),
  kit: {
    appDir: 'app',
    adapter: staticAdapter(),
    prerender: {
      default: true
    }
  },
};
