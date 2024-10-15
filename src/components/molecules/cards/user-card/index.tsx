import React from 'react'
import Avatar from '@/shadcn-ui/avatar'
import { ChevronDown } from 'lucide-react'

const UserCard = () => {
  return (
    <div className="flex items-center border py-1.5 px-2 rounded-full max-w-xs bg-white dark:bg-black cursor-pointer shadow-sm">
      <div className="flex items-center gap-2 flex-grow">
        <Avatar image="https://github.com/shadcn.png" fallback="Q" />
        <div className="hidden lg:inline-block">
          <strong className="max-w-36 line-clamp-1">Ankit</strong>
          <p className="text-xs max-w-36 line-clamp-1">UI Designer</p>
        </div>
      </div>
      <ChevronDown className="mx-2" />
    </div>
  )
}

export default UserCard
