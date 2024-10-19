import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import Image from 'next/image'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Dropdown } from '../ui/dropdown-menu'
import moment from 'moment'

type Header = {
    accessor: string,
    title: string,
}
const ProductTable = ({ data, headers }: { data: Product[], headers: Header[] }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {
                        headers.map((header) => (
                            <TableHead key={header.accessor} className='min-w-max'>
                                {header.title}
                            </TableHead>
                        ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((item, i) => {
                        return (
                            <TableRow key={item.id} className='bg-white dark:bg-black'>
                                <TableCell className="hidden sm:table-cell">
                                    <Image
                                        alt="Product image"
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        src={item.image.url}
                                        width="64"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">
                                    <p>{item.title}</p>
                                    <p>{item.category.name}</p>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{item.status}</Badge>
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

const Badge = ({ children, variant }: {
    children: React.ReactNode,
    variant?: string
}) => {
    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
            {children}
        </span>
    )
}

const MoreOption = ({ id }: { id: string | number }) => {
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