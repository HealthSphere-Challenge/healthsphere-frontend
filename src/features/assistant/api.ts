import { z } from 'zod'
import { apiClient } from '../../lib/api'

const sourceSchema = z.object({ source_id: z.string(), title: z.string(), url: z.url() })
const safetySchema = z.object({ urgent: z.boolean(), reason: z.string().nullable() })
export const messageSchema = z.object({
  id: z.uuid(), role: z.enum(['user', 'assistant']), content: z.string(),
  response_type: z.enum(['answer', 'follow_up', 'abstention', 'urgent']).nullable(),
  sources: z.array(sourceSchema), safety: safetySchema.nullable(), uncertainty: z.string().nullable(),
  provenance: z.record(z.string(), z.unknown()).nullable(), created_at: z.string(),
})
export const conversationSchema = z.object({ id: z.uuid(), created_at: z.string(), updated_at: z.string(), expires_at: z.string(), messages: z.array(messageSchema) })
const conversationListSchema = z.object({ items: z.array(conversationSchema), next_cursor: z.string().nullable() })
export type Conversation = z.infer<typeof conversationSchema>
export const assistantApi = {
  create: () => apiClient.request('/conversations', conversationSchema, { method: 'POST' }),
  list: () => apiClient.request('/conversations', conversationListSchema),
  get: (id: string) => apiClient.request(`/conversations/${id}`, conversationSchema),
  remove: (id: string) => apiClient.request(`/conversations/${id}`, z.undefined(), { method: 'DELETE' }),
  send: (id: string, content: string, assessmentId?: string) => apiClient.request(`/conversations/${id}/messages`, conversationSchema, { method: 'POST', body: JSON.stringify({ content, ...(assessmentId ? { assessment_id: assessmentId } : {}) }) }),
}
export const conversationsKey = ['conversations'] as const
