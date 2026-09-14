import { z } from 'zod'
import { apiClient } from '../../lib/api'
import { assessmentSchema } from '../assessments/api'

export const metrics = ['heart_rate', 'blood_pressure', 'weight', 'blood_glucose', 'sleep_duration', 'physical_activity_duration'] as const
export type Metric = typeof metrics[number]
const bloodPressureSchema = z.object({ systolic: z.number().int(), diastolic: z.number().int() })
export const measurementSchema = z.object({
  id: z.uuid(), metric: z.enum([...metrics, 'bmi']), value: z.union([z.number(), bloodPressureSchema]), unit: z.enum(['bpm', 'mmHg', 'kg', 'kg/m2', 'mg/dL', 'min']),
  context: z.enum(['fasting', 'postprandial', 'random', 'unknown']).nullable(), measured_at: z.string(), recorded_at: z.string(), source: z.enum(['manual', 'derived']), note: z.string().nullable(),
})
const bmiSchema = z.object({ value: z.number(), unit: z.literal('kg/m2'), derived_from_measurement_id: z.uuid() })
export const dashboardSchema = z.object({ generated_at: z.string(), latest_measurements: z.record(z.string(), z.union([measurementSchema, bmiSchema, z.null()])), latest_assessment: assessmentSchema.nullable() })
const listSchema = z.object({ items: z.array(measurementSchema), next_cursor: z.string().nullable() })
export type Measurement = z.infer<typeof measurementSchema>
export type Dashboard = z.infer<typeof dashboardSchema>

export const measurementApi = {
  dashboard: () => apiClient.request('/dashboard', dashboardSchema),
  list: () => apiClient.request('/measurements', listSchema),
  create: (body: Record<string, unknown>) => apiClient.request('/measurements', measurementSchema, { method: 'POST', body: JSON.stringify(body) }),
}

export const dashboardKey = ['dashboard'] as const
export const measurementsKey = ['measurements'] as const

export const metricMeta: Record<Metric | 'bmi', { label: string; unit: string }> = {
  heart_rate: { label: 'Heart rate', unit: 'bpm' }, blood_pressure: { label: 'Blood pressure', unit: 'mmHg' }, weight: { label: 'Weight', unit: 'kg' }, bmi: { label: 'BMI', unit: 'kg/m²' }, blood_glucose: { label: 'Blood glucose', unit: 'mg/dL' }, sleep_duration: { label: 'Sleep', unit: 'min' }, physical_activity_duration: { label: 'Activity', unit: 'min' },
}

export function displayValue(entry: unknown): string {
  const parsedMeasurement = measurementSchema.safeParse(entry)
  if (parsedMeasurement.success) {
    const value = parsedMeasurement.data.value
    return typeof value === 'number' ? String(value) : `${value.systolic}/${value.diastolic}`
  }
  const bmi = bmiSchema.safeParse(entry); return bmi.success ? String(bmi.data.value) : '—'
}
