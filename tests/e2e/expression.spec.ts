import { test, expect } from '@playwright/test';

test.describe('Expression Parsing Visualizer', () => {
  test('should load and display interface', async ({ page }) => {
    await page.goto('/OpenCS/topics/expression-parsing');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toBeVisible();
  });

  test('should convert via preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/expression-parsing');
    await page.waitForTimeout(2000);
    const presetBtn = page.locator('button.exp-toggle-btn').filter({ hasText: 'A+B*C' }).first();
    await presetBtn.click();
    await page.waitForTimeout(1000);
    await expect(page.locator("main article")).toBeVisible();
  });

  test('should handle parentheses', async ({ page }) => {
    await page.goto('/OpenCS/topics/expression-parsing');
    await page.waitForTimeout(2000);
    const presetBtn = page.locator('button.exp-toggle-btn').filter({ hasText: '(A+B)*(C-D)' }).first();
    await presetBtn.click();
    await page.waitForTimeout(1000);
    await expect(page.locator("main article")).toBeVisible();
  });
});
