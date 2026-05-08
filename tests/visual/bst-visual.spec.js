import { test, expect } from '@playwright/test';

test.describe('BST Visual Regression', () => {
  test('should match snapshot for default preset', async ({ page }) => {
    await page.goto('/topics/binary-search-tree');
    await page.waitForTimeout(2000);
    await expect(page.locator('.bst-container')).toHaveScreenshot('bst-default.png');
  });
});
