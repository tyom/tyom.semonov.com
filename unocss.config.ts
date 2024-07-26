import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  presets: [
    presetUno({
      dark: 'media',
    }),
  ],
  content: {
    pipeline: {
      include: [/\.(svelte|[jt]sx|mdx?|html)($|\?)/, 'stories/**/*'],
    },
  },
  preflights: [
    {
      getCSS: ({ theme }) => `
        :root {
          --popper-text-color: ${theme.colors.gray[800]};
          --popper-bg-color: ${theme.colors.gray[100]};

          background-color: ${theme.colors.gray[100]};

          @media (prefers-color-scheme: dark) {
            --popper-text-color: ${theme.colors.gray[200]};
            --popper-bg-color: ${theme.colors.blue[950]};

            background-color: ${theme.colors.gray[900]};
          }
        }
      `,
    },
  ],
});
