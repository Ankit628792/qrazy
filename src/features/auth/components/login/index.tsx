'use client'

import React from 'react'
import Error from '@/shadcn-ui/error'
import Link from 'next/link'
import { Label } from '@/shadcn-ui/label'
import { Input } from '@/shadcn-ui/input'
import { Button } from '@/shadcn-ui/button'
import { MoveRight } from 'lucide-react'

export const LoginComponent = () => {
  return (
    <React.Fragment>
      <div className="w-full text-base xl:text-lg">
        <Label htmlFor="email" className="xl:text-base">
          Email
        </Label>
        <Input id="email" placeholder="Enter your email" />
        <Error error="Error here" />
      </div>
      <div className="w-full text-base xl:text-lg">
        <div className="flex items-end justify-between">
          <Label htmlFor="password" className="xl:text-base">
            Password
          </Label>
          <Link
            href={'/forgot-password'}
            className="text-emerald-500 px-1 text-sm"
          >
            Forget Password?
          </Link>
        </div>
        <Input id="password" placeholder="Password" />
        <Error error="Error here" />
      </div>
      <Button size="lg" className="w-full mt-2">
        <span className="text-base lg:text-lg">Login</span>{' '}
        <MoveRight className="ml-2" />
      </Button>
    </React.Fragment>
  )
}
