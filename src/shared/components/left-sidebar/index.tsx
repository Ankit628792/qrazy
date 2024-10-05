import React from 'react'
import { Container } from '@/components'
import { ROUTES } from '@/shared/shared.interface'
import { FaUserShield, FaChartPie } from 'react-icons/fa'

// hard coded menu items
const menuItems = [
  {
    title: 'Auth',
    icon: FaUserShield,
    link: ROUTES.AUTH
  },
  {
    title: 'Overview',
    icon: FaChartPie,
    link: ROUTES.AUTH
  }
]

type LeftSideBarMenuProps = {}

export const LeftSideBarMenu = ({}: LeftSideBarMenuProps) => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState<string | null>(
    null
  )
  return (
    <Container className="h-[inherit] px-1rem bg-gray-100 dark:bg-gray-800 flex flex-col items-start justify-start p-2 border-x border-gray-500/10 dark:border-gray-600">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="w-full"
          onClick={() => setSelectedMenuItem(item.title)}
        >
          <Container
            className={`flex items-center justify-start gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedMenuItem === item.title ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          >
            <Container className="w-5 h-5">
              <item.icon className="text-gray-700 dark:text-gray-300" />
            </Container>
            <Container className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {item.title}
            </Container>
          </Container>
        </div>
      ))}
    </Container>
  )
}
