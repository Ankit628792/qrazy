import React from 'react'
import LogoText from '../ak/LogoText'
import UserCard from '../ak/UserCard'
import Navigation from './Navigation'

function Header() {
    return (
        <header className='px-5 py-3 flex items-center justify-between fixed w-full top-0 z-40 bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50 backdrop-blur-sm'>
            <LogoText />
            <Navigation />
            <UserCard />
        </header>
    )
}

export default Header

