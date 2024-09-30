import React from 'react'
import { PopUpProps } from '../../../types'
import { Modal } from '../../modals'

export const PopUp: React.FC<PopUpProps> = ({
  title,
  isOpen,
  iconClassName,
  footer,
  children,
  className = 'overflow-hidden',
  onClose,
  Icon,
  ...props
}) => {
  const header = (
    <div className="flex justify-start items-center">
      {Icon && <Icon className={`ml-1 h-8 w-8 ${iconClassName}`} />}
      <div className="ml-2 text-h1 font-bold">{title}</div>
    </div>
  )
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={header}
      footer={footer}
      children={children}
      {...props}
    ></Modal>
  )
}
