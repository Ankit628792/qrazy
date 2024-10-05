'use client'

import React, { ChangeEvent, useState } from 'react'
import { TextAreaInputProps } from '../../../../types'

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  lengthReq = 200,
  rows = 4, // Default to 4 rows
  cols = 40, // Default to 40 columns
  invalid = 'false',
  className,
  onChange,
  ...props // Rest of the props
}: TextAreaInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    onChange && onChange(e)
  }

  const [value, setValue] = useState<string>('')

  const isTextGreaterThanLength = value.length > lengthReq

  return (
    <div
      className={`w-full flex flex-col border border-transparent ${className} `}
    >
      <textarea
        {...props} // Spread the rest of the props
        value={value}
        id="textAreaInput"
        onChange={handleChange}
        rows={rows}
        cols={cols}
        className={`w-full px-3 py-2 bg-neutral-100 border border-transparent rounded-t-lg disabled:bg-neutral-100 hover:border-1 hover:border-neutral-400 disabled:border-1 disabled:border-neutral-200 focus:border-1 focus:border-${
          isTextGreaterThanLength ? 'state-error' : 'neutral-800'
        } focus:bg-neutral-100 outline-none`}
      />
      <div className="flex justify-end w-full px-3 py-2  bg-neutral-200 rounded-b-lg text-neutral-900 relative ">
        <span
          className={`${
            isTextGreaterThanLength ? 'text-state-error' : 'text-neutral-400'
          } text-sm font-medium`}
        >
          {value.length}/{lengthReq}
        </span>
      </div>
    </div>
  )
}

export default TextAreaInput
