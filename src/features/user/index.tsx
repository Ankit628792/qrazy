'use client'

import React from 'react'
import { withViewPermissions } from '@/shared/HOC/useHaveViewPermission'

const UserComponent: React.FC = () => {
  return <div>User Component</div>
}

export default withViewPermissions(UserComponent)
