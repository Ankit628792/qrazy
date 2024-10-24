"use client"
import PopUp from '@/components/ak/PopUp'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Tooltip from '../../ui/tooltip'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import { ProductSearchSelect } from './ProductSearchSelect'
import ProductCard from './ProductCard'
import { Input } from '../../ui/input'
import Error from '../../ui/error'
import { DatePicker } from '../../ui/date-picker'
import DigitalQR from '@/assets/digital.png'
import PhysicalQR from '@/assets/physical.png'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Label } from '../../ui/label'
import { Button } from '../../ui/button'

type QRData = {
    digital?: boolean;
    physical?: boolean;
    quantity?: number;
    expiryDate?: Date | undefined;
    mrl?: string;
    selectedProduct?: Product | undefined | null
}

function ManageOrderProduct({ products, initialData = {}, onClose }: { products: Product[], initialData?: QRData, onClose: () => void }) {
    // const [selectProduct, setSelectedProduct] = useState<Product | undefined | null>(initialProduct);
    const [data, setData] = useState<QRData>(initialData)

    const handleProductSelect = (product: Product | null) => {
        setData((prev) => ({ ...prev, selectedProduct: product }))
    }

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <section className='w-full'>
            <PopUp onClose={onClose}>
                <Card className='w-full max-w-xl bg-white dark:bg-black rounded-xl relative y-translate'>
                    <div className='absolute top-3 right-3 p-2 pb-0 cursor-pointer' onClick={onClose}>
                        <Tooltip title='Cancel'>
                            <XIcon />
                        </Tooltip>
                    </div>
                    <CardHeader>
                        <CardTitle>
                            Manage Order Item
                        </CardTitle>
                        <CardDescription>
                            Provide the product details for the QR to be generated
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-4'>
                        <div className='w-full'>
                            <Label>Select a product</Label>
                            <ProductSearchSelect placeholder='Search and select a product' options={products} product={data.selectedProduct} onChange={handleProductSelect} />
                            <Error error={data.selectedProduct ? "" : "Error here"} />
                            {
                                data.selectedProduct ?
                                    <div className='relative'>
                                        <ProductCard className='cursor-auto' product={data.selectedProduct} />
                                        <div onClick={() => handleProductSelect(null)} className='absolute top-0 right-0 h-full grid place-items-center p-2 cursor-pointer hover:text-rose-500'>
                                            <XIcon className='w-10' />
                                        </div>
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                        <div className='w-full'>
                            <Label>QR Quantity</Label>
                            <Input name='quantity' value={data.quantity} onChange={handleDataChange} placeholder='Quantity of QRs to be requested' />
                            <Error error={"Error here"} />
                        </div>

                        <div className='w-full mt-1'>
                            <Label>Expiry date</Label>
                            <DatePicker placeholder='Select an expiry date of generated QRs' date={data.expiryDate} onDateChange={(date) => setData({ ...data, expiryDate: date })} />
                            <Error error={"Error here"} />
                        </div>

                        <div>
                            <Label>Maximum Reward Limit (MRL)</Label>
                            <Input name='mrl' value={data.mrl} onChange={handleDataChange} placeholder='What will be the maximum reward limit?' />
                            <Error error={"Error here"} />
                        </div>
                        <div>
                            <Label>QR Type</Label>
                            <div className='flex gap-6 my-1'>
                                <div className='group'>
                                    <div className={cn('p-1.5 rounded-3xl cursor-pointer border-2', data.digital ? 'border-emerald-500' : 'border-transparent')} onClick={() => setData((prev) => ({ ...prev, digital: !prev.digital }))}>
                                        <Image className='rounded-2xl' src={DigitalQR.src} blurDataURL={DigitalQR.blurDataURL} width={80} height={80} alt='Digital QR' />
                                    </div>
                                    <p className='text-xs text-center mt-1 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out'>Digital QR</p>
                                </div>
                                <div className='group'>
                                    <div className={cn('p-1.5 rounded-3xl cursor-pointer border-2', data.physical ? 'border-emerald-500' : 'border-transparent')} onClick={() => setData((prev) => ({ ...prev, physical: !prev.physical }))}>
                                        <Image className='rounded-2xl' src={PhysicalQR.src} blurDataURL={PhysicalQR.blurDataURL} width={80} height={80} alt='Physical QR' />
                                    </div>
                                    <p className='text-xs text-center mt-1 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out'>Physical QR</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className='flex items-center justify-between w-full'>
                            <Button size={"lg"} className='bg-emerald-500 hover:bg-emerald-600 text-white' onClick={() => {

                            }}>
                                <span className='text-base'>Save Details</span>
                            </Button>
                            <Button size={"lg"} onClick={onClose}>
                                <span className='text-base'>Cancel</span>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </PopUp>
        </section >
    )
}

export default ManageOrderProduct

