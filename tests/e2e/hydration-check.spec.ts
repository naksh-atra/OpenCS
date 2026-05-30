import { test, expect } from '@playwright/test';

const topicPages = [
  '/OpenCS/',
  '/OpenCS/topics',
  '/OpenCS/topics/time-complexity',
  '/OpenCS/topics/recursion-tree',
  '/OpenCS/topics/sorting',
  '/OpenCS/topics/hashing',
  '/OpenCS/topics/number-systems',
  '/OpenCS/topics/binary-search-tree',
  '/OpenCS/topics/bfs-dfs',
  '/OpenCS/topics/shortest-path-mst',
  '/OpenCS/topics/linked-list',
  '/OpenCS/topics/array',
  '/OpenCS/topics/stack-queue',
  '/OpenCS/topics/dp',
  '/OpenCS/topics/avl-trees',
  '/OpenCS/topics/dfa-nfa',
  '/OpenCS/topics/cpu-scheduling',
  '/OpenCS/topics/memory-management',
  '/OpenCS/topics/expression-parsing',
  '/OpenCS/topics/graph-representations',
  '/OpenCS/topics/heaps',
  '/OpenCS/topics/tree-traversal',
];

test.describe('Hydration check', () => {
  for (const path of topicPages) {
    test(`page loads: ${path}`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', err => errors.push(err.message));

      await page.goto(`http://localhost:4321${path}`);
      await page.waitForLoadState('networkidle');

      // Body should have content
      const bodyChildren = await page.evaluate(() => document.body.children.length);
      expect(bodyChildren).toBeGreaterThan(0);

      // Should have astro-island for topic pages
      if (path.includes('/topics/') && path !== '/topics') {
        const islands = await page.evaluate(() => document.querySelectorAll('astro-island').length);
        expect(islands).toBeGreaterThan(0);
      }

      // No JS errors
      expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
    });
  }
});
