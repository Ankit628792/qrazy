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
      outline outline-1 outline-neutral-300
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
    `,
    danger: `
      bg-danger-400 text-neutral-100
      hover:bg-danger-100 hover:outline-none hover:bg-opacity-10
      focus:bg-danger-400 focus:outline-1 focus:outline-neutral-100
      disabled:bg-danger-400 disabled:opacity-30 disabled:hover:outline-none
      disabled:hover:outline-danger-400 disabled:cursor-not-allowed
    `,
    base: `
      rounded-full text-base font-semibold text-gray-900 
      hover:bg-black-400 hover:bg-opacity-15 ring-2 ring-black-400 cursor-pointer 
      w-fit duration-200
    `
  }

  const btnSizeClasses = {
    primary: `
    h-8 min-w-auto w-auto rounded text-button px-4 py-1
    tablet:h-9 tablet:min-w-auto tablet:rounded-md tablet:py-2 tablet:text-button
    laptop:h-9 laptop:min-w-auto laptop:rounded-md laptop:py-2 laptop:text-button
    desktop:h-10 desktop:min-w-auto desktop:rounded-lg desktop:py-3 desktop:text-button
    `,
    secondary: `
    h-8 min-w-auto w-auto rounded text-button px-4 py-1
    tablet:h-9 tablet:min-w-auto tablet:rounded-md tablet:py-2 tablet:text-button
    laptop:h-9 laptop:min-w-auto laptop:rounded-md laptop:py-2 laptop:text-button
    desktop:h-10 desktop:min-w-auto desktop:rounded-lg desktop:py-3 desktop:text-button
    `,
    tertiary: `
    h-8 min-w-auto w-auto rounded text-button px-4 py-1 
    tablet:h-9 tablet:min-w-auto tablet:rounded-md tablet:py-2 tablet:text-button 
    laptop:h-9 laptop:min-w-auto laptop:rounded-md laptop:py-2 laptop:text-button 
    desktop:h-10 desktop:min-w-auto desktop:rounded-lg desktop:py-3 desktop:text-button 
   `,
    danger: `
    h-8 min-w-auto w-auto rounded text-button px-4 py-1
    tablet:h-9 tablet:min-w-auto tablet:rounded-md tablet:py-2 tablet:text-button
    laptop:h-9 laptop:min-w-auto laptop:rounded-md laptop:py-2 laptop:text-button
    desktop:h-10 desktop:min-w-auto desktop:rounded-lg desktop:py-3 desktop:text-button
    `,
    base: `
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
        ${btnSizeClasses[btnType]} 
        ${className}`}
    >
      <span>{children || btnText}</span>
    </button>
  )
}
