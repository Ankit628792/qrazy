'use client'

import { AuthContextProvider } from './auth-provider'
import { ErrorBoundary } from './error-boundary-provider'
import { TanStackQueryProvider } from './tanstack-query-provider'
import { NextThemesProvider } from './theme-provider'

type ProviderProps = Readonly<{
  children: React.ReactNode
}>

export const Provider = ({ children }: ProviderProps) => {
  return (
    <ErrorBoundary>
      <TanStackQueryProvider>
        <NextThemesProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </NextThemesProvider>
      </TanStackQueryProvider>
    </ErrorBoundary>
  )
}
