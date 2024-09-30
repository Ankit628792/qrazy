import React from 'react'
import { ButtonWithIconProps } from '../../../../types'
import { Button } from '../button'

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  Icon,
  btnText,
  ...props
}: ButtonWithIconProps) => {
  return (
    <Button {...props}>
      <div className="flex items-center justify-center gap-1">
        <Icon />
        {btnText}
      </div>
    </Button>
  )
}
