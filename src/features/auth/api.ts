import { z } from 'zod'
import { apiClient, setCsrfToken } from '../../lib/api'

const profileSchema = z.object({
  id: z.uuid(), date_of_birth: z.string().nullable(), sex_at_birth: z.string().nullable(), height_cm: z.number().nullable(),
  allergies: z.array(z.string()).nullable(), medications: z.array(z.string()).nullable(), medical_conditions: z.array(z.string()).nullable(),
  activity_level: z.string().nullable(), typical_sleep_minutes: z.number().int().nullable(), smoking_status: z.string().nullable(),
  age_years: z.number().int().nullable(), latest_weight: z.null(), bmi: z.null(), updated_at: z.string(),
})
const accountSchema = z.object({
  user: z.object({ id: z.uuid(), email: z.email(), display_name: z.string(), created_at: z.string() }),
  profile: profileSchema, csrf_token: z.string(),
})
export type Account = z.infer<typeof accountSchema>
export type Profile = z.infer<typeof profileSchema>

const rememberCsrf = (account: Account) => { setCsrfToken(account.csrf_token); return account }
export const authApi = {
  me: () => apiClient.request('/auth/me', accountSchema).then(rememberCsrf),
  login: (body: { email: string; password: string }) => apiClient.request('/auth/login', accountSchema, { method: 'POST', body: JSON.stringify(body) }).then(rememberCsrf),
  register: (body: { display_name: string; email: string; password: string }) => apiClient.request('/auth/register', accountSchema, { method: 'POST', body: JSON.stringify(body) }).then(rememberCsrf),
  logout: () => apiClient.request('/auth/logout', z.undefined(), { method: 'POST' }).finally(() => setCsrfToken()),
  patchProfile: (body: Record<string, unknown>) => apiClient.request('/profile', profileSchema, { method: 'PATCH', body: JSON.stringify(body) }),
}
