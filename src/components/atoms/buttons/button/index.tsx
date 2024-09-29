import React from 'react'
import { ButtonProps } from '../../../../types'

export const Button: React.FC<ButtonProps> = ({
  btnType = 'primary',
  disable = false,
  className = '',
  name,
  value,
  type,
  btnText,
  children,
  form,
  onClick
}: ButtonProps) => {
  const btnTypeClasses = {
    primary: `outline outline-1 outline-primary-400
    text-primary-400 focus:bg-primary-400 
    focus:text-neutral-100 hover:bg-primary-100 hover:outline-none hover:bg-opacity-10
    disabled:bg-background-surface-primary disabled:opacity-30 disabled:hover:outline-1 
    disabled:hover:outline-primary-400 disabled:cursor-not-allowed disabled:hover:outline-offset-0
    `,
    secondary: `
      bg-background-surface-primary text-neutral-800 
      hover:outline hover:outline-1 hover:outline-neutral-300
      focus:outline-1 focus:outline-neutral-700 
      disabled:bg-background-surface-primary disabled:text-neutral-300
      disabled:outline disabled:outline-1 disabled:outline-neutral-300 disabled:cursor-not-allowed
    `,
    tertiary: `
      text-primary-400
      hover:text-primary-100 focus:text-primary-400
      hover:bg-primary-100 hover:outline-none hover:bg-opacity-10 
      disabled:text-neutral-300 disabled:cursor-not-allowed
    `
  }

  let sizeClasses = `
  h-8 w-auto rounded text-button px-4 py-1 
  tablet:h-9 tablet:min-w-32 tablet:rounded-md tablet:py-2 tablet:text-button 
  laptop:h-9 laptop:min-w-32 laptop:rounded-md laptop:py-2 laptop:text-button 
  desktop:h-10 desktop:min-w-36 desktop:rounded-lg desktop:py-3 desktop:text-button 
`

  if (btnType === 'tertiary') {
    sizeClasses = `
    h-8 min-w-auto w-auto rounded text-button px-4 py-1 
    tablet:h-9 tablet:min-w-auto tablet:rounded-md tablet:py-2 tablet:text-button 
    laptop:h-9 laptop:min-w-auto laptop:rounded-md laptop:py-2 laptop:text-button 
    desktop:h-10 desktop:min-w-auto desktop:rounded-lg desktop:py-3 desktop:text-button 
  `
  }

  return (
    <button
      type={type}
      name={name}
      value={value}
      onClick={onClick}
      disabled={disable}
      form={form}
      className={`cursor-pointer
        ${btnTypeClasses[btnType]}
        ${sizeClasses} 
        ${className}`}
    >
      <span>{children || btnText}</span>
    </button>
  )
}
