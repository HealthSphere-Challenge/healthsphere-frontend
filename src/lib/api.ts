import { z } from 'zod'
import { publicConfig } from './config'

const errorDetailSchema = z.object({ path: z.string(), code: z.string(), message: z.string() })
export const apiErrorSchema = z.object({ error: z.object({
  code: z.string(), message: z.string(), details: z.array(errorDetailSchema).nullable(), request_id: z.uuid(),
  retry_after_seconds: z.number().int().nonnegative().nullable(),
}) })

export class ApiError extends Error {
  constructor(message: string, readonly status: number, readonly code: string, readonly requestId: string | null) {
    super(message); this.name = 'ApiError'
  }
}

interface ApiClientOptions { csrfToken?: () => string | undefined; fetchImplementation?: typeof fetch }

let activeCsrfToken: string | undefined
export function setCsrfToken(token?: string) { activeCsrfToken = token }
export function getCsrfToken() { return activeCsrfToken }

export function createApiClient(options: ApiClientOptions = {}) {
  const request = async <T>(path: string, schema: z.ZodType<T>, init: RequestInit = {}): Promise<T> => {
    if (!path.startsWith('/') || path.startsWith('//')) throw new TypeError('API path must be relative')
    const headers = new Headers(init.headers)
    headers.set('Accept', 'application/json'); headers.set('X-Request-ID', crypto.randomUUID())
    if (init.body) headers.set('Content-Type', 'application/json')
    const csrfToken = options.csrfToken?.()
    if (csrfToken && init.method && !['GET', 'HEAD', 'OPTIONS'].includes(init.method.toUpperCase())) headers.set('X-CSRF-Token', csrfToken)

    const response = await (options.fetchImplementation ?? fetch)(`${publicConfig.apiBaseUrl}${path}`, { ...init, headers, credentials: 'include' })
    if (response.status === 204) return schema.parse(undefined)
    let body: unknown
    try { body = await response.json() } catch {
      throw new ApiError('The request failed.', response.status, 'invalid_error_response', response.headers.get('X-Request-ID'))
    }
    if (!response.ok) {
      const parsed = apiErrorSchema.safeParse(body)
      if (parsed.success) throw new ApiError(parsed.data.error.message, response.status, parsed.data.error.code, parsed.data.error.request_id)
      throw new ApiError('The request failed.', response.status, 'invalid_error_response', response.headers.get('X-Request-ID'))
    }
    return schema.parse(body)
  }
  return { request }
}

export const apiClient = createApiClient({ csrfToken: getCsrfToken })
