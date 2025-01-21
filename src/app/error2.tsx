'use client'
import { useEffect } from 'react'
import Space from '@/assets/503-space.svg'
import Header from '@/components/dashboard/Header'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    return (
        <section className='flex flex-col min-h-screen'>
            <Header />
            <div className='p-10 flex flex-col items-center justify-center gap-4 flex-grow'>
                <img src={Space.src} className='max-w-lg xl:max-w-xl filter drop-shadow-sm' alt='' />
                <button onClick={() => reset()} className='bg-emerald-500 hover:bg-emerald-600 py-3 px-6 rounded-lg font-medium text-white'>Try Again</button>
            </div>
        </section>
    )
}