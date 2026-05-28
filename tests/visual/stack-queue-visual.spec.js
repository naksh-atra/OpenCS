import { test, expect } from '@playwright/test';

test.describe('StackQueue Visual Regression', () => {
  test('should match snapshot for stack mode', async ({ page }) => {
    await page.goto('/OpenCS/topics/stack-queue');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toHaveScreenshot('stack-queue-stack.png');
  });

  test('should match snapshot for queue mode', async ({ page }) => {
    await page.goto('/OpenCS/topics/stack-queue');
    await page.waitForTimeout(2000);
    const queueTab = page.locator('button:has-text("Queue")');
    if (await queueTab.isVisible()) {
      await queueTab.click();
      await page.waitForTimeout(1000);
    }
    await expect(page.locator('main article')).toHaveScreenshot('stack-queue-queue.png');
  });
});
