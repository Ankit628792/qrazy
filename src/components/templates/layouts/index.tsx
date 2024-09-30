'use client'

import { LoginLayout } from './login-layout'
import { SidebarLayout } from './sidebar-layout'
import { LayoutProps } from '@/types/templates'

export const Layout = ({ children }: LayoutProps) => {
  const isUserLoggedIn = true

  if (!isUserLoggedIn) {
    return <LoginLayout>{children}</LoginLayout>
  }

  return <SidebarLayout>{children}</SidebarLayout>
}
