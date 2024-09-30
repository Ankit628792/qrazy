import { SyntheticEvent } from 'react'
import { BaseInputProps, ChipProps } from '../../atoms'

export interface AutoCompleteProps<T> extends BaseInputProps {
  options: T[]
  selectedValue?: string
  placeholder?: string
  displayKey?: string
  debounceTime?: number
  charLimit?: number
  getValue?: string
  getSuggestions?: (search: string) => void
  clearShowOptions?: () => void
}

export interface CheckboxOption {
  label: string
  value: string
  checked?: boolean
}

export interface CheckboxGroupProps {
  options: CheckboxOption[]
  disabled?: boolean
  name?: string
  onChange?: (selectedValues: string[]) => void
}

export interface CustomSelectProps<T> extends BaseInputProps {
  options: T[]
  selectedValue?: string
  placeholder?: string
  getValue?: string
}

export interface DropDownOption {
  value?: string
  label: string
  options?: DropDownOption[]
}

export interface DropDownProps extends BaseInputProps {
  options: DropDownOption[]
  selectedValue?: string
  placeholder?: string
  isRadio?: boolean
  isGrouped?: boolean
  isSearchable?: boolean
}

export interface MultiFileUploadProps extends BaseInputProps<HTMLInputElement> {
  maxFiles?: number
  minFiles?: number
  maxSize?: number // in bytes
  allowedExtensions?: string[]
  dragAndDrop?: boolean
  showProgress?: boolean
  onFilesChange?: (files: File[]) => void
  setProgress?: (e: SyntheticEvent<HTMLProgressElement, Event>) => void
}

export interface MultiSelectProps<T> extends BaseInputProps<HTMLSelectElement> {
  options: T[]
  selectedValues?: string[]
  disabled?: boolean
  displayKey: string
}

export interface MultiSelectDropDownOption {
  value?: string
  label: string
  options?: MultiSelectDropDownOption[]
}

export interface MultiSelectDropDownProps extends ChipProps, BaseInputProps {
  options: MultiSelectDropDownOption[]
  selectedValues?: string[]
  placeholder?: string
  name?: string
  className?: string
  disabled?: boolean
  isRadio?: boolean
  onSelectChange?: (selectedValues: string[]) => void
  onFormGroupInputChange?: (name: string, value: any) => void
}

export interface NumericListInputProps extends BaseInputProps {
  values: number[]
  min?: number // Minimum allowable number for each input
  max?: number // Maximum allowable number for each input
  onListChange: (values: number[]) => void
}

export interface CountryOption {
  value: string
  label: string
  regexValidity: string
}

export interface PhoneInputProps extends BaseInputProps {
  countries: CountryOption[]
  onCountryChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export interface SelectProps<T> extends BaseInputProps<HTMLSelectElement> {
  options: T[]
  selectedValue?: string
  placeholder?: string
}

export interface SelectWithIconProps<T> extends SelectProps<T> {
  icon: React.ComponentType<{ className?: string }>
}

export interface StringListInputProps extends BaseInputProps {
  notContainsList: string[]
  disabled?: boolean
  label?: string
  onListChange?: (values: string[]) => void
  onFormGroupInputChange?: (name: string, value: string[]) => void
}
