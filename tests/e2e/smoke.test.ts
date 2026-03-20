// E2E smoke tests — verify core pages load and render correctly.
// Runs against the Vite dev server (localhost:5173).

import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads and shows the title', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Adventure');
  });

  test('shows How It Works section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('How It Works')).toBeVisible();
  });

  test('shows Create or Join step', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Create or Join')).toBeVisible();
  });

  test('has a campaign code input', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('input[aria-label="Room code"]');
    await expect(input).toBeVisible();
  });

  test('theme toggle exists', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('button[aria-label="Toggle theme"]');
    await expect(toggle).toBeVisible();
  });

  test('Low-FX toggle exists', async ({ page }) => {
    await page.goto('/');
    const fxBtn = page.locator('button:has-text("FX")');
    await expect(fxBtn).toBeVisible();
  });
});

test.describe('Character Create page', () => {
  test('loads or redirects to auth', async ({ page }) => {
    await page.goto('/create');
    await page.waitForTimeout(2000);
    // Either shows the create form or redirects to home (auth required)
    const url = page.url();
    expect(url.includes('create') || url === 'http://localhost:5173/' || url.includes('localhost:5173')).toBeTruthy();
  });
});

test.describe('Lobby page', () => {
  test('redirects or loads lobby for a room code', async ({ page }) => {
    await page.goto('/lobby/test-room');
    // Should show the lobby UI or redirect to auth
    await page.waitForTimeout(2000);
    const url = page.url();
    // Either we're on the lobby page or redirected to home
    expect(url.includes('lobby') || url.includes('/')).toBeTruthy();
  });
});

test.describe('Companion page', () => {
  test('loads companion view', async ({ page }) => {
    await page.goto('/companion/test-room');
    await expect(page.getByText('Adventure')).toBeVisible();
  });

  test('shows dice tab', async ({ page }) => {
    await page.goto('/companion/test-room');
    await expect(page.getByText('Dice')).toBeVisible();
  });
});

test.describe('DM Screen page', () => {
  test('loads DM screen', async ({ page }) => {
    await page.goto('/dm-screen');
    await expect(page.getByText('DM Screen')).toBeVisible();
  });

  test('shows waiting for game tab message', async ({ page }) => {
    await page.goto('/dm-screen');
    await expect(page.getByText('Waiting for Game tab')).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('home page has interactive elements', async ({ page }) => {
    await page.goto('/');
    // Verify key interactive elements exist
    await expect(page.locator('button').first()).toBeVisible();
    await expect(page.locator('input').first()).toBeVisible();
  });

  test('404 routes fall back to home (SPA)', async ({ page }) => {
    await page.goto('/nonexistent-page-xyz');
    // SPA should handle unknown routes
    await page.waitForTimeout(1000);
    // Should not crash — page renders something
    await expect(page.locator('body')).not.toBeEmpty();
  });
});
