import { test, expect } from '@playwright/test';

test.describe('Layout Recreation', () => {
  test('homepage renders all key sections', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('header-banner')).toBeVisible();
    await expect(page.getByTestId('main-navigation')).toBeVisible();
    await expect(page.getByTestId('main-article')).toBeVisible();
    await expect(page.getByTestId('image-gallery')).toBeVisible();
    await expect(page.getByTestId('sidebar')).toBeVisible();
    await expect(page.getByTestId('site-footer')).toBeVisible();
    await expect(page.getByTestId('analog-clock')).toBeVisible();
  });

  test('navigation links are present', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByTestId('main-navigation');
    const isMobile = await nav.locator('ul.hidden').isVisible().catch(() => false);
    if (!isMobile) {
      // Mobile: open hamburger menu first
      await nav.getByRole('button', { name: 'Menu' }).click();
    }
    // Duplicate labels exist per original design; assert at least one of each is visible
    await expect(nav.getByRole('link', { name: 'Firma' }).first()).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Informacje' }).first()).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Oferta' }).first()).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Promocje' }).first()).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Radość zakupów' }).first()).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Mapa strony' }).first()).toBeVisible();
  });

  test('sidebar links are present', async ({ page }) => {
    await page.goto('/');
    const sidebar = page.getByTestId('sidebar');
    await expect(sidebar.getByRole('link', { name: 'E-sklep' })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'E-multimedia' })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Kuchnia Polki' })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Gazetka' })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Arabeska' })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Pióra' })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Trafika' })).toBeVisible();
  });

  test('search input accepts text', async ({ page }) => {
    await page.goto('/');
    const sidebar = page.getByTestId('sidebar');
    const input = sidebar.getByRole('textbox', { name: 'Szukaj' });
    await input.fill('warzywa');
    await expect(input).toHaveValue('warzywa');
  });

  test('newsletter input accepts email', async ({ page }) => {
    await page.goto('/');
    const input = page.getByRole('textbox', { name: 'Email do newslettera' });
    await input.fill('test@example.com');
    await expect(input).toHaveValue('test@example.com');
  });

  test('gallery buttons work', async ({ page }) => {
    await page.goto('/');
    const next = page.getByRole('button', { name: 'Następne zdjęcie' });
    const prev = page.getByRole('button', { name: 'Poprzednie zdjęcie' });
    await next.click();
    await prev.click();
    await expect(page.getByTestId('image-gallery')).toBeVisible();
  });

  test('mobile menu toggles', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const menuBtn = page.getByRole('button', { name: 'Menu' });
    await menuBtn.click();
    await expect(page.getByRole('link', { name: 'Mapa strony' })).toBeVisible();
    await menuBtn.click();
  });

  test('page is responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.getByTestId('main-article')).toBeVisible();
    await expect(page.getByTestId('sidebar')).toBeVisible();
  });
});
