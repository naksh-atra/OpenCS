import { test, expect } from '@playwright/test';

test.describe('Dark mode toggle', () => {
  test('Theme toggle button exists in header', async ({ page }) => {
    await page.goto('http://localhost:4321/');
    const toggle = await page.$('[data-testid="theme-toggle"]');
    expect(toggle).not.toBeNull();
  });

  test('Clicking toggle switches between light and dark', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // Click toggle to switch to dark
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(500);

    const darkBg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
    );
    expect(darkBg).toBe('#0F1419');

    // Click again to go back to light
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(500);

    const lightBg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
    );
    expect(lightBg).toBe('#FAF9F6');
  });

  test('Label shows Dark in light mode, Light in dark mode', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // Initially should show "Dark" (click to go dark)
    const label = await page.textContent('.theme-toggle-label');
    expect(label?.trim()).toBe('Dark');

    // Switch to dark
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(500);

    const darkLabel = await page.textContent('.theme-toggle-label');
    expect(darkLabel?.trim()).toBe('Light');
  });

  test('Persists across page navigation', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // Set to dark
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(500);

    // Navigate to topics
    await page.goto('http://localhost:4321/topics/time-complexity');
    await page.waitForTimeout(1000);

    // Check dark mode persisted via CSS variable
    const bg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
    );
    expect(bg).toBe('#0F1419');
  });

  test('Dark mode visual check — body background changes', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // Get light mode background
    const lightBg = await page.evaluate(() =>
      window.getComputedStyle(document.body).backgroundColor
    );

    // Switch to dark
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(500);

    // Get dark mode background
    const darkBg = await page.evaluate(() =>
      window.getComputedStyle(document.body).backgroundColor
    );

    // They should be different
    expect(darkBg).not.toBe(lightBg);
    // Dark mode should be dark (low RGB values)
    // Parse the rgb values
    const rgb = darkBg.match(/\d+/g);
    expect(rgb).not.toBeNull();
    expect(Number(rgb![0])).toBeLessThan(30);  // R should be very low
    expect(Number(rgb![1])).toBeLessThan(30);  // G should be very low
    expect(Number(rgb![2])).toBeLessThan(30);  // B should be very low
  });
});
