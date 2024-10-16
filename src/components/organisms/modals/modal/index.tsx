import React from 'react'
import { ModalProps } from '../../../../types'

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  header,
  footer,
  children,
  className = 'overflow-hidden'
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center min-h-screen">
      <div className="fixed inset-0 transition-opacity" onClick={onClose}>
        <div className="absolute inset-0 bg-neutral-400 opacity-75"></div>
      </div>

      <div
        className={`bg-white rounded-lg shadow-xl transform transition-all mobile:max-w-lg mobile:w-full ${className}`}
      >
        <div className="space-y-10">
          {header && <div>{header}</div>}
          <div className="bg-white">{children}</div>
          {footer && (
            <div className="sm:flex sm:flex-row-reverse">{footer}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal
