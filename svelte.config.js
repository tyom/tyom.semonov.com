import staticAdapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import UnoCSS from '@unocss/svelte-scoped/preprocess';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: [
    vitePreprocess(),
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
