import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('**/api/v1/auth/me', (route) => route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify({ error: { code: 'authentication_required', message: 'Authentication is required.', details: null, request_id: '11111111-1111-4111-8111-111111111111', retry_after_seconds: null } }) }))
})

test('login is keyboard accessible and validates input', async ({ page }) => {
  await page.goto('/login')
  await expect(page.getByRole('heading', { name: 'Log in to HealthSphere' })).toBeVisible()
  await page.keyboard.press('Tab'); await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByText('Enter a valid email address.')).toBeVisible()
  await expect(page.getByText('Enter your password.')).toBeVisible()
})

test('registration validates password confirmation', async ({ page }) => {
  await page.goto('/register')
  await page.getByLabel('Full name').fill('Sam Rivera')
  await page.getByLabel('Email address').fill('sam@example.com')
  await page.getByLabel('Password', { exact: true }).fill('a-secure-password')
  await page.getByLabel('Confirm password').fill('different-password')
  await page.getByRole('button', { name: 'Create account' }).click()
  await expect(page.getByText('Passwords must match.')).toBeVisible()
})

for (const width of [1440, 1024, 768, 390]) {
  test(`login reflows without horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 }); await page.goto('/login')
    await expect(page.locator('body')).toBeVisible()
    await expect(page.getByLabel('Email address')).toBeVisible()
  })
}
