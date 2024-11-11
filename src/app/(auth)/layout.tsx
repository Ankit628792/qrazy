
import React from 'react'
import { checkTokenValidity } from '../actions'
import { redirect } from 'next/navigation';

async function Layout({ children }: {
    children: React.ReactNode,
}) {

    const expired = await checkTokenValidity();

    if (!expired) {
        redirect("/")
    }

    return children
}

export default Layout