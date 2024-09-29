import React from 'react'

export type CardProps = {
  title?: string
  content?: string
  img?: string
  outlined?: boolean
  size?: 'small' | 'medium' | 'large'
  className?: string
  shadow?: 'none' | 'small' | 'medium' | 'large'
} & { children?: React.ReactNode }
