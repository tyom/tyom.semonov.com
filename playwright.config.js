import { defineConfig } from '@playwright/test';

const PORT = process.env.PORT || 4000;
const serverUrl = `http://localhost:${PORT}`;

export default defineConfig({
  webServer: {
    command: 'pnpm dev --host',
    url: serverUrl,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: serverUrl,
  },
});
