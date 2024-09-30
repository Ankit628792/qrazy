'use client'

import React, { useState } from 'react'
import { MultiSelectProps } from '../../../types'

export const MultiSelect = <T,>({
  options,
  selectedValues = [],
  displayKey,
  disabled = false,
  onChange
}: MultiSelectProps<T>) => {
  const [selected, setSelected] = useState<string[]>(selectedValues)

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    )
    setSelected(value)
    onChange && onChange(event)
  }

  return (
    <div className="relative">
      <select
        multiple
        value={selected}
        onChange={handleOptionChange}
        disabled={disabled}
        className="block appearance-none w-full bg-white border border-neutral-20 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {options.map((option) => (
          <option key={option[displayKey]} value={option[displayKey]}>
            {option[displayKey]}
          </option>
        ))}
      </select>
    </div>
  )
}
