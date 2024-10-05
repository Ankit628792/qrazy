'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useSelectedSideBarModule = () => {
  const pathname = usePathname()
  const [selectedModule, setSelectedModule] = useState('')

  useEffect(() => {
    if (pathname) {
      const path = pathname.split('/')[1]
      setSelectedModule(path)
    }
  }, [pathname])

  return selectedModule
}
