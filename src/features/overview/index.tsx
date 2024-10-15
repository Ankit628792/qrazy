'use client'

import React from 'react'
import { withViewPermissions } from '@/utils/middlewares/useHaveViewPermission'

const OverviewComponent: React.FC = () => {
  return <div>Overview Component</div>
}

export default withViewPermissions(OverviewComponent)
