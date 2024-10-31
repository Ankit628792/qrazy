import React from 'react'
import LogoLight from '@/assets/logo-light.svg'
import LogoDark from '@/assets/logo-dark.svg'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Link from 'next/link'

function LogoText({ style = {}, className = '' }) {
  return (
    <Link href={'/'}>
      <div className="flex items-center gap-0.5">
        <div
          className={cn(
            'rounded-full overflow-hidden relative select-none flex w-14',
            className,
            style
          )}
        >
          <Image
            src={LogoDark}
            alt="logo"
            className="w-full h-full object-cover inline-flex dark:hidden"
          />
          <Image
            src={LogoLight}
            alt="logo"
            className="w-full h-full object-cover hidden dark:inline-flex"
          />
        </div>
        <h1 className="text-3xl font-bold font-urban">Qrazy</h1>
      </div>
    </Link>
  )
}

export default LogoText
