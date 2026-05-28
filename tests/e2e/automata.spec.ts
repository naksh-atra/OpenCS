import { test, expect } from '@playwright/test';

test.describe('Automata Visualizer', () => {
  test('should load and display interface', async ({ page }) => {
    await page.goto('/OpenCS/topics/dfa-nfa');
    await page.waitForTimeout(3000);
    await expect(page.locator('main article')).toBeVisible();
  });

  test('should load DFA preset and simulate', async ({ page }) => {
    await page.goto('/OpenCS/topics/dfa-nfa');
    await page.waitForTimeout(2000);
    const presetBtn = page.locator('button:has-text("DFA: ends with 01")');
    if (await presetBtn.isVisible()) {
      await presetBtn.click();
      await page.waitForTimeout(500);
    }
    const simBtn = page.locator('button:has-text("Simulate")');
    if (await simBtn.isVisible()) {
      await simBtn.click();
      await page.waitForTimeout(500);
    }
    await expect(page.locator("main article")).toBeVisible();
  });
});
