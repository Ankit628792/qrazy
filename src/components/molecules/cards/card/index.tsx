import React from 'react'
import { CardProps } from '../../../types'

export const Card: React.FC<CardProps> = ({
  title,
  content,
  img,
  outlined = false,
  size = 'medium',
  className = '',
  shadow = 'none',
  children
}: CardProps) => {
  const sizeClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  }

  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg'
  }

  const outlineClasses = outlined ? 'border border-neutral-200' : ''

  return (
    <div
      className={`rounded ${outlineClasses} ${sizeClasses[size]} ${shadowClasses[shadow]} ${className}`}
    >
      {img && (
        <img
          src={img}
          alt={title || 'Card Image'}
          className="w-full h-48 object-cover rounded-t"
        />
      )}
      <div className="p-4">
        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        {content && <p className="text-neutral-600">{content}</p>}
        {children}
      </div>
    </div>
  )
}
