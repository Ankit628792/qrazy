'use client'

import Auth from '@/components/auth/Auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import Error from '../ui/error'
import * as Yup from 'yup'
import { useLogin } from '@/hooks'

type ILoginForm = Record<string, string>

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .matches(/^\S*$/, 'Password cannot contain spaces')
})

function Login() {
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    email: 'ankit628792@gmail.com',
    password: 'Ankit@123'
  })

  const [errors, setErrors] = useState<ILoginForm>({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const { mutate, isPending } = useLogin((err: ILoginForm) => setErrors(err))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await validationSchema.validate(loginForm, { abortEarly: false })
      mutate({
        email: loginForm.email,
        password: loginForm.password,
      })
      setErrors({})
    } catch (err: any) {
      const validationErrors: Record<string, string> = {}
      const firstError = err.inner[0]
      validationErrors[firstError.path] = firstError.message
      setErrors(validationErrors)
    }
  }

  return (
    <Auth type="login">
      <>
        <h1 className="text-4xl font-bold select-none mb-2">Welcome Back!</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full text-base xl:text-lg">
            <Label htmlFor="email" className="xl:text-base">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              value={loginForm.email || ''}
              onChange={handleChange}
              onFocus={() => setErrors({ ...errors, email: '' })}
            />
            <Error error={errors.email} />
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
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={loginForm.password || ''}
              onChange={handleChange}
              onFocus={() => setErrors({ ...errors, password: '' })}
            />
            <Error error={errors.password} />
          </div>
          <Button loading={isPending} size="lg" className="w-full mt-2">
            <span className="text-base lg:text-lg">Login</span>{' '}
            <MoveRight className="ml-2" />
          </Button>
        </form>
        <div className="text-sm xl:text-base flex items-center justify-center">
          <p>Don&apos;t have an account?</p>
          <Link
            href={'/register'}
            className="text-emerald-500 px-1 font-medium"
          >
            Register
          </Link>
        </div>
      </>
    </Auth>
  )
}

export default Login
