import { test, expect } from '@playwright/test';

test.describe('topics page', () => {
  test('should render topic cards', async ({ page }) => {
    await page.goto('/OpenCS/topics');
    await expect(page.locator('.topic-card').first()).toBeVisible();
  });

  test('should render filter controls', async ({ page }) => {
    await page.goto('/OpenCS/topics');
    await expect(page.locator('.filter-section').first()).toBeVisible();
  });

  test('should filter by clicking category tab', async ({ page }) => {
    await page.goto('/OpenCS/topics');
    const initialCount = await page.locator('.topic-card').count();
    expect(initialCount).toBeGreaterThan(0);

    const categorySection = page.locator('.filter-section').first();
    const algosLink = categorySection.locator('a').filter({ hasText: 'Algorithms' }).first();
    await algosLink.click();
    await page.waitForURL('**/topics?category=algorithms');
    expect(page.url()).toContain('category=algorithms');
  });
});
