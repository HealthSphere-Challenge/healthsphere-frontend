import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axe from 'axe-core'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { setCsrfToken } from '../../lib/api'
import { AssessmentCard } from './AssessmentCard'
import { completedAssessmentFixture } from './api.test'

function renderCard() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })
  return render(<QueryClientProvider client={client}><MemoryRouter><AssessmentCard latestAssessment={null} /></MemoryRouter></QueryClientProvider>)
}

describe('assessment card', () => {
  beforeEach(() => { setCsrfToken('csrf-test') })
  afterEach(() => { vi.restoreAllMocks(); setCsrfToken() })

  it('creates without a health payload, prevents duplicate action, and renders safe completed copy', async () => {
    let resolveCreate: (value: Response) => void = () => undefined
    const createResponse = new Promise<Response>((resolve) => { resolveCreate = resolve })
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (_input, init) => init?.method === 'POST' ? createResponse : new Response(JSON.stringify({ items: [], next_cursor: null }), { status: 200 }))
    const user = userEvent.setup(); const { container } = renderCard()
    const button = await screen.findByRole('button', { name: 'Run assessment' }); await user.click(button)
    expect(button).toBeDisabled(); expect(screen.getByText('Generating assessment…')).toBeVisible()
    const [, init] = fetchMock.mock.calls.find(([, options]) => options?.method === 'POST')!
    expect(init?.body).toBeUndefined(); expect(new Headers(init?.headers).get('X-CSRF-Token')).toBe('csrf-test')
    resolveCreate(new Response(JSON.stringify(completedAssessmentFixture), { status: 200 }))
    expect(await screen.findByLabelText('Experimental model score 42 out of 100')).toBeVisible()
    expect(screen.getByText('Not clinically calibrated')).toBeVisible(); expect(screen.getByText(/synthetic Synthea health records/i)).toBeVisible()
    expect(screen.queryByText(/low|medium|high|chance of hypertension|diagnosis:/i)).not.toBeInTheDocument()
    await waitFor(async () => expect((await axe.run(container)).violations).toEqual([]))
  })

  it('shows missing blood pressure recovery without displaying zero', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation((_input, init) => Promise.resolve(new Response(JSON.stringify(init?.method === 'POST' ? { id: completedAssessmentFixture.id, status: 'insufficient_data', result: null, reason: { code: 'minimum_inputs_missing', missing_fields: ['systolic', 'diastolic'] }, created_at: completedAssessmentFixture.created_at } : { items: [], next_cursor: null }), { status: 200 })))
    renderCard(); await userEvent.click(await screen.findByRole('button', { name: 'Run assessment' }))
    expect(await screen.findByRole('link', { name: 'Add blood pressure' })).toHaveAttribute('href', '/app/measurements?add=1&metric=blood_pressure')
    expect(screen.queryByText('0 / 100')).not.toBeInTheDocument()
  })

  it.each([['ineligible', /adults aged 18 and over/i], ['unavailable', /temporarily unavailable/i]] as const)('renders the %s state safely', async (status, message) => {
    vi.spyOn(globalThis, 'fetch').mockImplementation((_input, init) => Promise.resolve(new Response(JSON.stringify(init?.method === 'POST' ? { id: completedAssessmentFixture.id, status, result: null, reason: { code: status, missing_fields: null }, created_at: completedAssessmentFixture.created_at } : { items: [], next_cursor: null }), { status: 200 })))
    renderCard(); await userEvent.click(await screen.findByRole('button', { name: 'Run assessment' }))
    expect(await screen.findByText(message)).toBeVisible(); expect(screen.queryByText(/\/ 100/)).not.toBeInTheDocument()
  })

  it('keeps the saved result and retries a canonical service failure', async () => {
    const error = { error: { code: 'ai_unavailable', message: 'Internal detail', details: null, request_id: '55555555-5555-4555-8555-555555555555', retry_after_seconds: null } }
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation((_input, init) => Promise.resolve(init?.method === 'POST' ? new Response(JSON.stringify(error), { status: 503 }) : new Response(JSON.stringify({ items: [completedAssessmentFixture], next_cursor: null }), { status: 200 })))
    render(<QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })}><MemoryRouter><AssessmentCard latestAssessment={completedAssessmentFixture} /></MemoryRouter></QueryClientProvider>)
    await userEvent.click(await screen.findByRole('button', { name: 'Run new assessment' }))
    expect(await screen.findByText(/temporarily unavailable/i)).toBeVisible(); expect(screen.getByLabelText('Experimental model score 42 out of 100')).toBeVisible(); expect(screen.queryByText('Internal detail')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Retry' })); await waitFor(() => expect(fetchMock.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(2))
  })
})
