import React from 'react'
import { IconType } from 'react-icons'

export type ButtonProps = {
  btnType: 'primary' | 'secondary' | 'tertiary'
  type?: 'button' | 'submit' | 'reset'
  disable?: boolean
  name?: string
  value?: string
  className?: string
  btnText?: string
  form?: string
  onClick?: () => void
} & { children?: React.ReactNode }

export type ButtonWithIconProps = ButtonProps & {
  Icon: IconType
}

export type FloatingButtonProps = ButtonProps & {
  Icon: IconType
  rounded?: boolean
}
