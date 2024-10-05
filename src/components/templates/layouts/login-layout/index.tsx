import React from 'react'
import { LoginLayoutProps } from '@/types'
import { Container } from '@/components/atoms'

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <React.Fragment>
      <Container className="h-screen w-screen flex items-center justify-center">
        {children}
      </Container>
    </React.Fragment>
  )
}
