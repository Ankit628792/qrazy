import { cn } from '@/libs/utils'
import React from 'react'

function Error({
  error,
  children,
  className = ''
}: {
  error?: string
  children?: React.ReactNode
  className?: string
}) {
  return <p className={cn('error', className)}>{error || children || ''}</p>
}

export default Error
