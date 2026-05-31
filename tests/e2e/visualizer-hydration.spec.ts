import { test, expect } from '@playwright/test';

const visualizerPages = [
  { path: '/OpenCS/topics/time-complexity', name: 'Time Complexity' },
  { path: '/OpenCS/topics/sorting', name: 'Sorting' },
  { path: '/OpenCS/topics/hashing', name: 'Hashing' },
  { path: '/OpenCS/topics/recursion-tree', name: 'Recursion Tree' },
  { path: '/OpenCS/topics/arrays', name: 'Arrays' },
  { path: '/OpenCS/topics/stack-queue', name: 'Stack Queue' },
  { path: '/OpenCS/topics/binary-search-tree', name: 'BST' },
  { path: '/OpenCS/topics/bfs-dfs', name: 'BFS DFS' },
];

test.describe('Visualizers hydrate and render', () => {
  for (const { path, name } of visualizerPages) {
    test(`${name}: canvas or interactive elements render`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', err => errors.push(err.message));
      
      await page.goto(`http://localhost:4321${path}`);
      
      // Wait for astro-island to appear
      await page.waitForSelector('astro-island', { timeout: 10000 });
      
      // Wait for hydration to complete (ssr attribute removed)
      await page.waitForFunction(() => {
        const island = document.querySelector('astro-island');
        return island && !island.hasAttribute('ssr');
      }, { timeout: 10000 });
      
      // Wait a bit for React to render
      await page.waitForTimeout(2000);
      
      // Check for JavaScript errors
      expect(errors.filter(e => !e.includes('favicon') && !e.includes('ERR_CONNECTION')))
        .toHaveLength(0);
      
      // After hydration, the astro-island should have child content
      const islandContent = await page.evaluate(() => {
        const island = document.querySelector('astro-island');
        return island ? island.innerHTML.length : 0;
      });
      expect(islandContent).toBeGreaterThan(100);
    });
  }
});
