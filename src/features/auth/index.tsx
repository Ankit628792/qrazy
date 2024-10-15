'use client'

import React from 'react'
import useAuthStore from './store/auth.store'
import getRenderComponent from './components'

export const AuthComponent: React.FC = () => {
  const { isLoginTabActive, setIsLoginTabActive } = useAuthStore()
  return (
    <React.Fragment>
      {getRenderComponent({ isLoginTabActive, setIsLoginTabActive })}
    </React.Fragment>
  )
}
