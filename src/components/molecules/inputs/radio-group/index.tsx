import React from 'react'
import { Radio } from '../../../atoms'

export type RadioOption = {
  value: string
  label: string
  radioType?: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'base'
}

export interface RadioGroupProps {
  name?: string
  options: RadioOption[]
  selectedValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  onRadioInputChange?: (value: any) => void
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  onRadioInputChange,
  disabled = false
}) => {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
    if (onRadioInputChange) {
      onRadioInputChange(e.target.value)
    }
  }

  return (
    <div>
      {options.map((option) => (
        <Radio
          key={option.value}
          invalid="false"
          name={name || option.value}
          value={option.value}
          label={option.label}
          radioType={option.radioType}
          checked={selectedValue === option.value}
          onChange={handleRadioChange}
          disabled={disabled}
        />
      ))}
    </div>
  )
}
