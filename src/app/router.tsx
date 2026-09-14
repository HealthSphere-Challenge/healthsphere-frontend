import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import { LoginRoute, PublicOnly, RegisterRoute, RequireSession } from '../routes/AuthRoutes'
import { NotFoundRoute } from '../routes/NotFoundRoute'
import { OnboardingRoute } from '../routes/OnboardingRoutes'
import { AppShell } from '../components/product/AppShell'
import { DashboardRoute } from '../routes/DashboardRoute'
import { MeasurementsRoute } from '../routes/MeasurementsRoute'
import { ProfileRoute } from '../routes/ProfileRoute'

export const appRoutes: RouteObject[] = [
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <PublicOnly><LoginRoute /></PublicOnly> },
  { path: '/register', element: <PublicOnly><RegisterRoute /></PublicOnly> },
  { path: '/onboarding/:step', element: <RequireSession onboarding><OnboardingRoute /></RequireSession> },
  { path: '/app', element: <RequireSession><AppShell /></RequireSession>, children: [
    { index: true, element: <DashboardRoute /> },
    { path: 'measurements', element: <MeasurementsRoute /> },
    { path: 'profile', element: <ProfileRoute /> },
  ] },
  { path: '*', element: <NotFoundRoute /> },
]

export const router = createBrowserRouter(appRoutes)
