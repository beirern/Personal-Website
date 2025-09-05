import { test, expect } from '@playwright/test';

test('Multi-page navigation works correctly', async ({ page }) => {
  await page.goto('/');
  
  // Test navigation to Work page
  await page.click('text=Work');
  await expect(page).toHaveURL('/work');
  await expect(page.locator('h1')).toContainText('Work & Experience');
  
  // Test navigation to Projects page
  await page.click('text=Projects');
  await expect(page).toHaveURL('/projects');
  await expect(page.locator('h1')).toContainText('Projects');
  
  // Test navigation to Blog page
  await page.click('text=Blog');
  await expect(page).toHaveURL('/posts');
  await expect(page.locator('h1')).toContainText('All Posts');
  
  // Test navigation back to Home
  await page.click('text=Home');
  await expect(page).toHaveURL('/');
});

test('Home page shows all preview sections', async ({ page }) => {
  await page.goto('/');
  
  // Should have main name/title
  await expect(page.locator('h1')).toContainText('Nicola Beirer');
  
  // Should have section titles
  await expect(page.locator('.section-title')).toContainText('Work');
  await expect(page.locator('.section-title')).toContainText('Projects');
  await expect(page.locator('.section-title')).toContainText('Recent Posts');
  
  // Should have about content
  await expect(page.locator('.about-content')).toBeVisible();
});

test('Work page displays full resume content', async ({ page }) => {
  await page.goto('/work');
  
  // Should have work page content
  await expect(page.locator('h1')).toContainText('Work & Experience');
  await expect(page.locator('.page-description')).toBeVisible();
  
  // Should have work sections
  await expect(page.locator('text=Current Position')).toBeVisible();
  await expect(page.locator('text=Technical Skills')).toBeVisible();
  
  // Should have skills grid
  await expect(page.locator('.skills-grid')).toBeVisible();
});

test('Projects page displays all projects', async ({ page }) => {
  await page.goto('/projects');
  
  // Should have projects page content
  await expect(page.locator('h1')).toContainText('Projects');
  await expect(page.locator('.page-description')).toBeVisible();
  
  // Should have project sections
  await expect(page.locator('text=Featured Projects')).toBeVisible();
  
  // Should have project cards
  await expect(page.locator('.project-card')).toBeVisible();
  
  // Should have GitHub link
  await expect(page.locator('.github-link')).toBeVisible();
});

test('Blog posts navigation works', async ({ page }) => {
  await page.goto('/');
  
  // Check if there are blog posts in the blog section
  const blogSection = page.locator('.section').last(); // Last section should be blog
  
  // If there are posts, test navigation
  const posts = blogSection.locator('.post-card');
  const postCount = await posts.count();
  
  if (postCount > 0) {
    // Click first post link
    const firstPostLink = posts.first().locator('a').first();
    await firstPostLink.click();
    
    // Should be on a post page
    await expect(page).toHaveURL(/\/posts\/.+/);
  }
  
  // Test "View All Posts" link
  await page.goto('/');
  await page.click('text=View All Posts');
  await expect(page).toHaveURL('/posts');
});

test('Posts page works', async ({ page }) => {
  await page.goto('/posts');
  
  // Should have posts page title
  await expect(page.locator('h1')).toContainText('All Posts');
  
  // Should have page description
  await expect(page.locator('.page-description')).toBeVisible();
});

test('CTA links work correctly', async ({ page }) => {
  await page.goto('/');
  
  // Test "View Full Resume" link from Work section
  await page.click('text=View Full Resume');
  await expect(page).toHaveURL('/work');
  
  // Go back and test "View All Projects" link
  await page.goto('/');
  await page.click('text=View All Projects');
  await expect(page).toHaveURL('/projects');
});

test('Theme toggle works', async ({ page }) => {
  await page.goto('/');
  
  // Should have theme toggle button
  const themeToggle = page.locator('#theme-toggle');
  await expect(themeToggle).toBeVisible();
  
  // Click theme toggle - should change theme
  await themeToggle.click();
  await page.waitForTimeout(200); // Wait for theme transition
  
  // Click again to toggle back
  await themeToggle.click();
  await page.waitForTimeout(200);
});

test('404 handling', async ({ page }) => {
  const response = await page.goto('/nonexistent-page');
  expect(response?.status()).toBe(404);
});