import { test, expect } from '@playwright/test';

test.describe('BST Visual Regression', () => {
  test('should match snapshot for default preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/binary-search-tree');
    await page.waitForTimeout(3000);
    // Take screenshot of the main content area
    await expect(page.locator('main article')).toHaveScreenshot('bst-default.png');
  });
});
