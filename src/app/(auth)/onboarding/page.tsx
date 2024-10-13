"use client"
import LogoText from '@/components/ak/LogoText'
import AnimationBox from '@/components/onboarding/AnimationBox'
import { useState } from 'react'
import Questions from '@/components/onboarding/Questions'


function Onboarding() {
    const [index, setIndex] = useState(0);

    return (
        <section className='p-5 flex-grow flex gap-5 xl:gap-10 bg-white dark:bg-zinc-900'>
            <div className='absolute top-3 left-5 z-10'>
                <LogoText />
            </div>
            <Questions index={index} setIndex={setIndex} />
            <AnimationBox index={index} setIndex={setIndex} />
        </section>
    )
}

export default Onboarding
