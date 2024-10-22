"use client"
import PopUp from '@/components/ak/PopUp'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Tooltip from '../ui/tooltip'
import { XIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ProductSearchSelect } from './ProductSearchSelect'
import ProductCard from './ProductCard'
function QRInvoice({ products }: { products: Product[] }) {
    const [selectProduct, setSelectedProduct] = useState<Product | undefined>(products[2]);
    const onClose = () => {
        // Close the pop-up
    }

    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product)
    }
    return (
        <section className='w-full'>
            <PopUp>
                <Card className='w-full max-w-xl bg-white dark:bg-black rounded-xl relative y-translate'>
                    <div className='absolute top-3 right-3 p-2 pb-0 cursor-pointer' onClick={onClose}>
                        <Tooltip title='Cancel'>
                            <XIcon />
                        </Tooltip>
                    </div>
                    <CardHeader>
                        <CardTitle>
                            Manage Item
                        </CardTitle>
                        <CardDescription>
                            Provide the product details for the QR to be generated
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProductSearchSelect options={products} product={selectProduct} onChange={handleProductSelect} />
                        {
                            selectProduct ?
                                <ProductCard product={selectProduct} />
                                :
                                <></>
                        }
                    </CardContent>
                </Card>
            </PopUp>
        </section>
    )
}

export default QRInvoice

