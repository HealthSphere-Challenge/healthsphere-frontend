import { describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { createApiClient } from './api'

describe('API client foundation', () => {
  it('sends credentials and a request ID and validates success', async () => {
    const fetchImplementation = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ status: 'ok' }), { status: 200 }))
    const client = createApiClient({ fetchImplementation })
    await expect(client.request('/foundation', z.object({ status: z.literal('ok') }))).resolves.toEqual({ status: 'ok' })
    const [, init] = fetchImplementation.mock.calls[0]!
    expect(init?.credentials).toBe('include'); expect(new Headers(init?.headers).get('X-Request-ID')).toMatch(/^[0-9a-f-]{36}$/)
  })
  it('parses the canonical error contract', async () => {
    const requestId = 'c4a760a8-7d0b-4f98-9652-244be1ebcc2e'
    const fetchImplementation = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ error: { code: 'validation_error', message: 'Invalid.', details: null, request_id: requestId, retry_after_seconds: null } }), { status: 422 }))
    const client = createApiClient({ fetchImplementation })
    await expect(client.request('/foundation', z.unknown())).rejects.toEqual(
      expect.objectContaining({ code: 'validation_error', requestId, status: 422 }),
    )
  })
  it('rejects absolute and protocol-relative paths', async () => {
    const fetchImplementation = vi.fn<typeof fetch>()
    const client = createApiClient({ fetchImplementation })
    await expect(client.request('https://healthsphere-agent.example.test', z.unknown())).rejects.toThrow('API path must be relative')
    await expect(client.request('//healthsphere-ai.example.test', z.unknown())).rejects.toThrow('API path must be relative')
    expect(fetchImplementation).not.toHaveBeenCalled()
  })
})
