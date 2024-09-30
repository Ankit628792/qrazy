import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from '@/providers'
import { Container } from '@/components'
import { HeaderComponent } from '@/shared/components/header'
import { ProtectedBoundary } from '../../protected-boundary'
import { FooterComponent } from '@/shared/components/footer'
import { SidebarLayoutProps } from '@/types'

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <React.Fragment>
      <Toaster position="top-center" />
      <Provider>
        <HeaderComponent />
        <ProtectedBoundary {...{ children }} />
        <Container>Sidebar</Container>
        <FooterComponent />
      </Provider>
    </React.Fragment>
  )
}
