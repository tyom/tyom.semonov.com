import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetUno()],
  content: {
    pipeline: {
      include: [/\.(svelte|[jt]sx|mdx?|html)($|\?)/, 'stories/**/*'],
    },
  },
  theme: {
    colors: {
      primary: '#2b417a',
      'primary-dark': '#0e1019',
    },
  },
});
