import { test, expect } from '@playwright/test';

test.describe('Task Manager E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
  });

  test('should add, complete, filter and delete a task', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    const addButton = page.getByRole('button', { name: 'Add' });

    // Add task
    await input.fill('Buy milk');
    await addButton.click();
    await expect(page.getByText('Buy milk')).toBeVisible();

    // Verify counts on tabs
    await expect(page.getByRole('tab', { name: /All/ })).toContainText('1');
    await expect(page.getByRole('tab', { name: /To Do/ })).toContainText('1');
    await expect(page.getByRole('tab', { name: /Done/ })).toContainText('0');

    // Complete task
    await page.locator('.task-item').getByRole('button', { name: '' }).first().click();
    await expect(page.locator('.task-item.completed')).toContainText('Buy milk');

    // Filter: To Do should be empty
    await page.getByRole('tab', { name: 'To Do' }).click();
    await expect(page.getByText('Nothing here yet.')).toBeVisible();

    // Filter: Done should show completed task
    await page.getByRole('tab', { name: 'Done' }).click();
    await expect(page.getByText('Buy milk')).toBeVisible();

    // Delete task
    await page.locator('.task-item .delete').click();
    await expect(page.getByText('Buy milk')).not.toBeVisible();
    await expect(page.getByText('Nothing here yet.')).toBeVisible();
  });

  test('should persist tasks after reload', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Persistent task');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.getByText('Persistent task')).toBeVisible();

    await page.reload();
    await expect(page.getByText('Persistent task')).toBeVisible();
  });
});
