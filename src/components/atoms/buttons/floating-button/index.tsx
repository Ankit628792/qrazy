import React from 'react'
import { FloatingButtonProps } from '../../../../types'

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  btnType = 'primary',
  disable = false,
  className = '',
  rounded = true,
  Icon,
  name,
  value,
  type,
  btnText,
  children,
  form,
  onClick
}: FloatingButtonProps) => {
  const btnTypeClasses = {
    primary: `
      outline outline-1 outline-primary-400 
      text-primary-400 focus:bg-primary-400 
      focus:text-neutral-100 hover:bg-primary-100 hover:outline-none hover:bg-opacity-10
      disable:bg-neutral-100 disabled:opacity-30 disabled:hover:outline-1 
      disabled:hover:outline-primary-400 disabled:cursor-not-allowed disabled:hover:outline-offset-0
    `,

    secondary: `
      bg-neutral-100 text-neutral-800 
      hover:outline hover:outline-1 hover:outline-neutral-300
      focus:outline-1 focus:outline-neutral-700 
      disabled:bg-neutral-100 disabled:text-neutral-300
      disabled:outline disabled:outline-1 disabled:outline-neutral-300 disabled:cursor-not-allowed
    `,

    tertiary: `
      text-primary-400 
      hover:text-primary-100 focus:text-primary-400
      disabled:text-neutral-300 disabled:cursor-not-allowed
    `,

    danger: `
      bg-danger-400 text-neutral-100 
      hover:bg-danger-100 focus:bg-danger-400
      disabled:bg-neutral-100 disabled:text-neutral-300
    `,

    success: `
      bg-success-400 text-neutral-100 
      hover:bg-success-100 focus:bg-success-400
      disabled:bg-neutral-100 disabled:text-neutral-300
    `,

    base: `
      bg-neutral-100 text-neutral-800 
      hover:bg-neutral-200 focus:bg-neutral-300
      disabled:bg-neutral-100 disabled:text-neutral-300
    `
  }

  let sizeClasses = `
    px-1 py-1 w-auto
    large:px-1.5 large:py-1.5 large:text-lg
    `

  let iconClasses = `
    w-8 h-8 
    tablet:w-12 tablet:h-12 laptop:w-12 laptop:h-12
    large:w-14 large:h-14
    `

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
        ${rounded ? 'rounded-full' : ''}
        ${className}`}
    >
      <span>
        {Icon && <Icon className={`${iconClasses}`} />}
        {(!Icon && children) || btnText}
      </span>
    </button>
  )
}
