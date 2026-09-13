import { describe, expect, it } from 'vitest'
import { parsePublicConfig } from './config'

describe('public configuration', () => {
  it('defaults to the same-site backend API', () => expect(parsePublicConfig({})).toEqual({ apiBaseUrl: '/api/v1' }))
  it('accepts a credential-free backend URL', () => expect(parsePublicConfig({ VITE_API_BASE_URL: 'http://localhost:8000/api/v1/' })).toEqual({ apiBaseUrl: 'http://localhost:8000/api/v1' }))
  it.each(['https://user:secret@example.test/api/v1', 'https://healthsphere-agent.example.test/api/v1', '/internal/v1'])(
    'rejects unsafe browser configuration %s', (value) => expect(() => parsePublicConfig({ VITE_API_BASE_URL: value })).toThrow(),
  )
})
