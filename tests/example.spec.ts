import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/', { timeout: 180000 });
  await expect(page).toHaveTitle(/GEESIX/i);
});


test('search filters products', async ({ page }) => {
  await page.goto('/customer/collection', { timeout: 180000 });
  await page.fill('input[placeholder="Search products..."]', 'laptop');
  await expect(page.getByText('pieces')).toBeVisible({ timeout: 60000 });
});

test('collection page loads and shows products', async ({ page }) => {
  await page.goto('/customer/collection', { timeout: 180000 });
  await expect(page.getByRole('heading', { name: 'New Arrivals' })).toBeVisible({ timeout: 60000 });
  await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 60000 });
});

test('add to cart works', async ({ page }) => {
  await page.goto('/customer/products/193', { timeout: 180000 });
  await expect(page.getByText('Add to Bag')).toBeVisible({ timeout: 60000 });
  await page.getByText('Add to Bag').click();
  await page.goto('/cart', { timeout: 180000 });
  await expect(page.getByText('Your cart is empty')).not.toBeVisible({ timeout: 60000 });
});


test('empty cart shows message', async ({ page }) => {
  await page.goto('/cart', { timeout: 180000 });
  await expect(page.getByText('Your cart is empty')).toBeVisible({ timeout: 60000 });
});

test('non-admin cannot access admin page', async ({ page }) => {
  await page.goto('/admin', { timeout: 180000 });
  await expect(page).not.toHaveURL('/admin');
});