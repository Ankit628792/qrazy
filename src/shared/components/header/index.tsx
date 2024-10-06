'use client'

import React from 'react'
import useHeaderStore from './store/header.store'
import useLeftSidebarStore from '../left-sidebar/store/left-sidebar.store'
import { Container } from '@/components'
import { Logo } from './components/logo'
import { SideBarMenu } from './components/sidebar-menu'
import { ThemeSwitcher } from './components/theme-switcher-button'
import { useAuth } from '@/providers/auth-provider'
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled
} from 'react-icons/tb'

export const HeaderComponent: React.FC = () => {
  const { user, logOut } = useAuth()
  const { showLogo } = useHeaderStore()
  const { subNavigation } = useHeaderStore()
  const { sideBarOpen } = useHeaderStore()
  const { showOnlyIcons } = useLeftSidebarStore()
  const { setShowOnlyIcons } = useLeftSidebarStore()
  const { setShowLogo } = useHeaderStore()
  const { setSideBarOpen } = useHeaderStore()

  return (
    <header className="bg-gray-100 border-y border-gray-500/10 ">
      <nav
        className="flex items-center justify-between p-2 bg-transparent relative z-10"
        aria-label="Global"
      >
        <div
          onMouseEnter={() => setShowLogo(false)}
          onMouseLeave={() => setShowLogo(true)}
          className="cursor-pointer w-8 h-8"
        >
          {showLogo ? (
            <Logo />
          ) : (
            <React.Fragment>
              {showOnlyIcons ? (
                <TbLayoutSidebarLeftExpandFilled
                  className="w-full h-full"
                  onClick={() => setShowOnlyIcons(!showOnlyIcons)}
                />
              ) : (
                <TbLayoutSidebarLeftCollapseFilled
                  className="w-full h-full"
                  onClick={() => setShowOnlyIcons(!showOnlyIcons)}
                />
              )}
            </React.Fragment>
          )}
        </div>
        <Container className="flex items-center justify-center gap-x-4">
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
