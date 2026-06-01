import { test, expect } from '@playwright/test';

test.describe('Dark mode toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();
    await page.waitForLoadState('networkidle');
  });

  test('ThemeToggle renders in header', async ({ page }) => {
    const toggle = await page.$('[data-testid="theme-toggle"]');
    expect(toggle).not.toBeNull();
  });

  test('Clicking toggle switches theme to dark', async ({ page }) => {
    // Should start in light mode
    const initial = await page.evaluate(() => document.documentElement.getAttribute('data-theme') || 'light');
    expect(initial).toBe('light');

    // Click toggle
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(300);

    const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(theme).toBe('dark');

    // Verify dark mode CSS variable
    const bg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
    );
    expect(bg).toBe('#0F1419');
  });

  test('Clicking again switches back to light', async ({ page }) => {
    // Switch to dark
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(300);

    // Switch back to light
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(300);

    const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(theme).toBe('light');

    const bg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
    );
    expect(bg).toBe('#FAF9F6');
  });

  test('Dark mode persists across page navigations via localStorage', async ({ page }) => {
    // Enable dark mode
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(300);

    // Navigate to topic page
    await page.goto('http://localhost:4321/OpenCS/topics/arrays');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Theme should persist
    const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(theme).toBe('dark');

    // Navigate to another page
    await page.goto('http://localhost:4321/OpenCS/topics/sorting');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const theme2 = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(theme2).toBe('dark');
  });

  test('Both themes render content without errors', async ({ page }) => {
    const pages = [
      '/OpenCS/topics/time-complexity',
      '/OpenCS/topics/arrays',
      '/OpenCS/topics/binary-search-tree',
      '/OpenCS/topics/number-systems',
    ];

    for (const path of pages) {
      // Light mode
      await page.goto(`http://localhost:4321${path}`);
      await page.waitForLoadState('networkidle');
      const bodyText = await page.evaluate(() => document.body.innerText.length);
      expect(bodyText).toBeGreaterThan(100);

      // Switch to dark mode
      await page.click('[data-testid="theme-toggle"]');
      await page.waitForTimeout(500);
      const bodyTextDark = await page.evaluate(() => document.body.innerText.length);
      expect(bodyTextDark).toBeGreaterThan(100);

      // Switch back
      await page.click('[data-testid="theme-toggle"]');
      await page.waitForTimeout(300);
    }
  });
});
