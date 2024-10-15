'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/libs/utils'

const AvatarWrapper = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
))
AvatarWrapper.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted text-xl',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { AvatarImage, AvatarFallback }

export default function Avatar({
  image,
  fallback,
  onClick,
  hoverColor
}: {
  image?: string
  fallback?: string | React.ReactNode
  onClick?: () => void
  hoverColor?: string
}) {
  return (
    <AvatarWrapper
      className="cursor-pointer select-none bg-white dark:bg-black"
      onClick={() => (typeof onClick === 'function' ? onClick() : {})}
    >
      <AvatarImage
        className={cn('bg-white dark:bg-black', hoverColor)}
        src={image}
      />
      <AvatarFallback className={cn('bg-white dark:bg-black', hoverColor)}>
        {fallback || 'Q'}
      </AvatarFallback>
    </AvatarWrapper>
  )
}
