import React from 'react'
import { Container } from '@/components'
import { ROUTES } from '@/shared/shared.interface'
import { FaUserShield, FaChartPie } from 'react-icons/fa'
import { useAuth } from '@/providers/auth-provider'
import { SidebarContainer } from './component/SidebarContainer'
import { IMenuBottomItem, IMenuItem } from './left-sidebar.interface'

// hard coded menu items
const menuItems: IMenuItem[] = [
  {
    title: 'Overview',
    icon: FaChartPie,
    link: ROUTES.OVERVIEW
  },
  {
    title: 'Product',
    icon: FaChartPie,
    link: ROUTES.PRODUCT
  },
  {
    title: 'Invoice',
    icon: FaUserShield,
    link: ROUTES.INVOICE
  },
  {
    title: 'Report',
    icon: FaChartPie,
    link: ROUTES.REPORT
  }
]

const menuBottomItems: IMenuBottomItem[] = [
  {
    title: 'User Profile',
    icon: FaChartPie,
    link: ROUTES.USER
  }
]

type LeftSideBarMenuProps = {}

export const LeftSideBarMenu = ({}: LeftSideBarMenuProps) => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState<string | null>(
    null
  )
  return (
    <Container className="h-[inherit] bg-gray-100 flex flex-col items-start justify-between border-x border-gray-500/10">
      <Container className="w-full">
        {menuItems.map((item, index) => (
          <SidebarContainer
            key={index}
            item={item}
            index={index}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
        ))}
      </Container>
      <Container className="w-full">
        {menuBottomItems.map((item, index) => (
          <SidebarContainer
            key={index}
            item={item}
            index={index}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
        ))}
      </Container>
    </Container>
  )
}
