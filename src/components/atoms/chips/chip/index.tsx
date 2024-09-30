import React from 'react'
import { ChipProps } from '../../../types'

export const Chip: React.FC<ChipProps> = ({
  label,
  color = 'neutral',
  className = '',
  onDelete,
  onChipClick
}: ChipProps) => {
  const colorClasses = {
    primary: 'bg-primary-300 text-white',
    secondary: 'bg-secondary-300 text-white',
    tertiary: 'bg-tertiary-300 text-white',
    neutral: `
      bg-neutral-200 text-neutral-900 hover:outline-neutral-300 focus:outline-neutral-800 focus:text-neutral-900 
      `
  }

  return (
    <span
      onClick={onChipClick}
      className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium hover:outline hover:outline-1 focus:outline-1
      ${colorClasses[color]} ${className}`}
    >
      {label}
      {onDelete && (
        <button onClick={onDelete} className="ml-2 hover:text-neutral-800">
          ×
        </button>
      )}
    </span>
  )
}
