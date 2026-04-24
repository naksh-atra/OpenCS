import { test, expect } from '@playwright/test';

test.describe('topics page', () => {
  test('should render topic cards', async ({ page }) => {
    await page.goto('/topics');
    await expect(page.locator('.topic-card')).toHaveCount(10);
  });

  test('should render filter controls', async ({ page }) => {
    await page.goto('/topics');
    await expect(page.locator('.filter-tabs')).toBeVisible();
  });

  test('should filter by category', async ({ page }) => {
    await page.goto('/topics');
    await expect(page.locator('.topic-card')).toHaveCount(10);
    await page.getByRole('link', { name: 'Algorithms' }).click();
    await expect(page.locator('.topic-card')).toHaveCount(5);
  });
});