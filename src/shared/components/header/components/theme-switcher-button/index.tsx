'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { THEME_TYPES } from '../../header.interface'

const renderThemeIcon = (theme: string | undefined) => {
  switch (theme) {
    case THEME_TYPES.LIGHT:
      return (
        <Moon className="absolute w-7 h-7 dark:rotate-90 dark:scale-0 transition-all rotate-0 scale-100" />
      )
    case THEME_TYPES.DARK:
      return (
        <Sun className="w-7 h-7 dark:rotate-0 dark:scale-100 transition-all -rotate-90 scale-0" />
      )

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
    <div
      className="w-full flex flex-col items-center z-50 cursor-pointer"
      onClick={() =>
        setTheme(
          theme === THEME_TYPES.DARK ? THEME_TYPES.LIGHT : THEME_TYPES.DARK
        )
      }
    >
      {renderThemeIcon(theme)}
    </div>
  )
}
