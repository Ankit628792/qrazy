'use client'

import { useAuth } from '@/providers/auth-provider'
import { LoginLayout } from './login-layout'
import { SidebarLayout } from './sidebar-layout'

type LayoutProps = Readonly<{
  children: React.ReactNode
}>

export const Layout = ({ children }: LayoutProps) => {
  const isUserLoggedIn = true

  if (!isUserLoggedIn) {
    return <LoginLayout>{children}</LoginLayout>
  }

  return <SidebarLayout>{children}</SidebarLayout>
}
