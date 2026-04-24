import { test, expect } from '@playwright/test';

test.describe('topics page', () => {
  test('should render topic cards', async ({ page }) => {
    await page.goto('/topics');
    await expect(page.locator('.topic-card')).toHaveCount(10);
  });

  test('should render filter controls', async ({ page }) => {
    await page.goto('/topics');
    const filters = page.locator('.filter-section');
    await expect(filters.first()).toBeVisible();
  });

  test('should filter by category', async ({ page }) => {
    await page.goto('/topics');
    await expect(page.locator('.topic-card')).toHaveCount(10);
    
    const algosTab = page.locator('.filter-tabs a').filter({ hasText: 'Algorithms' }).first();
    await algosTab.click();
    
    await expect(page.locator('.topic-card')).toHaveCount(5);
  });
});