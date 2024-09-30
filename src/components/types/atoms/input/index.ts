export enum INPUT_TYPE {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  NUMBER = 'number',
  FILE = 'file',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  MULTI_CHECKBOX = 'multi-checkbox',
  COLOR = 'color',
  DATE = 'date',
  DATETIME = 'datetime-local',
  DATE_RANGE = 'date-range',
  DATETIME_RANGE = 'datetime-range',
  NUMERIC_RANGE = 'numeric-range',
  REGEX = 'regex',
  TEXT_AREA = 'textarea',
  SELECT = 'select',
  MULTI_SELECT = 'multi-select',
  IMAGE = 'image',
  SINGLE_FILE = 'single-file',
  MULTI_FILE = 'multi-file',
  RANGE = 'range',
  TIME = 'time'
}
export enum DAYS_OF_WEEK {
  Sunday = 'S',
  Monday = 'M',
  Tuesday = 'T',
  Wednesday = 'W',
  Thursday = 'T',
  Friday = 'F',
  Saturday = 'S'
}

export enum MONTHS {
  January = 'January',
  February = 'February',
  March = 'March',
  April = 'April',
  May = 'May',
  June = 'June',
  July = 'July',
  August = 'August',
  September = 'September',
  October = 'October',
  November = 'November',
  December = 'December'
}

export interface BaseInputProps<T extends HTMLElement = HTMLInputElement> {
  // Core attributes
  id?: string
  name?: string
  value?: any
  defaultValue?: any
  type?: INPUT_TYPE
  placeholder?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  autoFocus?: boolean
  maxLength?: number
  minLength?: number
  pattern?: string // Regex pattern for validation
  hidden?: boolean

  // Event handlers
  onChange?: (event: React.ChangeEvent<T>) => void
  onFocus?: (event: React.FocusEvent<T>) => void
  onBlur?: (event: React.FocusEvent<T>) => void
  onKeyUp?: (event: React.KeyboardEvent<T>) => void
  onKeyDown?: (event: React.KeyboardEvent<T>) => void
  onKeyPress?: (event: React.KeyboardEvent<T>) => void
  onClick?: (event: React.MouseEvent<T>) => void

  // Styling and layout
  className?: string
  style?: React.CSSProperties

  // Special attributes for specific input types
  accept?: string // For 'file' type, e.g., ".jpg,.png,.jpeg"
  multiple?: boolean // For 'file' type
  step?: number // For 'number' or 'range' type
  min?: number | string // For 'number', 'range', 'date', 'time', 'datetime-local', 'month', 'week'
  max?: number | string // For 'number', 'range', 'date', 'time', 'datetime-local', 'month', 'week'
  checked?: boolean // For 'radio' and 'checkbox'
  defaultChecked?: boolean // For 'radio' and 'checkbox'
  alt?: string // For 'image' type
  src?: string // For 'image' type
  list?: string // Refers to a <datalist> element

  //dirty - whether it has been touched or not
  dirty?: boolean
  //Validity of input
  invalid?: boolean

  // ARIA and accessibility attributes
  ariaLabel?: string
  ariaLabelledby?: string
  ariaDescribedby?: string
  ariaRequired?: boolean
  ariaInvalid?: boolean
  ariaValueNow?: number
  ariaValueMin?: number
  ariaValueMax?: number

  // Custom data attributes
  [key: string]: any // This allows for custom data-* attributes or any other prop not explicitly listed
}

export interface CheckboxProps extends BaseInputProps<HTMLInputElement> {
  label?: string
}

export interface DateInputProps extends BaseInputProps {
  minDate?: Date // Minimum selectable date
  maxDate?: Date // Maximum selectable date
  bounded?: boolean // check for if date is within range
  disabled?: boolean
  opened?: boolean
  openNext: boolean
  preSelectedDate?: Date | null
}

export interface DateRangeInputProps extends BaseInputProps<HTMLInputElement> {
  startDate: string
  endDate: string
  minDate?: string // Minimum selectable date
  maxDate?: string // Maximum selectable date
  onStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFormGroupInputChange?: (name: string, value: any) => void
}

export interface DateTimeInputProps extends BaseInputProps {
  value: string
  minDateTime?: string // Minimum selectable date and time
  maxDateTime?: string // Maximum selectable date and time
}

export interface TimeInputProps extends BaseInputProps {
  value: string
  minDateTime?: string // Minimum selectable date and time
  maxDateTime?: string // Maximum selectable date and time
}

export interface DateTimeRangeInputProps extends BaseInputProps {
  startDateTime: string
  endDateTime: string
  minOfMin?: string // Minimum selectable date and time for the start input
  maxOfMax?: string // Maximum selectable date and time for the end input
  onStartDateChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onEndDateChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface EmailInputProps extends BaseInputProps {}

export interface ImageUploadProps extends BaseInputProps {
  showPreview?: boolean
  onFileChange?: (file: File | null) => void
}

export interface MultiImageUploadProps extends BaseInputProps {
  showPreviews?: boolean
  onFilesChange?: (files: File[] | null) => void
}

export interface NumberInputProps extends BaseInputProps {
  min?: number // Minimum allowable number
  max?: number // Maximum allowable number
  step?: number // Step size for incrementing/decrementing the value
}

export interface TypeAheadProps extends BaseInputProps {
  iconClassName?: string
  isSearchActive?: boolean
  children?: React.ReactNode
  Icon?: React.ComponentType<{ className?: string; onClick?: () => void }>
  iconOnClick?: () => void
}

export interface TextAreaInputProps
  extends BaseInputProps<HTMLTextAreaElement> {
  rows?: number
  cols?: number
  lengthReq?: number // Maximum allowable length
}

export interface TextInputProps extends BaseInputProps {
  // Additional props specific to TextInput
  autoComplete?: 'on' | 'off' // For controlling browser autocomplete behavior
}

export interface SwitchProps extends BaseInputProps<HTMLInputElement> {
  checked: boolean
  onSwitch?: () => void
}

export interface SearchBarProps extends BaseInputProps {
  iconClassName?: string
  isSearchActive?: boolean
  children?: React.ReactNode
  Icon?: React.ComponentType<{ className?: string; onClick?: () => void }>
  iconOnClick?: () => void
}

export interface SingleFileUploadProps extends BaseInputProps {
  maxSize?: number // in bytes
  allowedExtensions?: string[]
  dragAndDrop?: boolean
  showProgress?: boolean
  onFileChange?: (file: File | null) => void
}

export interface NumericRangeInputProps extends BaseInputProps {
  min: number
  max: number
  onRangeChange: (min: number, max: number) => void
}

export interface NumericRangeSliderInputProps extends BaseInputProps {
  min: number
  max: number
  value: [number, number]
  onRangeChange: (value: [number, number]) => void
}

export interface PasswordInputProps extends BaseInputProps {
  showPasswordToggle?: boolean // Allow users to toggle password visibility
}

export interface RadioProps extends BaseInputProps<HTMLInputElement> {
  label?: string
  radioType?: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'base'
}

export interface RegexInputProps extends BaseInputProps {
  pattern: string // Regular expression pattern
  onValidation?: (isValid: boolean) => void // Callback to inform parent about validation status
}
