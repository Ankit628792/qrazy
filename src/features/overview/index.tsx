'use client'

import React from 'react'
import { withViewPermissions } from '@/libs/middlewares/useHaveViewPermission'

const OverviewComponent: React.FC = () => {
  return <div>Overview Component</div>
}

export default withViewPermissions(OverviewComponent)
