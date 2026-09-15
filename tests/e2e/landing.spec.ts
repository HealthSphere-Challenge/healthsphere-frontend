import { expect, test } from '@playwright/test'

const authError = { error: { code: 'authentication_required', message: 'Authentication is required.', details: null, request_id: '11111111-1111-4111-8111-111111111111', retry_after_seconds: null } }

test.beforeEach(async ({ page }) => {
  await page.route('**/api/v1/auth/me', (route) => route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify(authError) }))
})

test('Get Started opens registration', async ({ page }) => {
  await page.goto('/'); await page.getByRole('link', { name: 'Get Started' }).first().click()
  await expect(page).toHaveURL(/\/register$/); await expect(page.getByRole('heading', { name: 'Start your HealthSphere journey' })).toBeVisible()
})

test('Log in opens authentication', async ({ page }) => {
  await page.goto('/'); await page.getByRole('link', { name: 'Log in' }).first().click()
  await expect(page).toHaveURL(/\/login$/); await expect(page.getByRole('heading', { name: 'Log in to HealthSphere' })).toBeVisible()
})

test('How it works reaches the real section', async ({ page }) => {
  await page.goto('/'); await page.getByRole('link', { name: 'See how it works' }).click()
  await expect(page).toHaveURL(/#how-it-works$/); await expect(page.getByRole('heading', { name: 'A clear path from recording to understanding.' })).toBeVisible()
})

for (const width of [1440, 1024, 768, 390]) test(`landing reflows at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 }); await page.goto('/')
  await expect(page.getByRole('heading', { name: /Understand your health/ })).toBeVisible()
  await expect(page.locator('img[alt="Adult at home holding a mug."]')).toBeVisible()
  expect(await page.evaluate<boolean>('document.documentElement.scrollWidth <= document.documentElement.clientWidth')).toBe(true)
  if (width <= 768) { const menu = page.getByRole('button', { name: 'Menu' }); await menu.click(); await expect(menu).toHaveAttribute('aria-expanded', 'true'); await page.keyboard.press('Escape'); await expect(menu).toHaveAttribute('aria-expanded', 'false') }
})
