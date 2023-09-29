import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      primary: '#2b417a',
      'primary-dark': '#0e1019',
    },
  },
});
