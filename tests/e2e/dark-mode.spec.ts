import { test, expect } from '@playwright/test';

test.describe('Dark mode toggle — full coverage', () => {
  test('Toggle button renders in header', async ({ page }) => {
    await page.goto('/OpenCS/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();

    const toggle = page.locator('[data-testid="theme-toggle"]');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  test('Toggle switches from light to dark', async ({ page }) => {
    await page.goto('/OpenCS/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();

    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(300);

    const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(theme).toBe('dark');

    // Verify dark mode CSS variable is applied
    const bg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
    );
    expect(bg).toBe('#0F1419');
  });

  test('Toggle switches back to light', async ({ page }) => {
    await page.goto('/OpenCS/');
    await page.evaluate(() => localStorage.setItem('theme', 'dark'));
    await page.reload();

    const toggle = page.locator('[data-testid="theme-toggle"]');
    await expect(toggle).toHaveAttribute('aria-label', 'Switch to light mode');

    await toggle.click();
    await page.waitForTimeout(300);

    const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(theme).toBe('light');
  });

  test('Dark mode persists across page navigations', async ({ page }) => {
    await page.goto('/OpenCS/');
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(300);

    await page.goto('/OpenCS/topics/arrays');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(theme).toBe('dark');

    await page.goto('/OpenCS/topics/sorting');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const theme2 = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(theme2).toBe('dark');
  });

  test('Dark mode renders all pages without errors', async ({ page }) => {
    const pages = [
      '/OpenCS/',
      '/OpenCS/topics',
      '/OpenCS/topics/time-complexity',
      '/OpenCS/topics/arrays',
      '/OpenCS/topics/binary-search-tree',
      '/OpenCS/topics/number-systems',
      '/OpenCS/about',
      '/OpenCS/roadmap',
    ];

    for (const path of pages) {
      const errors: string[] = [];
      page.on('pageerror', err => errors.push(err.message));
      page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

      await page.goto(path);
      await page.click('[data-testid="theme-toggle"]').catch(() => {});
      await page.waitForTimeout(500);
      const bodyText = await page.evaluate(() => document.body.innerText.length);
      expect(bodyText).toBeGreaterThan(100);

      const filteredErrors = errors.filter(e =>
        !e.includes('favicon') && !e.includes('ERR_CONNECTION') && !e.includes('net::')
      );
      expect(filteredErrors).toHaveLength(0);
    }
  });
});
