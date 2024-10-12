import React from 'react'
import LogoText from '../ak/LogoText'
import UserCard from '../ak/UserCard'
import Navigation from './Navigation'

function Header() {
    return (
        <header className='px-5 py-3 flex items-center justify-between'>
            <LogoText />
            <Navigation />
            <UserCard />
        </header>
    )
}

export default Header

