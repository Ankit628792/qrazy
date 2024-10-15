import Auth from '@/components/auth/Auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Error from '../ui/error'

function Login() {
    return (
        <Auth type='login'>
            <>
                <h1 className="text-4xl font-bold select-none mb-2">Welcome Back!</h1>
                <div className="w-full text-base xl:text-lg">
                    <Label htmlFor="email" className="xl:text-base">Email</Label>
                    <Input id="email" placeholder="Enter your email" />
                    <Error error="Error here" />
                </div>
                <div className="w-full text-base xl:text-lg">
                    <div className="flex items-end justify-between">
                        <Label htmlFor="password" className="xl:text-base">Password</Label>
                        <Link href={"/forgot-password"} className="text-emerald-500 px-1 text-sm">
                            Forget Password?
                        </Link>
                    </div>
                    <Input id="password" placeholder="Password" />
                    <Error error="Error here" />
                </div>
                <Button size="lg" className="w-full mt-2">
                    <span className="text-base lg:text-lg">Login</span> <MoveRight className="ml-2" />
                </Button>
                <div className="text-sm xl:text-base flex items-center justify-center">
                    <p>Don&apos;t have an account?</p>
                    <Link href={"/register"} className="text-emerald-500 px-1 font-medium">
                        Register
                    </Link>
                </div>
            </>
        </Auth>
    )
}

export default Login