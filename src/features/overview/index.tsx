'use client'

import React from 'react'
import { withViewPermissions } from '@/libs/middlewares/useHaveViewPermission'
import { Products } from './components/product'

const OverviewComponent: React.FC = () => {
  return <Products />
}

export default withViewPermissions(OverviewComponent)
