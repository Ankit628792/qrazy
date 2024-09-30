import { IconType } from 'react-icons'

export interface BadgeProps {
  badgeContent: string
  Icon?: IconType
  color?:
    | 'default'
    | 'error'
    | 'warning'
    | 'info'
    | 'success'
    | 'primary'
    | 'secondary'
  onClick?: () => void
}
