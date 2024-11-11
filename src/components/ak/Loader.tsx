import { LoaderCircle } from 'lucide-react'
import React from 'react'

function Loader({ text = "Loading..." }: { text?: string }) {
    return (
        <section className='w-full h-screen overflow-hidden'>
            <div className='fixed inset-0 z-50 flex flex-col gap-1 items-center justify-center glass-base'>
                <LoaderCircle className='animate-spin' />
                <p className='animate-pulse'>{text}</p>
            </div>
        </section>
    )
}

export default Loader