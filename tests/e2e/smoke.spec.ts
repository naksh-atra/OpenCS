import { test, expect } from '@playwright/test';

test.describe('topics page', () => {
  test('should render cards', async ({ page }) => {
    await page.goto('/OpenCS/topics');
    await expect(page.locator('.topic-card').first()).toBeVisible();
  });

  test('should render filter controls', async ({ page }) => {
    await page.goto('/OpenCS/topics');
    await expect(page.locator('.filter-section').first()).toBeVisible();
  });
});
