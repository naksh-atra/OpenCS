import { test, expect } from '@playwright/test';

test.describe('time-complexity visualizer', () => {
  test('should render bars when complexities are selected', async ({ page }) => {
    await page.goto('/OpenCS/topics/time-complexity');
    await page.waitForTimeout(2000);
    const chart = page.locator('.complexity-chart');
    await expect(chart).toBeVisible();
    const bars = page.locator('.complexity-bar');
    await expect(bars.first()).toBeVisible();
    await expect(page.locator('main article')).toHaveScreenshot('time-complexity-default.png');
  });

  test('should update bars when toggling selection', async ({ page }) => {
    await page.goto('/OpenCS/topics/time-complexity');
    await page.waitForTimeout(1000);
    const bars = page.locator('.complexity-bar');
    await page.locator('.complexity-btn').first().click();
    await page.waitForTimeout(500);
    await page.locator('.complexity-btn').first().click();
    await page.waitForTimeout(1000);
    await expect(page.locator('main article')).toHaveScreenshot('time-complexity-toggled.png');
  });
});
