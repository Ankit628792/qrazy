import { IconType } from 'react-icons'
import { ModalProps } from '../modal'

export interface PopUpProps extends ModalProps {
  title?: string
  iconClassName?: string
  Icon?: IconType
}
