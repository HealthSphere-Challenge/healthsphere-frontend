import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { PublicHeader } from '../components/product/Brand'
import { Alert, Button, FormField } from '../components/ui'
import { ApiError } from '../lib/api'
import { authApi } from '../features/auth/api'
import { sessionKey, useSession } from '../features/auth/useSession'

const loginSchema = z.object({ email: z.email('Enter a valid email address.'), password: z.string().min(1, 'Enter your password.') })
const registerSchema = z.object({
  display_name: z.string().trim().min(1, 'Enter your name.').max(100), email: z.email('Enter a valid email address.'),
  password: z.string().min(12, 'Use at least 12 characters.').max(128), confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, { path: ['confirmPassword'], message: 'Passwords must match.' })

function AuthVisual({ mode }: { mode: 'login' | 'register' }) {
  return <aside className={`auth-visual auth-visual--${mode}`} aria-label={mode === 'login' ? 'A calm moment at home' : 'A healthy everyday routine'}>
    <div className="auth-visual__copy">
      <p className="eyebrow">Your health, your space</p>
      <p>{mode === 'login' ? 'Return to a clear view of your health information.' : 'Bring the health information you choose to share into one calm place.'}</p>
    </div>
  </aside>
}

function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const isLogin = mode === 'login'; const navigate = useNavigate(); const queryClient = useQueryClient()
  const loginForm = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '' } })
  const registerForm = useForm<z.infer<typeof registerSchema>>({ resolver: zodResolver(registerSchema), defaultValues: { display_name: '', email: '', password: '', confirmPassword: '' } })
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof loginSchema> | z.infer<typeof registerSchema>) => isLogin
      ? authApi.login(values)
      : (() => { const { display_name, email, password } = values as z.infer<typeof registerSchema>; return authApi.register({ display_name, email, password }) })(),
    onSuccess: (account) => { queryClient.setQueryData(sessionKey, account); void navigate(account.profile.date_of_birth ? '/app' : '/onboarding/about', { replace: true }) },
  })
  // The explicit forms keep field registration and error associations readable.
  if (isLogin) {
    const { register, handleSubmit, formState: { errors } } = loginForm
    return <><PublicHeader /><div className="auth-product"><AuthVisual mode="login" /><main id="main-content"><div className="auth-form"><p className="eyebrow">Welcome back</p><h1>Log in to HealthSphere</h1><p className="lede">Continue to your personal health overview.</p>{mutation.error && <Alert tone="error">{errorMessage(mutation.error, 'We could not log you in.')}</Alert>}<form className="stack" onSubmit={(event) => void handleSubmit((v) => mutation.mutate(v))(event)} noValidate><FormField label="Email address" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} /><FormField label="Password" type="password" autoComplete="current-password" error={errors.password?.message} {...register('password')} /><Button type="submit" loading={mutation.isPending}>Log in</Button></form><p>New to HealthSphere? <Link to="/register">Create an account</Link></p></div></main></div></>
  }
  const { register, handleSubmit, formState: { errors } } = registerForm
  return <><PublicHeader /><div className="auth-product"><AuthVisual mode="register" /><main id="main-content"><div className="auth-form"><p className="eyebrow">Create your account</p><h1>Start your HealthSphere journey</h1><p className="lede">Set up one secure account for your personal health profile.</p>{mutation.error && <Alert tone="error">{errorMessage(mutation.error, 'We could not create your account.')}</Alert>}<form className="stack" onSubmit={(event) => void handleSubmit((v) => mutation.mutate(v))(event)} noValidate><FormField label="Full name" autoComplete="name" error={errors.display_name?.message} {...register('display_name')} /><FormField label="Email address" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} /><FormField label="Password" type="password" autoComplete="new-password" hint="Use 12–128 characters." error={errors.password?.message} {...register('password')} /><FormField label="Confirm password" type="password" autoComplete="new-password" error={errors.confirmPassword?.message} {...register('confirmPassword')} /><Button type="submit" loading={mutation.isPending}>Create account</Button></form><p>Already have an account? <Link to="/login">Log in</Link></p></div></main></div></>
}

function errorMessage(error: Error, fallback: string) { return error instanceof ApiError ? error.message : fallback }
export const LoginRoute = () => <AuthPage mode="login" />
export const RegisterRoute = () => <AuthPage mode="register" />

export function RequireSession({ children, onboarding = false }: { children: ReactNode; onboarding?: boolean }) {
  const session = useSession(); const location = useLocation()
  if (session.isPending) return <main className="route-status" aria-live="polite"><span className="spinner" /> Loading your account…</main>
  if (session.isError || !session.data) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  const complete = Boolean(session.data.profile.date_of_birth)
  if (!onboarding && !complete) return <Navigate to="/onboarding/about" replace />
  return children
}

export function PublicOnly({ children }: { children: ReactNode }) {
  const session = useSession()
  if (session.isSuccess) return <Navigate to={session.data.profile.date_of_birth ? '/app' : '/onboarding/about'} replace />
  return children
}
