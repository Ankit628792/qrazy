'use client'

import NotFound from '@/app/not-found'
import React, { useEffect } from 'react'
import {
  IModulesAndPermissions,
  PERMISSION_LEVEL
} from '@/features/auth/auth.interface'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'

export const withViewPermissions = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithPermissions = (props: P) => {
    const pathname = usePathname()
    const [haveViewPermission, setHaveViewPermission] = React.useState(false)
    const { modulesAndPermissions } = useAuth()

    useEffect(() => {
      if (pathname) {
        const path = pathname.split('/')[1]
        const permission = (modulesAndPermissions as IModulesAndPermissions)[
          `/${path}`
        ]
        if (permission && permission !== PERMISSION_LEVEL.DENIED) {
          setHaveViewPermission(true)
        } else {
          setHaveViewPermission(false)
        }
      }
    }, [pathname])

    if (!haveViewPermission) {
      return <NotFound />
    }

    return <WrappedComponent {...props} />
  }

  return ComponentWithPermissions
}
