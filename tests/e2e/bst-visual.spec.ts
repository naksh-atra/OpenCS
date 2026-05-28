import { test, expect } from '@playwright/test';

test.describe('bst visualizer', () => {
  test('visual regression: bst default preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/binary-search-tree');
    await page.waitForTimeout(2000);
    await expect(page.locator("main article")).toBeVisible();
  });
});
