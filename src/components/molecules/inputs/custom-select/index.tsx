'use client'

import BaseInput from '../../../atoms/inputs/base-input'
import React, { useRef, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { CustomSelectProps } from '../../../types'

export const CustomSelect = <T,>({
  options,
  selectedValue,
  onChangeSelect,
  placeholder = 'Select an option',
  getSelectedValue,
  displayKey = 'value',
  getValue,
  disabled = false,
  ...baseProps
}: CustomSelectProps<T>) => {
  const [selected, setSelected] = useState(selectedValue)
  const [isOpen, setIsOpen] = useState(false)
  const customSelectRef = useRef<HTMLDivElement>(null)
  useOutsideClick(customSelectRef, () => setIsOpen(false))

  const toggleDropdown = () => {
    !baseProps.disabled && setIsOpen(!isOpen)
  }

  const handleSelectChange = (option) => {
    getSelectedValue && getSelectedValue(option)
    setSelected(option[displayKey])
    if (onChangeSelect) {
      onChangeSelect(baseProps.name, option[getValue || displayKey])
    }
    toggleDropdown()
  }

  const inputStyles: React.CSSProperties = {}

  if (disabled) {
    inputStyles.color = '#B2B2B2'
    inputStyles.cursor = 'not-allowed'
  }

  return (
    <div
      className="w-full relative inline-block text-left"
      ref={customSelectRef}
    >
      <div>
        <span onClick={toggleDropdown} className="flex">
          <BaseInput
            value={selected || ''}
            readOnly
            className={`w-full border rounded px-3 py-2 border-transparent bg-neutral-100 hover:border-1 hover:border-neutral-400 disabled:bg-neutral-100 disabled:border-1 disabled:border-neutral-200 focus:border-1 focus:border-neutral-800 focus:bg-neutral-100 outline-none`}
            placeholder={placeholder}
            disabled={disabled}
            style={inputStyles}
            // {...baseProps}
          />
          <div className="inline-block -ml-6 mt-3">
            {isOpen === false || disabled ? (
              <BiChevronDown className={`${disabled && 'text-neutral-400'}`} />
            ) : (
              <BiChevronUp />
            )}
          </div>
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div
            className="py-1 max-h-28 overflow-auto"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <div
                key={option[displayKey]}
                className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                role="menuitem"
                onClick={() => handleSelectChange(option)}
              >
                {option[displayKey]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
