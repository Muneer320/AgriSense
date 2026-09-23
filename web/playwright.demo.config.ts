import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/demo',
  workers: 1,
  fullyParallel: false,
  timeout: 90_000,
  expect: { timeout: 15_000 },
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:5176',
    viewport: { width: 1280, height: 900 },
    geolocation: { latitude: 30.9, longitude: 75.85, accuracy: 10 },
    permissions: ['geolocation'],
    screenshot: 'only-on-failure',
    // Tokens and emulator codes stay in memory; no trace, video or auth-state file.
    trace: 'off',
    video: 'off',
    launchOptions: process.env.DEMO_CHROME_PATH
      ? { executablePath: process.env.DEMO_CHROME_PATH } : {},
  },
});
