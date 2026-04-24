import { test, expect } from '@playwright/test';

test.describe('topics page', () => {
  test('should render topic cards', async ({ page }) => {
    await page.goto('/topics');
    await expect(page.locator('.topic-card')).toHaveCount(10);
  });

  test('should render filter controls', async ({ page }) => {
    await page.goto('/topics');
    // Filter bar has multiple filter sections (category, engine, etc.)
    const filters = page.locator('.filter-section');
    await expect(filters).toHaveCount(4);
  });

  test('should filter by category', async ({ page }) => {
    await page.goto('/topics');
    await expect(page.locator('.topic-card')).toHaveCount(10);
    
    // Click Algorithms tab in Category filter (first filter section)
    const categorySection = page.locator('.filter-section').first();
    const algosLink = categorySection.locator('a').filter({ hasText: 'Algorithms' }).first();
    await algosLink.click();
    
    await expect(page.locator('.topic-card')).toHaveCount(5);
  });
});