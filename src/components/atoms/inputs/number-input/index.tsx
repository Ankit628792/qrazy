'use client'

import BaseInput from '../base-input'
import React, { useState } from 'react'
import { INPUT_TYPE, NumberInputProps } from '../../../../types'

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  className,
  invalid = 'false',
  onChange,
  ...props
}: NumberInputProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const inputStyles: React.CSSProperties = {}

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true)
    if (onChange) {
      onChange(event)
    }
  }

  if (props.disabled) {
    inputStyles.color = '#B2B2B2'
    inputStyles.cursor = 'not-allowed'
  }

  return (
    <>
      <BaseInput
        type={INPUT_TYPE.NUMBER}
        value={value} // Convert number to string for input value
        className={`w-auto disabled:cursor-not-allowed border rounded-lg px-3 py-2 bg-neutral-100 outline-none ${className}`}
        min={min}
        max={max}
        invalid={invalid ? 'true' : undefined}
        step={step}
        style={inputStyles}
        dirty={isDirty}
        onChange={handleChange}
        {...props} // Spread the rest of the props
      />
    </>
  )
}

export default NumberInput
