'use client'

import React from 'react'

export const ProtectedBoundary = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <React.Fragment>{children}</React.Fragment>
}
