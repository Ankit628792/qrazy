'use client'

import React, { useState } from 'react'
import { SwitchProps } from '../../../../types'

export const Switch: React.FC<SwitchProps> = ({
  checked,
  disabled,
  className,
  onSwitch,
  onClick,
  ...props
}: SwitchProps) => {
  const [toggle, setToggle] = useState<boolean>(checked)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSwitch) {
      onSwitch()
    }
    if (props.onChange) {
      props.onChange(e)
    }
  }

  const handleOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (onClick) {
      onClick(e)
    }
    setToggle(!toggle)
  }

  return (
    <label className="flex items-center cursor-pointer h-6 w-6 p-2">
      <div className="relative ">
        <input
          type="checkbox"
          disabled={disabled}
          onChange={handleChange}
          onClick={handleOnClick}
          checked={checked}
          className={`sr-only ${className}`}
          {...props}
        />
        <div
          className={`toggle__line block bg-neutral-200 w-10 h-6 rounded-full shadow-inner border border-neutral-200  ${
            toggle ? 'bg-primary-400' : 'hover:border-neutral-400'
          } ${disabled ? 'bg-neutral-200 cursor-not-allowed' : ''}`}
        ></div>
        <div
          className={`toggle__dot absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transition ${
            toggle ? 'transform translate-x-full ' : ''
          }`}
        ></div>
      </div>
    </label>
  )
}
