import React from 'react'
import { useFormContext } from '../../../hooks/useFormContext'
import { FormProps } from '../../../../types'

export const Form: React.FC<FormProps> = ({ children, className, id }) => {
  const { handleSubmit } = useFormContext()

  return (
    <form onSubmit={handleSubmit} className={className} id={id}>
      {children}
    </form>
  )
}
