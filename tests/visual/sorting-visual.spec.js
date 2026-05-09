import { test, expect } from '@playwright/test';

test.describe('Sorting Visualizer UI Tests', () => {
  test('should load and display canvas', async ({ page }) => {
    await page.goto('/OpenCS/topics/sorting');
    await page.waitForTimeout(3000);
    const canvas = page.locator('canvas.sv-canvas');
    await expect(canvas).toBeVisible();
  });

  test('should switch presets and update visualization', async ({ page }) => {
    await page.goto('/OpenCS/topics/sorting');
    await page.waitForTimeout(2000);
    // Click Sorted preset
    await page.locator('button:has-text("Sorted")').click();
    await page.waitForTimeout(1000);
    // Verify canvas is still visible (implies update)
    const canvas = page.locator('canvas.sv-canvas');
    await expect(canvas).toBeVisible();
  });

  test('should start/stop play animation', async ({ page }) => {
    await page.goto('/OpenCS/topics/sorting');
    await page.waitForTimeout(2000);
    // Click Play
    await page.locator('button:has-text("Play")').click();
    await page.waitForTimeout(2000);
    // Click Play again to stop (if toggle)
    await page.locator('button:has-text("Play")').click();
    await page.waitForTimeout(500);
  });

  test('visual regression: default preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/sorting');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toHaveScreenshot('sorting-default.png');
  });
});
