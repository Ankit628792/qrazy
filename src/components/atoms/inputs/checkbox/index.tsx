'use client'

import BaseInput from '../base-input'
import React, { useState, useEffect } from 'react'
import { IoCheckbox } from 'react-icons/io5'
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import { CheckboxProps, INPUT_TYPE } from '../../../types'
import { Label } from '../../labels'

export const Checkbox: React.FC<CheckboxProps> = ({
  label = '',
  checked,
  disabled,
  onChange,
  onClick,
  ...props
}: CheckboxProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const [isChecked, setIsChecked] = useState(checked)

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  const handleClick = (event) => {
    if (disabled) return
    setIsDirty(true)
    setIsChecked(!isChecked)
    if (onChange) {
      onChange(event)
    }
  }

  return (
    <div className="flex items-center space-x-3">
      {isChecked ? (
        <IoCheckbox
          className={`h-4.5 w-4.5 text-primary-400  ${
            disabled ? 'bg-neutral-200 cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={handleClick}
        />
      ) : (
        <MdOutlineCheckBoxOutlineBlank
          className={`h-4.5 w-4.5 text-neutral-400  ${
            disabled ? 'bg-neutral-200 cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={handleClick}
        />
      )}
      <BaseInput
        type={INPUT_TYPE.CHECKBOX}
        hidden={true}
        checked={isChecked}
        dirty={isDirty}
        disabled={disabled}
        {...props}
      />
      {label && (
        <Label className="text-neutral-700" text={label} mandatory={false} />
      )}
    </div>
  )
}
