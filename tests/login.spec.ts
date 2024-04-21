import { test, expect } from '@playwright/test';

test('has title 2', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
   expect(await page.getByTestId('logo-title').innerText()).toBe('乐享');
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
