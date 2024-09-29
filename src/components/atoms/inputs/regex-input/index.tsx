'use client'

import React, { useState } from 'react'
import { TextInput } from '../text-input'
import { RegexInputProps } from '../../../../types'

export const RegexInput: React.FC<RegexInputProps> = ({
  pattern,
  className,
  onValidation,
  onChange,
  ...props
}: RegexInputProps) => {
  const [isValid, setIsValid] = useState(true)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const regex = new RegExp(pattern)
    const validationStatus = regex.test(inputValue)
    setIsValid(validationStatus)
    if (onValidation) {
      onValidation(validationStatus)
    }
    onChange && onChange(e)
  }

  return (
    <TextInput
      {...props} // Spread the rest of the props
      aria-invalid={!isValid}
      onChange={handleInputChange}
      className={`w-full border rounded px-3 py-2 border-transparent bg-neutral-100 hover:border-1 hover:border-neutral-400 disabled:bg-neutral-100 disabled:border-1 disabled:border-neutral-200 focus:border-1 focus:border-neutral-800 focus:bg-neutral-100 outline-none ${
        isValid ? 'border-neutral-300' : 'border-error'
      } ${className}`}
    />
  )
}

export default RegexInput
