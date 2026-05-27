import { test, expect } from '@playwright/test';

test.describe('Tree Traversal Visual Regression', () => {
  test('should match snapshot for inorder traversal', async ({ page }) => {
    await page.goto('/OpenCS/topics/tree-traversals');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toHaveScreenshot('tree-traversal-inorder.png');
  });
});

test.describe('Graph Traversal Visual Regression', () => {
  test('should match snapshot for BFS traversal', async ({ page }) => {
    await page.goto('/OpenCS/topics/bfs-dfs');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toHaveScreenshot('graph-traversal-bfs.png');
  });
});

test.describe('Shortest Path MST Visual Regression', () => {
  test('should match snapshot for dijkstra', async ({ page }) => {
    await page.goto('/OpenCS/topics/shortest-path-mst');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toHaveScreenshot('shortest-path-mst-dijkstra.png');
  });
});
