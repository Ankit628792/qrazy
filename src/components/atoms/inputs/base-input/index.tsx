import React from 'react'
import { BaseInputProps } from '../../../types'

const BaseInput: React.FC<BaseInputProps> = (props) => {
  const { dirty, hidden, ...rest } = props

  return (
    <>
      <input data-dirty={dirty} className={hidden ? 'hidden' : ''} {...rest} />
    </>
  )
}

export default BaseInput
