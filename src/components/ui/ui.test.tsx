import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axe from 'axe-core'
import { Alert, Button, FormField } from '.'

describe('UI primitives', () => {
  it('supports button activation and disabled loading state', async () => {
    const user = userEvent.setup(); const onClick = vi.fn(); const { rerender } = render(<Button onClick={onClick}>Continue</Button>)
    await user.tab(); expect(screen.getByRole('button')).toHaveFocus(); await user.keyboard('{Enter}'); expect(onClick).toHaveBeenCalledOnce()
    rerender(<Button loading onClick={onClick}>Continue</Button>); expect(screen.getByRole('button')).toBeDisabled(); expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })
  it('associates labels, help, and validation errors', () => {
    render(<FormField label="Email address" hint="Account email" error="Email is required" />)
    const input = screen.getByLabelText('Email address'); expect(input).toHaveAccessibleDescription('Account email Email is required'); expect(input).toHaveAttribute('aria-invalid', 'true')
  })
  it('uses an assertive error alert', () => { render(<Alert tone="error">Try again</Alert>); expect(screen.getByRole('alert')).toHaveTextContent('Try again') })
  it('has no detectable accessibility violations', async () => {
    const { container } = render(<main><FormField label="Name" /><Button>Save</Button><Alert>Saved</Alert></main>)
    expect((await axe.run(container)).violations).toEqual([])
  })
})
