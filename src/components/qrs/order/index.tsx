"use client"
import React, { useEffect, useState } from 'react'
import OrderTable from './OrderTable'
import { ListPlus } from 'lucide-react';
import { generateRandomProducts } from '@/app/(dashboard)/products/listing/constant';
import ManageOrderProduct, { ProductSelected, QRData } from './ManageOrderProduct';
import { Button } from '@/components/ui/button';
import { getRandomNumber } from '@/lib';
import { useRouter } from 'next/navigation';
import QRTemplate from './QRTemplate';
import DigitalQR from '@/assets/digital.png'
import PhysicalQR from '@/assets/physical.png'
import Image from 'next/image'
import { cn } from '@/lib/utils';
import { useGetProductListing } from '@/hooks/product/useGetProductListing';
import { get } from 'lodash';
import { v4 as uuidv4 } from 'uuid'
import { QRTemplates } from '../generate/constant';
import usePayment from '@/hooks/usePayment';

export const exampleOrderItem: QRData = {
    id: uuidv4(),
    selectedProduct: {
        id: "number",
        title: "Red Lebel",
        image: {
            id: "image",
            url: "https://images.unsplash.com/photo-1549049950-48d5887197a0",
        },
        category: {
            id: 'string',
            name: "Drinks & Beverage",
            description: "drinks"
        },
        mrl: 6767,
        mrp: 100
    },
    mrl: 6767,
    quantity: 123,
    expiryDate: new Date()
}

function OrderQR() {
    const router = useRouter()

    // const products = generateRandomProducts(5)
    const [orderList, setOrderList] = useState<QRData[]>([])
    const [selectedItem, setSelectedItem] = useState<boolean | QRData | undefined>();
    const [products, setProducts] = useState<Product[]>([])
    const [qrType, setQrType] = useState("DIGITAL");
    const [templateId, setTemplateId] = useState<string>(QRTemplates[0].id);

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
                category: product.category,
                mrp: get(product, 'mrp', 0),
                mrl: get(product, 'mrl', 0),

            }))
            setProducts(transformedProducts as unknown as Product[])
        }
    }, [productsListing])

    const { createQROrder, isPending: isCreatingQROrder } = usePayment()

    const onCheckout = () => {
        const products = orderList.map((item) => {
            return {
                productId: item.selectedProduct?.id as string,
                quantity: item.quantity,
                expiryDate: item.expiryDate as Date,
                mrl: item.mrl as number
            }
        })
        createQROrder({
            "qrOrders": products,
            qrType,
            templateId

        })
    }




    const handleSubmit = (data: QRData) => {
        const arr = [...orderList];
        const idx = arr.findIndex(el => el.id === data.id);

        if (idx >= 0) {
            arr[idx] = data;
        } else {
            const productArr = [...products];
            const productIdx = productArr.findIndex(el => el.id === data.selectedProduct?.id)
            if (productIdx > -1) {
                productArr.splice(productIdx, 1);
                setProducts(productArr);
            }
            arr.push(data);
        }
        setOrderList(arr);
    }

    function handleEdit(row: QRData) {
        if (isCreatingQROrder) return;
        setSelectedItem(row)
    }

    function handleDelete(row: QRData) {
        if (isCreatingQROrder) return;
        const index = orderList.findIndex((item) => item.id === row.id);
        if (index > -1) {
            const updatedArrayList = [...orderList];
            updatedArrayList.splice(index, 1);
            setOrderList(updatedArrayList);
        }
    }

    function handleQRTemplate(id: string, cb: Function) {
        if (isCreatingQROrder) return;
        setTemplateId(id);
        cb();
    }
    function handleQRType(item: string, cb: Function) {
        if (isCreatingQROrder) return;
        setQrType(item);
        cb();
    }

    return (
        <>
            <div className='bg-white dark:bg-black flex items-center justify-between p-3 pl-5 rounded-xl'>
                <h1 className='text-2xl lg:text-3xl font-semibold'>Order QRs</h1>
                {orderList.length ? <div className='flex items-center gap-4'>
                    <Button loading={isCreatingQROrder} onClick={onCheckout} className={cn('w-full bg-amber-500 hover:bg-amber-600 text-white')}>
                        <span>Checkout</span>
                    </Button>
                    <Button disabled={isCreatingQROrder} onClick={() => { router.replace('/qrs') }}>
                        <span>Cancel</span>
                    </Button>
                </div> : <></>}
            </div>
            <div className='mt-5 w-full flex flex-col lg:flex-row gap-5'>
                <QRType initial={qrType} onChange={handleQRType} />
                <QRTemplate initial={templateId} onChange={handleQRTemplate} />
            </div>
            <section className='bg-white bg-opacity-50 backdrop-blur-sm dark:bg-black dark:bg-opacity-50 px-3 rounded-2xl mt-5'>
                <h1 className='text-xl font-medium p-3 pb-0 select-none'>Selected Products</h1>
                {
                    orderList.length
                        ?
                        <OrderTable price={qrType == "DIGITAL" ? 0.5 : qrType == "PHYSICAL" ? 0.8 : 0} data={orderList} handleDelete={handleDelete} handleEdit={handleEdit} />
                        :
                        <h3 className='pt-5 pl-5 text-gray-500'>No Item yet</h3>
                }
                <div onClick={() => setSelectedItem(true)} className='flex items-center gap-2 bg-white dark:bg-black rounded-3xl rounded-tl-none max-w-max p-4 transform translate-y-1/2 cursor-pointer'>
                    <ListPlus />
                    <span>Add Product</span>
                </div>
            </section>

            {orderList.length ? <div className='mt-10 sm:max-w-sm ml-auto flex flex-col gap-4 '>
                <Total loading={isCreatingQROrder} onCheckout={onCheckout} />
            </div> : <></>}

            {selectedItem ?
                <ManageOrderProduct initialData={typeof selectedItem === "boolean" ? undefined : selectedItem} products={products as Product[]} onClose={() => setSelectedItem(false)}
                    handleSubmit={(data: QRData) => handleSubmit(data)}
                />
                : <></>}
        </>
    )
}

export default OrderQR

const QRType = ({ initial, onChange }: {
    initial: string, onChange: (item: string, cb: Function) => void
}) => {
    const [qrType, setQrType] = useState(initial)
    const handleQRType = (type: string) => {
        onChange(type, () => setQrType(type))
    }
    return (
        <div className='glass-base rounded-xl p-3 w-full sm:max-w-max shrink-0 flex flex-col justify-between gap-2'>
            <div>
                <h2 className='text-lg font-medium'>QR Type</h2>
                <p className='text-sm text-gray-500'>Choose what's your need</p>
            </div>
            <div className='flex items-center justify-evenly gap-4'>
                <div className='group flex items-center gap-1'>
                    <div className={cn('p-1 rounded-xl border-2 cursor-pointer', qrType == "DIGITAL" ? 'border-emerald-500' : 'border-transparent')} onClick={() => handleQRType("DIGITAL")}>
                        <Image className='rounded-lg' src={DigitalQR.src} blurDataURL={DigitalQR.blurDataURL} width={80} height={80} alt='Digital QR' />
                    </div>
                    <div>
                        <p className='text-sm text-center mt-0.5 text-gray-500'>Digital QR</p>
                        <p>₹ 0.5/qr</p>
                    </div>
                </div>
                <div className='group flex items-center gap-1'>
                    <div className={cn('p-1 rounded-xl border-2 cursor-pointer', qrType === "PHYSICAL" ? 'border-emerald-500' : 'border-transparent')} onClick={() => handleQRType("PHYSICAL")}>
                        <Image className='rounded-lg' src={PhysicalQR.src} blurDataURL={PhysicalQR.blurDataURL} width={80} height={80} alt='Physical QR' />
                    </div>
                    <div>
                        <p className='text-xs text-center mt-0.5 text-gray-500'>Physical QR</p>
                        <p>₹ 0.8/qr</p>
                    </div>
                </div>
            </div >
        </div >
    )
}

const Total = ({ loading, onCheckout }: {
    loading?: boolean,
    onCheckout: () => void;
}) => {
    const total = getRandomNumber(1000, 10000)
    return (
        <section className='glass-base rounded-xl p-3 w-full'>
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
            <Button loading={loading} onClick={onCheckout} size={"lg"} className='w-full bg-amber-500 hover:bg-amber-600 text-white'>
                <span className='xl:text-lg'>Checkout</span>
            </Button>
        </section>
    )
}

