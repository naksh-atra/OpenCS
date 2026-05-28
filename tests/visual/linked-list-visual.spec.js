import { test, expect } from '@playwright/test';

test.describe('Linked List Visual Regression', () => {
  test('should match snapshot for default preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/linked-lists');
    await page.waitForTimeout(3000);
    // Take screenshot of the main content area
    await expect(page.locator('main article')).toHaveScreenshot('linked-list-default.png');
  });
});
