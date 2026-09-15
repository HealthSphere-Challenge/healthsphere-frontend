import { expect, test, type Page } from '@playwright/test'

const account = { user: { id: '11111111-1111-4111-8111-111111111111', email: 'sam@example.com', display_name: 'Sam Rivera', created_at: '2026-09-15T10:00:00Z' }, profile: { id: '22222222-2222-4222-8222-222222222222', date_of_birth: '1990-04-12', sex_at_birth: null, height_cm: 175, allergies: [], medications: [], medical_conditions: [], activity_level: null, typical_sleep_minutes: null, smoking_status: null, age_years: 36, latest_weight: null, bmi: null, updated_at: '2026-09-15T10:00:00Z' }, csrf_token: 'test-csrf' }
const id = '33333333-3333-4333-8333-333333333333'
const stamp = '2026-09-15T10:00:00Z'
const empty = { id, created_at: stamp, updated_at: stamp, expires_at: '2026-10-15T10:00:00Z', messages: [] }

async function setup(page: Page, responseType: 'answer' | 'abstention' | 'urgent' = 'answer') {
  await page.route('**/api/v1/auth/me', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(account) }))
  await page.route('**/api/v1/conversations', (route) => route.request().method() === 'POST' ? route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify(empty) }) : route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ items: [], next_cursor: null }) }))
  await page.route(`**/api/v1/conversations/${id}/messages`, (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ...empty, messages: [{ id: '44444444-4444-4444-8444-444444444444', role: 'user', content: 'What does blood pressure mean?', response_type: null, sources: [], safety: null, uncertainty: null, provenance: null, created_at: stamp }, { id: '55555555-5555-4555-8555-555555555555', role: 'assistant', content: responseType === 'urgent' ? 'Seek urgent medical help now.' : responseType === 'abstention' ? 'I do not have enough reliable information.' : 'Blood pressure measures force against artery walls.', response_type: responseType, sources: responseType === 'answer' ? [{ source_id: 's1', title: 'MedQuAD blood pressure', url: 'https://example.test/source' }] : [], safety: { urgent: responseType === 'urgent', reason: responseType === 'urgent' ? 'urgent symptoms' : null }, uncertainty: null, provenance: {}, created_at: stamp }] }) }))
}

test('asks through backend and renders grounded sources', async ({ page }) => {
  await setup(page); let body: Record<string, unknown> | undefined
  await page.unroute(`**/api/v1/conversations/${id}/messages`)
  await page.route(`**/api/v1/conversations/${id}/messages`, async (route) => { body = route.request().postDataJSON() as Record<string, unknown>; await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ...empty, messages: [{ id: '44444444-4444-4444-8444-444444444444', role: 'user', content: String(body.content), response_type: null, sources: [], safety: null, uncertainty: null, provenance: null, created_at: stamp }, { id: '55555555-5555-4555-8555-555555555555', role: 'assistant', content: 'Blood pressure measures force against artery walls.', response_type: 'answer', sources: [{ source_id: 's1', title: 'MedQuAD blood pressure', url: 'https://example.test/source' }], safety: { urgent: false, reason: null }, uncertainty: null, provenance: {}, created_at: stamp }] }) })
  })
  await page.goto('/app/assistant'); await page.getByLabel('Ask HealthSphere Assistant').fill('What does blood pressure mean?'); await page.getByRole('button', { name: 'Send' }).click()
  await expect(page.getByText(/force against artery walls/)).toBeVisible(); await expect(page.getByRole('heading', { name: 'Sources' })).toBeVisible(); expect(body).toEqual({ content: 'What does blood pressure mean?' })
})

test('assessment handoff sends only message and assessment ID', async ({ page }) => {
  await setup(page); let body: Record<string, unknown> | undefined
  await page.route(`**/api/v1/conversations/${id}/messages`, async (route) => { body = route.request().postDataJSON() as Record<string, unknown>; await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ...empty, messages: [{ id: '55555555-5555-4555-8555-555555555555', role: 'assistant', content: 'This saved assessment is experimental.', response_type: 'answer', sources: [{ source_id: 'assessment:v1', title: 'Saved HealthSphere assessment', url: null }], safety: { urgent: false, reason: null }, uncertainty: 'Informational only.', provenance: {}, created_at: stamp }] }) }) })
  await page.goto('/app/assistant?assessment=66666666-6666-4666-8666-666666666666'); await page.getByRole('button', { name: 'Send' }).click()
  await expect.poll(() => body).toEqual({ content: 'How should I understand my latest HealthSphere assessment?', assessment_id: '66666666-6666-4666-8666-666666666666' })
  await expect(page.getByText('Saved HealthSphere assessment')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Saved HealthSphere assessment' })).toHaveCount(0)
})

test('application-data response has no empty Sources section', async ({ page }) => {
  await setup(page)
  await page.unroute(`**/api/v1/conversations/${id}/messages`)
  await page.route(`**/api/v1/conversations/${id}/messages`, (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ...empty, messages: [{ id: '55555555-5555-4555-8555-555555555555', role: 'assistant', content: 'Your latest saved blood pressure is available.', response_type: 'answer', sources: [], safety: { urgent: false, reason: null }, uncertainty: null, provenance: { source_type: 'application_data' }, created_at: stamp }] }) }))
  await page.goto('/app/assistant'); await page.getByLabel('Ask HealthSphere Assistant').fill('What is my latest blood pressure?'); await page.getByRole('button', { name: 'Send' }).click()
  await expect(page.getByRole('article').getByText(/latest saved blood pressure/)).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Sources' })).toHaveCount(0)
})

for (const state of ['abstention', 'urgent'] as const) test(`renders ${state} safely`, async ({ page }) => { await setup(page, state); await page.goto('/app/assistant'); await page.getByLabel('Ask HealthSphere Assistant').fill('Help'); await page.getByRole('button', { name: 'Send' }).click(); await expect(page.getByText(state === 'urgent' ? /urgent medical help/ : /enough reliable information/)).toBeVisible() })

for (const width of [1440, 1024, 768, 390]) test(`assistant reflows at ${width}px`, async ({ page }) => { await setup(page); await page.setViewportSize({ width, height: 900 }); await page.goto('/app/assistant'); await expect(page.getByRole('heading', { name: 'HealthSphere Assistant' })).toBeVisible(); expect(await page.evaluate<boolean>('document.documentElement.scrollWidth <= document.documentElement.clientWidth')).toBe(true) })
