import Image from 'next/image'
import React from 'react'
import Img from '@/assets/complete-onboarding.png'
import { Button } from '../ui/button'
import Link from 'next/link'

function CompleteOnboarding() {
    return (
        <div className='flex flex-col items-center justify-center gap-4 p-5'>
            <Image src={Img.src} width={300} height={300} blurDataURL={Img.blurDataURL} loading="lazy" alt='' />
            <p className='text-gray-500'>Complete your profile to get profile verified and access all features.</p>
            <Link href={"/onboarding"}>
                <Button className='bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6'>
                    Fill Details
                </Button>
            </Link>
        </div>
    )
}

export default CompleteOnboarding