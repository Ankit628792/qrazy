import React from 'react'
import { LogoProps } from '../../../../types'

export const Logo: React.FC<LogoProps> = ({
  src,
  alt,
  width = 'auto',
  height = 'auto',
  className = '',
  onClick
}: LogoProps) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`cursor-pointer ${className}`}
      onClick={onClick}
    />
  )
}
