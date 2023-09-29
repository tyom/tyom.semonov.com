import staticAdapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import UnoCSS from '@unocss/svelte-scoped/preprocess';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: [
    vitePreprocess({
      replace: [
        [
          'process.env.GA_TRACKING_ID',
          JSON.stringify(process.env.GA_TRACKING_ID),
        ],
      ],
    }),
    UnoCSS({
      combine: process.env.NODE_ENV === 'production',
    }),
  ],
  kit: {
    adapter: staticAdapter(),
    alias: {
      $data: 'data',
      $src: 'src',
      $components: 'src/components',
    },
  },
};
