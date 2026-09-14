import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { Brand, HealthIllustration } from '../components/product/Brand'
import { Alert, Button, FormField } from '../components/ui'
import { authApi, type Account } from '../features/auth/api'
import { sessionKey, useSession } from '../features/auth/useSession'
import { ApiError } from '../lib/api'

const steps = ['about', 'background', 'lifestyle', 'done'] as const
type Step = typeof steps[number]
const list = z.string().transform((value) => value.split(',').map((item) => item.trim()).filter(Boolean))
const aboutSchema = z.object({ date_of_birth: z.string().min(1, 'Enter your date of birth.'), sex_at_birth: z.enum(['female', 'male', 'intersex', 'prefer_not_to_say']).or(z.literal('')), height_cm: z.number().min(50, 'Height must be at least 50 cm.').max(260, 'Height must be 260 cm or less.') })
const backgroundSchema = z.object({ allergies: list, medications: list, medical_conditions: list })
const lifestyleSchema = z.object({ activity_level: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']).or(z.literal('')), typical_sleep_minutes: z.number().min(0).max(1440), smoking_status: z.enum(['never', 'former', 'current', 'prefer_not_to_say']).or(z.literal('')) })

function updateAccount(queryClient: ReturnType<typeof useQueryClient>, profile: Account['profile']) {
  queryClient.setQueryData<Account>(sessionKey, (current) => current ? { ...current, profile } : current)
}

export function OnboardingRoute() {
  const { step: rawStep } = useParams(); const step = rawStep as Step
  if (!steps.includes(step)) return <Navigate to="/onboarding/about" replace />
  return <div className="onboarding-page"><header className="onboarding-header"><a className="skip-link" href="#main-content">Skip to main content</a><Brand /><span>Step {step === 'done' ? 5 : steps.indexOf(step) + 2} of 5</span></header><div className="onboarding-progress" aria-label={`Onboarding step ${step === 'done' ? 5 : steps.indexOf(step) + 2} of 5`}><span style={{ width: `${((steps.indexOf(step) + 2) / 5) * 100}%` }} /></div><div className="onboarding-layout"><aside><HealthIllustration /></aside><main id="main-content">{step === 'about' && <AboutStep />}{step === 'background' && <BackgroundStep />}{step === 'lifestyle' && <LifestyleStep />}{step === 'done' && <DoneStep />}</main></div></div>
}

function AboutStep() {
  const session = useSession(); const navigate = useNavigate(); const queryClient = useQueryClient(); const profile = session.data!.profile
  const form = useForm<z.infer<typeof aboutSchema>>({ resolver: zodResolver(aboutSchema), defaultValues: { date_of_birth: profile.date_of_birth ?? '', sex_at_birth: (profile.sex_at_birth as never) ?? '', height_cm: profile.height_cm ?? 170 } })
  const mutation = useMutation({ mutationFn: (v: z.infer<typeof aboutSchema>) => authApi.patchProfile({ ...v, sex_at_birth: v.sex_at_birth || null }), onSuccess: (p) => { updateAccount(queryClient, p); void navigate('/onboarding/background') } })
  return <StepFrame eyebrow="Step 2" title="Tell us about you" text="This helps organize your profile. HealthSphere is available to adults aged 18 and over." error={mutation.error}><form className="stack" onSubmit={(event) => void form.handleSubmit((v) => mutation.mutate(v))(event)} noValidate><FormField label="Date of birth" type="date" error={form.formState.errors.date_of_birth?.message} {...form.register('date_of_birth')} /><label className="form-field"><span className="form-label">Sex at birth <span className="optional">(optional)</span></span><select className="input" {...form.register('sex_at_birth')}><option value="">Prefer not to answer now</option><option value="female">Female</option><option value="male">Male</option><option value="intersex">Intersex</option><option value="prefer_not_to_say">Prefer not to say</option></select></label><FormField label="Height (cm)" type="number" min="50" max="260" error={form.formState.errors.height_cm?.message} {...form.register('height_cm', { valueAsNumber: true })} /><StepActions loading={mutation.isPending} /></form></StepFrame>
}

function BackgroundStep() {
  const session = useSession(); const navigate = useNavigate(); const queryClient = useQueryClient(); const p = session.data!.profile
  const form = useForm<z.input<typeof backgroundSchema>, unknown, z.output<typeof backgroundSchema>>({ resolver: zodResolver(backgroundSchema), defaultValues: { allergies: (p.allergies ?? []).join(', '), medications: (p.medications ?? []).join(', '), medical_conditions: (p.medical_conditions ?? []).join(', ') } })
  const mutation = useMutation({ mutationFn: authApi.patchProfile, onSuccess: (profile) => { updateAccount(queryClient, profile); void navigate('/onboarding/lifestyle') } })
  return <StepFrame eyebrow="Step 3" title="Your health background" text="Add structured details you know. Leave a field blank when it is unknown." error={mutation.error}><form className="stack" onSubmit={(event) => void form.handleSubmit((v) => mutation.mutate(v))(event)}><FormField label="Allergies" hint="Separate entries with commas." {...form.register('allergies')} /><FormField label="Medications" hint="Separate entries with commas." {...form.register('medications')} /><FormField label="Chronic conditions" hint="Separate entries with commas." {...form.register('medical_conditions')} /><StepActions back="/onboarding/about" loading={mutation.isPending} /></form></StepFrame>
}

function LifestyleStep() {
  const session = useSession(); const navigate = useNavigate(); const queryClient = useQueryClient(); const p = session.data!.profile
  const form = useForm<z.infer<typeof lifestyleSchema>>({ resolver: zodResolver(lifestyleSchema), defaultValues: { activity_level: (p.activity_level as never) ?? '', typical_sleep_minutes: p.typical_sleep_minutes ?? 480, smoking_status: (p.smoking_status as never) ?? '' } })
  const mutation = useMutation({ mutationFn: (v: z.infer<typeof lifestyleSchema>) => authApi.patchProfile({ ...v, activity_level: v.activity_level || null, smoking_status: v.smoking_status || null }), onSuccess: (profile) => { updateAccount(queryClient, profile); void navigate('/onboarding/done') } })
  return <StepFrame eyebrow="Step 4" title="Daily lifestyle" text="A few optional details complete the picture you choose to share." error={mutation.error}><form className="stack" onSubmit={(event) => void form.handleSubmit((v) => mutation.mutate(v))(event)}><Select label="Activity level" registration={form.register('activity_level')} options={[['','Choose later'],['sedentary','Sedentary'],['light','Light'],['moderate','Moderate'],['active','Active'],['very_active','Very active']]} /><FormField label="Typical sleep (minutes)" type="number" min="0" max="1440" {...form.register('typical_sleep_minutes', { valueAsNumber: true })} /><Select label="Smoking status" registration={form.register('smoking_status')} options={[['','Choose later'],['never','Never'],['former','Former'],['current','Current'],['prefer_not_to_say','Prefer not to say']]} /><StepActions back="/onboarding/background" loading={mutation.isPending} /></form></StepFrame>
}

function Select({ label, registration, options }: { label: string; registration: UseFormRegisterReturn; options: string[][] }) { return <label className="form-field"><span className="form-label">{label} <span className="optional">(optional)</span></span><select className="input" {...registration}>{options.map(([value, text]) => <option value={value} key={value}>{text}</option>)}</select></label> }
function StepFrame({ eyebrow, title, text, error, children }: { eyebrow: string; title: string; text: string; error: Error | null; children: ReactNode }) { return <div className="onboarding-content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{text}</p>{error && <Alert tone="error">{error instanceof ApiError ? error.message : 'We could not save this step.'}</Alert>}{children}</div> }
function StepActions({ back, loading }: { back?: string; loading: boolean }) { return <div className="step-actions">{back ? <Link className="button button--secondary" to={back}>Back</Link> : <span />}<Button type="submit" loading={loading}>Save and continue</Button></div> }
function DoneStep() { return <div className="onboarding-content done"><div className="done__mark" aria-hidden="true">✓</div><p className="eyebrow">Step 5</p><h1>Your HealthSphere is ready</h1><p className="lede">Your profile is set up. You can now start recording your health information.</p><Link className="button button--primary" to="/app">Go to my dashboard</Link></div> }
