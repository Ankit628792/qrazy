'use client'

import useHeaderStore from './store/header.store'
import React from 'react'
import { Container } from '@/components'
import { Logo } from './components/logo'
import { SideBarMenu } from './components/sidebar-menu'
import { ThemeSwitcher } from './components/theme-switcher-button'
import { useAuth } from '@/providers/auth-provider'

export const HeaderComponent: React.FC = () => {
  const { subNavigation } = useHeaderStore()
  const { user, logOut } = useAuth()
  const { sideBarOpen } = useHeaderStore()
  const { setSideBarOpen } = useHeaderStore()

  return (
    <header className="bg-gray-100 border-y border-gray-500/10 ">
      <nav
        className="flex items-center justify-between p-2 lg:px-8 bg-transparent relative z-10"
        aria-label="Global"
      >
        <Logo />
        <Container className="flex items-center justify-center gap-x-6">
          <ThemeSwitcher />
          <Container className='className="relative flex overflow-hidden'>
            <SideBarMenu
              user={user}
              sideBarOpen={sideBarOpen}
              subNavigationData={subNavigation}
              handleSignOut={() => logOut()}
              setSideBarOpen={setSideBarOpen}
              googleSignIn={() => setSideBarOpen(true)}
            />
          </Container>
        </Container>
      </nav>
    </header>
  )
}
