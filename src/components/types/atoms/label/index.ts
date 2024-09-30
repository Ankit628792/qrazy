import React from 'react'
import { IconType } from 'react-icons'

export type LabelProps = {
  text: string
  description?: string
  htmlFor?: string
  className?: string
  mandatory?: boolean
  Icon?: IconType
} & { children?: React.ReactNode }
