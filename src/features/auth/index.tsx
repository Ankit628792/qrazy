'use client'

import React from 'react'
import useAuthStore from './store/auth.store'
import getRenderComponent from './components'

export const AuthComponent: React.FC = () => {
  const { currentAuthStep, setCurrentAuthStep } = useAuthStore()
  return (
    <React.Fragment>
      {getRenderComponent({
        currentAuthStep,
        setCurrentAuthStep
      })}
    </React.Fragment>
  )
}
