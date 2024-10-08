'use client'

import { AuthComponent } from '@/features/auth'
import { ProtectedBoundary } from '../protected-boundary'
import { LoginLayout } from './login-layout'
import { SidebarLayout } from './sidebar-layout'
import { LayoutProps } from '@/types/templates'

export const Layout = ({ children }: LayoutProps) => {
  // const { user } = useAuth()
  const isUserLoggedIn = true

  if (isUserLoggedIn) {
    return (
      <SidebarLayout>
        <ProtectedBoundary {...{ children }} />
      </SidebarLayout>
    )
  }

  return (
    <LoginLayout>
      <AuthComponent />
    </LoginLayout>
  )
}
