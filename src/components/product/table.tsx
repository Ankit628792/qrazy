import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import Image from 'next/image'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Dropdown } from '../ui/dropdown-menu'
import moment from 'moment'
import { cn } from '@/lib/utils'

const ProductTable = ({ data }: { data: Product[] }) => {
    return (
        <Table className='product-table text-center'>
            <TableHeader>
                <TableRow className='text-center'>
                    <TableHead colSpan={2} className='text-center'>General Info</TableHead>
                    <TableHead className='text-center'>Category</TableHead>
                    <TableHead className='text-center'>Status</TableHead>
                    <TableHead className='min-w-28 text-center'>Top Region</TableHead>
                    <TableHead className='min-w-28 text-center'>QR Scans</TableHead>
                    <TableHead className='min-w-32 text-center'>Created On</TableHead>
                    <TableHead className='min-w-32 text-center'>Updated On</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((item, i) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell className='min-w-14 !shrink-0'>
                                    <Image
                                        alt="Product image"
                                        className="aspect-square rounded-md object-cover shrink-0"
                                        height="72"
                                        width="72"
                                        src={item.image.url}
                                        loading='lazy'
                                        blurDataURL='/favicon.svg'
                                        placeholder='blur'
                                    />
                                </TableCell>
                                <TableCell className="min-w-40 text-left cursor-pointer">
                                    <h1 className='sm:text-base lg:text-lg font-semibold opacity-90 line-clamp-1'>{item.title}</h1>
                                    <p className='!line-clamp-1 text-xs hidden md:block font-light tracking-wide text-gray-500 py-0.5'>{item.description}</p>
                                </TableCell>
                                <TableCell>{item.category.name}</TableCell>
                                <TableCell>
                                    <Status id={item.id} type={item.status}>
                                        <Badge type={item.status} />
                                    </Status>
                                </TableCell>
                                <TableCell>{item.region}</TableCell>
                                <TableCell>
                                    {item.scans}
                                </TableCell>
                                <TableCell>
                                    {moment(item.created_at).format("DD/MM/YYYY")}
                                </TableCell>
                                <TableCell>
                                    {moment(item.updated_at).format("DD/MM/YYYY")}
                                </TableCell>
                                <TableCell>
                                    <MoreOption id={item.id} />
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}


export default ProductTable

const Badge = ({ variant, className, type }: {
    variant?: string
    className?: string
    type: string
}) => {
    return (
        <span className={cn("block min-w-16 items-center px-2.5 py-1 rounded-full text-xs font-medium text-white w-full", variant === "outline" ? "border" : "", type === "active" ? "bg-emerald-500" : type === "inactive" ? "bg-rose-500" : type === "draft" ? "bg-orange-500" : "", className)}>
            {type}
        </span>
    )
}

const Status = ({ children, id, type }: {
    children: React.ReactNode,
    id: string | number,
    type: string
}) => {

    const handleClick = (action: string) => {
        console.log(`Clicked on ${action} action having ${id}`)
    }
    return (
        <Dropdown label='Change Status' items={type === "draft" ? ["edit"] : type === "active" ? ["inactive"] : type === "inactive" ? ["active"] : []} handleClick={handleClick}>
            <div className='cursor-pointer'>
                {children}
            </div>
        </Dropdown>
    )
}

export const MoreOption = ({ id }: { id: string | number }) => {
    const handleClick = (action: string) => {
        console.log(`Clicked on ${action} action having ${id}`)
    }
    return (
        <Dropdown label='Actions' items={["edit", "view", "generate QRs"]} handleClick={handleClick}>
            <Button
                aria-haspopup="true"
                size="icon"
                variant="ghost"
            >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
            </Button>
        </Dropdown>
    )
}