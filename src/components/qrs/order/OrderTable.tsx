import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../ui/table'
import Image from 'next/image'
import moment from 'moment'
import { Button } from '../../ui/button'
import { useQRSStore } from '@/store/qrs.store'
import { getQRPrice } from '@/lib/constants'

const OrderTable = ({ data }: { data: QROrder[] }) => {
  const { setActiveOrder, removeOrderItem, QRType } = useQRSStore()
  return (
    <Table className="product-table text-center">
      <TableHeader>
        <TableRow className="text-center">
          <TableHead className="text-center">S.no.</TableHead>
          <TableHead colSpan={2} className="text-left">
            General Info
          </TableHead>
          <TableHead className="min-w-20 text-center">MRL</TableHead>
          <TableHead className="min-w-28 text-center">Expiry Date</TableHead>
          <TableHead className="min-w-20 text-center">Quantity</TableHead>
          <TableHead className="min-w-20 text-center">Cost</TableHead>
          <TableHead className="min-w-20 w-24"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, i) => {
          return (
            <TableRow key={i} className="">
              <TableCell className="text-center">{i + 1}.</TableCell>
              <TableCell className="min-w-14 !shrink-0 w-20">
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover shrink-0"
                  height="60"
                  width="60"
                  src={item.selectedProduct?.image.url as string}
                  loading="lazy"
                  blurDataURL="/favicon.svg"
                  placeholder="blur"
                />
              </TableCell>
              <TableCell className="min-w-40 text-left cursor-pointer">
                <h1 className="sm:text-base lg:text-lg font-semibold opacity-90 line-clamp-1">
                  {item.selectedProduct?.title}
                </h1>
                <p className="!line-clamp-1 text-xs hidden md:block font-light tracking-wide text-gray-500 py-0.5">
                  {item.selectedProduct?.category.name}
                </p>
              </TableCell>
              <TableCell>₹{item.mrl}</TableCell>
              <TableCell>
                {moment(item.expiryDate).format('DD/MM/YYYY')}
              </TableCell>

              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <p>
                  {
                    QRType
                      ?
                      `₹${(getQRPrice(QRType) * (item.quantity as number)).toFixed(2)}`
                      :
                      '-'
                  }
                </p>
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <Button className="min-w-20" onClick={() => setActiveOrder(item)}>Edit</Button>
                  <Button onClick={() => removeOrderItem(item.id as string)} className="min-w-20 bg-rose-500 hover:bg-rose-600 text-white">
                    Remove
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default OrderTable
