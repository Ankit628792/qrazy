import React from 'react'
import Logo from './Logo'

function LogoText() {
    return (
        <div className='flex items-center gap-0.5'>
            <Logo className='w-14' />
            <h1 className="text-3xl font-bold font-urban">Qrazy</h1>
        </div>
    )
}

export default LogoText