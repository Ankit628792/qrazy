import React from 'react'
import { Select } from '../select' // Adjust the path as needed
import { SelectWithIconProps } from '../../../types'

export const SelectWithIcon = <T,>({
  icon: Icon,
  ...props
}: SelectWithIconProps<T>) => {
  return (
    <div className="relative">
      <Select {...props} />
      <div className="absolute inset-y-0 h-full w-6 right-0 rounded-r flex items-center bg-neutral-200 pointer-events-none">
        <Icon
          className={`h-4 w-4 mx-auto ${
            props.disabled ? 'text-neutral-300' : 'text-neutral-900'
          }`}
        />
      </div>
    </div>
  )
}
