import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Brand } from './Brand'

describe('HealthSphere brand', () => {
  it('uses the canonical logo inside an accessible home link', () => {
    const { container } = render(<MemoryRouter><Brand /></MemoryRouter>)

    expect(screen.getByRole('link', { name: 'HealthSphere home' })).toHaveAttribute('href', '/')
    const logo = container.querySelector<HTMLImageElement>('.brand__logo')
    expect(logo?.src).toContain('healthsphere-logo.webp')
    expect(logo).toHaveAttribute('width', '2172')
    expect(logo).toHaveAttribute('height', '724')
    expect(logo).toHaveAttribute('alt', '')
  })
})
