'use client'
import Loader from '@/components/ak/Loader';
import { useAdminStore } from '@/store/admin.store'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { loading } = useAdminStore();
  return (
    <NextThemesProvider {...props}>
      <>
        {loading.state ? <Loader text={loading.text} /> : <></>}
        {children}
      </>
    </NextThemesProvider>
  )
}
