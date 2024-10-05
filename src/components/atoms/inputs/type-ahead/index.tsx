'use client'

import BaseInput from '../base-input'
import React, { useState, useEffect } from 'react'
import { INPUT_TYPE, TypeAheadProps } from '../../../../types'

export const TypeAhead: React.FC<TypeAheadProps> = ({
  placeholder = 'Search...',
  className,
  iconClassName,
  disabled,
  value,
  Icon,
  isSearchActive = true,
  children,
  onChange,
  iconOnClick,
  onClick
}: TypeAheadProps) => {
  const [valueInput, setValueInput] = useState<string | string[]>(value || '')
  const [isSearchActiveState, setIsSearchActive] =
    useState<boolean>(isSearchActive)

  useEffect(() => {
    if (!isSearchActive) return
    setValueInput(value || '')
  }, [value])

  useEffect(() => {
    setIsSearchActive(!isSearchActive)
  }, [isSearchActiveState])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSearchActive) return
    setValueInput(e.target.value)
    if (onChange) {
      onChange(e)
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setValueInput('')
    if (onClick) {
      onClick(e)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setValueInput('')
      if (onClick) {
        onClick(e as any)
      }
      if (iconOnClick) {
        iconOnClick()
      }
    }
  }

  return (
    <div
      className={`w-auto flex ${className} justify-around items-center bg-neutral-100 rounded-lg overflow-hidden`}
    >
      <h1 className="hidden">{valueInput}</h1>
      <BaseInput
        type={INPUT_TYPE.TEXT}
        invalid="false"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={`flex-grow ml-0 bg-neutral-100 border-none py-2 px-4 w-80 text-lg outline-none rounded-lg`}
        onChange={handleOnChange}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
      {!isSearchActive && children && children}
      {Icon && (
        <Icon
          className={`mr-4 text-xs ${iconClassName}`}
          onClick={iconOnClick}
        />
      )}
    </div>
  )
}

export default TypeAhead
