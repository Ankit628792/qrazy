"use client"
import PopUp from '@/components/ak/PopUp'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Tooltip from '../../ui/tooltip'
import { XIcon } from 'lucide-react'
import { MouseEvent, useState } from 'react'
import { ProductSearchSelect } from './ProductSearchSelect'
import ProductCard from './ProductCard'
import { Input } from '../../ui/input'
import Error from '../../ui/error'
import { DatePicker } from '../../ui/date-picker'
import { Label } from '../../ui/label'
import { Button } from '../../ui/button'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'

export type QRData = {
    id: string;
    quantity: number;
    expiryDate: Date | undefined;
    mrl: string | number;
    selectedProduct: ProductSelected | undefined | null
}

export type ProductSelected = {
    id: string;
    title: string;
    description?: string;
    image: {
        id: string;
        url: string;
    };
    category: {
        id: string;
        name: string;
        description: string;
    };
    mrp: number | string;
    mrl: number | string;
}


const validationSchema = Yup.object().shape({
    selectedProduct: Yup.object().shape({
        id: Yup.string().uuid("Invalid product ID").required("Product ID is required"),
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        image: Yup.object().shape({
            id: Yup.string().uuid("Invalid image ID").required("Image ID is required"),
            url: Yup.string()
                .url("Invalid image URL")
                .required("Image URL is required"),
        }).required("Image is required"),
        category: Yup.object().shape({
            id: Yup.string().uuid("Invalid category ID").required("Category ID is required"),
            name: Yup.string().required("Category name is required"),
            description: Yup.string().required("Category description is required"),
        }).required("Category is required"),
        mrp: Yup.number()
            .min(0, "MRP cannot be negative")
            .required("MRP is required"),
        mrl: Yup.number()
            .min(0, "MRL cannot be negative")
            .required("MRL is required"),
    }).required("Selected product is required"),
    quantity: Yup.number()
        .integer("Quantity must be an integer")
        .min(1, "Quantity must be at least 1")
        .required("Quantity is required"),
    expiryDate: Yup.date()
        .min(new Date(), "Expiry date must be in the future")
        .required("Expiry date is required"),
    mrl: Yup.number()
        .min(0, "MRL cannot be negative")
        .required("MRL is required"),
});

function ManageOrderProduct({ products, initialData, onClose, viewOnly = false, title, description, handleSubmit }: {
    products: Product[],
    initialData?: QRData,
    onClose: () => void,
    viewOnly?: boolean,
    title?: string,
    description?: string,
    handleSubmit: (data: QRData) => void
}) {
    const [data, setData] = useState<QRData | Record<string, any>>(initialData || {
        quantity: 1200,
        expiryDate: new Date(),
        mrl: 100,
    })
    const [error, setError] = useState<Record<string, string | null>>({})

    const handleProductSelect = (product: Product | null) => {
        setData((prev: QRData) => ({ ...prev, selectedProduct: product as ProductSelected }))
    }

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmitClicked = async (e:
        any
    ) => {
        e.preventDefault()
        console.log("Submit ===> ", data)

        try {
            await validationSchema.validate(data, { abortEarly: false })
            setError({})
            handleSubmit({ ...data, id: uuidv4() } as QRData)
            onClose()
        } catch (err: unknown) {
            const validationErrors: Record<string, string> = {}

            // Check if the error is a Yup validation error
            if (err instanceof Yup.ValidationError) {
                // Loop through validation errors and collect them
                err.inner.forEach((error) => {
                    if (error.path) {
                        validationErrors[error.path] = error.message
                    }
                })

                // Set errors in state in a batch after collecting them
                Object.keys(validationErrors).forEach((field) => {
                    setError((prevError) => ({
                        ...prevError,
                        [field]: validationErrors[field],
                    }))
                })

                // Log validation errors along with the form data and existing errors
            }
        }
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
                        <ProductSearchSelect disabled={viewOnly} placeholder='Search and select a product' options={products as Product[]} product={data.selectedProduct as Product} onChange={handleProductSelect} />
                        {/* <Error error={data.selectedProduct ? "" : "Error here"} /> */}
                        <Error error={error.selectedProduct} />
                        {
                            data.selectedProduct ?
                                <div className='relative'>
                                    <ProductCard className='cursor-auto' product={data.selectedProduct as Product} />
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
                        <Error error={
                            error.quantity
                        } />
                    </div>

                    <div className='w-full mt-1'>
                        <Label>Expiry date</Label>
                        <DatePicker disabled={viewOnly} placeholder='Select an expiry date of generated QRs' date={data.expiryDate} onDateChange={(date) => setData({ ...data, expiryDate: date })} />
                        <Error error={
                            error.expiryDate
                        } />
                    </div>

                    <div>
                        <Label>Maximum Reward Limit (MRL)</Label>
                        <Input disabled={viewOnly} name='mrl' value={data.mrl} onChange={handleDataChange} placeholder='What will be the maximum reward limit?' />
                        <Error error={
                            error.mrl
                        } />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className='flex items-center justify-between w-full'>
                        {viewOnly ? <></> : <Button size={"lg"} className='bg-emerald-500 hover:bg-emerald-600 text-white' onClick={(e) =>
                            handleSubmitClicked(e)
                        }>
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

