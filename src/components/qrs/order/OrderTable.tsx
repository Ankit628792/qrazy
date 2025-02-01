import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import Image from 'next/image'
import moment from 'moment'
import { Button } from '../../ui/button'
import { QRData } from './ManageOrderProduct'

const OrderTable = ({ data, handleDelete, handleEdit, price }: {
    data: QRData[];
    handleDelete: (item: QRData) => void;
    handleEdit: (item: QRData) => void;
    price?: number;
}) => {
    return (
        <Table className='product-table text-center'>
            <TableHeader>
                <TableRow className='text-center'>
                    <TableHead className='text-center'>S.no.</TableHead>
                    <TableHead colSpan={2} className='text-left'>General Info</TableHead>
                    <TableHead className='min-w-20 text-center'>MRL</TableHead>
                    <TableHead className='min-w-28 text-center'>Expiry Date</TableHead>
                    <TableHead className='min-w-20 text-center'>Quantity</TableHead>
                    <TableHead className='min-w-20 text-center'>Cost</TableHead>
                    <TableHead className='min-w-20 w-24'></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((item, i) => {
                        const cost = price ? `₹${(price * item.quantity).toFixed(2)}` : "-"
                        const product = item.selectedProduct;
                        if (!product) {
                            return null;
                        }
                        return (
                            <TableRow key={i} className=''>
                                <TableCell className='text-center'>{i + 1}.</TableCell>
                                <TableCell className='min-w-14 !shrink-0 w-20'>
                                    <Image
                                        alt="Product image"
                                        className="aspect-square rounded-md object-cover shrink-0"
                                        height="60"
                                        width="60"
                                        src={product?.image.url as string}
                                        loading='lazy'
                                        blurDataURL='/favicon.svg'
                                        placeholder='blur'
                                    />
                                </TableCell>
                                <TableCell className="min-w-40 text-left cursor-pointer">
                                    <h1 className='sm:text-base lg:text-lg font-semibold opacity-90 line-clamp-1'>{product?.title}</h1>
                                    <p className='!line-clamp-1 text-xs hidden md:block font-light tracking-wide text-gray-500 py-0.5'>{product.category.name}</p>
                                </TableCell>
                                <TableCell>₹ {item.mrl}</TableCell>
                                <TableCell>{moment(item.expiryDate).format("DD/MM/YYYY")}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>
                                    <p>{cost}</p>
                                </TableCell>
                                <TableCell>
                                    <div className='flex gap-4'>
                                        <Button onClick={() => handleEdit(item)} className='min-w-20'>Edit</Button>
                                        <Button onClick={() => handleDelete(item)} className='min-w-20 bg-rose-500 hover:bg-rose-600 text-white'>Remove</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}


export default OrderTable
