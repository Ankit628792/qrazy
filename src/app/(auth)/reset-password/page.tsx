"use client"
import AuthSuccess from '@/components/auth/Success'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'

function Page() {
    const [success, setSuccess] = useState(false)
    return (
        <>
            <section className='w-full h-dvh grid place-items-center p-5 bg-gray-100 dark:bg-zinc-900 relative'>
                <img src="https://cdn.dribbble.com/userupload/11778289/file/original-30222bd2b7b500836333696035a3ad4f.jpg" className='absolute inset-0 w-full h-full object-cover ' alt="" />
                <div className='w-full max-w-lg md:max-w-max p-10 sm:p-16 xl:px-20 bg-white bg-opacity-90 backdrop-blur-sm dark:bg-zinc-800 dark:bg-opacity-90 dark:backdrop-blur-sm rounded-2xl relative'>
                    <div className='w-full max-w-lg flex flex-col items-center justify-center gap-4'>
                        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-center'>Reset Password</h1>
                        <div className='w-full'>
                            <Label htmlFor='password' className='text-lg'>New Password</Label>
                            <Input type='password' id='password' placeholder='Type Here...' className={cn('focus-visible:ring-0 focus-visible:outline-none xl:text-lg my-1')} />
                        </div>
                        <div className='w-full'>
                            <Label htmlFor='cPassword' className='text-lg'>Confirm Password</Label>
                            <Input type='password' id='cPassword' placeholder='Type Here...' className={cn('focus-visible:ring-0 focus-visible:outline-none xl:text-lg my-1')} />
                        </div>
                        <Button onClick={() => setSuccess(true)} size={"lg"} className="mt-4">
                            <span className='sm:text-lg select-none'>Submit</span>
                        </Button>
                    </div>
                </div>

            </section>
            <AuthSuccess
                open={success}
                title='Password Updated Successfully!'
                description='Your password has been updated successfully. You can now log in with your new credentials.'
                onClose={() => setSuccess(false)}
            />
        </>
    )
}

export default Page