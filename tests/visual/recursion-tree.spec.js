import { test, expect } from '@playwright/test';

test.describe('RecursionTreeVisualizer Visual Regression', () => {
  test('should match snapshot for fibonacci preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/recursion-tree/');
    await page.waitForSelector('[data-testid="recursion-tree-visualizer"]');
    // Select Fibonacci preset if available
    const presetButton = page.locator('button:has-text("Fibonacci")');
    if (await presetButton.isVisible()) {
      await presetButton.click();
    }
    // Wait for canvas to render
    await page.waitForTimeout(2000);
    // Take snapshot
    expect(await page.screenshot({ fullPage: false })).toMatchSnapshot('recursion-tree-fibonacci.png');
  });

  test('should match snapshot for base case', async ({ page }) => {
    await page.goto('/OpenCS/topics/recursion-tree/');
    await page.waitForSelector('[data-testid="recursion-tree-visualizer"]');
    // Trigger base case if possible
    const presetButton = page.locator('button:has-text("Base Case")');
    if (await presetButton.isVisible()) {
      await presetButton.click();
    }
    await page.waitForTimeout(2000);
    expect(await page.screenshot({ fullPage: false })).toMatchSnapshot('recursion-tree-base-case.png');
  });
});
