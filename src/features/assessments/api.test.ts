import { describe, expect, it } from 'vitest'
import { assessmentSchema } from './api'

const completed = {
  id: '33333333-3333-4333-8333-333333333333', status: 'completed', reason: null, created_at: '2026-09-14T10:00:00Z',
  result: { target_id: 'incident_essential_hypertension_5y_v1', feature_schema_version: 'hypertension_features_v1', model_version: 'hypertension_5y_v1.0.0', preprocessing_version: 'hypertension_preprocessing_v1', prediction_horizon_days: 1825, score: 0.42, score_type: 'uncalibrated_experimental_probability_estimate', calibrated: false, data_source_type: 'synthetic_model' },
} as const

describe('assessment API contract', () => {
  it('accepts the approved completed response and provenance', () => expect(assessmentSchema.parse(completed)).toEqual(completed))
  it.each([-0.01, 1.01, Number.NaN])('rejects an invalid score: %s', (score) => expect(() => assessmentSchema.parse({ ...completed, result: { ...completed.result, score } })).toThrow())
  it('requires explicit uncalibrated semantics', () => expect(() => assessmentSchema.parse({ ...completed, result: { ...completed.result, calibrated: true } })).toThrow())
  it.each(['insufficient_data', 'ineligible', 'unavailable'] as const)('accepts the %s state without a result', (status) => expect(assessmentSchema.parse({ id: completed.id, status, result: null, reason: { code: status, missing_fields: null }, created_at: completed.created_at }).status).toBe(status))
  it('rejects inconsistent and malformed response states', () => expect(() => assessmentSchema.parse({ ...completed, status: 'completed', result: null })).toThrow())
})

export { completed as completedAssessmentFixture }
