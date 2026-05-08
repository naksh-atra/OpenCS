import { test, expect } from '@playwright/test';

test.describe('Sorting Visual Regression', () => {
  test('should match snapshot for default preset', async ({ page }) => {
    await page.goto('/topics/sorting');
    await page.waitForTimeout(2000);
    await expect(page.locator('canvas')).toHaveScreenshot('sorting-default.png');
  });
});
