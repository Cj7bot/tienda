import { test, expect } from '@playwright/test';

test.describe('Registration Form', () => {
  test('should allow a user to register successfully', async ({ page }) => {
    
    await page.route('**/api/register', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Registration successful' }),
      });
    });

    
    await page.goto('/register');

    
    await page.locator('#nombre').fill('Test User');
    await page.locator('#email').fill('test.user@example.com');
    await page.locator('#password').fill('SuperSegura123$');
    await page.locator('#confirmPassword').fill('SuperSegura123$');

    
    await page.getByRole('button', { name: 'Registrarse' }).click();

    
    const successMessage = page.locator('div[role="status"]');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText('¡Registro exitoso!');

    
    await page.waitForURL('**/login', { timeout: 3000 });
    await expect(page).toHaveURL(/.*login/);
  });
});
