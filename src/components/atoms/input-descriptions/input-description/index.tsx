import React from 'react'
import { InputDescriptionProps } from '../../../types'

export const InputDescription: React.FC<InputDescriptionProps> = ({
  text,
  className = '',
  invalid,
  Icon,
  children
}: InputDescriptionProps) => {
  const iconColor = invalid ? 'text-state-error' : 'text-state-success'
  const textColor = invalid ? 'text-state-error' : 'text-state-success'

  return (
    <div
      className={`flex items-center relative mt-1.5 text-h1 font-normal ${className}`}
    >
      {Icon && <Icon className={`mr-1 text-xs ${iconColor}`} />}
      <span className={`mr-1.5 text-h1 ${textColor}`}>{text}</span>
      {children}
    </div>
  )
}
