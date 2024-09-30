import React from 'react'
import { LoginLayoutProps } from '@/types'

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <React.Fragment>
      login layout
      {children}
    </React.Fragment>
  )
}
