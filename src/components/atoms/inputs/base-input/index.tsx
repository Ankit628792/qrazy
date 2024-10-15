import React from 'react'
import { BaseInputProps } from '../../../../types'

const BaseInput: React.FC<BaseInputProps> = (props) => {
  const { dirty, hidden, value, ...rest } = props

  return (
    <>
      <input
        data-dirty={dirty}
        className={hidden ? 'hidden' : ''}
        value={value ?? ''}
        {...rest}
      />
    </>
  )
}

export default BaseInput
