'use client'

import BaseInput from '../base-input'
import React, { useState } from 'react'
import { EmailInputProps, INPUT_TYPE } from '../../../../types'

export const EmailInput: React.FC<EmailInputProps> = ({
  value,
  invalid = false,
  className,
  onChange,
  ...props
}: EmailInputProps) => {
  const [isValidType, setIsValidType] = useState<boolean>(true)
  const [isDirty, setIsDirty] = useState<boolean>(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true)
    const emailValue = e.target.value
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    const valid = emailRegex.test(emailValue)
    setIsValidType(valid)
    onChange && onChange(e)
  }

  return (
    <BaseInput
      type={INPUT_TYPE.EMAIL}
      invalid={invalid}
      value={value}
      dirty={isDirty}
      onChange={handleEmailChange}
      className={`w-full h-10 border rounded px-3 py-2 border-transparent bg-neutral-100 hover:border-1 hover:border-neutral-400 disabled:bg-neutral-100 disabled:border-1 disabled:border-neutral-200 focus:border-1 focus:border-neutral-800 focus:bg-neutral-100 outline-none ${
        isValidType
          ? 'border-neutral-400'
          : 'border-state-error focus:border-state-error'
      } ${className}`}
      {...props} // Spread the rest of the props
    />
  )
}

export default EmailInput
