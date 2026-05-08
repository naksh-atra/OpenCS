import { test, expect } from '@playwright/test';

test.describe('bst visualizer', () => {
  test('visual regression: bst default preset', async ({ page }) => {
    await page.goto('/topics/binary-search-tree');
    await page.waitForTimeout(2000);
    // Take screenshot of the visualizer container
    await expect(page.locator('.bst-visualizer')).toHaveScreenshot('bst-default.png');
  });
});
