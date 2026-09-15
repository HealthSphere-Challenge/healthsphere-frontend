import { fireEvent, render, screen } from '@testing-library/react'
import axe from 'axe-core'
import { MemoryRouter } from 'react-router-dom'
import { LandingRoute } from './LandingRoute'

function renderLanding() { return render(<MemoryRouter><LandingRoute /></MemoryRouter>) }

describe('public landing page', () => {
  it('presents real routes, anchors and the canonical brand', () => {
    const { container } = renderLanding()
    expect(screen.getAllByRole('link', { name: 'HealthSphere home' })[0]).toHaveAttribute('href', '/')
    expect(screen.getAllByRole('link', { name: 'Get Started' })[0]).toHaveAttribute('href', '/register')
    expect(screen.getAllByRole('link', { name: 'Log in' })[0]).toHaveAttribute('href', '/login')
    expect(screen.getAllByRole('link', { name: 'How it works' })[0]).toHaveAttribute('href', '#how-it-works')
    expect(container.querySelector('#features')).toBeInTheDocument()
    expect(container.querySelector('#safety')).toBeInTheDocument()
  })

  it('uses accurate safety language without clinical classifications', () => {
    renderLanding()
    expect(screen.getByText(/synthetic Synthea records, uncalibrated and not clinically validated/i)).toBeVisible()
    expect(document.body).not.toHaveTextContent(/risk:\s*(low|medium|high)|health score:\s*(good|bad)|AI doctor|predict your disease/i)
  })

  it('closes the mobile navigation with Escape', () => {
    renderLanding()
    const menu = screen.getByRole('button', { name: 'Menu' })
    fireEvent.click(menu); expect(menu).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(document, { key: 'Escape' }); expect(menu).toHaveAttribute('aria-expanded', 'false')
  })

  it('has no detectable accessibility violations', async () => {
    const { container } = renderLanding()
    expect((await axe.run(container)).violations).toEqual([])
  })
})
