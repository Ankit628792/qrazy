'use client'
import PopUp from '@/components/ak/PopUp'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
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
import { useQRSStore } from '@/store/qrs.store'
import * as Yup from 'yup'

type TError = Record<string, string | null>

function ManageOrderProduct({
  products,
  initialData = {},
  onClose,
  viewOnly = false,
  title,
  description
}: {
  products: Product[]
  initialData?: QROrder
  onClose: () => void
  viewOnly?: boolean
  title?: string
  description?: string
}) {
  const { setOrderList } = useQRSStore()
  const [data, setData] = useState<QROrder>(initialData)


  const orderSchema = Yup.object({
    quantity: Yup.number().required('QR Quantity is required'),
    mrl: Yup.number().required('Reward Limit is required'),
    expiryDate: Yup.date().required('Expiry Date is required'),
  })


  const [errors, setErrors] = useState<TError>({
    selectedProduct: null,
    quantity: null,
    mrl: null,
    expiryDate: null
  })


  const handleProductSelect = (product: Product | null) => {
    setData((prev) => ({ ...prev, selectedProduct: product, mrl: product?.mrl }))
    setErrors({ ...errors, selectedProduct: '' })
  }

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (!data.selectedProduct) {
      return setErrors({ ...errors, selectedProduct: "Select a Product" })
    }
    try {
      await orderSchema.validate(data, {
        abortEarly: false
      })
      setErrors({})
      setOrderList(data)
      console.log('Form:', {
        formData: data
      })
    } catch (err: any) {
      const validationErrors: Record<string, string> = {}
      const firstError = err.inner[0]
      validationErrors[firstError.path] = firstError.message
      setErrors(validationErrors)
    }
  }

  return (
    <PopUp onClose={onClose}>
      <Card className="w-full max-w-xl bg-white dark:bg-black rounded-xl relative y-translate">
        <div
          className="absolute top-3 right-3 p-2 pb-0 cursor-pointer"
          onClick={onClose}
        >
          <Tooltip title="Cancel">
            <XIcon />
          </Tooltip>
        </div>
        <CardHeader>
          <CardTitle>{title || 'Manage Order Item'}</CardTitle>
          <CardDescription>
            {description ||
              'Provide the product details for the QR to be generated'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="w-full">
            <Label>Select a product</Label>
            <ProductSearchSelect
              disabled={viewOnly}
              placeholder="Search and select a product"
              options={products}
              product={data.selectedProduct}
              onChange={handleProductSelect}
            />
            <Error error={errors.selectedProduct} />
            {data.selectedProduct ? (
              <div className="relative">
                <ProductCard
                  className="cursor-auto"
                  product={data.selectedProduct}
                />
                <div
                  onClick={() => handleProductSelect(null)}
                  className="absolute top-0 right-0 h-full grid place-items-center p-2 cursor-pointer hover:text-rose-500"
                >
                  <XIcon className="w-10" />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="w-full">
            <Label>QR Quantity</Label>
            <Input
              disabled={viewOnly}
              name="quantity"
              value={data.quantity}
              onChange={handleDataChange}
              placeholder="Quantity of QRs to be requested"
              onFocus={() => setErrors({ ...errors, quantity: '' })}
            />
            <Error error={errors.quantity} />
          </div>

          <div className="w-full mt-1">
            <Label>Expiry date</Label>
            <DatePicker
              disabled={viewOnly}
              placeholder="Select an expiry date of generated QRs"
              date={data.expiryDate}
              onDateChange={(date) => setData({ ...data, expiryDate: date })}
              onFocus={() => setErrors({ ...errors, expiryDate: '' })}
            />
            <Error error={errors.expiryDate} />
          </div>

          <div>
            <Label>Maximum Reward Limit (MRL)</Label>
            <Input
              disabled={viewOnly}
              name="mrl"
              value={data.mrl}
              onChange={handleDataChange}
              placeholder="What will be the maximum reward limit?"
              onFocus={() => setErrors({ ...errors, mrl: '' })}
            />
            <Error error={errors.mrl} />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            {viewOnly ? (
              <></>
            ) : (
              <Button
                size={'lg'}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                onClick={handleSave}
              >
                <span className="text-base">Save Details</span>
              </Button>
            )}
            <Button size={'lg'} onClick={onClose}>
              <span className="text-base">Close</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </PopUp>
  )
}

export default ManageOrderProduct
