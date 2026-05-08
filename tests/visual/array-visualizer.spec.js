import { test, expect } from '@playwright/test';

test.describe('ArrayVisualizer Visual Regression', () => {
  test('should match snapshot for default view', async ({ page }) => {
    await page.goto('/OpenCS/topics/arrays/');
    await page.waitForSelector('[data-testid="array-visualizer"]');
    // Wait for rendering
    await page.waitForTimeout(2000);
    expect(await page.screenshot({ fullPage: false })).toMatchSnapshot('array-visualizer-default.png');
  });

  test('should match snapshot after preset selection', async ({ page }) => {
    await page.goto('/OpenCS/topics/arrays/');
    await page.waitForSelector('[data-testid="array-visualizer"]');
    // Click Small preset
    const presetButton = page.locator('button:has-text("Small")');
    if (await presetButton.isVisible()) {
      await presetButton.click();
    }
    await page.waitForTimeout(2000);
    expect(await page.screenshot({ fullPage: false })).toMatchSnapshot('array-visualizer-preset.png');
  });
});
