import React from 'react'

type LoginLayoutProps = Readonly<{
  children: React.ReactNode
}>

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <React.Fragment>
      login layout
      {children}
    </React.Fragment>
  )
}
