import OrderQR from '@/components/qrs/order'
import React from 'react'
import { generateRandomProducts } from '../../products/listing/constant'

const products = generateRandomProducts(5)

function Page() {
  return <OrderQR products={products} />
}

export default Page
