import { z } from 'zod'
import { apiClient } from '../../lib/api'

const provenanceSchema = z.object({
  target_id: z.literal('incident_essential_hypertension_5y_v1'),
  feature_schema_version: z.literal('hypertension_features_v1'),
  model_version: z.literal('hypertension_5y_v1.0.0'),
  preprocessing_version: z.literal('hypertension_preprocessing_v1'),
  prediction_horizon_days: z.literal(1825),
  score: z.number().finite().min(0).max(1),
  score_type: z.literal('uncalibrated_experimental_probability_estimate'),
  calibrated: z.literal(false),
  data_source_type: z.literal('synthetic_model'),
})

const reasonSchema = z.object({ code: z.string(), missing_fields: z.array(z.string()).nullable() })
const baseSchema = z.object({ id: z.uuid(), created_at: z.iso.datetime({ offset: true }) })

export const assessmentSchema = z.discriminatedUnion('status', [
  baseSchema.extend({ status: z.literal('completed'), result: provenanceSchema, reason: z.null() }),
  baseSchema.extend({ status: z.literal('insufficient_data'), result: z.null(), reason: reasonSchema }),
  baseSchema.extend({ status: z.literal('ineligible'), result: z.null(), reason: reasonSchema }),
  baseSchema.extend({ status: z.literal('unavailable'), result: z.null(), reason: reasonSchema }),
])

export const assessmentListSchema = z.object({ items: z.array(assessmentSchema), next_cursor: z.string().nullable() })
export type Assessment = z.infer<typeof assessmentSchema>
export type CompletedAssessment = Extract<Assessment, { status: 'completed' }>

export const assessmentApi = {
  list: () => apiClient.request('/assessments', assessmentListSchema),
  get: (id: string) => apiClient.request(`/assessments/${encodeURIComponent(id)}`, assessmentSchema),
  create: () => apiClient.request('/assessments', assessmentSchema, { method: 'POST' }),
}

export const assessmentsKey = ['assessments'] as const
