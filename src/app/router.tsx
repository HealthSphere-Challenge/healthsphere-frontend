import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { FoundationRoute } from '../routes/FoundationRoute'
import { NotFoundRoute } from '../routes/NotFoundRoute'

export const appRoutes: RouteObject[] = [
  { path: '/', element: <FoundationRoute /> },
  { path: '*', element: <NotFoundRoute /> },
]

export const router = createBrowserRouter(appRoutes)
