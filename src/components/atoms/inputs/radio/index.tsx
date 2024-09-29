'use client'

import BaseInput from '../base-input'
import React, { useState } from 'react'
import {
  MdOutlineRadioButtonUnchecked,
  MdOutlineRadioButtonChecked
} from 'react-icons/md'
import { INPUT_TYPE, RadioProps } from '../../../../types'

export const Radio: React.FC<RadioProps> = ({
  name,
  label = '',
  checked = false,
  disabled,
  className,
  hidden,
  radioType = 'base',
  ...props
}: RadioProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked)
  const [isDirty, setIsDirty] = useState<boolean>(false)

  const radioTypeClasses = {
    primary: `text-primary-300 focus:bg-primary-200 ${
      checked ? 'accent-primary-400' : 'accent-neutral-200'
    }`,
    secondary: `text-secondary-300 hover:bg-secondary-100 hover:bg-opacity-5 focus:bg-secondary-200 ${
      checked ? 'accent-secondary-300' : 'accent-neutral-200'
    }`,
    tertiary: `text-tertiary-300  focus:bg-tertiary-200 ${
      checked ? 'accent-tertiary-300' : 'accent-neutral-200'
    }`,
    neutral: `text-neutral-300 hover:bg-neutral-100 hover:bg-opacity-10 focus:bg-neutral-200 ${
      checked ? 'accent-neutral-300' : 'accent-neutral-200'
    }`,
    base: ''
  }

  const handleClick = (e) => {
    setIsDirty(true)
    setIsChecked(!isChecked)
    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <div
      className={`h-8 w-8 p-2 flex items-center hover:bg-${radioType}-100 hover:scale-110 hover:bg-opacity-10 hover:rounded-full`}
    >
      {isChecked ? (
        <MdOutlineRadioButtonChecked
          className={`text-primary-400 ${radioTypeClasses[radioType]}`}
          onClick={handleClick}
        />
      ) : (
        <MdOutlineRadioButtonUnchecked
          className={`text-neutral-900 ${radioTypeClasses[radioType]} `}
          onClick={handleClick}
        />
      )}
      <BaseInput
        type={INPUT_TYPE.RADIO}
        checked={checked}
        dirty={isDirty}
        disabled={disabled}
        hidden={true}
        {...props}
      />
    </div>
  )
}
