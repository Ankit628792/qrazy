'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

import { useQuery } from '@tanstack/react-query'
import { me } from '@/services/auth.service'
import { useAdminStore } from '@/store/admin.store'
import { useEffect } from 'react'
import useMe from '@/hooks'
import Loader from '@/components/ak/Loader'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { data, isFetching, isSuccess } = useMe();

  const { setAdmin } = useAdminStore()

  useEffect(() => {
    if (isSuccess) {
      setAdmin(data.data)
    }
  }, [isSuccess, data, setAdmin])
  return (
    <NextThemesProvider {...props}>{false ? <Loader /> : children}</NextThemesProvider>
  )
}
