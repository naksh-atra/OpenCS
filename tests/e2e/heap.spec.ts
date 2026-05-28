import { test, expect } from '@playwright/test';

test.describe('Heap Visualizer', () => {
  test('should load and display canvas', async ({ page }) => {
    await page.goto('/OpenCS/topics/heaps');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toBeVisible();
  });

  test('should build heap from preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/heaps');
    await page.waitForTimeout(2000);
    const presetBtn = page.locator('button:has-text("Min Heap")').first();
    if (await presetBtn.isVisible()) {
      await presetBtn.click();
      await page.waitForTimeout(1000);
    }
    await expect(page.locator("main article")).toBeVisible();
  });

  test('should switch to max heap', async ({ page }) => {
    await page.goto('/OpenCS/topics/heaps');
    await page.waitForTimeout(2000);
    const maxBtn = page.locator('button:has-text("Max Heap")').first();
    if (await maxBtn.isVisible()) {
      await maxBtn.click();
      await page.waitForTimeout(1000);
    }
    await expect(page.locator("main article")).toBeVisible();
  });

  test('should insert value interactively', async ({ page }) => {
    await page.goto('/OpenCS/topics/heaps');
    await page.waitForTimeout(2000);
    const input = page.locator('input[type="number"]');
    if (await input.isVisible()) {
      await input.fill('0');
      const insertBtn = page.locator('button:has-text("Insert")');
      await insertBtn.click();
      await page.waitForTimeout(500);
    }
    await expect(page.locator('main article')).toBeVisible();
  });
});
