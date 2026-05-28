import { test, expect } from '@playwright/test';

const topics = [
  { slug: 'time-complexity', name: 'Time Complexity', presetSelector: 'button:has-text("O(1)")' },
  { slug: 'recursion-tree', name: 'Recursion Tree', presetSelector: 'button:has-text("Fibonacci")' },
  { slug: 'arrays', name: 'Arrays', presetSelector: 'button:has-text("Small")' },
  { slug: 'linked-lists', name: 'Linked Lists', presetSelector: 'button:has-text("Small")' },
  { slug: 'sorting', name: 'Sorting', presetSelector: 'button:has-text("Small")' },
  { slug: 'binary-search-tree', name: 'BST', presetSelector: 'button:has-text("Balanced")' },
  { slug: 'stack-queue', name: 'Stack Queue', presetSelector: 'button:has-text("Push")' },
  { slug: 'tree-traversals', name: 'Tree Traversals', presetSelector: 'button:has-text("Preorder")' },
  { slug: 'bfs-dfs', name: 'BFS DFS', presetSelector: 'button:has-text("BFS")' },
  { slug: 'shortest-path-mst', name: 'Shortest Path MST', presetSelector: 'button:has-text("Dijkstra")' },
];

test.describe('All Visualizers UI Tests', () => {
  for (const topic of topics) {
    test(`${topic.name} - loads and interacts`, async ({ page }) => {
      await page.goto(`/OpenCS/topics/${topic.slug}`);
      await page.waitForTimeout(3000);

      // Check main article is visible
      await expect(page.locator('main article')).toBeVisible();

      // Try clicking a preset/button if exists
      const presetBtn = page.locator(topic.presetSelector);
      if (await presetBtn.isVisible()) {
        await presetBtn.click();
        await page.waitForTimeout(1000);
        // Verify no crash (page still has article)
        await expect(page.locator('main article')).toBeVisible();
      }

      // Try clicking reset if exists
      const resetBtn = page.locator('button:has-text("Reset")');
      if (await resetBtn.isVisible()) {
        await resetBtn.click();
        await page.waitForTimeout(500);
      }
    });
  }
});
