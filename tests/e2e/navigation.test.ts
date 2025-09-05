import { test, expect } from '@playwright/test';

test('Navigation works correctly', async ({ page }) => {
  await page.goto('/');
  
  // Test navigation links

  await page.click('text=About');
  await expect(page).toHaveURL('/about');
  
  await page.click('text=Home');
  await expect(page).toHaveURL('/');
});

test('Home page shows posts', async ({ page }) => {
  await page.goto('/');
  
  // Should have page title
  await expect(page.locator('h1')).toContainText('All Posts');
  
  // Should have post previews
  const posts = page.locator('.post-preview');
  await expect(posts.first()).toBeVisible();
});

test('Individual post navigation works', async ({ page }) => {
  await page.goto('/');
  
  // Click first post link if posts exist
  const firstPost = page.locator('.post-preview a').first();
  if (await firstPost.isVisible()) {
    await firstPost.click();
    
    // Should be on a post page with content
    await expect(page.locator('.post-content')).toBeVisible();
    await expect(page.locator('.post-header h1')).toBeVisible();
  }
});


test('About page renders', async ({ page }) => {
  await page.goto('/about');
  
  // Should have about content
  await expect(page.locator('h1')).toContainText('About Me');
  await expect(page.locator('.about-content')).toBeVisible();
});

test('404 handling', async ({ page }) => {
  const response = await page.goto('/nonexistent-page');
  expect(response?.status()).toBe(404);
});