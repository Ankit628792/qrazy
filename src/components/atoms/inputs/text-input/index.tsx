'use client'

import BaseInput from '../base-input'
import React, { useState } from 'react'
import { INPUT_TYPE, TextInputProps } from '../../../../types'

export const TextInput: React.FC<TextInputProps> = ({
  autoComplete = 'off',
  className = '',
  invalid = 'false',
  onChange,
  ...props
}) => {
  const [isDirty, setIsDirty] = useState(false)
  const inputStyles: React.CSSProperties = {}

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true)
    if (onChange) {
      onChange(event)
    }
  }

  if (props.disabled) {
    inputStyles.color = 'neutral-400'
    inputStyles.cursor = 'not-allowed'
  }

  return (
    <BaseInput
      type={INPUT_TYPE.TEXT}
      autoComplete={autoComplete}
      className={`w-full disabled:cursor-not-allowed border rounded-lg px-3 py-2 bg-neutral-100 outline-none ${className}`}
      style={inputStyles}
      invalid={invalid ? 'true' : undefined}
      dirty={isDirty}
      onChange={handleChange}
      {...props}
    />
  )
}
