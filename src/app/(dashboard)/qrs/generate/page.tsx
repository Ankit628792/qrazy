"use client"
// import QRGenerate from '@/components/qrs/generate'
import React from 'react'
import dynamic from 'next/dynamic';

const QRGenerate = dynamic(() => import('@/components/qrs/generate'), { ssr: false });


function Page() {
    return (
        <QRGenerate />
    )
}

export default Page