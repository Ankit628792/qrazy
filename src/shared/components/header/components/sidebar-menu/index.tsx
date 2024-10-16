import Link from 'next/link'
import useClickOutside from '@/components/hooks/useClickOutSide'
import React, { useRef } from 'react'
import { Logo } from '../logo'
import { INavigationData } from '../../header.interface'
import { RenderButtonType } from '../render-button-type'
import { IUserLogin } from '@/features/auth/auth.interface'
import { Container } from '@/components'
import { RightSideBarMenu } from '@/shared/components/right-sidebar'
import { menuBottomItems, menuItems } from '@/shared/components/left-sidebar'
import { useSelectedSideBarModule } from '@/shared/components/left-sidebar/hooks/useSelectedSideBarModule'

type SideBarMenuProps = {
  user: IUserLogin | null
  sideBarOpen: boolean
  subNavigationData: [] | INavigationData[]
  handleSignOut: () => void
  setSideBarOpen: (value: boolean) => void
  googleSignIn: () => void
}

export const SideBarMenu = ({
  user,
  sideBarOpen,
  subNavigationData,
  handleSignOut,
  setSideBarOpen,
  googleSignIn
}: SideBarMenuProps) => {
  const sideBarRef = useRef(null)
  const selectedModule = useSelectedSideBarModule()

  const handleCloseModal = () => {
    setSideBarOpen(false)
  }

  useClickOutside(sideBarRef, handleCloseModal)

  return (
    <RightSideBarMenu
      sideBarOpen={sideBarOpen}
      setSideBarOpen={setSideBarOpen}
      hideBurgerMenuButton={false}
      headerNode={<Logo />}
      Children={
        <React.Fragment>
          <Container className="pt-4">
            <RenderButtonType
              user={user}
              handleSignOut={handleSignOut}
              handleSignIn={googleSignIn}
            />
          </Container>
          <Container className="py-4">
            <Container className="flex flex-col gap-y-4">
              {subNavigationData?.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-full mx-0 px-6 text-base font-semibold leading-7 text-gray-900 hover:bg-black-400 hover:bg-opacity-15 ring-2 ring-black-400 cursor-pointer w-fit duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </Container>
          </Container>
          <Container className="flex flex-col gap-y-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="rounded-full mx-0 px-6 text-base font-semibold leading-7 text-gray-900 hover:bg-black-400 hover:bg-opacity-15 ring-2 ring-black-400 cursor-pointer w-fit duration-200"
              >
                <Link href={item.link}>
                  <Container
                    className={`flex items-center justify-start cursor-pointer ${`/${selectedModule}` === item.link ? 'bg-gray-200 outline-y outline-gray-500/10' : ''}`}
                  >
                    <Container
                      className={`font-semibold ${
                        `/${selectedModule}` === item.link
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
          <Container className="flex flex-col gap-y-4 mt-4">
            {menuBottomItems.map((item, index) => (
              <div
                key={index}
                className="rounded-full mx-0 px-6 text-base font-semibold leading-7 text-gray-900 hover:bg-black-400 hover:bg-opacity-15 ring-2 ring-black-400 cursor-pointer w-fit duration-200"
              >
                <Link href={item.link}>
                  <Container
                    className={`flex items-center justify-start cursor-pointer ${`/${selectedModule}` === item.link ? 'bg-gray-200 outline-y outline-gray-500/10' : ''}`}
                  >
                    <Container
                      className={`font-semibold ${
                        `/${selectedModule}` === item.link
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
        </React.Fragment>
      }
    />
  )
}
