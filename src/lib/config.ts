import { z } from 'zod'

const apiBaseUrlSchema = z.string().min(1).transform((value, context) => {
  const normalized = value.replace(/\/$/, '')
  if (normalized.startsWith('/')) {
    if (normalized !== '/api/v1') {
      context.addIssue({ code: 'custom', message: 'Relative API URL must be /api/v1' })
      return z.NEVER
    }
    return normalized
  }

  let url: URL
  try { url = new URL(normalized) } catch {
    context.addIssue({ code: 'custom', message: 'API URL must be relative or HTTP(S)' })
    return z.NEVER
  }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    context.addIssue({ code: 'custom', message: 'API URL must be credential-free HTTP(S)' }); return z.NEVER
  }
  if (!url.pathname.endsWith('/api/v1')) {
    context.addIssue({ code: 'custom', message: 'API URL must end with /api/v1' }); return z.NEVER
  }
  if (/healthsphere-(ai|agent)/i.test(url.hostname)) {
    context.addIssue({ code: 'custom', message: 'Browser API URL must target the backend' }); return z.NEVER
  }
  return normalized
})

export interface PublicConfig { apiBaseUrl: string }
export function parsePublicConfig(environment: Record<string, unknown>): PublicConfig {
  return { apiBaseUrl: apiBaseUrlSchema.parse(environment.VITE_API_BASE_URL ?? '/api/v1') }
}
export const publicConfig = parsePublicConfig(import.meta.env)
