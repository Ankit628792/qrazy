import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { Button } from '../ui/button'
import { UserRoundX } from 'lucide-react'
import { Dropdown } from '../ui/dropdown-menu'
import moment from 'moment'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import Tooltip from '../ui/tooltip'

export type User = {
  id: string | number
  name: string
  email: string
  account_status: string
  user_status: string
  created_at?: Date | string | undefined
  verified_at: Date | string | null
  role: string
}

const UserTable = ({ data }: { data: User[] }) => {
  return (
    <Table className="product-table text-center">
      <TableHeader>
        <TableRow className="text-center">
          <TableHead className="text-center">S.no</TableHead>
          <TableHead className="min-w-20 text-center">Role</TableHead>
          <TableHead className="min-w-40 text-center">Name</TableHead>
          <TableHead className="min-w-32 text-center">Email ID</TableHead>
          <TableHead className="min-w-28 text-center">Account</TableHead>
          <TableHead className="min-w-32 text-center">Created On</TableHead>
          <TableHead className="min-w-32 text-center">Verified On</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, i) =>
          item.created_at ? <Row item={item} i={i} key={i} /> : <AddRow i={i} />
        )}
      </TableBody>
    </Table>
  )
}

export default UserTable

const Row = ({ item, i }: { item: User; i: number }) => {
  return (
    <TableRow className="cursor-pointer">
      <TableCell>
        <p>{i + 1}.</p>
      </TableCell>
      <TableCell className="capitalize">
        {item.role === 'admin' ? (
          <Role id={item.id}>
            <p className="font-semibold">Admin</p>
          </Role>
        ) : (
          <p className="font-semibold">User</p>
        )}
      </TableCell>
      <TableCell>
        <p>{item.name}</p>
      </TableCell>
      <TableCell>
        <p>{item.email}</p>
      </TableCell>
      <TableCell className="flex items-center justify-center capitalize">
        <Status id={item.id} type={item.account_status}>
          <Badge type={item.account_status} />
        </Status>
      </TableCell>

      <TableCell>{moment(item.created_at).format('DD/MM/YYYY')}</TableCell>
      <TableCell>
        {item.verified_at ? (
          moment(item.verified_at).format('DD/MM/YYYY')
        ) : (
          <p className="flex items-center justify-center gap-2">
            <span>Pending</span>
            <Tooltip title="Remove User">
              <Button
                size={'sm'}
                className="w-8 h-8 p-0 bg-rose-500 hover:bg-rose-600 text-white"
              >
                <UserRoundX className="w-3" />
              </Button>
            </Tooltip>
          </p>
        )}
      </TableCell>
    </TableRow>
  )
}

const AddRow = ({ i }: { i: number }) => {
  const [data, setData] = useState()
  return (
    <TableRow>
      <TableCell>{i + 1}.</TableCell>
      <TableCell className="capitalize">
        <Dropdown
          label="Access Role"
          items={['sub-admin', 'user']}
          handleClick={(option) => {
            console.log(option)
          }}
        >
          <div className="cursor-pointer">
            <p className="cursor-pointer">User</p>
          </div>
        </Dropdown>
      </TableCell>
      <TableCell>
        <Input placeholder="Name" className="text-center" />
      </TableCell>
      <TableCell colSpan={2}>
        <Input placeholder="Email ID" className="text-center mx-auto" />
      </TableCell>
      <TableCell>
        <Button className="min-w-20" size={'sm'}>
          Save
        </Button>
      </TableCell>
      <TableCell>
        <Button className="min-w-20" size={'sm'}>
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  )
}

const Badge = ({
  variant,
  className,
  type
}: {
  variant?: string
  className?: string
  type: string
}) => {
  return (
    <span
      className={cn(
        'block min-w-16 max-w-20 items-center px-2.5 py-1 rounded-full text-xs font-medium text-white w-full',
        variant === 'outline' ? 'border' : '',
        type === 'active'
          ? 'bg-emerald-500'
          : type === 'inactive'
            ? 'bg-rose-500'
            : type === 'draft'
              ? 'bg-orange-500'
              : '',
        className
      )}
    >
      {type}
    </span>
  )
}

const Status = ({
  children,
  id,
  type
}: {
  children: React.ReactNode
  id: string | number
  type: string
}) => {
  const handleClick = (action: string) => {
    console.log(`Clicked on ${action} action having ${id}`)
  }
  return (
    <Dropdown
      label="Change Status"
      items={
        type === 'draft'
          ? ['edit']
          : type === 'active'
            ? ['inactive']
            : type === 'inactive'
              ? ['active']
              : []
      }
      handleClick={handleClick}
    >
      <div className="cursor-pointer">{children}</div>
    </Dropdown>
  )
}
const Role = ({
  children,
  id,
  type
}: {
  children: React.ReactNode
  id: string | number
  type?: string
}) => {
  const handleClick = (action: string) => {
    console.log(`Clicked on ${action} action having ${id}`)
  }
  return (
    <Dropdown
      label="Change Status"
      items={['sub-admin', 'user']}
      handleClick={handleClick}
    >
      <div className="cursor-pointer">{children}</div>
    </Dropdown>
  )
}
