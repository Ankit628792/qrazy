import Link from 'next/link'
import React from 'react'

const className = "cursor-pointer fixed inset-0 bg-white bg-opacity-40 dark:bg-zinc-900 dark:bg-opacity-40 backdrop-blur-sm -z-10"
function PopUp({ onClose = () => { }, link, children }: {
    onClose?: () => void,
    link?: string
    children: React.ReactNode
}) {
    return (
        <section className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent p-5'>
            {
                link ?
                    <Link href={link} className={className} />
                    :
                    <div onClick={onClose} className={className}></div>
            }
            {children}
        </section>
    )
}

export default PopUp