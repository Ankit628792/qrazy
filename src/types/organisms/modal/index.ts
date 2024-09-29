import React from 'react'

export interface ModalProps {
  isOpen: boolean
  header?: React.ReactNode
  // title?: string
  footer?: React.ReactNode
  children?: React.ReactNode
  className?: string
  onClose: () => void
}
