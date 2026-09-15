import { render, screen } from '@testing-library/react'
import axe from 'axe-core'
import { MemoryRouter } from 'react-router-dom'
import { AppProviders } from '../app/AppProviders'
import { LoginRoute, RegisterRoute } from './AuthRoutes'

function renderRoute(route: 'login' | 'register') {
  return render(<AppProviders><MemoryRouter>{route === 'login' ? <LoginRoute /> : <RegisterRoute />}</MemoryRouter></AppProviders>)
}

describe('authentication routes', () => {
  it.each([
    ['login', 'Log in to HealthSphere', 'login'],
    ['register', 'Start your HealthSphere journey', 'register'],
  ] as const)('renders canonical brand, form semantics, and %s photography', (route, heading, photo) => {
    const { container } = renderRoute(route)
    expect(screen.getByRole('link', { name: 'HealthSphere home' })).toHaveAttribute('href', '/')
    expect(container.querySelector('.brand__logo')).toHaveAttribute('alt', '')
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeVisible()
    expect(screen.getByLabelText('Email address')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Password', { exact: true })).toHaveAttribute('type', 'password')
    expect(container.querySelector('.auth-visual')).toHaveClass(`auth-visual--${photo}`)
  })

  it('keeps the registration fields and password guidance intact', () => {
    renderRoute('register')
    expect(screen.getByLabelText('Full name')).toHaveAttribute('autocomplete', 'name')
    expect(screen.getByLabelText('Confirm password')).toHaveAttribute('autocomplete', 'new-password')
    expect(screen.getByText('Use 12–128 characters.')).toBeVisible()
  })

  it.each(['login', 'register'] as const)('%s has no detectable accessibility violations', async (route) => {
    const { container } = renderRoute(route)
    expect((await axe.run(container)).violations).toEqual([])
  })
})
