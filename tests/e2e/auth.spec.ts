import { expect, test } from '@playwright/test'

const completeAccount = { user: { id: '11111111-1111-4111-8111-111111111111', email: 'sam@example.com', display_name: 'Sam Rivera', created_at: '2026-09-15T10:00:00Z' }, profile: { id: '22222222-2222-4222-8222-222222222222', date_of_birth: '1990-04-12', sex_at_birth: null, height_cm: 175, allergies: [], medications: [], medical_conditions: [], activity_level: null, typical_sleep_minutes: null, smoking_status: null, age_years: 36, latest_weight: null, bmi: null, updated_at: '2026-09-15T10:00:00Z' }, csrf_token: 'test-csrf' }
const newAccount = { ...completeAccount, profile: { ...completeAccount.profile, date_of_birth: null, age_years: null } }

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

test('login submits credentials and enters the authenticated application', async ({ page }) => {
  let requestBody: unknown
  await page.route('**/api/v1/auth/login', async (route) => {
    requestBody = route.request().postDataJSON()
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(completeAccount) })
  })
  await page.goto('/login')
  await page.getByLabel('Email address').fill('sam@example.com')
  await page.getByLabel('Password').fill('a-secure-password')
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page).toHaveURL(/\/app$/)
  expect(requestBody).toEqual({ email: 'sam@example.com', password: 'a-secure-password' })
})

test('registration submits the existing payload and continues to onboarding', async ({ page }) => {
  let requestBody: unknown
  await page.route('**/api/v1/auth/register', async (route) => {
    requestBody = route.request().postDataJSON()
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(newAccount) })
  })
  await page.goto('/register')
  await page.getByLabel('Full name').fill('Sam Rivera')
  await page.getByLabel('Email address').fill('sam@example.com')
  await page.getByLabel('Password', { exact: true }).fill('a-secure-password')
  await page.getByLabel('Confirm password').fill('a-secure-password')
  await page.getByRole('button', { name: 'Create account' }).click()
  await expect(page).toHaveURL(/\/onboarding\/about$/)
  expect(requestBody).toEqual({ display_name: 'Sam Rivera', email: 'sam@example.com', password: 'a-secure-password' })
})

test('an authenticated session restores the protected application route', async ({ page }) => {
  await page.unroute('**/api/v1/auth/me')
  await page.route('**/api/v1/auth/me', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(completeAccount) }))
  await page.goto('/app')
  await expect(page).toHaveURL(/\/app$/)
  await expect(page.getByText('Sam Rivera', { exact: true })).toBeVisible()
})

test('a protected route redirects an unauthenticated visitor to login', async ({ page }) => {
  await page.goto('/app')
  await expect(page).toHaveURL(/\/login$/)
  await expect(page.getByRole('heading', { name: 'Log in to HealthSphere' })).toBeVisible()
})

test('a server error remains visible and keeps the login form usable', async ({ page }) => {
  await page.route('**/api/v1/auth/login', (route) => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: { code: 'service_unavailable', message: 'Please try again shortly.', details: null, request_id: '11111111-1111-4111-8111-111111111111', retry_after_seconds: null } }) }))
  await page.goto('/login')
  await page.getByLabel('Email address').fill('sam@example.com')
  await page.getByLabel('Password').fill('a-secure-password')
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByText('Please try again shortly.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Log in' })).toBeEnabled()
})

test('login announces loading and disables repeat submission', async ({ page }) => {
  await page.route('**/api/v1/auth/login', () => new Promise(() => undefined))
  await page.goto('/login')
  await page.getByLabel('Email address').fill('sam@example.com')
  await page.getByLabel('Password').fill('a-secure-password')
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByRole('button', { name: /Log in Loading/ })).toBeDisabled()
  await expect(page.getByRole('button', { name: /Log in Loading/ })).toHaveAttribute('aria-busy', 'true')
})

for (const route of ['login', 'register']) {
  for (const width of [1440, 1024, 768, 390]) {
    test(`${route} reflows without horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 }); await page.goto(`/${route}`)
      await expect(page.locator('body')).toBeVisible()
      await expect(page.getByLabel('Email address')).toBeVisible()
      await expect(page.locator('.auth-visual')).toBeVisible({ visible: width > 480 })
      expect(await page.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth')).toBe(true)
    })
  }
}
