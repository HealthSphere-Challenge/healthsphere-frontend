import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { Alert, Button, FormField } from '../components/ui'
import { ApiError } from '../lib/api'
import { dashboardKey, displayValue, measurementApi, measurementsKey, metricMeta, metrics } from '../features/measurements/api'

const formSchema = z.object({ metric: z.enum(metrics), value: z.number().positive('Enter a value greater than zero.'), secondary: z.number().positive().optional(), context: z.enum(['fasting', 'postprandial', 'random', 'unknown']).optional(), measured_at: z.string().min(1, 'Choose when this was measured.'), note: z.string().max(1000).optional() }).superRefine((data, ctx) => {
  if (data.metric === 'blood_pressure' && !data.secondary) ctx.addIssue({ code: 'custom', path: ['secondary'], message: 'Enter the diastolic value.' })
  if (data.metric === 'blood_glucose' && !data.context) ctx.addIssue({ code: 'custom', path: ['context'], message: 'Choose a glucose context.' })
  if (['heart_rate', 'sleep_duration', 'physical_activity_duration'].includes(data.metric) && !Number.isInteger(data.value)) ctx.addIssue({ code: 'custom', path: ['value'], message: 'Enter a whole number.' })
})
type FormValues = z.infer<typeof formSchema>

export function MeasurementsRoute() {
  const [searchParams, setSearchParams] = useSearchParams(); const open = searchParams.get('add') === '1'
  const history = useQuery({ queryKey: measurementsKey, queryFn: measurementApi.list })
  return <main id="main-content" className="dashboard"><header className="product-heading"><div><p className="eyebrow">My health</p><h1>Measurements</h1><p>Your recorded observations in canonical units, without clinical interpretation.</p></div><button className="button button--primary" onClick={() => setSearchParams({ add: '1' })}>Add measurement</button></header>{open && <MeasurementForm onClose={() => setSearchParams({})} />}{history.isPending ? <div className="product-status" aria-live="polite"><span className="spinner" /> Loading measurements…</div> : history.isError ? <Alert tone="error">We could not load your measurement history.</Alert> : history.data.items.length === 0 ? <section className="empty-health compact"><h2>No measurements yet</h2><p>Add your first observation when you are ready.</p></section> : <section aria-labelledby="history-title"><div className="section-heading"><h2 id="history-title">Measurement history</h2><span>{history.data.items.length} recorded</span></div><div className="history-list">{history.data.items.map((item) => <article key={item.id}><div><h3>{metricMeta[item.metric].label}</h3><time dateTime={item.measured_at}>{new Date(item.measured_at).toLocaleString()}</time></div><p>{displayValue(item)} <small>{metricMeta[item.metric].unit}</small></p>{item.context && <span className="context-label">{item.context}</span>}</article>)}</div></section>}</main>
}

function MeasurementForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient(); const [now] = useState(() => { const current = new Date(); return new Date(current.getTime() - current.getTimezoneOffset() * 60_000).toISOString().slice(0, 16) })
  const form = useForm<FormValues>({ resolver: zodResolver(formSchema), defaultValues: { metric: 'heart_rate', value: 0, measured_at: now, note: '' } }); const metric = useWatch({ control: form.control, name: 'metric' })
  const mutation = useMutation({ mutationFn: (values: FormValues) => measurementApi.create(toPayload(values)), onSuccess: async () => { await Promise.all([queryClient.invalidateQueries({ queryKey: measurementsKey }), queryClient.invalidateQueries({ queryKey: dashboardKey })]); onClose() } })
  const label = metric === 'blood_pressure' ? 'Systolic' : metricMeta[metric].label
  return <section className="measurement-form" aria-labelledby="add-title"><div className="section-heading"><div><p className="eyebrow">New observation</p><h2 id="add-title">Add health data</h2></div><button className="close-button" type="button" onClick={onClose} aria-label="Close add measurement form">×</button></div>{mutation.error && <Alert tone="error">{mutation.error instanceof ApiError ? mutation.error.message : 'We could not save this measurement.'}</Alert>}<form className="measurement-fields" noValidate onSubmit={(event) => void form.handleSubmit((values) => mutation.mutate(values))(event)}><label className="form-field"><span className="form-label">Measurement type</span><select className="input" {...form.register('metric')}><option value="heart_rate">Heart rate</option><option value="blood_pressure">Blood pressure</option><option value="weight">Weight</option><option value="blood_glucose">Blood glucose</option><option value="sleep_duration">Sleep duration</option><option value="physical_activity_duration">Physical activity</option></select></label><FormField label={`${label} (${metricMeta[metric].unit})`} type="number" step={['weight','blood_glucose'].includes(metric) ? '0.1' : '1'} error={form.formState.errors.value?.message} {...form.register('value', { valueAsNumber: true })} />{metric === 'blood_pressure' && <FormField label="Diastolic (mmHg)" type="number" error={form.formState.errors.secondary?.message} {...form.register('secondary', { setValueAs: (value) => value === '' ? undefined : Number(value) })} />}{metric === 'blood_glucose' && <label className="form-field"><span className="form-label">Glucose context</span><select className="input" aria-invalid={Boolean(form.formState.errors.context)} {...form.register('context')}><option value="">Choose context</option><option value="fasting">Fasting</option><option value="postprandial">Postprandial</option><option value="random">Random</option><option value="unknown">Unknown</option></select>{form.formState.errors.context && <span className="form-error">{form.formState.errors.context.message}</span>}</label>}<FormField label="Measured at" type="datetime-local" error={form.formState.errors.measured_at?.message} {...form.register('measured_at')} /><FormField label="Note (optional)" maxLength={1000} {...form.register('note')} /><div className="form-actions"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit" loading={mutation.isPending}>Save measurement</Button></div></form></section>
}

function toPayload(values: FormValues): Record<string, unknown> {
  const unit = metricMeta[values.metric].unit
  return { metric: values.metric, value: values.metric === 'blood_pressure' ? { systolic: values.value, diastolic: values.secondary } : values.value, unit, context: values.metric === 'blood_glucose' ? values.context : null, measured_at: new Date(values.measured_at).toISOString(), source: 'manual', note: values.note || null }
}
