import { render, screen } from '@testing-library/react'
import axe from 'axe-core'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { App } from './App'
import { AppProviders } from './AppProviders'
import { appRoutes } from './router'

describe('application foundation', () => {
  it('renders through the router and provider composition', () => {
    window.history.pushState({}, '', '/'); render(<AppProviders><App /></AppProviders>)
    expect(screen.getByRole('heading', { level: 1, name: 'Application foundation ready' })).toBeVisible()
  })
  it('renders the not-found route', () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/missing'] })
    render(<AppProviders><RouterProvider router={router} /></AppProviders>)
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeVisible()
  })
  it('has no detectable accessibility violations', async () => {
    window.history.pushState({}, '', '/'); const { container } = render(<AppProviders><App /></AppProviders>)
    expect((await axe.run(container)).violations).toEqual([])
  })
})
