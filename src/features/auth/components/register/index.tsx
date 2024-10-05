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

const registerSchema = Joi.object({
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
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'string.empty': 'Password confirmation is required'
  })
})

export const RegisterComponent = () => {
  const handleSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Container className="w-[50vw] h-[50vh]">
      <FormProvider schema={registerSchema} onSubmit={handleSubmit}>
        <Form>
          <FormSection
            label="Register a new account"
            className="w-[50vw] h-[50vh]"
          >
            <FormInput name="email" label="Email">
              <EmailInput />
            </FormInput>
            <FormInput name="password" label="Password">
              <PasswordInput />
            </FormInput>
            <FormInput name="confirmPassword" label="Confirm Password">
              <PasswordInput />
            </FormInput>
            <Button
              type="submit"
              btnText="Register"
              btnType="base"
              className="w-[200px] m-2"
            />
          </FormSection>
        </Form>
      </FormProvider>
    </Container>
  )
}
