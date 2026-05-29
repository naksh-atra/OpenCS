import { test, expect } from '@playwright/test';

const topics = [
  { slug: 'time-complexity', name: 'Time Complexity' },
  { slug: 'recursion-tree', name: 'Recursion Tree' },
  { slug: 'number-systems', name: 'Number Systems' },
  { slug: 'hashing', name: 'Hashing' },
  { slug: 'arrays', name: 'Arrays' },
  { slug: 'linked-lists', name: 'Linked Lists' },
  { slug: 'stack-queue', name: 'Stack Queue' },
  { slug: 'heaps', name: 'Heaps' },
  { slug: 'expression-parsing', name: 'Expression Parsing' },
  { slug: 'sorting', name: 'Sorting' },
  { slug: 'dynamic-programming', name: 'Dynamic Programming' },
  { slug: 'binary-search-tree', name: 'Binary Search Tree' },
  { slug: 'avl-trees', name: 'AVL Trees' },
  { slug: 'tree-traversals', name: 'Tree Traversals' },
  { slug: 'graph-representations', name: 'Graph Representations' },
  { slug: 'bfs-dfs', name: 'BFS DFS' },
  { slug: 'shortest-path-mst', name: 'Shortest Path MST' },
  { slug: 'cpu-scheduling', name: 'CPU Scheduling' },
  { slug: 'memory-management', name: 'Memory Management' },
  { slug: 'dfa-nfa', name: 'DFA NFA' },
];

test.describe('All topic pages load without errors', () => {
  for (const topic of topics) {
    test(`${topic.name} — loads and renders`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', err => errors.push(err.message));

      await page.goto(`/OpenCS/topics/${topic.slug}`);
      await page.waitForTimeout(3000);

      // Page should have loaded with main content
      await expect(page.locator('main article')).toBeVisible();

      // No JS errors
      expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
    });
  }
});

test.describe('Navigation works', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/OpenCS/');
    await expect(page.locator('main')).toBeVisible();
  });

  test('topics index page loads', async ({ page }) => {
    await page.goto('/OpenCS/topics');
    await expect(page.locator('main')).toBeVisible();
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/OpenCS/about');
    await expect(page.locator('main')).toBeVisible();
  });
});
