import { test, expect } from '@playwright/test';

test.describe('bfs-dfs visualizer', () => {
  test('should render and respond to controls', async ({ page }) => {
    await page.goto('/OpenCS/topics/bfs-dfs');
    const canvas = page.locator('[data-testid="gtv-canvas"]');
    const legend = page.locator('[data-testid="gtv-legend"]');
    await expect(canvas).toBeVisible();
    await expect(legend).toBeVisible();
  });
});

test.describe('shortest-path-mst visualizer', () => {
  test('should render and respond to controls', async ({ page }) => {
    await page.goto('/OpenCS/topics/shortest-path-mst');
    const canvas = page.locator('[data-testid="spmv-canvas"]');
    const legend = page.locator('[data-testid="spmv-legend"]');
    await expect(canvas).toBeVisible();
    await expect(legend).toBeVisible();
  });
});

test.describe('topics page', () => {
  test('should render topic cards', async ({ page }) => {
    await page.goto('/OpenCS/');
    await expect(page.locator('.topic-card').first()).toBeVisible();
  });

  test('should render category cards', async ({ page }) => {
    await page.goto('/OpenCS/');
    await expect(page.locator('.category-card').first()).toBeVisible();
  });
});
