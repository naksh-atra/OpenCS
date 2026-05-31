import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const screenshotDir = '/tmp/opencs-screenshots';
fs.mkdirSync(screenshotDir, { recursive: true });

const pages = [
  { url: '/OpenCS/', name: 'homepage' },
  { url: '/OpenCS/topics', name: 'topics-index' },
  { url: '/OpenCS/topics/time-complexity', name: 'time-complexity' },
  { url: '/OpenCS/topics/sorting', name: 'sorting' },
  { url: '/OpenCS/topics/hashing', name: 'hashing' },
  { url: '/OpenCS/topics/recursion-tree', name: 'recursion-tree' },
  { url: '/OpenCS/topics/arrays', name: 'arrays' },
  { url: '/OpenCS/topics/binary-search-tree', name: 'bst' },
  { url: '/OpenCS/topics/bfs-dfs', name: 'bfs-dfs' },
  { url: '/OpenCS/topics/linked-lists', name: 'linked-lists' },
  { url: '/OpenCS/topics/number-systems', name: 'number-systems' },
  { url: '/OpenCS/topics/dynamic-programming', name: 'dp' },
];

test.describe('Screenshot all pages', () => {
  for (const { url, name } of pages) {
    test(name, async ({ page }) => {
      await page.goto(`http://localhost:4321${url}`, { timeout: 15000 });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000); // Wait for hydration
      
      const filePath = path.join(screenshotDir, `${name}.png`);
      await page.screenshot({ 
        path: filePath, 
        fullPage: false,
        clip: { x: 0, y: 0, width: 1280, height: 800 }
      });
      
      // Basic checks
      const bodyChildren = await page.evaluate(() => document.body.children.length);
      expect(bodyChildren).toBeGreaterThan(0);
    });
  }
});
