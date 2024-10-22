import { cn } from '@/lib/utils'
import React from 'react'

function Error({ error, children, className = "" }: { error?: string | undefined | null, children?: React.ReactNode, className?: string }) {
    return (
        <p className={cn('error', className)}>{error || children || ''}</p>
    )
}

export default Error