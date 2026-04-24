# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: topics.spec.ts >> topics page >> should filter by category
- Location: tests\e2e\topics.spec.ts:16:3

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.topic-card')
Expected: 5
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('.topic-card')
    9 × locator resolved to 0 elements
      - unexpected value "0"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('topics page', () => {
  4  |   test('should render topic cards', async ({ page }) => {
  5  |     await page.goto('/topics');
  6  |     await expect(page.locator('.topic-card')).toHaveCount(10);
  7  |   });
  8  | 
  9  |   test('should render filter controls', async ({ page }) => {
  10 |     await page.goto('/topics');
  11 |     // Filter bar has multiple filter sections (category, engine, etc.)
  12 |     const filters = page.locator('.filter-section');
  13 |     await expect(filters).toHaveCount(4);
  14 |   });
  15 | 
  16 |   test('should filter by category', async ({ page }) => {
  17 |     await page.goto('/topics');
  18 |     await expect(page.locator('.topic-card')).toHaveCount(10);
  19 |     
  20 |     // Click Algorithms tab in Category filter (first filter section)
  21 |     const categorySection = page.locator('.filter-section').first();
  22 |     const algosLink = categorySection.locator('a').filter({ hasText: 'Algorithms' }).first();
  23 |     await algosLink.click();
  24 |     
> 25 |     await expect(page.locator('.topic-card')).toHaveCount(5);
     |                                               ^ Error: expect(locator).toHaveCount(expected) failed
  26 |   });
  27 | });
```