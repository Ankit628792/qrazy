import React from 'react'
import { LabelProps } from '../../../../types'

export const Label: React.FC<LabelProps> = ({
  text = 'Label',
  htmlFor,
  className = '',
  mandatory = true,
  Icon,
  children
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-neutral-900 flex items-center relative mb-1.5 text-h6 tablet:text-h6 font-semibold${className}`}
    >
      <span className="mr-1.5">{text}</span>
      {mandatory && <span className="text-primary-400">*</span>}
      {Icon && <Icon className="ml-1" />}
      {children}
    </label>
  )
}
