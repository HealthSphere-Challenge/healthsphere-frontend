import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Brand } from '../components/product/Brand'
import { Button } from '../components/ui'
import { authApi } from '../features/auth/api'
import { sessionKey, useSession } from '../features/auth/useSession'

export function ProtectedPlaceholder() {
  const session = useSession(); const queryClient = useQueryClient(); const navigate = useNavigate()
  const logout = useMutation({ mutationFn: authApi.logout, onSuccess: () => { queryClient.removeQueries({ queryKey: sessionKey }); void navigate('/login', { replace: true }) } })
  return <><header className="public-header"><Brand /><Button variant="secondary" loading={logout.isPending} onClick={() => logout.mutate()}>Log out</Button></header><main id="main-content" className="welcome-page"><p className="eyebrow">Profile complete</p><h1>Welcome, {session.data?.user.display_name}</h1><p>Your dashboard is the next delivery in HS-009.</p></main></>
}
