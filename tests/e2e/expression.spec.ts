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
    // Use regex for exact match to avoid substring matching with A+B*C-D/E
    const presetBtn = page.getByRole('button', { name: /^A\+B\*C$/ });
    await presetBtn.click();
    await page.waitForTimeout(1000);
    await expect(page.locator('main article')).toHaveScreenshot('expression-basic.png');
  });

  test('should handle parentheses', async ({ page }) => {
    await page.goto('/OpenCS/topics/expression-parsing');
    await page.waitForTimeout(2000);
    const presetBtn = page.getByRole('button', { name: /^\(A\+B\)\*\(C-D\)$/ });
    await presetBtn.click();
    await page.waitForTimeout(1000);
    await expect(page.locator('main article')).toHaveScreenshot('expression-parens.png');
  });
});
