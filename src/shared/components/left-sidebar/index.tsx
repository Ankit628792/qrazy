'use client'

import React, { useState } from 'react'
// import { useAuth } from '@/providers/auth-provider'
import { Container } from '@/components'
import { ROUTES } from '@/shared/shared.interface'
import { FaChartPie, FaFileInvoiceDollar } from 'react-icons/fa'
import { BsFillBuildingsFill } from 'react-icons/bs'
import { AiFillProduct } from 'react-icons/ai'
import { SiGooglesheets } from 'react-icons/si'
import { SidebarContainer } from './component/SidebarContainer'
import { IMenuBottomItem, IMenuItem } from './left-sidebar.interface'
import { useSelectedSideBarModule } from './hooks/useSelectedSideBarModule'
import { Cog } from 'lucide-react'
import useLeftSidebarStore from './store/left-sidebar.store'

// hard coded menu items
export const menuItems: IMenuItem[] = [
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
  }
]

export const menuBottomItems: IMenuBottomItem[] = [
  {
    title: 'User Profile',
    icon: BsFillBuildingsFill,
    link: ROUTES.USER
  }
]

type LeftSideBarMenuProps = {
  showOnlyIcons: boolean
}

export const LeftSideBarMenu = ({ showOnlyIcons }: LeftSideBarMenuProps) => {
  const selectedModule = useSelectedSideBarModule()

  return (
    <Container className="h-[inherit] flex flex-col items-start justify-between border-x border-gray-500/10">
      <Container className="w-full py-2">
        {menuItems.map((item, index) => (
          <SidebarContainer
            key={index}
            item={item}
            index={index}
            selectedModule={selectedModule}
            isIconsOnly={showOnlyIcons}
          />
        ))}
      </Container>
      <Container className="w-full py-2">
        {menuBottomItems.map((item, index) => (
          <SidebarContainer
            key={index}
            item={item}
            index={index}
            selectedModule={selectedModule}
            isIconsOnly={showOnlyIcons}
          />
        ))}
      </Container>
    </Container>
  )
}
