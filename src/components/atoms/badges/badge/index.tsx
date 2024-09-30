import React from 'react'
import { BadgeProps } from '../../../../types'

export const Badge: React.FC<BadgeProps> = ({
  color = 'default',
  Icon,
  badgeContent,
  onClick
}: BadgeProps) => {
  // Map the color prop to Tailwind CSS classes
  const colorClasses = {
    error: 'bg-state-error',
    warning: 'bg-state-warning',
    info: 'bg-state-info',
    success: 'bg-state-success',
    default: 'bg-neutral-400',
    primary: 'bg-primary-400',
    secondary: 'bg-secondary-400'
  }

  return (
    <div
      className={`relative text-2xl inline-flex items-center cursor-pointer`}
      onClick={onClick}
    >
      {Icon ? <Icon className="relative z-10" /> : ''}
      <span
        className={`absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 p-1 ${colorClasses[color]} text-xs text-white rounded-full h-6 w-6 flex items-center justify-center`}
      >
        {badgeContent}
      </span>
    </div>
  )
}
