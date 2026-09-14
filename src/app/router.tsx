import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import { LoginRoute, PublicOnly, RegisterRoute, RequireSession } from '../routes/AuthRoutes'
import { NotFoundRoute } from '../routes/NotFoundRoute'
import { OnboardingRoute } from '../routes/OnboardingRoutes'
import { ProtectedPlaceholder } from '../routes/ProtectedPlaceholder'

export const appRoutes: RouteObject[] = [
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <PublicOnly><LoginRoute /></PublicOnly> },
  { path: '/register', element: <PublicOnly><RegisterRoute /></PublicOnly> },
  { path: '/onboarding/:step', element: <RequireSession onboarding><OnboardingRoute /></RequireSession> },
  { path: '/app', element: <RequireSession><ProtectedPlaceholder /></RequireSession> },
  { path: '*', element: <NotFoundRoute /> },
]

export const router = createBrowserRouter(appRoutes)
