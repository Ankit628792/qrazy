import { ReactNode } from 'react'

export type FormProps = {
  children: ReactNode
  className?: string
  id?: string
}

export type FormGroupInputsProps = {
  children: React.ReactNode
  groupInputName: string
  className?: string
  disabled?: boolean
}

export type FormSelectProps = {
  label: string
  required?: boolean
  // validate?: (value: any) => string | null
  // onChange?: (value: any) => void
  tooltip?: string
  icon?: React.ReactNode
  loading?: boolean
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
  name: string
  groupInputName?: string
  onFormGroupInputChange?: (name: string, value: any) => void
}

export type FormSwitchProps = {
  label: string
  required?: boolean
  // validate?: (value: any) => string | null
  // onChange?: (value: any) => void
  tooltip?: string
  icon?: React.ReactNode
  loading?: boolean
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
  name: string
}
