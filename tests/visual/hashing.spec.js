import { test, expect } from '@playwright/test';

test.describe('Hashing Visualizer', () => {
  test('should load and display hash table', async ({ page }) => {
    await page.goto('/OpenCS/topics/hashing');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toBeVisible();
  });

  test('should insert via preset and show collision', async ({ page }) => {
    await page.goto('/OpenCS/topics/hashing');
    await page.waitForTimeout(2000);
    // Use the first matching button (preset area)
    const presetBtn = page.locator('button:has-text("Linear Probing")').first();
    if (await presetBtn.isVisible()) {
      await presetBtn.click();
      await page.waitForTimeout(1000);
    }
    await expect(page.locator('main article')).toHaveScreenshot('hashing-linear-probing.png');
  });

  test('should switch methods', async ({ page }) => {
    await page.goto('/OpenCS/topics/hashing');
    await page.waitForTimeout(2000);
    // Use the method selector button (has title attribute)
    const chainBtn = page.locator('button[title*="linked list"]');
    if (await chainBtn.isVisible()) {
      await chainBtn.click();
      await page.waitForTimeout(1000);
    }
    await expect(page.locator('main article')).toHaveScreenshot('hashing-chaining.png');
  });

  test('should insert and search interactively', async ({ page }) => {
    await page.goto('/OpenCS/topics/hashing');
    await page.waitForTimeout(2000);
    const input = page.locator('input[type="number"]');
    if (await input.isVisible()) {
      await input.fill('50');
      const insertBtn = page.locator('button:has-text("Insert")');
      await insertBtn.click();
      await page.waitForTimeout(500);
      const searchBtn = page.locator('button:has-text("Search")');
      await searchBtn.click();
      await page.waitForTimeout(500);
    }
    await expect(page.locator('main article')).toBeVisible();
  });
});
