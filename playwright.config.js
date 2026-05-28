import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  testMatch: '**/*.spec.{ts,js}',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:4321',
    viewport: { width: 1280, height: 720 },
  },
});
