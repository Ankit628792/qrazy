import React from 'react'
import { ContainerProps } from '../../../types'

export const Container: React.FC<ContainerProps> = ({
  maxWidth = '1280px', // Default to a common large screen width
  padding = '1rem', // Default padding
  centered = false,
  className = '',
  children
}: ContainerProps) => {
  const centerClass = centered ? 'mx-auto' : ''

  return (
    <div
      style={{ maxWidth }}
      className={`px-${padding} ${centerClass} ${className}`}
    >
      {children}
    </div>
  )
}
