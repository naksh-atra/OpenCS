import { test, expect } from '@playwright/test';

test.describe('ArrayVisualizer Visual Regression', () => {
  test('should match snapshot for default preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/arrays');
    await page.waitForSelector('[data-testid="array-visualizer"]');
    // wait for rendering
    await page.waitForTimeout(2000);
    expect(await page.screenshot({ fullPage: false })).toMatchSnapshot('array-visualizer-default.png');
  });

  test('should match snapshot after applying a preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/arrays');
    await page.waitForSelector('[data-testid="array-visualizer"]');
    // Click the first preset button (e.g., Small)
    const presetBtn = page.locator('button:has-text("Small")');
    if (await presetBtn.isVisible()) {
      await presetBtn.click();
    }
    await page.waitForTimeout(2000);
    expect(await page.screenshot({ fullPage: false })).toMatchSnapshot('array-visualizer-preset.png');
  });
});
