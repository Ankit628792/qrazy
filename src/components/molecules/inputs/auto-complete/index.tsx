'use client'

import BaseInput from '../../../atoms/inputs/base-input'
import useDebounce from '../../../hooks/useDebouce'
import React, { useEffect, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { AutoCompleteProps } from '../../../../types'

export const AutoComplete = <T,>({
  options,
  selectedValue = '',
  handleChange,
  onChangeSelect,
  displayKey = 'value',
  debounceTime = 300,
  charLimit = 3,
  getValue = 'value',
  getSuggestions = () => {},
  clearShowOptions = () => {},
  ...props
}: AutoCompleteProps<T>) => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false)
  const [selected, setSelected] = useState(selectedValue)
  const [search, setSearch] = useState(selected)
  const debouncedSearchInput = useDebounce(search, debounceTime)

  useEffect(() => {
    setSelected(selectedValue)
    if (debouncedSearchInput.length > charLimit) {
      getSuggestions(debouncedSearchInput)
    } else {
      clearShowOptions()
    }
  }, [selectedValue, debouncedSearchInput])

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropdownOpen)
  }

  const handleSelectChange = (data) => {
    setSelected(data[displayKey])
    setSearch(data[displayKey])
    onChangeSelect &&
      onChangeSelect(
        props.name,
        (getValue && data[getValue]) || data[displayKey]
      )
    setIsDropDownOpen(false)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value
    setSearch(value)
    onChangeSelect && onChangeSelect(props.name, value)
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-end">
        <BaseInput
          value={search}
          className="w-full border rounded px-3 py-2 border-transparent bg-neutral-100 hover:border-1 hover:border-neutral-400 disabled:bg-neutral-100 disabled:border-1 disabled:border-neutral-200 focus:border-1 focus:border-neutral-800 focus:bg-neutral-100 outline-none"
          onChange={(e) => {
            handleInputChange(e)
          }}
          placeholder="regex search"
          {...props}
        />
        <span className="absolute mr-2" onClick={toggleDropdown}>
          {isDropdownOpen === true ? <BiChevronUp /> : <BiChevronDown />}
        </span>
      </div>
      {isDropdownOpen && options.length > 0 && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div
            className="py-1 overflow-auto max-h-36"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <div
                key={option[displayKey]}
                onClick={() => handleSelectChange(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                role="menuitem"
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
