import { test, expect } from '@playwright/test';

test.describe('Task Manager', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('adds and displays a task', async ({ page }) => {
    const input = page.locator('input[aria-label="New task"]');
    const button = page.getByRole('button', { name: 'Add' });

    await input.fill('Buy groceries');
    await button.click();

    await expect(page.getByText('Buy groceries')).toBeVisible();
    await expect(page.getByText('1 active')).toBeVisible();
  });

  test('validates empty input', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Add' });
    await button.click();

    await expect(page.getByRole('alert')).toHaveText('Task cannot be empty');
  });

  test('toggles task completion', async ({ page }) => {
    const input = page.locator('input[aria-label="New task"]');
    const addBtn = page.getByRole('button', { name: 'Add' });

    await input.fill('Complete me');
    await addBtn.click();

    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.check();

    await expect(checkbox).toBeChecked();
    await expect(page.getByText('0 active')).toBeVisible();
    await expect(page.getByText('1 completed')).toBeVisible();
  });

  test('deletes a task', async ({ page }) => {
    const input = page.locator('input[aria-label="New task"]');
    const addBtn = page.getByRole('button', { name: 'Add' });

    await input.fill('Delete me');
    await addBtn.click();

    const deleteBtn = page.getByRole('button', { name: 'Delete task' });
    await deleteBtn.click();

    await expect(page.getByText('Delete me')).not.toBeVisible();
    await expect(page.getByText('No tasks to display.')).toBeVisible();
  });

  test('filters tasks', async ({ page }) => {
    const input = page.locator('input[aria-label="New task"]');
    const addBtn = page.getByRole('button', { name: 'Add' });

    await input.fill('Active task');
    await addBtn.click();
    await input.fill('Done task');
    await addBtn.click();

    const checkboxes = page.locator('input[type="checkbox"]');
    await checkboxes.nth(1).check();

    await page.getByRole('button', { name: 'Active' }).click();
    await expect(page.getByText('Active task')).toBeVisible();
    await expect(page.getByText('Done task')).not.toBeVisible();

    await page.getByRole('button', { name: 'Completed' }).click();
    await expect(page.getByText('Done task')).toBeVisible();
    await expect(page.getByText('Active task')).not.toBeVisible();

    await page.getByRole('button', { name: 'All' }).click();
    await expect(page.getByText('Active task')).toBeVisible();
    await expect(page.getByText('Done task')).toBeVisible();
  });

  test('persists tasks after reload', async ({ page }) => {
    const input = page.locator('input[aria-label="New task"]');
    const addBtn = page.getByRole('button', { name: 'Add' });

    await input.fill('Persistent task');
    await addBtn.click();

    await page.reload();

    await expect(page.getByText('Persistent task')).toBeVisible();
  });
});
