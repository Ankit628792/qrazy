"use client"
import { Button } from '@/components/ui/button'
import DropdownMenuCheckboxes from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { File, ListFilter, PlusCircle, Search } from 'lucide-react'
import { useState } from 'react'
import { filterOptions, generateRandomProducts } from './constant'
import ProductTable from '@/components/product/table'
import Link from 'next/link'

function Page() {
    const [products] = useState(generateRandomProducts(10))
    const [filter, setFilter] = useState(filterOptions);

    const handleFilter = (id: string | number, checked: boolean) => {
        const updatedFilter = filter.map((option) =>
            option.id === id ? { ...option, checked: checked } : option
        );

        setFilter(updatedFilter);
    }


    return (
        <section className=''>
            <div className=' py-5 px-3 sticky -mt-3 -top-3 bg-white bg-opacity-10 dark:bg-zinc-900 dark:bg-opacity-10 backdrop-blur-md rounded-bl-xl rounded-br-xl z-10'>
                <h1 className='text-2xl lg:text-3xl font-semibold pb-3'>Products Listing</h1>
                <div className='w-full flex items-center gap-2'>
                    <form className="flex-1 relative">
                        <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="pl-8 w-full max-w-lg"
                        />
                    </form>

                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenuCheckboxes label='Filter by' items={filter} onChange={handleFilter}>
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
                        <Link href={"/products/create"}>
                            <Button size="sm" className="gap-1 bg-emerald-500 hover:bg-emerald-600 text-white">
                                <PlusCircle className="h-4 w-4" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Product
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='w-full overflow-x-auto scroll-hidden'>
                <ProductTable data={products} />
            </div>
        </section>
    )
}

export default Page



