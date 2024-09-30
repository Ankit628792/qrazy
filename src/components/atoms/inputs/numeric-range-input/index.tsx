'use client'

import React, { useState } from 'react'
import { NumberInput } from '../number-input'
import { NumericRangeInputProps } from '../../../../types'

export const NumericRangeInput: React.FC<NumericRangeInputProps> = ({
  min,
  max,
  value,
  onRangeInputChange,
  label = ['min', 'max'],
  required = false,
  onRangeChange,
  ...props
}: NumericRangeInputProps) => {
  const labelStyles: React.CSSProperties = {}
  if (props.disabled) {
    labelStyles.color = '#B2B2B2'
    labelStyles.cursor = 'not-allowed'
  }

  const [minValue, setMinValue] = useState(min)
  const [maxValue, setMaxValue] = useState(max)

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = parseInt(e.target.value, 10)
    if (newMinValue >= min && newMinValue <= maxValue) {
      setMinValue(newMinValue)
      onRangeChange(newMinValue, maxValue)
    }
    if (onRangeInputChange) {
      onRangeInputChange(newMinValue, maxValue)
    }
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = parseInt(e.target.value, 10)
    if (newMaxValue <= max && newMaxValue >= minValue) {
      setMaxValue(newMaxValue)
      onRangeChange(minValue, newMaxValue)
    }
    if (onRangeInputChange) {
      onRangeInputChange(minValue, newMaxValue)
    }
  }

  return (
    <div className={`flex gap-2 ${props.className}`}>
      <div className="flex flex-col w-full">
        <label className="block text-neutral-900 font-sans" style={labelStyles}>
          {label[0]}
          {required && (
            <span style={labelStyles} className="text-primary-500">
              *
            </span>
          )}
        </label>
        <NumberInput
          value={minValue}
          onChange={handleMinChange}
          placeholder="Min"
          min={min}
          max={maxValue}
          {...props} // Spread the rest of the props
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="block text-neutral-900 font-sans" style={labelStyles}>
          {label[1]}
          {required && (
            <span style={labelStyles} className="text-primary-500">
              *
            </span>
          )}
        </label>
        <NumberInput
          value={maxValue}
          onChange={handleMaxChange}
          placeholder="Max"
          min={minValue}
          max={max}
          {...props} // Spread the rest of the props
        />
      </div>
    </div>
  )
}

export default NumericRangeInput
