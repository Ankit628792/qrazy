import { LoaderCircle } from 'lucide-react'
import React from 'react'

function Loader() {
    return (
        <section className='w-full h-screen overflow-hidden flex flex-col gap-1 items-center justify-center fixed inset-0 z-50 glass-base'>
            <LoaderCircle className='animate-spin' />
            <p className='animate-pulse'>Loading...</p>
        </section>
    )
}

export default Loader