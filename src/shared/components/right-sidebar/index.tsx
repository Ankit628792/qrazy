import useClickOutside from '@/components/hooks/useClickOutSide'
import React, { useRef } from 'react'
import { AiTwotoneCloseCircle } from 'react-icons/ai'
import { Bars3BottomRightIcon } from '@heroicons/react/20/solid'
import { ButtonWithIcon, Container } from '@/components'

type RightSideBarMenuProps = {
  sideBarOpen: boolean
  headerNode: React.ReactNode
  Children: React.ReactNode
  hideBurgerMenuButton?: boolean
  setSideBarOpen: (value: boolean) => void
}

export const RightSideBarMenu = ({
  sideBarOpen,
  headerNode,
  Children,
  hideBurgerMenuButton = true,
  setSideBarOpen
}: RightSideBarMenuProps) => {
  const sideBarRef = useRef(null)

  const handleCloseModal = () => {
    setSideBarOpen(false)
  }

  useClickOutside(sideBarRef, handleCloseModal)

  return (
    <div ref={sideBarRef}>
      {!hideBurgerMenuButton && (
        <Bars3BottomRightIcon
          className="h-6 w-6 cursor-pointer text-gray-900"
          onClick={() => setSideBarOpen(true)}
          aria-hidden="true"
        />
      )}
      <Container
        className={`fixed inset-y-0 right-0 w-[446px] bg-gray-100 z-50 transform transition-transform ease-in-out duration-300 border-x border-gray-500/10 ${sideBarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <Container className="bg-gray-100 h-screen">
          <Container className="p-7">
            <Container className="flex items-center justify-between">
              {headerNode}
              <ButtonWithIcon
                Icon={AiTwotoneCloseCircle}
                onClick={() => setSideBarOpen(false)}
                btnType="tertiary"
              />
            </Container>
            <div
              className="mt-6"
              style={{
                height: 'calc(100% - 3.5rem)'
              }}
            >
              {Children}
            </div>
          </Container>
        </Container>
      </Container>
    </div>
  )
}
