import React from 'react'
import { FormRowProps } from '../../../../types'

export const FormRow: React.FC<FormRowProps> = ({
  children,
  gap = '4',
  className = ''
}) => {
  return (
    <div className={`flex flex-row -mx-${gap} ${className}`}>
      {React.Children.map(children, (child) => (
        <div className={`w-full`}>{child}</div>
      ))}
    </div>
  )
}
