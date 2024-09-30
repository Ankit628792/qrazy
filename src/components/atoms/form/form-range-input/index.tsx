import React, { useContext } from 'react'
import { FormContext } from '../../../hooks/useFormContext'
import { FormRangeInputProps, INPUT_TYPE } from '../../../types'

export const FormRangeInput: React.FC<FormRangeInputProps> = ({
  size = 'medium',
  required = false,
  label = ['min', 'max'],
  name,
  // validate,
  // onChange,
  tooltip,
  icon,
  loading,
  children,
  onFormGroupInputChange,
  disabled = false
  // groupInputName
}) => {
  const { handleInputChange, errors, formData }: any = useContext(FormContext)

  const onRangeInputChange = (newMin, newMax) => {
    if (onFormGroupInputChange) {
      onFormGroupInputChange(INPUT_TYPE.RANGE, {
        [label[0]]: newMin,
        [label[1]]: newMax
      })
    } else {
      handleInputChange(name, {
        [label[0]]: newMin,
        [label[1]]: newMax
      })
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
        {tooltip && (
          <span className="ml-2 text-neutral-600 text-sm">{tooltip}</span>
        )}
      </label>
      <div>
        {children &&
          React.cloneElement(children as React.ReactElement, {
            onRangeInputChange: onRangeInputChange,
            label: label,
            required: required,
            disabled: disabled,
            min: formData.validationRules.minLength || 0,
            max: formData.validationRules.maxLength || 100
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
