import React from 'react'
import { LinearLoaderProps } from '../../../types'

export const LinearLoader: React.FC<LinearLoaderProps> = ({
  isLoading = false,
  progress = 0,
  color = 'primary',
  className = ''
}: LinearLoaderProps) => {
  const loadingAnimation = isLoading
    ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent) right / 200% no-repeat'
    : ''

  return (
    <div
      className={`w-full h-2 bg-neutral-200 rounded relative overflow-hidden ${className}`}
    >
      <div
        style={{ width: `${progress}%`, backgroundImage: loadingAnimation }}
        className={`h-full bg-${color}-500 rounded absolute top-0 bottom-0 left-0 animate-slide`}
      ></div>
    </div>
  )
}
