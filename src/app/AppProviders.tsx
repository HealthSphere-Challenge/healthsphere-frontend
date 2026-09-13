import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import { AppErrorBoundary } from './AppErrorBoundary'

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false }, mutations: { retry: false } },
  }))
  return <AppErrorBoundary><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></AppErrorBoundary>
}
