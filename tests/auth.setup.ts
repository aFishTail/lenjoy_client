import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/signin');
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('lenjoy123!@#');
//   await page.getByRole('button', { name: 'Sign in' }).click();
  // Wait until the page receives the cookies.
  //
  await expect(page.getByTestId('user-menu')).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});