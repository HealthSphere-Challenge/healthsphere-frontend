import type { HTMLAttributes, ReactNode } from 'react'

type AlertProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode; tone?: 'info' | 'error' }

export function Alert({ children, className = '', tone = 'info', ...props }: AlertProps) {
  return <div className={`alert ${tone === 'error' ? 'alert--error' : ''} ${className}`.trim()} role={tone === 'error' ? 'alert' : 'status'} {...props}>{children}</div>
}
