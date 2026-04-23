import { test, expect } from '@playwright/test'

async function clearTasks() {
  const res = await fetch('http://localhost:3000/api/tasks')
  const tasks = await res.json()
  for (const t of tasks) {
    await fetch(`http://localhost:3000/api/tasks/${t.id}`, { method: 'DELETE' })
  }
}

test.describe.configure({ mode: 'serial' })

test.describe('ToDo App', () => {
  test.beforeEach(async ({ page }) => {
    await clearTasks()
    await page.goto('/')
  })

  test('user can add a task', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('Buy groceries')
    await page.getByRole('button', { name: 'Add' }).click()
    await expect(page.getByText('Buy groceries')).toBeVisible()
  })

  test('user can mark a task as completed and see it in Done filter', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('Exercise')
    await page.getByRole('button', { name: 'Add' }).click()
    await expect(page.getByText('Exercise')).toBeVisible()

    const taskRow = page.locator('li').filter({ hasText: 'Exercise' })
    await taskRow.getByRole('checkbox').click()
    await page.getByRole('button', { name: 'Done' }).click()

    await expect(taskRow).toBeVisible()
    await page.getByRole('button', { name: 'ToDo' }).click()
    await expect(taskRow).not.toBeVisible()
  })

  test('user can edit a task inline', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('Read book')
    await page.getByRole('button', { name: 'Add' }).click()
    await expect(page.getByText('Read book')).toBeVisible()

    await page.getByText('Read book').dblclick()
    const input = page.locator('li input[type="text"]').first()
    await input.fill('Read magazine')
    await page.getByRole('button', { name: 'Save' }).click()

    await expect(page.getByText('Read magazine')).toBeVisible()
  })

  test('user can delete a task', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('Temporary')
    await page.getByRole('button', { name: 'Add' }).click()
    await expect(page.getByText('Temporary')).toBeVisible()

    const taskRow = page.locator('li').filter({ hasText: 'Temporary' })
    await taskRow.getByRole('button', { name: 'Delete' }).click()
    await expect(page.getByText('Temporary')).not.toBeVisible()
  })

  test('filter tabs show correct counts', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('Task A')
    await page.getByRole('button', { name: 'Add' }).click()
    await expect(page.getByRole('button', { name: /All/ })).toContainText('1')

    await page.getByPlaceholder('What needs to be done?').fill('Task B')
    await page.getByRole('button', { name: 'Add' }).click()
    await expect(page.getByRole('button', { name: /All/ })).toContainText('2')

    const taskRow = page.locator('li').filter({ hasText: 'Task A' })
    await taskRow.getByRole('checkbox').click()
    await expect(page.getByRole('button', { name: /Done/ })).toContainText('1')
    await expect(page.getByRole('button', { name: /ToDo/ })).toContainText('1')
  })
})
