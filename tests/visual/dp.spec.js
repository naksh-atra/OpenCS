import { test, expect } from '@playwright/test';

test.describe('DP Visualizer', () => {
  test('should load and display interface', async ({ page }) => {
    await page.goto('/OpenCS/topics/dynamic-programming');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toBeVisible();
  });

  test('should run fibonacci preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/dynamic-programming');
    await page.waitForTimeout(2000);
    const presetBtn = page.locator('button:has-text("Fibonacci")');
    if (await presetBtn.isVisible()) {
      await presetBtn.click();
      await page.waitForTimeout(1000);
    }
    await expect(page.locator('main article')).toHaveScreenshot('dp-fibonacci.png');
  });

  test('should run LCS preset with backtrack', async ({ page }) => {
    await page.goto('/OpenCS/topics/dynamic-programming');
    await page.waitForTimeout(2000);
    const presetBtn = page.locator('button:has-text("LCS")');
    if (await presetBtn.isVisible()) {
      await presetBtn.click();
      await page.waitForTimeout(1000);
    }
    await expect(page.locator('main article')).toHaveScreenshot('dp-lcs.png');
  });
});
