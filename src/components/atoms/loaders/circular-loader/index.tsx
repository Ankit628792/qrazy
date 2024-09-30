import React from 'react'
import { CircularLoaderProps } from '../../../types'

export const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = 40,
  color = 'primary-500',
  className = ''
}: CircularLoaderProps) => {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`border-t-2 border-${color} border-solid rounded-full animate-spin ${className}`}
    ></div>
  )
}
