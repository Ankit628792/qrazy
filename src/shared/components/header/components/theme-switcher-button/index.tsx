'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid'
import { THEME_TYPES } from '../../header.interface'

const renderThemeIcon = (theme: string | undefined) => {
  switch (theme) {
    case THEME_TYPES.LIGHT:
      return <MoonIcon className="h-6 w-6 text-brand dark:text-gray-600" />
    case THEME_TYPES.DARK:
      return <SunIcon className="h-6 w-6 text-brand dark:text-gray-600" />
    default:
      return null
  }
}

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      className={`w-fit rounded-md hover:scale-110 active:scale-100 duration-200`}
      onClick={() =>
        setTheme(
          theme === THEME_TYPES.DARK ? THEME_TYPES.LIGHT : THEME_TYPES.DARK
        )
      }
    >
      {renderThemeIcon(theme)}
    </button>
  )
}
