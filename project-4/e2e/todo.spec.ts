import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test('adds and completes a task', async ({ page }) => {
	await page.fill('input[type="text"]', 'Test E2E task');
	await page.click('button:has-text("Add")');
	await expect(page.locator('text=Test E2E task')).toBeVisible();

	await page.click('li:has-text("Test E2E task") input[type="checkbox"]');
	await expect(page.locator('li:has-text("Test E2E task") span')).toHaveClass(/line-through/);
});

test('filters tasks by status', async ({ page }) => {
	await page.fill('input[type="text"]', 'Active task');
	await page.click('button:has-text("Add")');
	await page.fill('input[type="text"]', 'Done task');
	await page.click('button:has-text("Add")');
	await page.click('li:has-text("Done task") input[type="checkbox"]');

	await page.click('button:has-text("Done")');
	await expect(page.locator('text=Done task')).toBeVisible();
	await expect(page.locator('text=Active task')).toBeHidden();

	await page.click('button:has-text("To Do")');
	await expect(page.locator('text=Active task')).toBeVisible();
	await expect(page.locator('text=Done task')).toBeHidden();
});

test('deletes a task', async ({ page }) => {
	await page.fill('input[type="text"]', 'To delete');
	await page.click('button:has-text("Add")');
	await page.click('li:has-text("To delete") button:has-text("Delete")');
	await expect(page.locator('text=To delete')).toBeHidden();
});
