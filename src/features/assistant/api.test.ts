import { describe, expect, it } from 'vitest'
import { conversationSchema, messageSchema } from './api'

const base = { id: '33333333-3333-4333-8333-333333333333', role: 'assistant', content: 'Response', sources: [], safety: { urgent: false, reason: null }, uncertainty: null, provenance: null, created_at: '2026-09-15T10:00:00Z' }
describe('assistant API contract', () => {
  it.each(['answer', 'follow_up', 'abstention', 'urgent'] as const)('accepts %s responses', (response_type) => {
    const urgent = response_type === 'urgent'
    expect(messageSchema.parse({ ...base, response_type, safety: { urgent, reason: urgent ? 'Seek urgent care' : null }, sources: response_type === 'answer' ? [{ source_id: 's1', title: 'Source', url: 'https://example.test/source' }] : [] }).response_type).toBe(response_type)
  })
  it('accepts an assessment source without an external URL', () => expect(messageSchema.parse({ ...base, response_type: 'answer', sources: [{ source_id: 'assessment:v1', title: 'Saved HealthSphere assessment', url: null }] }).sources[0]?.url).toBeNull())
  it('rejects malformed message states and sources', () => expect(() => messageSchema.parse({ ...base, response_type: 'diagnosis' })).toThrow())
  it('accepts a complete conversation DTO', () => expect(conversationSchema.parse({ id: '11111111-1111-4111-8111-111111111111', created_at: base.created_at, updated_at: base.created_at, expires_at: base.created_at, messages: [{ ...base, response_type: 'follow_up' }] }).messages).toHaveLength(1))
})
