import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

import UnoCSS from '@unocss/svelte-scoped/vite';

export default defineConfig({
  plugins: [
    UnoCSS({
      injectReset: '@unocss/reset/tailwind.css',
    }),
    Icons({
      compiler: 'svelte',
    }),
    sveltekit(),
  ],
});
