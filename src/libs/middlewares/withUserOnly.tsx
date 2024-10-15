import NotFound from '@/app/not-found'
import { useAuth } from '@/providers/auth-provider'

interface WithCustomerOnlyProps {}

export function withUserOnly<P extends WithCustomerOnlyProps>(
  Component: React.ComponentType<P>
) {
  return function WithUserOnlyWrapper(props: P) {
    const { user } = useAuth()
    return user ? <Component {...props} /> : <NotFound />
  }
}

export default withUserOnly
