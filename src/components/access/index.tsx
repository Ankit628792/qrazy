"use client"
import { ListFilter, Search, UserPlus } from 'lucide-react';
import React, { useState } from 'react'
import { Input } from '../ui/input';
import DropdownMenuCheckboxes from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import UserTable, { User } from './UserTable';

const filterOptions = [
    {
        id: 1,
        label: "All",
        value: "all",
        checked: true,
    },
    {
        id: 2,
        label: "Active",
        value: "active",
        checked: false,
    },
    {
        id: 3,
        label: "Inactive",
        value: "inactive",
        checked: false,
    }
]

const exampleUsers: User[] = [{
    id: "1",
    name: "Elon Musk",
    email: "elon@musk.com",
    account_status: 'active',
    user_status: "verified",
    created_at: new Date(),
    verified_at: new Date(),
    role: "admin"
},
{
    id: "2",
    name: "Mark Zukku",
    email: "zukku@facebook.com",
    account_status: 'inactive',
    user_status: "pending",
    created_at: new Date(),
    verified_at: null,
    role: "user"
}]
function Access() {
    const [filter, setFilter] = useState(filterOptions);
    const [users, setUsers] = useState(exampleUsers)

    const handleFilter = (id: string | number, checked: boolean) => {
        const updatedFilter = filter.map((option) =>
            option.id === id ? { ...option, checked: checked } : option
        );

        setFilter(updatedFilter);
    }
    const addRow = () => {
        setUsers([...users, { id: `${users.length + 1}`, name: "", email: "", account_status: '', user_status: "", verified_at: null, role: "user" }])
    }


    return (
        <section>
            <div className=' py-5 px-3 sticky -mt-3 -top-3 bg-white bg-opacity-10 dark:bg-zinc-900 dark:bg-opacity-10 backdrop-blur-md rounded-bl-xl rounded-br-xl z-10'>
                <h1 className='text-2xl lg:text-3xl font-semibold pb-3'>User Access</h1>
                <div className='w-full flex items-center gap-2'>
                    <form className="flex-1 relative">
                        <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search user..."
                            className="pl-8 w-full max-w-lg"
                        />
                    </form>

                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenuCheckboxes label='Filter by' items={filter} onChange={handleFilter}>
                            <Button variant="outline" size="sm" className="gap-1">
                                <ListFilter className="h-4 w-4" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Filter
                                </span>
                            </Button>
                        </DropdownMenuCheckboxes>

                        {/* <Link href={"/products/create"}>
                            <Button size="sm" className="gap-1 bg-emerald-500 hover:bg-emerald-600 text-white">
                                <PlusCircle className="h-4 w-4" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Product
                                </span>
                            </Button>
                        </Link> */}
                    </div>
                </div>
            </div>
            <div className='w-full overflow-x-auto scroll-hidden -mt-3'>
                <UserTable data={users} />
                <Button onClick={addRow}>
                    <UserPlus />
                    <span>Add User</span>
                </Button>
            </div>
        </section>
    )
}

export default Access