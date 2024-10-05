import React, { useContext } from 'react'
import { FormContext } from '../../../hooks/useFormContext'
import { FormGroupInputsProps, INPUT_TYPE } from '../../../../types'

export const FormGroupInputs: React.FC<FormGroupInputsProps> = ({
  children,
  groupInputName,
  className,
  disabled = false
}) => {
  const { handleInputChange, formData }: any = useContext(FormContext)

  const onFormGroupInputChange = (
    name: string,
    value: Record<string, string | number | boolean >
  ) => {
    if (
      name == INPUT_TYPE.RANGE ||
      name == INPUT_TYPE.DATE_RANGE ||
      name == INPUT_TYPE.DATETIME_RANGE
    ) {
      handleInputChange(groupInputName, {
        ...formData[groupInputName],
        ...value
      })
    } else {
      handleInputChange(groupInputName, {
        ...formData[groupInputName],
        [name]: value
      })
    }
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        onFormGroupInputChange: onFormGroupInputChange,
        groupInputName: groupInputName,
        selectedValues: formData.validationRules.notContains,
        notContainsList: formData.validationRules.notContains,
        disabled: disabled
      })
    }
    return child
  })

  return <div className={`flex flex-row ${className}`}>{childrenWithProps}</div>
}
