'use client'

import React from 'react'
import Link from 'next/link'
import useHeaderStore from './store/header.store'
import useLeftSidebarStore from '../left-sidebar/store/left-sidebar.store'
import { Container } from '@/components'
import { Logo } from './components/logo'
import { SideBarMenu } from './components/sidebar-menu'
import { useAuth } from '@/providers/auth-provider'
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled
} from 'react-icons/tb'
import { ROUTES } from '@/shared/shared.interface'
import { FaChartPie, FaFileInvoiceDollar } from 'react-icons/fa'
import { BsFillBuildingsFill } from 'react-icons/bs'
import { AiFillProduct } from 'react-icons/ai'
import { SiGooglesheets } from 'react-icons/si'
import { IMenuItem } from '../left-sidebar/left-sidebar.interface'
import { Cog } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from '@/shadcn-ui/navigation-menu'
import { usePathname } from 'next/navigation'

const menuItems: IMenuItem[] = [
  {
    title: 'Overview',
    icon: FaChartPie,
    link: ROUTES.OVERVIEW
  },
  {
    title: 'Product',
    icon: AiFillProduct,
    link: ROUTES.PRODUCT
  },
  {
    title: 'Invoice',
    icon: FaFileInvoiceDollar,
    link: ROUTES.INVOICE
  },
  {
    title: 'Report',
    icon: SiGooglesheets,
    link: ROUTES.REPORT
  },
  {
    title: 'Settings',
    icon: Cog,
    link: ROUTES.SETTINGS
  },
  {
    title: 'User Profile',
    icon: BsFillBuildingsFill,
    link: ROUTES.USER
  }
]

export const HeaderComponent: React.FC = () => {
  const { user, logOut } = useAuth()
  const { showLogo } = useHeaderStore()
  const { subNavigation } = useHeaderStore()
  const { sideBarOpen } = useHeaderStore()
  const { showOnlyIcons } = useLeftSidebarStore()
  const { setShowOnlyIcons } = useLeftSidebarStore()
  const { setShowLogo } = useHeaderStore()
  const { setSideBarOpen } = useHeaderStore()
  const pathname = usePathname()

  return (
    <header className="px-2 fixed w-full top-0 z-40 bg-opacity-50 dark:bg-black dark:bg-opacity-50 backdrop-blur-sm border-y border-gray-500/10">
      <nav
        className="flex items-center justify-between p-2 bg-transparent relative z-10"
        aria-label="Global"
      >
        <div
          onMouseEnter={() => setShowLogo(false)}
          onMouseLeave={() => setShowLogo(true)}
          className="cursor-pointer"
        >
          <Logo />
          {/* {showLogo ? (
            <Logo />
          ) : (
            <React.Fragment>
              {showOnlyIcons ? (
                <TbLayoutSidebarLeftExpandFilled
                  className="w-8 h-8"
                  onClick={() => setShowOnlyIcons(!showOnlyIcons)}
                />
              ) : (
                <TbLayoutSidebarLeftCollapseFilled
                  className="w-8 h-8"
                  onClick={() => setShowOnlyIcons(!showOnlyIcons)}
                />
              )}
            </React.Fragment>
          )} */}
        </div>
        <NavigationMenu className="hidden md:inline-block">
          <NavigationMenuList className=" gap-2 lg:gap-5">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.link}>
                <NavigationMenuItem
                  className={
                    'menu-item ' +
                    (pathname?.includes(item.link) ? 'active' : '')
                  }
                >
                  {item.title}
                </NavigationMenuItem>
              </Link>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Container className="relative flex overflow-hidden">
          <SideBarMenu
            user={user}
            sideBarOpen={sideBarOpen}
            subNavigationData={subNavigation}
            handleSignOut={() => logOut()}
            setSideBarOpen={setSideBarOpen}
            googleSignIn={() => setSideBarOpen(true)}
          />
        </Container>
      </nav>
    </header>
  )
}
