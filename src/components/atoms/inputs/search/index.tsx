'use client'

import React, { useState, useEffect } from 'react'
import { INPUT_TYPE, SearchBarProps } from '../../../types'
import BaseInput from '../base-input'

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  className,
  onChange,
  iconClassName,
  disabled,
  iconOnClick,
  onClick,
  value,
  Icon,
  isSearchActive = true,
  children
}: SearchBarProps) => {
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

  return (
    <div
      className={`w-auto flex ${className} justify-around items-center bg-neutral-100 rounded-lg overflow-hidden`}
    >
      <BaseInput
        type={INPUT_TYPE.TEXT}
        invalid={false}
        value={valueInput}
        disabled={disabled}
        placeholder={placeholder}
        className={`flex-grow ml-0 bg-neutral-100 border-none py-2 px-4 w-80 text-lg outline-none rounded-lg`}
        onChange={handleOnChange}
        onClick={handleClick}
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

export default SearchBar
