import React from 'react'
import Link from 'next/link'
import { Container } from '@/components'
import { ROUTES } from '@/shared/shared.interface'
import { FaUserShield, FaChartPie } from 'react-icons/fa'
import { useAuth } from '@/providers/auth-provider'

// hard coded menu items
const menuItems = [
  {
    title: 'Invoice',
    icon: FaUserShield,
    link: ROUTES.INVOICE
  },
  {
    title: 'Product',
    icon: FaChartPie,
    link: ROUTES.PRODUCT
  },
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
    <Container className="h-[inherit] px-1rem bg-gray-100 dark:bg-gray-800 flex flex-col items-start justify-start p-2 border-x border-gray-500/10 dark:border-gray-600">
      {menuItems.map((item, index) => (
        <div key={index} className="w-full">
          <Link
            href={item.link}
            onClick={() => setSelectedMenuItem(item.title)}
          >
            <Container
              className={`flex items-center justify-start gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedMenuItem === item.title ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
            >
              <Container className="w-6 h-6">
                <item.icon
                  className={`${
                    selectedMenuItem === item.title
                      ? 'text-blue-400'
                      : 'text-gray-700'
                  } h-full w-full`}
                />
              </Container>
              <Container
                className={`text-sm font-semibold ${
                  selectedMenuItem === item.title
                    ? 'text-blue-400'
                    : 'text-gray-700'
                }`}
              >
                {item.title}
              </Container>
            </Container>
          </Link>
        </div>
      ))}
    </Container>
  )
}
