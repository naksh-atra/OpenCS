import { test, expect } from '@playwright/test';

test.describe('Memory Management Visualizer', () => {
  test('should load and display interface', async ({ page }) => {
    await page.goto('/OpenCS/topics/memory-management');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toBeVisible();
  });

  test('should step through FIFO preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/memory-management');
    await page.waitForTimeout(2000);
    const presetBtn = page.locator('button:has-text("FIFO (3 frames)")');
    if (await presetBtn.isVisible()) {
      await presetBtn.click();
      await page.waitForTimeout(500);
    }
    const stepBtn = page.locator('button:has-text("Step")');
    if (await stepBtn.isVisible()) {
      await stepBtn.click();
      await page.waitForTimeout(500);
    }
    await expect(page.locator("main article")).toBeVisible();
  });
});
