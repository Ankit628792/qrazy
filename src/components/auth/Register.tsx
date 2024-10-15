import Auth from '@/components/auth/Auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Error from '../ui/error'

function Register() {
    return (
        <Auth type='register'>
            <>
                <h1 className="text-4xl font-bold select-none mb-2">Qrazy Welcomes You!</h1>
                <div className='grid grid-cols-2 gap-4'>
                    <div className="w-full text-base xl:text-lg">
                        <Label htmlFor="fName" className="xl:text-base">First Name</Label>
                        <Input id="fName" placeholder="Type here..." />
                        <Error error="Error here" />
                    </div>
                    <div className="w-full text-base xl:text-lg">
                        <Label htmlFor="lName" className="xl:text-base">Last Name</Label>
                        <Input id="lName" placeholder="Type here..." />
                        <Error error="Error here" />
                    </div>
                </div>
                <div className="w-full text-base xl:text-lg">
                    <Label htmlFor="email" className="xl:text-base">Email</Label>
                    <Input id="email" placeholder="Enter your email" />
                    <Error error="Error here" />
                </div>
                <div className="w-full text-base xl:text-lg">
                    <Label htmlFor="password" className="xl:text-base">Password</Label>
                    <Input id="password" placeholder="Enter Your Password" />
                    <Error error="Error here" />
                </div>
                <div className="w-full text-base xl:text-lg">
                    <Label htmlFor="cPassword" className="xl:text-base">Confirm Password</Label>
                    <Input id="cPassword" placeholder="Re-Type Your Password" />
                    <Error error="Error here" />
                </div>
                <Button size="lg" className="w-full mt-2">
                    <span className="text-base lg:text-lg">Register</span> <MoveRight className="ml-2" />
                </Button>
                <div className="text-sm xl:text-base flex items-center justify-center">
                    <p>Already have an account?</p>
                    <Link href={"/login"} className="text-emerald-500 px-1 font-medium">
                        Login
                    </Link>
                </div>
            </>
        </Auth>
    )
}

export default Register