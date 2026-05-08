import { test, expect } from '@playwright/test';

test.describe('sorting visualizer', () => {
  test('visual regression: sorting default preset', async ({ page }) => {
    await page.goto('/topics/sorting');
    await page.waitForTimeout(2000);
    // Take screenshot of the canvas area
    await expect(page.locator('canvas')).toHaveScreenshot('sorting-default.png');
  });
});
