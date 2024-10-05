'use client'

import React from 'react'
import Joi from 'joi'
import { Container } from '@/components'

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email'
    }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters'
  })
})

export const LoginComponent = () => {
  return (
    <Container>
      <h1 className="mb-4">Login to your account</h1>
    </Container>
  )
}
