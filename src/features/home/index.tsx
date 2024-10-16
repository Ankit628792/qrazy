'use client'

import React from 'react'
import { HeroSection } from './components/hero-section'
import { SubHeroSection } from './components/subhero-section'
import { Logo } from '@/shared/components/header/components/logo'
import { SubScroll } from './components/sub-scroll'
import { GlobeComponent } from './components/globe-component'
import { HeroParallaxComponent } from './components/hero-parallax-component'
import { TextHoverEffect } from './components/text-hover-effect'
import { WoobleCards } from './components/wobble-cards'
import { AppleCardsCarousel } from './components/apple-cards-carousel'

export const HomeComponent: React.FC = () => {
  return (
    <div className="bg-black-700">
      <header className="p-2 fixed w-full top-0 z-40">
        <Logo />
      </header>
      <TextHoverEffect text="QRAZY" />
      <HeroParallaxComponent />
      <SubScroll />
      <WoobleCards />
      <AppleCardsCarousel />
      <SubHeroSection />
      <HeroSection />
      <GlobeComponent />
    </div>
  )
}
