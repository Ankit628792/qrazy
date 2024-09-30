import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from '@/providers'
import { ProtectedBoundary } from '@/templates/protected-boundary'
import { HeaderComponent } from '@/features/header'
import { FooterComponent } from '@/features/shared/footer'
import { Container } from '@/components'

type SidebarLayoutProps = Readonly<{
  children: React.ReactNode
}>

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
