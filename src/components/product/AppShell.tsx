import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { authApi } from '../../features/auth/api'
import { useSession } from '../../features/auth/useSession'
import { Brand } from './Brand'

export function AppShell() {
  const session = useSession(); const navigate = useNavigate(); const queryClient = useQueryClient()
  const logout = useMutation({ mutationFn: authApi.logout, onSuccess: () => { queryClient.clear(); void navigate('/login', { replace: true }) } })
  return <div className="app-shell"><a className="skip-link" href="#main-content">Skip to main content</a><aside className="app-sidebar"><Brand /><nav aria-label="HealthSphere"><NavLink end to="/app">Dashboard</NavLink><NavLink to="/app/measurements">My health</NavLink><NavLink to="/app/profile">Profile</NavLink></nav><p className="app-disclaimer">HealthSphere provides information, not medical advice.</p></aside><header className="app-topbar"><span className="mobile-brand"><Brand /></span><div><span className="user-avatar" aria-hidden="true">{session.data?.user.display_name.charAt(0).toUpperCase()}</span><span className="user-name">{session.data?.user.display_name}</span><button className="logout-link" onClick={() => logout.mutate()} disabled={logout.isPending}>Log out</button></div></header><div className="app-main"><Outlet /></div><nav className="mobile-nav" aria-label="Mobile navigation"><NavLink end to="/app">Dashboard</NavLink><NavLink to="/app/measurements">My health</NavLink><NavLink to="/app/profile">Profile</NavLink></nav></div>
}
