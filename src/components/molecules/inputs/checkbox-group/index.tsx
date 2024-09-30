'use client'

import React, { useState } from 'react'
import { Checkbox } from '../../../atoms'
import { CheckboxGroupProps } from '../../../types'

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  disabled = false,
  name,
  onChange
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    options.filter((option) => option.checked).map((option) => option.value)
  )

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isChecked: boolean
  ) => {
    const updatedSelectedValues = isChecked
      ? [...selectedValues, e.target.value]
      : selectedValues.filter(
          (selectedValue) => selectedValue !== e.target.value
        )

    setSelectedValues(updatedSelectedValues)
    if (onChange) {
      onChange(updatedSelectedValues)
    }
  }

  return (
    <div>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          invalid={false}
          label={option.label}
          checked={selectedValues.includes(option.value)}
          onChange={(e) => handleCheckboxChange(e, option.checked || false)}
          disabled={disabled}
          name={name}
          value={option.value}
        />
      ))}
    </div>
  )
}
