import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Dropdown } from '../ui/dropdown-menu'
import moment from 'moment'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { formatNumberWithCommas } from '@/lib'

// Need to update after getting proper data from backend
interface IInvoiceRow extends Product {
    totalQuantity: number;
    amount: number;
}

const InvoiceTable = ({ data }: { data: IInvoiceRow[] }) => {
    const router = useRouter()
    return (
        <Table className='product-table text-center'>
            <TableHeader>
                <TableRow className='text-center'>
                    <TableHead className='text-center'>Order ID</TableHead>
                    <TableHead className='min-w-32 text-center'>Transaction ID</TableHead>
                    <TableHead className='min-w-28 text-center'>Quantity</TableHead>
                    <TableHead className='min-w-32 text-center'>Total Amount</TableHead>
                    {/* <TableHead className='min-w-32 text-center'>Ordered By</TableHead> */}
                    <TableHead className='min-w-32 text-center'>Ordered On</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((item, i) => {
                        return (
                            <TableRow className='cursor-pointer' key={item.id} onClick={() => router.push("/qrs/invoice/" + item.id)}>
                                <TableCell>
                                    <p>OR7867867J7F8</p>
                                </TableCell>
                                <TableCell>
                                    <p>OR7867867J7F8</p>
                                </TableCell>

                                <TableCell>{formatNumberWithCommas(item.totalQuantity)}</TableCell>
                                <TableCell>₹ {formatNumberWithCommas(item.amount / 100)}</TableCell>
                                {/* <TableCell>
                                    Ankit Kumar
                                </TableCell> */}
                                <TableCell>
                                    {moment(item.created_at).format("DD/MM/YYYY")}
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table >
    )
}


export default InvoiceTable

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