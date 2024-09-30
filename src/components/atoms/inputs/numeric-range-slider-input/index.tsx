import React from 'react'
import BaseInput from '../base-input'
import { INPUT_TYPE, NumericRangeSliderInputProps } from '../../../types'

export const NumericRangeSliderInput: React.FC<
  NumericRangeSliderInputProps
> = ({ min, max, value, onRangeChange, ...props }) => {
  const handleRangeMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10)
    onRangeChange([newValue, value[1]])
  }

  const handleRangeMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10)
    onRangeChange([value[0], newValue])
  }

  return (
    <div className="flex items-center gap-2">
      <BaseInput
        type={INPUT_TYPE.RANGE}
        min={min}
        max={max}
        value={value[0]}
        onChange={handleRangeMinChange}
        className="w-full accent-primary-400"
        {...props}
      />
      <span className="text-neutral-500">to</span>
      <BaseInput
        type={INPUT_TYPE.RANGE}
        min={min}
        max={max}
        value={value[1]}
        onChange={handleRangeMaxChange}
        className="w-full accent-primary-400"
        {...props}
      />
      <span className="w-full">
        {value[0]} to {value[1]}
      </span>
    </div>
  )
}
