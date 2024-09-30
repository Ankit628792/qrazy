import React from 'react'
import { LinkProps } from '../../../types'

export const Link: React.FC<LinkProps> = ({
  to,
  external = false,
  className = '',
  newTab = false,
  children
}: LinkProps) => {
  const target = newTab ? '_blank' : '_self'
  const rel = newTab ? 'noopener noreferrer' : ''

  if (external) {
    return (
      <a
        href={to}
        target={target}
        rel={rel}
        className={`text-primary-400 hover:underline ${className}`}
      >
        {children}
      </a>
    )
  }

  // If you're using a router library like react-router, you'd use the Link component from that library here.
  // For simplicity, we'll use a standard anchor tag.
  return (
    <a href={to} className={`text-primary-400 hover:underline ${className}`}>
      {children}
    </a>
  )
}
