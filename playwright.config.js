import { defineConfig } from '@playwright/test';

const PORT = process.env.PORT || 5173;
const serverUrl = `http://localhost:${PORT}`;

export default defineConfig({
  webServer: {
    command: 'pnpm run dev',
    url: serverUrl,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: serverUrl,
  },
});
