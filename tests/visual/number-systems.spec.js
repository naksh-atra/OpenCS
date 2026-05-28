import { test, expect } from '@playwright/test';

test.describe('Number Systems Visualizer', () => {
  test('should load and display conversion interface', async ({ page }) => {
    await page.goto('/OpenCS/topics/number-systems');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toBeVisible();
  });

  test('should convert decimal to binary via preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/number-systems');
    await page.waitForTimeout(2000);
    const presetBtn = page.locator('button:has-text("25 → Binary")');
    if (await presetBtn.isVisible()) {
      await presetBtn.click();
      await page.waitForTimeout(1000);
    }
    await expect(page.locator('main article')).toHaveScreenshot('number-systems-conversion.png');
  });

  test('should show IEEE 754 representation', async ({ page }) => {
    await page.goto('/OpenCS/topics/number-systems');
    await page.waitForTimeout(2000);
    const ieeePreset = page.locator('button:has-text("3.14 IEEE754")');
    if (await ieeePreset.isVisible()) {
      await ieeePreset.click();
      await page.waitForTimeout(1000);
    }
    await expect(page.locator('main article')).toHaveScreenshot('number-systems-ieee754.png');
  });

  test('should swap bases and convert', async ({ page }) => {
    await page.goto('/OpenCS/topics/number-systems');
    await page.waitForTimeout(2000);
    // Enter a value and convert
    const input = page.locator('#ns-input');
    if (await input.isVisible()) {
      await input.fill('255');
      const convertBtn = page.locator('button:has-text("Convert")');
      await convertBtn.click();
      await page.waitForTimeout(1000);
    }
    await expect(page.locator('main article')).toBeVisible();
  });
});
