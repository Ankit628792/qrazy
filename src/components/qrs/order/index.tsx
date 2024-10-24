"use client"
import React, { useState } from 'react'
import OrderTable from './OrderTable'
import { ListPlus } from 'lucide-react';
import { generateRandomProducts } from '@/app/(dashboard)/products/listing/constant';
import ManageOrderProduct from './ManageOrderProduct';
import { Button } from '@/components/ui/button';
import { getRandomNumber } from '@/lib';
import { useRouter } from 'next/navigation';

type OrderItem = {
    id: number | string;
    title: string;
    image: {
        url: string;
    };
    category: {
        id: string;
        name: string;
    };
    mrl: string | number;
    quantity: number;
    expiryDate: Date | undefined;
    digital: boolean;
    physical: boolean;
}


let example: OrderItem = {
    id: "number",
    title: "Red Lebel",
    image: {
        url: "https://images.unsplash.com/photo-1549049950-48d5887197a0",
    },
    category: {
        id: 'string',
        name: "Drinks",
    },
    mrl: 6767,
    quantity: 123,
    expiryDate: new Date(),
    digital: true,
    physical: true
}

const products = generateRandomProducts(5)

function OrderQR() {
    const router = useRouter()

    const [orderList, setOrderList] = useState([example])
    const [selectedItem, setSelectedItem] = useState<any>();
    return (
        <>
            <div className='bg-white dark:bg-black flex items-center justify-between p-3 pl-5 rounded-xl'>
                <h1 className='text-2xl lg:text-3xl font-semibold'>Order QR Code</h1>
                <Button onClick={() => router.back()}>
                    <span>Cancel</span>
                </Button>
            </div>
            <section className='bg-white bg-opacity-50 backdrop-blur-sm dark:bg-black dark:bg-opacity-50 px-3 rounded-2xl mt-5'>
                <h1 className='text-xl font-medium p-3 pb-0'>Selected Products</h1>
                {
                    orderList.length
                        ?
                        <OrderTable data={orderList} />
                        :
                        <h3 className='pt-5 pl-5 text-gray-500'>No Item yet</h3>
                }
                <div onClick={() => setSelectedItem(true)} className='flex items-center gap-2 bg-white dark:bg-black rounded-3xl rounded-tl-none max-w-max p-4 transform translate-y-1/2 cursor-pointer'>
                    <ListPlus />
                    <span>Add Product</span>
                </div>
            </section>


            <Total />

            {selectedItem ? <ManageOrderProduct products={products} onClose={() => setSelectedItem(false)} /> : <></>}
        </>
    )
}

export default OrderQR

const Total = () => {
    const total = getRandomNumber(1000, 10000)
    return (
        <section className='bg-white dark:bg-black rounded-xl p-3 mt-10 max-w-sm ml-auto '>
            <table className='table-auto border-separate border-spacing-y-2 border-spacing-x-5 w-full ml-auto'>
                <tbody>
                    <tr>
                        <td className='min-w-32'>Subtotal:</td>
                        <td className='w-full text-right'>+ ₹ {(total).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className='min-w-32'>Discount (5%):</td>
                        <td className='w-full text-right'>- ₹ {(total * 0.05).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className='min-w-32'>Tax (8%):</td>
                        <td className='w-full text-right'>+ ₹ {(total * 0.08).toFixed(2)}</td>
                    </tr>
                    <tr className=''>
                        <td className='border-t border-dashed pt-3'>Total:</td>
                        <td className='w-full pt-3 text-right border-t border-dashed'>₹ {(total - (total * 0.05) + (total * 0.08)).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <hr className='my-3' />
            <Button size={"lg"} className='w-full bg-amber-500 hover:bg-amber-600 text-white'>
                <span className='xl:text-lg'>Pay Now</span>
            </Button>
        </section>
    )
}