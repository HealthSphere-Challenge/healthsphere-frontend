import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean; variant?: 'primary' | 'secondary'; children: ReactNode }

export function Button({ children, className = '', disabled, loading = false, variant = 'primary', ...props }: ButtonProps) {
  return <button className={`button button--${variant} ${className}`.trim()} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
    <span className="button__content">{loading && <span className="spinner" aria-hidden="true" />}{loading ? <><span>{children}</span><span className="sr-only">Loading</span></> : children}</span>
  </button>
}
