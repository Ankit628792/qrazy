import React, { useContext } from 'react'
import { FormContext } from '../../../hooks/useFormContext'
import { FormSelectProps } from '../../../types'

export const FormSelect: React.FC<FormSelectProps> = ({
  size = 'medium',
  required = false,
  label,
  name,
  // validate,
  // onChange,
  tooltip,
  icon,
  loading,
  children,
  onFormGroupInputChange,
  groupInputName
}) => {
  const { handleInputChange, errors, formData }: any = useContext(FormContext)

  const onChangeSelect = (name, value) => {
    if (onFormGroupInputChange) {
      onFormGroupInputChange(name, value)
    } else {
      handleInputChange(name, value)
    }
  }

  let sizeClass = ''

  switch (size) {
    case 'small':
      sizeClass = 'p-1 text-sm'
      break
    case 'medium':
      sizeClass = 'p-2 text-base'
      break
    case 'large':
      sizeClass = 'p-3 text-lg'
      break
    default:
      sizeClass = 'p-2 text-base'
  }

  return (
    <div className={`p-2 rounded-md ${sizeClass}`}>
      <label className="block text-neutral-900 font-sans">
        {label}
        {required && <span className="text-primary-500">*</span>}
        {tooltip && (
          <span className="ml-2 text-neutral-600 text-sm">{tooltip}</span>
        )}
      </label>
      <div className="mt-2 relative">
        {children &&
          React.cloneElement(children as React.ReactElement, {
            onChangeSelect: onChangeSelect,
            name: name,
            value: groupInputName
              ? formData[groupInputName][name]
              : formData[name]
          })}
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </span>
        )}
        {loading && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            Loading...
          </span>
        )}
      </div>
      {errors[name] && (
        <span className="block mt-2 text-state-error text-sm">
          {errors[name]}
        </span>
      )}
    </div>
  )
}
