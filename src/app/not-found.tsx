import Link from 'next/link'
import Cat from '@/assets/404-cat.svg'
import Header from '@/components/dashboard/Header'

export default function NotFound() {
    return (
        <section className='flex flex-col min-h-screen'>
            <Header />
            <div className='p-10 flex flex-col items-center justify-center gap-4 flex-grow'>
                <img src={Cat.src} className='max-w-lg xl:max-w-xl filter drop-shadow-sm' alt='' />
                <Link href="/" className='bg-emerald-500 hover:bg-emerald-600 py-3 px-6 rounded-lg font-medium text-white'>Return Home</Link>
            </div>
        </section>
    )
}