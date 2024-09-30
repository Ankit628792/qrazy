import React from 'react'
import { FormSectionProps } from '../../../../types'

export const FormSection: React.FC<FormSectionProps> = ({
  label,
  tooltip,
  children,
  className = ''
}) => {
  return (
    <div className={`border p-4 rounded-md mb-4 ${className}`}>
      {label && (
        <label className="block text-neutral-900 font-sans mb-2">{label}</label>
      )}
      {tooltip && <p className="text-neutral-600 text-sm mb-2">{tooltip}</p>}
      <div>{children}</div>
    </div>
  )
}
