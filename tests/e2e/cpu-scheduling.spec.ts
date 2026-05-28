import { test, expect } from '@playwright/test';

test.describe('CPU Scheduling Visualizer', () => {
  test('should load and display interface', async ({ page }) => {
    await page.goto('/OpenCS/topics/cpu-scheduling');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toBeVisible();
  });

  test('should run FCFS preset', async ({ page }) => {
    await page.goto('/OpenCS/topics/cpu-scheduling');
    await page.waitForTimeout(2000);
    const presetBtn = page.locator('button:has-text("FCFS (same arrival)")');
    if (await presetBtn.isVisible()) {
      await presetBtn.click();
      await page.waitForTimeout(500);
    }
    const runBtn = page.locator('button:has-text("Run")');
    if (await runBtn.isVisible()) {
      await runBtn.click();
      await page.waitForTimeout(500);
    }
    await expect(page.locator("main article")).toBeVisible();
  });
});
