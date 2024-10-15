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
    <main className="flex flex-col min-h-dvh w-full bg-gradient-to-b from-zinc-200 to-sky-100 dark:from-zinc-700 dark:to-zinc-900">
      <HeaderComponent />
      <section className="flex-grow w-full flex px-5 gap-4 h-dvh">
        <LeftSideBarMenu showOnlyIcons={showOnlyIcons} />
        <Container className="flex-grow overflow-y-auto pb-5 pt-24 scroll-hidden">
          {children}
        </Container>
      </section>
    </main>
  )
}
