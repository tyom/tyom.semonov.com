import staticAdapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess({
    postcss: true,
    replace: [
      [
        'process.env.GA_TRACKING_ID',
        JSON.stringify(process.env.GA_TRACKING_ID),
      ],
    ],
  }),
  kit: {
    adapter: staticAdapter(),
    alias: {
      $data: 'data',
      $src: 'src',
      $components: 'src/components',
    },
  },
};
