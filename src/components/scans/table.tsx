import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import Image from 'next/image'
import moment from 'moment'

const ScanTable = ({ data }: { data: ScanRow[] }) => {
  return (
    <Table className="product-table text-center !border-spacing-y-0">
      <TableHeader>
        <TableRow className="text-center">
          <TableHead colSpan={2} className="text-center">
            General Info
          </TableHead>
          {/* <TableHead className='text-center'>Category</TableHead> */}
          <TableHead className="min-w-28 text-center">User Name</TableHead>
          <TableHead className="min-w-28 text-center">Reward</TableHead>
          <TableHead className="min-w-28 text-center">Place</TableHead>
          <TableHead className="min-w-32 text-center">Scanned</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, i) => {
          return (
            <TableRow key={item.id}>
              <TableCell className="min-w-14 !shrink-0">
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover shrink-0"
                  height="60"
                  width="60"
                  src="/favicon.svg"
                  loading="lazy"
                  blurDataURL="/favicon.svg"
                  placeholder="blur"
                />
              </TableCell>
              <TableCell className="min-w-40 text-left cursor-pointer">
                <h1 className="sm:text-base font-semibold opacity-90 line-clamp-1">
                  {item.title}
                </h1>
                <p className="!line-clamp-1 text-sm font-light tracking-wide text-gray-500 py-0.5">
                  {item.category.name}
                </p>
              </TableCell>
              {/* <TableCell>{item.category.name}</TableCell> */}
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.reward}</TableCell>
              <TableCell>{item.region}</TableCell>
              <TableCell>
                {moment(item.created_at).subtract(7, 'minutes').fromNow()}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ScanTable
