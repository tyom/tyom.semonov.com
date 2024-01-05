import { defineConfig } from '@playwright/test';
import { networkInterfaces } from 'os';

function getIPAddress() {
  const interfaces = networkInterfaces();
  for (const name in interfaces) {
    const iface = interfaces[name];

    for (const alias of iface) {
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
  return '0.0.0.0';
}

const PORT = process.env.PORT || 5173;
const serverUrl = `http://${getIPAddress()}:${PORT}`;

console.log('Server URL:', serverUrl);

export default defineConfig({
  webServer: {
    command: 'pnpm run dev --host',
    url: serverUrl,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: serverUrl,
  },
});
