import React from 'react'
import LogoLight from '@/assets/logo-light.svg'
import LogoDark from '@/assets/logo-dark.svg'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Link from 'next/link'

function Logo({ style = {}, className = "" }) {
    return (
        <Link href={"/"}>
            <div className={cn('rounded-full overflow-hidden w-16 relative select-none flex', className, style)}>
                <Image src={LogoDark} alt='logo' className='w-full h-full object-cover inline-flex dark:hidden' />
                <Image src={LogoLight} alt='logo' className='w-full h-full object-cover hidden dark:inline-flex' />
            </div>
        </Link>
    )
}

export default Logo