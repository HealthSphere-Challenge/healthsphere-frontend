import type { HTMLAttributes, ReactNode } from 'react'

export function PageContainer({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <div className={`page-container ${className}`.trim()} {...props}>{children}</div>
}
