import NotFound from '@/app/not-found'
import { useAuth } from '@/providers/auth-provider'

interface WithUnregisteredUserOnlyProps {}

export function WithUnregisteredUserOnly<
  P extends WithUnregisteredUserOnlyProps
>(Component: React.ComponentType<P>) {
  return function WithUnregisteredUserOnlyWrapper(props: P) {
    const { user } = useAuth()
    return !user ? <Component {...props} /> : <NotFound />
  }
}

export default WithUnregisteredUserOnly
