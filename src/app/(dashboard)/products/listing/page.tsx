'use client'
import { Button } from '@/components/ui/button'
import DropdownMenuCheckboxes from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { File, ListFilter, PlusCircle, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { filterOptions, generateRandomProducts } from './constant'
import ProductTable from '@/components/product/table'
import Link from 'next/link'
import { useGetProductListing } from '@/hooks/product/useGetProductListing'
import { v4 as uuidv4 } from 'uuid'
import { get } from 'lodash'

function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState(filterOptions)

  const { data: productsListing } = useGetProductListing()

  useEffect(() => {
    if (productsListing) {
      const transformedProducts = productsListing.map((product) => ({
        id: product.id,
        title: get(product, 'title', ''),
        description: get(product, 'description', ''),
        image: {
          id: uuidv4(), // Random image ID
          url: product.image || ''
        },
        images: product.images || [],
        category: product.category,
        links:
          product.productLinks.map((link) => ({
            id: uuidv4(), // Random link ID
            url: link
          })) || [],
        mrp: get(product, 'mrp', 0),
        mrl: get(product, 'mrl', 0),
        status: get(product, 'status', 'active'), // Random status
        created_at: get(product, 'createdAt', new Date().toISOString()),
        updated_at: get(product, 'updatedAt', new Date().toISOString()),
        region: get(product, 'region', 'East Audrey'), // Random region
        scans: get(product, 'scans', 58912) // Random scans
      }))
      setProducts(transformedProducts as unknown as Product[])
    }
  }, [productsListing])

  const handleFilter = (id: string | number, checked: boolean) => {
    const updatedFilter = filter.map((option) =>
      option.id === id ? { ...option, checked: checked } : option
    )
    setFilter(updatedFilter)
  }

  return (
    <section>
      <div className="py-5 px-3 sticky -mt-3 -top-3 bg-white bg-opacity-10 dark:bg-zinc-900 dark:bg-opacity-10 backdrop-blur-md rounded-bl-xl rounded-br-xl z-10">
        <h1 className="text-2xl lg:text-3xl font-semibold pb-3">
          Products Listing
        </h1>
        <div className="w-full flex items-center gap-2">
          <form className="flex-1 relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 w-full max-w-lg"
            />
          </form>

          <div className="ml-auto flex items-center gap-2">
            <DropdownMenuCheckboxes
              label="Filter by"
              items={filter}
              onChange={handleFilter}
            >
              <Button variant="outline" size="sm" className="gap-1">
                <ListFilter className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuCheckboxes>

            <Button size="sm" variant="outline" className="gap-1">
              <File className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Link href={'/products/create'}>
              <Button
                size="sm"
                className="gap-1 bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto scroll-hidden -mt-3">
        <ProductTable data={products || []} />
      </div>
    </section>
  )
}

export default Page
