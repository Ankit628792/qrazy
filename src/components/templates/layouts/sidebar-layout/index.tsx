import React from 'react'
import { HeaderComponent } from '@/shared/components/header'
import { SidebarLayoutProps } from '@/types'
import { Container } from '@/components/atoms'
import { LeftSideBarMenu } from '@/shared/components/left-sidebar'

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <React.Fragment>
      <HeaderComponent />
      <Container className="h-[calc(100vh-68px)] flex">
        <Container className="h-full w-[246px]">
          <LeftSideBarMenu />
        </Container>
        <Container className="h-full w-[calc(100vw-246px)] flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-2">
          {children}
        </Container>
      </Container>
    </React.Fragment>
  )
}
