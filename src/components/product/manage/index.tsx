"use client"
import { Button } from '@/components/ui/button'
import { CheckCircle, FileClock } from 'lucide-react'
import GeneralInformation from './GeneralInformation'
import Pricing from './Pricing'
import Links from './Links'
import Category from './Category'
import UploadImages from './UploadImages'

function ManageProduct() {
    return (
        <section className='py-5 sm:px-3'>
            <div className='flex items-center justify-between gap-4 w-full'>
                <h1 className='text-2xl lg:text-3xl font-semibold'><span className='hidden md:inline-block'>Create</span> New Product</h1>
                <div className='flex gap-2 sm:gap-3 md:gap-4'>
                    <Button variant={"outline"} className='gap-2 hidden sm:inline-flex rounded-full'>
                        <FileClock />  Save Draft
                    </Button>
                    <Button variant={"default"} className='gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white'>
                        <CheckCircle /> Add Product
                    </Button>
                </div>
            </div>
            <div className='w-full flex flex-col lg:flex-row gap-4 py-4'>
                <div className='flex flex-col gap-4 flex-grow'>
                    <GeneralInformation />
                    <Pricing />
                    <Links />
                </div>
                <div className='flex flex-col md:flex-row lg:flex-col gap-4 w-full lg:max-w-sm xl:max-w-md'>
                    <UploadImages />
                    <Category />
                </div>
            </div>
        </section>
    )
}

export default ManageProduct


