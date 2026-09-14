import { expect, test, type Page } from '@playwright/test'

const account = { user: { id: '11111111-1111-4111-8111-111111111111', email: 'sam@example.com', display_name: 'Sam Rivera', created_at: '2026-09-14T10:00:00Z' }, profile: { id: '22222222-2222-4222-8222-222222222222', date_of_birth: '1990-04-12', sex_at_birth: null, height_cm: 175, allergies: [], medications: [], medical_conditions: [], activity_level: null, typical_sleep_minutes: null, smoking_status: null, age_years: 36, latest_weight: null, bmi: null, updated_at: '2026-09-14T10:00:00Z' }, csrf_token: 'test-csrf' }
const heartRate = { id: '33333333-3333-4333-8333-333333333333', metric: 'heart_rate', value: 71, unit: 'bpm', context: null, measured_at: '2026-09-14T09:00:00Z', recorded_at: '2026-09-14T09:01:00Z', source: 'manual', note: null }
const assessment = { id: '44444444-4444-4444-8444-444444444444', status: 'completed', result: { target_id: 'incident_essential_hypertension_5y_v1', feature_schema_version: 'hypertension_features_v1', model_version: 'hypertension_5y_v1.0.0', preprocessing_version: 'hypertension_preprocessing_v1', prediction_horizon_days: 1825, score: 0.42, score_type: 'uncalibrated_experimental_probability_estimate', calibrated: false, data_source_type: 'synthetic_model' }, reason: null, created_at: '2026-09-14T10:00:00Z' }

async function authenticated(page: Page, populated = false) {
  await page.route('**/api/v1/auth/me', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(account) }))
  await page.route('**/api/v1/dashboard', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ generated_at: '2026-09-14T10:00:00Z', latest_measurements: { heart_rate: populated ? heartRate : null, blood_pressure: null, weight: null, bmi: null, blood_glucose: null, sleep_duration: null, physical_activity_duration: null }, latest_assessment: null }) }))
  await page.route('**/api/v1/measurements', async (route) => {
    if (route.request().method() === 'POST') await route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify(heartRate) })
    else await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: populated ? [heartRate] : [], next_cursor: null }) })
  })
  await page.route('**/api/v1/assessments', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: [], next_cursor: null }) }))
}

test('dashboard renders truthful health and assessment empty states', async ({ page }) => {
  await authenticated(page); await page.goto('/app')
  await expect(page.getByRole('heading', { name: 'Start your health record' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'No assessment yet' })).toBeVisible()
  await expect(page.getByText(/chance of hypertension|low risk|high risk/i)).toHaveCount(0)
})

test('runs an assessment through the backend with no feature payload', async ({ page }) => {
  await authenticated(page, true); let body: string | null = 'unset'; let csrf: string | undefined
  await page.unroute('**/api/v1/assessments')
  await page.route('**/api/v1/assessments', async (route) => {
    if (route.request().method() === 'POST') { body = route.request().postData(); csrf = route.request().headers()['x-csrf-token']; await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(assessment) }) }
    else await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: [assessment], next_cursor: null }) })
  })
  await page.goto('/app'); await page.getByRole('button', { name: 'Run assessment' }).click()
  await expect(page.getByLabel('Experimental model score 42 out of 100')).toBeVisible()
  expect(body).toBeNull(); expect(csrf).toBe('test-csrf')
  await expect(page.getByText('Not clinically calibrated').first()).toBeVisible()
  await expect(page.getByText(/synthetic Synthea health records/i)).toBeVisible()
})

test('shows insufficient data and links to the existing blood pressure entry', async ({ page }) => {
  await authenticated(page)
  await page.unroute('**/api/v1/assessments')
  await page.route('**/api/v1/assessments', (route) => route.request().method() === 'POST' ? route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: assessment.id, status: 'insufficient_data', result: null, reason: { code: 'minimum_inputs_missing', missing_fields: ['systolic', 'diastolic'] }, created_at: assessment.created_at }) }) : route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: [], next_cursor: null }) }))
  await page.goto('/app'); await page.getByRole('button', { name: 'Run assessment' }).click()
  await expect(page.getByRole('link', { name: 'Add blood pressure' })).toBeVisible(); await expect(page.getByText(/\/ 100/)).toHaveCount(0)
  await page.getByRole('link', { name: 'Add blood pressure' }).click(); await expect(page.getByLabel('Diastolic (mmHg)')).toBeVisible()
})

test('dashboard and history show real returned measurements', async ({ page }) => {
  await authenticated(page, true); await page.goto('/app')
  await expect(page.getByText('71', { exact: false }).first()).toBeVisible()
  await page.getByRole('link', { name: 'My health' }).first().click()
  await expect(page.getByRole('heading', { name: 'Measurement history' })).toBeVisible()
  await expect(page.getByText('71', { exact: false })).toBeVisible()
})

test('add measurement validates and submits canonical data with CSRF', async ({ page }) => {
  await authenticated(page); let requestBody: Record<string, unknown> | undefined; let csrf: string | undefined
  await page.unroute('**/api/v1/measurements')
  await page.route('**/api/v1/measurements', async (route) => {
    if (route.request().method() === 'POST') { requestBody = route.request().postDataJSON() as Record<string, unknown>; csrf = route.request().headers()['x-csrf-token']; await route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify(heartRate) }) }
    else await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: [], next_cursor: null }) })
  })
  await page.goto('/app/measurements?add=1'); await page.getByRole('button', { name: 'Save measurement' }).click()
  await expect(page.getByText('Enter a value greater than zero.')).toBeVisible()
  await page.getByLabel('Heart rate (bpm)').fill('71'); await page.getByRole('button', { name: 'Save measurement' }).click()
  await expect.poll(() => requestBody?.metric).toBe('heart_rate'); expect(requestBody?.unit).toBe('bpm'); expect(csrf).toBe('test-csrf')
})

for (const width of [1440, 1024, 768, 390]) test(`dashboard reflows at ${width}px`, async ({ page }) => {
  await authenticated(page, true); await page.setViewportSize({ width, height: 900 }); await page.goto('/app')
  await expect(page.getByRole('heading', { name: /Good to see you/ })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Health risk assessment' })).toBeVisible()
  expect(await page.evaluate<boolean>('document.documentElement.scrollWidth <= document.documentElement.clientWidth')).toBe(true)
})
