'use client'

import React, { useEffect, useState, useRef, KeyboardEvent } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'
import { Radio, SearchBar } from '../../../atoms'
import { DropDownOption, DropDownProps } from '../../../../types'

export const Dropdown: React.FC<DropDownProps> = ({
  options,
  selectedValue,
  isSearchable,
  placeholder,
  invalid = null,
  isRadio = true,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<string | undefined>(selectedValue)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSelected(selectedValue)
  }, [selectedValue])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelectChange = (value: string) => {
    setSelected(value)
    setIsOpen(false)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setHighlightedIndex(-1) // Reset highlighted index when search query changes
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (filteredOptions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (highlightedIndex < filteredOptions.length - 1) {
          setHighlightedIndex((prevIndex) => prevIndex + 1)
        } else {
          setHighlightedIndex(0)
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (highlightedIndex > 0) {
          setHighlightedIndex((prevIndex) => prevIndex - 1)
        } else {
          setHighlightedIndex(filteredOptions.length - 1)
        }
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex !== -1) {
          handleSelectChange(filteredOptions[highlightedIndex].value!)
        }
        break
      default:
        break
    }
  }

  const filterOptions = (
    options: DropDownOption[],
    query: string
  ): DropDownOption[] => {
    if (!query) return options

    return options.reduce<DropDownOption[]>((acc, option) => {
      if (option.label.toLowerCase().includes(query.toLowerCase())) {
        acc.push(option)
      } else if (option.options) {
        const filteredSubOptions = filterOptions(option.options, query)
        if (filteredSubOptions.length > 0) {
          acc.push({ ...option, options: filteredSubOptions })
        }
      }
      return acc
    }, [])
  }

  const filteredOptions = filterOptions(options, searchQuery)

  const renderOptions = (options: DropDownOption[], level = 0) => {
    return options.map((option, index) => {
      if (option.options) {
        return (
          <div
            key={option.label}
            className={`pl-${level * 2} border-b border-1 border-neutral-300`}
          >
            <div className="text-neutral-900 text-sm font-semibold ml-2">
              {option.label}
            </div>
            {renderOptions(option.options, level + 1)}
          </div>
        )
      } else {
        return (
          <div
            key={option.value}
            onClick={() => handleSelectChange(option.value!)}
            className={`block h-9 px-4 py-2 text-sm ${
              option.value === selected
                ? 'text-primary-100'
                : 'text-neutral-900'
            } ${
              index === highlightedIndex
                ? 'bg-primary-100 bg-opacity-10'
                : 'hover:bg-primary-100 hover:bg-opacity-10'
            } cursor-pointer`}
            role="menuitem"
          >
            <span className="flex items-center justify-between">
              <span className="flex items-center">
                {isRadio && (
                  <Radio
                    invalid={false}
                    checked={option.value === selected}
                    className={
                      option.value === selected ? '' : 'text-neutral-900'
                    }
                  />
                )}
                <span className="ml-2">{option.label}</span>
              </span>
              {!isRadio && option.value === selected && (
                <TiTick className="text-primary-100 ml-auto" />
              )}
            </span>
          </div>
        )
      }
    })
  }

  return (
    <div className="relative inline-block text-left" onKeyDown={handleKeyDown}>
      <div ref={inputRef}>
        <div className="relative rounded-md shadow-sm" onClick={toggleDropdown}>
          {isSearchable ? (
            <SearchBar
              className="bg-neutral-100 hover:outline focus:outline-1 hover:outline-neutral-300 focus:outline-none focus:outline-neutral-800 disabled:outline disabled:outline-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-300"
              Icon={isOpen ? FaCaretUp : FaCaretDown}
              invalid={false}
              disabled={false}
              isSearchActive={true}
              onChange={handleSearchChange}
              placeholder=""
              value={selected ? selected : searchQuery}
              {...props}
            />
          ) : (
            <SearchBar
              className="bg-neutral-100 hover:outline focus:outline-1 hover:outline-neutral-300 focus:outline-none focus:outline-neutral-800 disabled:outline disabled:outline-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-300"
              Icon={isOpen ? FaCaretUp : FaCaretDown}
              invalid={false}
              isSearchActive={false}
              placeholder={selected ? selectedValue : placeholder}
              value={selected ? selected : ''}
              {...props}
            />
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 max-h-80 mt-2 w-full overflow-y-scroll rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          ref={dropdownRef}
        >
          <div
            className="py-1 h-auto"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {renderOptions(filteredOptions)}
          </div>
        </div>
      )}

      {/* html element under the hood for form serialization */}
      <select
        value={selectedValue}
        onChange={(e) => handleSelectChange(e.target.value)}
        className="hidden"
      >
        {options.map((option) => (
          <optgroup key={option.label} label={option.label}>
            {option.options &&
              option.options.map((subOption) => (
                <option key={subOption.value} value={subOption.value}>
                  {subOption.label}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
