import { test, expect } from '@playwright/test';

test.describe('Dark mode toggle', () => {
  test('ThemeToggle renders in header', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/');
    const toggle = await page.$('[data-testid="theme-toggle"]');
    expect(toggle).not.toBeNull();
  });

  test('Clicking toggle switches theme', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/');

    // Default should be light
    const html = await page.evaluate(() => document.documentElement.getAttribute('theme') || 'light');
    expect(html).toBe('light');

    // Click toggle to switch to dark
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(300);

    const theme = await page.evaluate(() => document.documentElement.getAttribute('theme'));
    expect(theme).toBe('dark');

    // Verify dark mode variables are applied
    const bg = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim());
    expect(bg).toBe('#0F1419');

    // Click again to switch back to light
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(300);

    const theme2 = await page.evaluate(() => document.documentElement.getAttribute('theme'));
    expect(theme2).toBe('light');
  });

  test('Dark mode persists across page navigations', async ({ page }) => {
    await page.goto('http://localhost:4321/OpenCS/');

    // Enable dark mode
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(300);

    // Navigate to a topic page
    await page.goto('http://localhost:4321/OpenCS/topics/arrays');
    await page.waitForTimeout(500);

    // Theme should persist
    const theme = await page.evaluate(() => document.documentElement.getAttribute('theme'));
    expect(theme).toBe('dark');

    // Navigate to another page
    await page.goto('http://localhost:4321/OpenCS/topics/sorting');
    await page.waitForTimeout(500);

    const theme2 = await page.evaluate(() => document.documentElement.getAttribute('theme'));
    expect(theme2).toBe('dark');
  });

  test('Both themes render without errors on all pages', async ({ page }) => {
    const pages = [
      '/OpenCS/',
      '/OpenCS/topics',
      '/OpenCS/topics/time-complexity',
      '/OpenCS/topics/arrays',
      '/OpenCS/topics/sorting',
      '/OpenCS/topics/number-systems',
      '/OpenCS/topics/binary-search-tree',
    ];

    for (const path of pages) {
      // Light mode
      await page.goto(`http://localhost:4321${path}`);
      await page.waitForTimeout(500);
      const bodyText = await page.evaluate(() => document.body.innerText.length);
      expect(bodyText).toBeGreaterThan(100);

      // Switch to dark mode
      const toggle = await page.$('[data-testid="theme-toggle"]');
      if (toggle) {
        await page.click('[data-testid="theme-toggle"]');
        await page.waitForTimeout(500);
        const bodyTextDark = await page.evaluate(() => document.body.innerText.length);
        expect(bodyTextDark).toBeGreaterThan(100);

        // Switch back
        await page.click('[data-testid="theme-toggle"]');
        await page.waitForTimeout(300);
      }
    }
  });
});
