'use client'

import React from 'react'
import useAuthStore from './store/auth.store'
import getRenderComponent from './components'
import { BackgroundGradient } from '@/shared/components/background-gradient'

export const AuthComponent: React.FC = () => {
  const { isLoginTabActive, setIsLoginTabActive } = useAuthStore()
  return (
    <BackgroundGradient>
      {getRenderComponent({ isLoginTabActive, setIsLoginTabActive })}
    </BackgroundGradient>
  )
}
