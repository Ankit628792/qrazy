'use client'

import BaseInput from '../base-input'
import React, { useState } from 'react'
import { BiHide, BiShowAlt } from 'react-icons/bi'
import { INPUT_TYPE, PasswordInputProps } from '../../../../types'

export const PasswordInput: React.FC<PasswordInputProps> = ({
  showPasswordToggle = false,
  invalid = 'false',
  className,
  onChange,
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true)
    if (onChange) {
      onChange(event)
    }
  }

  return (
    <>
      <div className="relative">
        <BaseInput
          type={showPassword ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
          className={`w-full disabled:cursor-not-allowed border rounded-lg px-3 py-2 bg-neutral-100 outline-none ${className}`}
          dirty={isDirty}
          invalid={invalid ? 'true' : undefined}
          onChange={handleChange}
          {...props}
        />
        {showPasswordToggle && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <BiShowAlt /> : <BiHide />}
          </span>
        )}
      </div>
    </>
  )
}

export default PasswordInput
