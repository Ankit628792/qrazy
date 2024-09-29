import React from 'react'
import { ModalProps } from '../../../../types'
// import { AiOutlineCloseCircle } from 'react-icons/ai'

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  header,
  // title,
  footer,
  children,
  className = 'overflow-hidden'
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-neutral-400 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>

        <div
          className={`inline-block align-center bg-white rounded-lg text-left shadow-xl px-4 py-4 transform transition-all mobile:align-middle mobile:max-w-lg mobile:w-full ${className}`}
        >
          <div className="space-y-10">
            {header && <div>{header}</div>}
            <div className="bg-white px-2.5">{children}</div>
            {footer && (
              <div className="sm:px-6 sm:flex sm:flex-row-reverse">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
