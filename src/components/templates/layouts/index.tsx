'use client'

import React from 'react'
import { AuthComponent } from '@/features/auth'
import { ProtectedBoundary } from '../protected-boundary'
import { LoginLayout } from './login-layout'
import { SidebarLayout } from './sidebar-layout'
import { LayoutProps } from '@/types/templates'
import { ROUTES } from '@/shared/shared.interface'
import { usePathname } from 'next/navigation'

export const Layout = ({ children }: LayoutProps) => {
  const router = usePathname()
  const isUserLoggedIn = true

  if (router === ROUTES.HOME) {
    return <ProtectedBoundary {...{ children }} />
  }

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
