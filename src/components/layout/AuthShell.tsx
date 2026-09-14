import type { ReactNode } from 'react'

export function AuthShell({ children, illustration }: { children: ReactNode; illustration?: ReactNode }) {
  return <div className="auth-shell"><aside className="auth-shell__art" aria-hidden={!illustration}>{illustration}</aside><main className="auth-shell__main"><div className="auth-shell__content">{children}</div></main></div>
}
