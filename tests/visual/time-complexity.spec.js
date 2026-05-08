import { test, expect } from '@playwright/test';

test.describe('TimeComplexityVisualizer Visual Regression', () => {
  test('should match snapshot for default view', async ({ page }) => {
    await page.goto('/OpenCS/topics/time-complexity/');
    await page.waitForSelector('[data-testid="time-complexity-visualizer"]');
    await page.waitForTimeout(2000);
    expect(await page.screenshot({ fullPage: false })).toMatchSnapshot('time-complexity-default.png');
  });

  test('should match snapshot after toggling classes', async ({ page }) => {
    await page.goto('/OpenCS/topics/time-complexity/');
    await page.waitForSelector('[data-testid="time-complexity-visualizer"]');
    // Toggle a button to change selection
    const button = page.locator('.complexity-btn').first();
    await button.click();
    await page.waitForTimeout(1000);
    await button.click(); // toggle back
    await page.waitForTimeout(2000);
    expect(await page.screenshot({ fullPage: false })).toMatchSnapshot('time-complexity-toggled.png');
  });
});
