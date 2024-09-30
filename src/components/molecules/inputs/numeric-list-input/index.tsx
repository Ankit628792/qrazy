'use client'

import React, { useState } from 'react'
import { NumberInput } from '../../../atoms'
import { NumericListInputProps } from '../../../../types'

export const NumericListInput: React.FC<NumericListInputProps> = ({
  values,
  className = '',
  min,
  max,
  onListChange,
  ...baseProps
}: NumericListInputProps) => {
  const [numbers, setNumbers] = useState(values)

  const handleNumberChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedNumbers = [...numbers]
    updatedNumbers[index] = Number(e.target.value)
    setNumbers(updatedNumbers)
    onListChange(updatedNumbers)
  }

  const addNumberInput = () => {
    setNumbers([...numbers, 0])
  }

  const removeNumberInput = (index: number) => {
    const updatedNumbers = [...numbers]
    updatedNumbers.splice(index, 1)

    setNumbers(updatedNumbers)
    onListChange(updatedNumbers)
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {numbers.map((num, index) => (
        <div key={index} className="flex items-center gap-2">
          <NumberInput
            value={num}
            onChange={(e) => handleNumberChange(index, e)}
            min={min}
            max={max}
            {...baseProps}
          />
          <button onClick={() => removeNumberInput(index)}>-</button>
        </div>
      ))}
      <button onClick={addNumberInput} disabled={baseProps.disabled}>
        + Add Number
      </button>
    </div>
  )
}
