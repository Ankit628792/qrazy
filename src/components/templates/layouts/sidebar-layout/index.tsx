import React from 'react'
import { HeaderComponent } from '@/shared/components/header'
import { SidebarLayoutProps } from '@/types'
import { Container } from '@/components/atoms'
import { LeftSideBarMenu } from '@/shared/components/left-sidebar'
import { useLocalStorage } from '@/components/hooks/useLocalStorage'
import {
  AUTH_LOCAL_STORAGE_KEYS,
  PERMISSION_LEVEL
} from '@/features/auth/auth.interface'

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const { setItem: setModulesAndPermissions } = useLocalStorage(
    AUTH_LOCAL_STORAGE_KEYS.MODULES_AND_PERMISSIONS
  )
  const permissions = {
    '/user': PERMISSION_LEVEL.DENIED,
    '/invoice': PERMISSION_LEVEL.DENIED,
    '/product': PERMISSION_LEVEL.DENIED,
    '/report': PERMISSION_LEVEL.DENIED,
    '/overview': PERMISSION_LEVEL.DENIED
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
