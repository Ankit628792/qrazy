'use client'

import useOutsideClick from '../../../../hooks/useClickOutSide'
import React, { useState } from 'react'
import { Checkbox, Chip, SearchBar } from '../../../atoms'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'
import {
  MultiSelectDropDownOption,
  MultiSelectDropDownProps
} from '../../../../types'
import { ChipGroup } from '../../chip-groups'

export const MultiSelectDropdown: React.FC<MultiSelectDropDownProps> = ({
  options,
  selectedValues = [],
  placeholder = 'Select options',
  onSelectChange,
  onFormGroupInputChange,
  name,
  isRadio = false,
  className = '',
  disabled = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(selectedValues)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const multiSelectDropDownRef = React.useRef<HTMLDivElement>(null)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)

  useOutsideClick(multiSelectDropDownRef, () => setIsOpen(false))

  const toggleDropdown = () => {
    if (!disabled) setIsOpen(!isOpen)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setHighlightedIndex(-1) // Reset highlighted index when search query changes
  }

  const handleSelectChange = (value: string) => {
    const isSelected = selected.includes(value)
    let updatedSelected: string[]
    if (isSelected) {
      updatedSelected = selected.filter((v) => v !== value)
    } else {
      updatedSelected = [...selected, value]
    }
    setSelected(updatedSelected)
    setSearchQuery('')
    if (onSelectChange) {
      onSelectChange(updatedSelected)
    }
    if (onFormGroupInputChange && name) {
      onFormGroupInputChange(name, updatedSelected)
    }
  }

  const handleChipDelete = (event: React.MouseEvent, value: string) => {
    event.stopPropagation()
    const updatedSelected = selected.filter((v) => v !== value)
    setSelected(updatedSelected)
    if (onSelectChange) {
      onSelectChange(updatedSelected)
    }
    if (onFormGroupInputChange && name) {
      onFormGroupInputChange(name, updatedSelected)
    }
  }

  const isOptionSelected = (value: string) => selected.includes(value)

  const filterOptions = (
    options: MultiSelectDropDownOption[],
    query: string
  ): MultiSelectDropDownOption[] => {
    if (!query) return options

    return options.reduce<MultiSelectDropDownOption[]>((acc, option) => {
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

  const renderOptions = (options: MultiSelectDropDownOption[], level = 0) => {
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
              isOptionSelected(option.value ? option.value : '')
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
                <Checkbox
                  invalid={false}
                  checked={isOptionSelected(option.value ? option.value : '')}
                  hidden={true}
                  onChange={(e) => {
                    e.stopPropagation()
                    handleSelectChange(option.value!)
                  }}
                />
                <span className="ml-2">{option.label}</span>
              </span>
            </span>
          </div>
        )
      }
    })
  }

  const handleChipDeleteProp = (value: string) => {
    setSelected((ps) => ps.filter((item) => item !== value))
  }

  const childComponent = (
    <ChipGroup chips={selected} onDelete={handleChipDeleteProp} />
  )

  return (
    <div>
      <div
        className={`w-full h-full relative inline-block text-left ${className}`}
        ref={multiSelectDropDownRef}
      >
        <div>
          <span onClick={toggleDropdown}>
            <SearchBar
              className="bg-neutral-100 hover:outline focus:outline-1 hover:outline-neutral-300 focus:outline-none focus:outline-neutral-800 disabled:outline disabled:outline-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-300"
              Icon={isOpen ? FaCaretUp : FaCaretDown}
              invalid={false}
              disabled={false}
              isSearchActive={isOpen}
              onChange={handleSearchChange}
              placeholder={placeholder}
              value={searchQuery}
              children={childComponent}
            />
          </span>
        </div>
        {isOpen && (
          <div className="relative h-80">
            {/* Dropdown panel */}
            <div className="absolute right-0 mt-2 w-full h-full overflow-scroll rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {renderOptions(filteredOptions)}
              </div>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="mt-2 w-full">
          <div className="w-full flex flex-wrap gap-2 bg-white rounded-md p-2">
            {selected.map((value) => (
              <div key={value}>
                <Chip
                  {...props}
                  onDelete={(event) => handleChipDelete(event, value)}
                  label={value}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MultiSelectDropdown
