import Link from 'next/link'
import useClickOutside from '@/components/hooks/useClickOutSide'
import React, { useRef } from 'react'
import { Logo } from '../logo'
import { INavigationData } from '../../header.interface'
import { RenderButtonType } from '../render-button-type'
import { IUserLogin } from '@/features/auth/auth.interface'
import { Container } from '@/components'
import { RightSideBarMenu } from '@/shared/components/right-sidebar'

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
          <Container className="py-6 border-y border-gray-500/10">
            <RenderButtonType
              user={user}
              handleSignOut={handleSignOut}
              handleSignIn={googleSignIn}
            />
          </Container>
          <Container className="divide-y divide-gray-500/10">
            <Container className="py-6">
              <Container className="flex flex-col lg:gap-y-2">
                {subNavigationData?.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-full gap-6 hover:ring-2 px-4 hover:bg-black-400 hover:bg-opacity-15 ring-black-400 text-base font-semibold leading-7 text-gray-900 w-fit duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </Container>
            </Container>
          </Container>
        </React.Fragment>
      }
    />
  )
}
