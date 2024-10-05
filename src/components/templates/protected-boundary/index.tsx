'use client'

import React from 'react'
import { ProtectedBoundaryProps } from '@/types'

export const ProtectedBoundary = ({ children }: ProtectedBoundaryProps) => {
  return <React.Fragment>{children}</React.Fragment>
}
