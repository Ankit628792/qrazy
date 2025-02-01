import ManageProduct from '@/components/product/manage'
import React from 'react'
import { getProductDetails } from './actions'
import { redirect } from 'next/navigation'

async function Page({ params }: {
  params: { productId: string }
}) {

  const product = await getProductDetails(params.productId)

  if (!product) {
    redirect("/products/listing")
  }

  return <ManageProduct initialData={product} isEdit={true} />
}

export default Page
