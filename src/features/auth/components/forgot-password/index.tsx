/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
import Error from '@/shadcn-ui/error'
import { Button } from '@/shadcn-ui/button'
import { Input } from '@/shadcn-ui/input'
import { cn } from '@/libs/utils'
import { Toast } from '@/components'
import { ROUTES } from '@/shared/shared.interface'

export const ForgotPasswordComponent = () => {
  const [success, setSuccess] = useState(false)

  return (
    <React.Fragment>
      <section className="w-full h-dvh grid place-items-center p-5 bg-gray-100 dark:bg-zinc-900 relative">
        <img
          src="https://cdn.dribbble.com/userupload/12009241/file/original-3232c6f74a1fc2b27ce620f7ff7a0fac.jpg"
          className="absolute inset-0 w-full h-full object-cover "
          alt=""
        />
        <div className="w-full max-w-lg md:max-w-max p-10 sm:p-16 xl:py-20 bg-white bg-opacity-80 backdrop-blur-sm dark:bg-zinc-800 dark:bg-opacity-80 dark:backdrop-blur-sm rounded-2xl relative">
          <div className="w-full max-w-lg flex flex-col items-center justify-center gap-2">
            <h1 className="text-5xl lg:text-6xl 2xl:text-7xl font-bold text-center">
              Forgot Password?
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-center">
              Enter the email address associated with your account.
            </p>
            <div className="my-4 w-full text-center">
              <Input
                type="email"
                placeholder="Type Email Here..."
                className={cn('xl:text-lg xl:py-6 text-center')}
              />
              <Error error="Error here" />
            </div>
            <Button onClick={() => setSuccess(true)} size={'lg'} className="">
              <span className="sm:text-lg select-none">Submit</span>
            </Button>
          </div>
        </div>
      </section>
      <Toast
        open={success}
        route={ROUTES.HOME}
        title="Request Sent Successfully"
        description="If an account exists for the email you entered, you will receive a password reset link shortly. Please check your email and follow the instructions to reset your password."
        onClose={() => setSuccess(false)}
      />
    </React.Fragment>
  )
}
