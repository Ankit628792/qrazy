'use client'

import React, { useState, ChangeEvent } from 'react'
import { TypeAhead } from '../../../atoms'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { MdDeleteOutline } from 'react-icons/md'
import { StringListInputProps } from '../../../types'

export const StringListInput: React.FC<StringListInputProps> = ({
  notContainsList,
  className = '',
  disabled = false,
  label = 'Add',
  onListChange,
  onFormGroupInputChange,
  ...baseProps
}: StringListInputProps) => {
  const [strings, setStrings] = useState<string[]>(notContainsList || [])
  const [inputValue, setInputValue] = useState<string>('')

  const handleStringChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedStrings = [...strings]
    updatedStrings[index] = e.target.value
    setStrings(updatedStrings)

    if (onFormGroupInputChange && baseProps.name) {
      onFormGroupInputChange(baseProps.name, updatedStrings)
    }
    if (onListChange) {
      onListChange(updatedStrings)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const addStringInput = () => {
    if (inputValue.trim() !== '') {
      const updatedStrings = [inputValue, ...strings]
      setStrings(updatedStrings)
      setInputValue('')

      if (onFormGroupInputChange && baseProps.name) {
        onFormGroupInputChange(baseProps.name, updatedStrings)
      }
      if (onListChange) {
        onListChange(updatedStrings)
      }
    }
  }

  const removeStringInput = (index: number) => {
    const updatedStrings = strings.filter((_, i) => i !== index)
    setStrings(updatedStrings)

    if (onFormGroupInputChange && baseProps.name) {
      onFormGroupInputChange(baseProps.name, updatedStrings)
    }
    if (onListChange) {
      onListChange(updatedStrings)
    }
  }

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <div className="flex items-center gap-2">
        <TypeAhead
          className="w-full bg-neutral-100 hover:outline focus:outline-1 hover:outline-neutral-300 focus:outline-none focus:outline-neutral-800
            disabled:outline disabled:outline-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-300"
          Icon={AiOutlinePlusCircle}
          iconClassName="h-4 w-4 text-primary-400"
          iconOnClick={addStringInput}
          invalid={false}
          disabled={disabled}
          placeholder="Enter your text here..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      {strings.map((str, index) => (
        <div key={index} className="flex items-center gap-2">
          <TypeAhead
            className="w-full bg-neutral-100 hover:outline focus:outline-1 hover:outline-neutral-300 focus:outline-none focus:outline-neutral-800
              disabled:outline disabled:outline-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-300"
            Icon={MdDeleteOutline}
            iconClassName="h-4 w-4 text-primary-400 hover:bg-primary-100 hover:bg-opacity-10 rounded-full transition-transform transform hover:scale-120"
            value={str}
            disabled={disabled}
            onChange={(e) => handleStringChange(index, e)}
            iconOnClick={() => removeStringInput(index)}
            invalid={false}
            isSearchActive={false}
          />
        </div>
      ))}
    </div>
  )
}

export default StringListInput
