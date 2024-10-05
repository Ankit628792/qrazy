'use client'

import { useAuth } from '@/providers/auth-provider'
import { LoginLayout } from './login-layout'
import { SidebarLayout } from './sidebar-layout'
import { LayoutProps } from '@/types/templates'

export const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth()

  if (!true) {
    return <LoginLayout>{children}</LoginLayout>
  }

  return <SidebarLayout>{children}</SidebarLayout>
}
