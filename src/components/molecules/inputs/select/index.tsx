'use client'

import React, { useState, useEffect } from 'react'
import { SelectProps } from '../../../types'

export const Select = <T,>({
  options,
  selectedValue,
  onChange: onSelectChange,
  onClick,
  placeholder = '',
  getSelectedValue,
  displayKey = 'value',
  ...baseProps
}: SelectProps<T>) => {
  const [selected, setSelected] = useState(selectedValue)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setSelected(selectedValue)
  }, [selectedValue])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    getSelectedValue && getSelectedValue(value)
    setSelected(value)
    if (onSelectChange) {
      onSelectChange(event)
    }
  }

  const handleOnClick = (event: React.MouseEvent<HTMLSelectElement>) => {
    setIsOpen(!isOpen)
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <div className="relative">
      <select
        value={selected}
        onChange={handleSelectChange}
        onClick={handleOnClick}
        className="block appearance-none w-auto bg-neutral-100 hover:outline focus:outline-1 rounded px-4 py-2 pr-8 group hover:outline-neutral-300 focus:outline-none focus:outline-neutral-800 
        disabled:outline disabled:outline-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-300
        "
        {...baseProps}
      >
        {/* Default unselected option */}
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option
            key={option[displayKey]}
            value={option[displayKey]}
            className="hover:bg-primary-100 hover:bg-opacity-10"
          >
            {option[displayKey]}
          </option>
        ))}
      </select>
    </div>
  )
}
