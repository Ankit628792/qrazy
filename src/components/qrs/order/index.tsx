"use client"
import React, { useMemo, useState } from 'react'
import OrderTable from './OrderTable'
import { ListPlus } from 'lucide-react';
import { generateRandomProducts } from '@/app/(dashboard)/products/listing/constant';
import ManageOrderProduct from './ManageOrderProduct';
import { Button } from '@/components/ui/button';
import { getRandomNumber, getSum } from '@/lib';
import { useRouter } from 'next/navigation';
import QRTemplate from './QRTemplate';
import DigitalQR from '@/assets/digital.png'
import PhysicalQR from '@/assets/physical.png'
import Image from 'next/image'
import { cn } from '@/lib/utils';
import { useQRSStore } from '@/store/qrs.store';
import NoData from '@/assets/no-data.png'
import { getQRPrice } from '@/lib/constants';


export const exampleQRData: QROrder = {

    "selectedProduct": {
        "id": 70,
        "title": "Fantastic Metal Gloves",
        "description": "Weber LLC's most advanced Pizza technology increases distinct capabilities",
        "mrp": 7577.09,
        "mrl": 9.79,
        "links": [
            {
                "id": 9022,
                "url": "https://clear-cut-chiffonier.info/"
            }
        ],
        "category": {
            "id": 845,
            "name": "Games",
            "description": "The Polarised cloud-native flexibility Tuna offers reliable performance and victorious design"
        },
        "image": {
            "id": 2749,
            "url": "https://picsum.photos/seed/YstPXUVoAm/200/200?blur=10"
        },
        "images": [
            {
                "id": 7510,
                "url": "https://loremflickr.com/200/200/product?lock=7660854440868047"
            },
            {
                "id": 7969,
                "url": "https://loremflickr.com/200/200/product?lock=3934456272121020"
            }
        ],
        "status": "draft",
        "created_at": "2024-11-07T10:24:59.880Z",
        "updated_at": "2024-11-07T10:24:59.880Z",
        "region": "Anchorage",
        "scans": 57813
    },
    "quantity": 1200,
    "expiryDate": new Date("2024-11-14T18:30:00.000Z"),
    "mrl": "10"

}



function OrderQR({ products }: any) {
    const router = useRouter()
    const { activeOrder, setActiveOrder, orderList, QRType, reset } = useQRSStore()

    const total = useMemo(() => {
        return getSum(orderList, 'quantity') * getQRPrice(QRType as string)
    }, [orderList])

    const onPayClick = () => {

    }

    return (
        <>
            <div className='bg-white dark:bg-black flex items-center justify-between p-3 pl-5 rounded-xl'>
                <h1 className='text-2xl lg:text-3xl font-semibold'>Order QRs</h1>
                <div className='flex items-center gap-4'>
                    <Button onClick={onPayClick} className={cn('w-full bg-amber-500 hover:bg-amber-600 text-white', total ? "" : "hidden")}>
                        <span>Checkout</span>
                    </Button>
                    <Button onClick={() => { reset(); router.replace('/qrs') }}>
                        <span>Cancel</span>
                    </Button>
                </div>
            </div>

            {orderList.length ?
                <div className='mt-5 w-full flex flex-col lg:flex-row gap-5'>
                    <ChooseQRType />
                    <QRTemplate />
                </div>
                : <></>}

            <section className='bg-white bg-opacity-50 backdrop-blur-sm dark:bg-black dark:bg-opacity-50 px-3 rounded-2xl mt-5'>
                <h1 className='text-xl font-medium p-3 pb-0 select-none'>{orderList.length ? 'Selected Products' : ''}</h1>
                {
                    orderList.length
                        ?
                        <OrderTable data={orderList} />
                        :
                        <div onClick={() => setActiveOrder(true)} className='flex flex-col items-center justify-center cursor-pointer'>
                            <Image src={NoData.src} width={200} height={200} blurDataURL={NoData.blurDataURL} alt='no-data' />
                            <h3 className='-mt-5 text-gray-500'>No Product Selected</h3>
                        </div>
                }
                <div onClick={() => setActiveOrder(true)} className='flex items-center gap-2 bg-white dark:bg-black rounded-3xl rounded-tl-none max-w-max p-4 transform translate-y-1/2 cursor-pointer'>
                    <ListPlus />
                    <span>Add Product</span>
                </div>
            </section>


            {total ?
                <div className='mt-10 sm:max-w-sm ml-auto flex flex-col gap-4 '>
                    {['DIGITAL', "PHYSICAL"].includes(QRType as string) ? <Total total={total} onPayClick={() => { }} /> : <></>}
                </div>
                : <></>}
            {activeOrder ? <ManageOrderProduct initialData={activeOrder === true ? {} : activeOrder} products={products} onClose={() => setActiveOrder(false)} /> : <></>}
        </>
    )
}

export default OrderQR

const ChooseQRType = () => {
    const { QRType, setQRType } = useQRSStore();
    return (
        <div className='glass-base rounded-xl p-3 w-full sm:max-w-max shrink-0 flex flex-col justify-between gap-2'>
            <div>
                <h2 className='text-lg font-medium'>QR Type</h2>
                <p className='text-sm text-gray-500'>Choose what's your need</p>
            </div>
            <div className='flex items-center justify-evenly gap-4'>
                <div className='group flex items-center gap-1'>
                    <div className={cn('p-1 rounded-xl border-2 cursor-pointer', QRType == "DIGITAL" ? 'border-emerald-500' : 'border-transparent')} onClick={() => setQRType("DIGITAL")}>
                        <Image className='rounded-lg' src={DigitalQR.src} blurDataURL={DigitalQR.blurDataURL} width={80} height={80} alt='Digital QR' />
                    </div>
                    <div>
                        <p className='text-sm text-center mt-0.5 text-gray-500'>Digital QR</p>
                        <p>₹ 0.5/qr</p>
                    </div>
                </div>
                <div className='group flex items-center gap-1'>
                    <div className={cn('p-1 rounded-xl border-2 cursor-pointer', QRType === "PHYSICAL" ? 'border-emerald-500' : 'border-transparent')} onClick={() => setQRType("PHYSICAL")}>
                        <Image className='rounded-lg' src={PhysicalQR.src} blurDataURL={PhysicalQR.blurDataURL} width={80} height={80} alt='Physical QR' />
                    </div>
                    <div>
                        <p className='text-xs text-center mt-0.5 text-gray-500'>Physical QR</p>
                        <p>₹ 0.8/qr</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Total = ({ total, onPayClick }: {
    total: number;
    onPayClick: () => void;


}) => {
    return (
        <section className='glass-base rounded-xl p-3 w-full'>
            <table className='table-auto border-separate border-spacing-y-2 border-spacing-x-5 w-full ml-auto'>
                <tbody>
                    <tr>
                        <td className='min-w-32'>Subtotal:</td>
                        <td className='w-full text-right'>+ ₹{(total).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className='min-w-32'>Discount (5%):</td>
                        <td className='w-full text-right'>- ₹{(total * 0.05).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className='min-w-32'>Tax (8%):</td>
                        <td className='w-full text-right'>+ ₹{(total * 0.08).toFixed(2)}</td>
                    </tr>
                    <tr className=''>
                        <td className='border-t border-dashed pt-3'>Total:</td>
                        <td className='w-full pt-3 text-right border-t border-dashed'>₹{(total - (total * 0.05) + (total * 0.08)).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <hr className='my-3' />
            <Button onClick={onPayClick} size={"lg"} className='w-full bg-amber-500 hover:bg-amber-600 text-white'>
                <span className='xl:text-lg'>Continue & Pay</span>
            </Button>
        </section>
    )
}