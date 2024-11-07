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
import { Label } from '../../ui/label'
import { Button } from '../../ui/button'

type QRData = {
    quantity?: number;
    expiryDate?: Date | undefined;
    mrl?: string;
    selectedProduct?: Product | undefined | null
}

function ManageOrderProduct({ products, initialData = {}, onClose, viewOnly = false, title, description }: {
    products: Product[],
    initialData?: QRData,
    onClose: () => void,
    viewOnly?: boolean,
    title?: string,
    description?: string
}) {
    const [data, setData] = useState<QRData>(initialData)

    const handleProductSelect = (product: Product | null) => {
        setData((prev) => ({ ...prev, selectedProduct: product }))
    }

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <PopUp onClose={onClose}>
            <Card className='w-full max-w-xl bg-white dark:bg-black rounded-xl relative y-translate'>
                <div className='absolute top-3 right-3 p-2 pb-0 cursor-pointer' onClick={onClose}>
                    <Tooltip title='Cancel'>
                        <XIcon />
                    </Tooltip>
                </div>
                <CardHeader>
                    <CardTitle>
                        {title || 'Manage Order Item'}
                    </CardTitle>
                    <CardDescription>
                        {description || 'Provide the product details for the QR to be generated'}
                    </CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                    <div className='w-full'>
                        <Label>Select a product</Label>
                        <ProductSearchSelect disabled={viewOnly} placeholder='Search and select a product' options={products} product={data.selectedProduct} onChange={handleProductSelect} />
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
                        <Input disabled={viewOnly} name='quantity' value={data.quantity} onChange={handleDataChange} placeholder='Quantity of QRs to be requested' />
                        <Error error={"Error here"} />
                    </div>

                    <div className='w-full mt-1'>
                        <Label>Expiry date</Label>
                        <DatePicker disabled={viewOnly} placeholder='Select an expiry date of generated QRs' date={data.expiryDate} onDateChange={(date) => setData({ ...data, expiryDate: date })} />
                        <Error error={"Error here"} />
                    </div>

                    <div>
                        <Label>Maximum Reward Limit (MRL)</Label>
                        <Input disabled={viewOnly} name='mrl' value={data.mrl} onChange={handleDataChange} placeholder='What will be the maximum reward limit?' />
                        <Error error={"Error here"} />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className='flex items-center justify-between w-full'>
                        {viewOnly ? <></> : <Button size={"lg"} className='bg-emerald-500 hover:bg-emerald-600 text-white' onClick={() => {

                        }}>
                            <span className='text-base'>Save Details</span>
                        </Button>}
                        <Button size={"lg"} onClick={onClose}>
                            <span className='text-base'>Close</span>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </PopUp>
    )
}

export default ManageOrderProduct

