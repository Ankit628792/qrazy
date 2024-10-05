'use client'

import React from 'react'
import Joi from 'joi'
import {
  Button,
  Container,
  EmailInput,
  Form,
  FormInput,
  FormProvider,
  FormSection,
  PasswordInput
} from '@/components'

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
  const handleSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <Container className="w-[50vw] h-[50vh]">
      <FormProvider schema={loginSchema} onSubmit={handleSubmit}>
        <Form>
          <FormSection
            label="Login to your account"
            className="w-[50vw] h-[50vh]"
          >
            <FormInput name="email" label="Email">
              <EmailInput />
            </FormInput>
            <FormInput name="password" label="Password">
              <PasswordInput />
            </FormInput>
            <Button
              type="submit"
              btnText="Login"
              btnType="base"
              className="w-[200px] m-2"
            />
          </FormSection>
        </Form>
      </FormProvider>
    </Container>
  )
}
