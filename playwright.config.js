import { defineConfig } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  snapshotDir: path.join(__dirname, 'tests/e2e/snapshots'),
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:4321',
    viewport: { width: 1280, height: 720 },
  },
});
