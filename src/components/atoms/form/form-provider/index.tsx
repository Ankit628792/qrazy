'use client'

import React, { useState } from 'react'
import { FormContext } from '../../../../hooks/useFormContext'
import { IFormProviderProps } from '../../../../types'

export const FormProvider = <T,>({
  children,
  schema,
  initialValues = {},
  validationDetails,
  customValidationMessages,
  onSubmit,
  customValidate
}: IFormProviderProps<T>) => {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const result = schema.validate(formData, { abortEarly: false })
    if (result.error) {
      const errorObj = {}
      result.error.details.forEach((detail) => {
        if (customValidationMessages) {
          errorObj[detail.path[0]] = customValidationMessages[detail.path[0]]
        } else {
          errorObj[detail.path[0]] = detail.message
        }
      })
      setErrors(errorObj)
      return false
    }
    setErrors({})
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      if (customValidate) {
        if (customValidate(formData, validationDetails, setErrors)) {
          onSubmit(formData)
        }
      } else {
        onSubmit(formData)
      }
    }
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        errors,
        setFormData,
        setErrors,
        handleInputChange,
        validate,
        handleSubmit
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
