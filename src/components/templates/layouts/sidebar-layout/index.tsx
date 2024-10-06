import React from 'react'
import useLeftSidebarStore from '@/shared/components/left-sidebar/store/left-sidebar.store'
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
  const { showOnlyIcons } = useLeftSidebarStore()

  const { setItem: setModulesAndPermissions } = useLocalStorage(
    AUTH_LOCAL_STORAGE_KEYS.MODULES_AND_PERMISSIONS
  )
  const permissions = {
    '/user': PERMISSION_LEVEL.FULL,
    '/invoice': PERMISSION_LEVEL.FULL,
    '/product': PERMISSION_LEVEL.FULL,
    '/report': PERMISSION_LEVEL.FULL,
    '/overview': PERMISSION_LEVEL.FULL
  }
  setModulesAndPermissions(JSON.stringify(permissions))
  return (
    <React.Fragment>
      <HeaderComponent />
      <Container className="h-[calc(100vh-50px)] flex">
        <Container
          className={`h-full ${showOnlyIcons ? 'w-[50px]' : 'w-[246px]'}`}
        >
          <LeftSideBarMenu showOnlyIcons={showOnlyIcons} />
        </Container>
        <Container
          className={`h-full flex items-center justify-center bg-gray-100 p-2
            ${showOnlyIcons ? 'w-[calc(100vw-50px)]' : 'w-[calc(100vw-246px)]'}
            `}
        >
          {children}
        </Container>
      </Container>
    </React.Fragment>
  )
}
