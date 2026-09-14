import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import axe from 'axe-core'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { AssistantRoute } from './AssistantRoute'

vi.mock('../features/assistant/api', async (original) => {
  const module = await original<typeof import('../features/assistant/api')>()
  return { ...module, assistantApi: { ...module.assistantApi, list: vi.fn().mockResolvedValue({ items: [], next_cursor: null }) } }
})

function renderRoute(path = '/app/assistant') {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(<QueryClientProvider client={client}><MemoryRouter initialEntries={[path]}><AssistantRoute /></MemoryRouter></QueryClientProvider>)
}

describe('AssistantRoute', () => {
  it('renders a safe empty state and accessible composer', async () => {
    renderRoute()
    expect(await screen.findByRole('heading', { name: 'What can I help explain?' })).toBeVisible()
    expect(screen.getByLabelText('Ask HealthSphere Assistant')).toHaveAttribute('maxlength', '2000')
    expect(screen.queryByText('Do I have hypertension?')).not.toBeInTheDocument()
  })
  it('prefills only the safe explanation question for an assessment handoff', async () => {
    renderRoute('/app/assistant?assessment=66666666-6666-4666-8666-666666666666')
    expect(await screen.findByLabelText('Ask HealthSphere Assistant')).toHaveValue('How should I understand my latest HealthSphere assessment?')
  })
  it('has no detectable accessibility violations', async () => {
    const { container } = renderRoute()
    await screen.findByRole('heading', { name: 'What can I help explain?' })
    expect((await axe.run(container)).violations).toEqual([])
  })
})
