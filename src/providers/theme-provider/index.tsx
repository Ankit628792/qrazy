import React from 'react'
import { ThemeProvider } from 'next-themes'

type ThemeProviderProps = Readonly<{
  children: React.ReactNode
}>

export function NextThemesProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  )
}
