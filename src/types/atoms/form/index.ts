import Joi from 'joi'
import { ReactNode } from 'react'

export interface IFormProviderProps<T> {
  children: ReactNode
  schema: Joi.ObjectSchema
  validationDetails?: T[]
  initialValues?: Record<string, any>
  customValidationMessages?: Record<string, string>
  onSubmit: (data: Record<string, any>) => void
  customValidate?: (
    formData: Record<string, any>,
    validationDetails: T[] | undefined,
    setErrors: (errors: Record<string, any>) => void
  ) => boolean
}

export type FormInputProps = {
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
  disabled?: boolean
  onFormGroupInputChange?: (name: string, value: any) => void
}

export interface IFormRadioInput {
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

export type FormRangeInputProps = {
  label: [string, string]
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
  disabled?: boolean
  onFormGroupInputChange?: (name: string, value: any) => void
}

export type FormRowProps = {
  children: ReactNode
  gap?: string // Optional gap between children, using Tailwind's spacing values
  className?: string // For any additional classes the user might want to add
}

export type FormSectionProps = {
  label?: string
  tooltip?: string
  children: ReactNode
  className?: string
}
