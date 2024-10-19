"use client"
import SaveOptions from '../ak/SaveOptions'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import Error from '../ui/error'

function PersonalDetail() {
    return (
        <div className='flex flex-col gap-3 pt-1 pb-2'>
            <div className='px-2 flex items-center justify-between'>
                <h1 className='font-medium -mb-2'>Personal Details</h1>
                <SaveOptions onSave={() => { }} onCancel={() => { }} />
            </div>
            <div className='bg-white dark:bg-black p-4 rounded-2xl flex flex-col gap-2'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className="w-full">
                        <Label htmlFor="fName">First Name</Label>
                        <Input id="fName" placeholder="Type here..." className={cn('2xl:text-lg')} />
                        <Error error="Error here" />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="lName">Last Name</Label>
                        <Input id="lName" placeholder="Type here..." className={cn('2xl:text-lg')} />
                        <Error error="Error here" />
                    </div>
                </div>
                <div className="w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={"contact@delanki.com"} disabled placeholder="Enter your email" className={cn('2xl:text-lg')} />
                </div>
            </div>
        </div>
    )
}

export default PersonalDetail