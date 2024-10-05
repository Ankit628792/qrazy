import React from 'react'
import { HeaderComponent } from '@/shared/components/header'
import { SidebarLayoutProps } from '@/types'
import { Container } from '@/components/atoms'
import { LeftSideBarMenu } from '@/shared/components/left-sidebar'
import { useLocalStorage } from '@/components/hooks/useLocalStorage'
import { AUTH_LOCAL_STORAGE_KEYS } from '@/features/auth/auth.interface'

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const { setItem: setModulesAndPermissions } = useLocalStorage(
    AUTH_LOCAL_STORAGE_KEYS.MODULES_AND_PERMISSIONS
  )
  const permissions = {
    '/user': 'denied',
    '/invoice': 'denied',
    '/product': 'denied',
    '/report': 'denied',
    '/overview': 'denied'
  }
  setModulesAndPermissions(JSON.stringify(permissions))
  return (
    <React.Fragment>
      <HeaderComponent />
      <Container className="h-[calc(100vh-68px)] flex">
        <Container className="h-full w-[246px]">
          <LeftSideBarMenu />
        </Container>
        <Container className="h-full w-[calc(100vw-246px)] flex items-center justify-center bg-gray-100 p-2">
          {children}
        </Container>
      </Container>
    </React.Fragment>
  )
}
