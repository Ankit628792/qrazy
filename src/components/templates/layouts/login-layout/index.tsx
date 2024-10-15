import React from 'react'
import { LoginLayoutProps } from '@/types'
import { Container } from '@/components/atoms'
import { ThemeSwitcher } from '@/shared/components/header/components/theme-switcher-button'

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <Container className="flex flex-col min-h-dvh w-full text-black dark:text-white bg-white dark:bg-black">
      {children}
      <div
        className="fixed bottom-2 right-2 z-50 p-2 bg-white dark:bg-black rounded-full"
        draggable
      >
        <ThemeSwitcher />
      </div>
    </Container>
  )
}
