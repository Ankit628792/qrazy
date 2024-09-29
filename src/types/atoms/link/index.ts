import React from 'react'

export type LinkProps = {
  to: string
  external?: boolean
  className?: string
  newTab?: boolean
} & { children: React.ReactNode }
