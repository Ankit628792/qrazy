import { IconType } from 'react-icons'

export type InputDescriptionProps = {
  text: string
  className?: string
  invalid?: boolean
  Icon?: IconType
} & { children?: React.ReactNode }
