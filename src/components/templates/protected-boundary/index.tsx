'use client'

import React from 'react'
import { ProtectedBoundaryProps } from '@/types'
import { AuthComponent } from '@/features/auth'

export const ProtectedBoundary = ({
  children,
  isUserLoggedIn
}: ProtectedBoundaryProps) => {
  if (isUserLoggedIn) {
    return <React.Fragment>{children}</React.Fragment>
  }

  return (
    <React.Fragment>
      <AuthComponent />
    </React.Fragment>
  )
}
