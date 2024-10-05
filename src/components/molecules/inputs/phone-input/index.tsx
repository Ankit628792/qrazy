'use client'

import React, { useState, useEffect, useRef } from 'react'
import { TextInput } from '../../../atoms'
import { SelectWithIcon } from '../select-with-icon'
import { FaChevronDown } from 'react-icons/fa'
import { CountryOption, PhoneInputProps } from '../../../../types'

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  countries,
  maxLength = 10,
  className = '',
  disabled = false,
  invalid = 'false',
  onChange,
  onCountryChange,
  ...props
}: PhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(
    countries.find((country) => country.value === '+91') || countries[0] // Default to India or first country
  ) // Default to India
  const [phoneNumber, setPhoneNumber] = useState(value || '')
  const [isNumberInvalid, setIsNumberInvalid] = useState<boolean | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const regexPattern = selectedCountry.regexValidity

    if (!regexPattern || phoneNumber.length === 0) {
      setIsNumberInvalid(null)
      return
    }

    const regex = new RegExp(regexPattern)

    window.addEventListener('click', (e) => {
      if (inputRef.current !== e.target) {
        setIsNumberInvalid(!regex.test(phoneNumber))
      }
    })

    return () => {
      window.removeEventListener('click', () => {})
    }
  }, [phoneNumber, selectedCountry])

  const handleCountryCodeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCountry = countries.find(
      (country) => country.value === event.target.value
    )
    setSelectedCountry(newCountry || countries[0])
    onCountryChange && onCountryChange(event)
  }

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPhoneNumber = event.target.value
    setPhoneNumber(newPhoneNumber)
    onChange && onChange(event)
  }

  return (
    <div className={`flex items-center ${className}`}>
      <SelectWithIcon
        options={countries}
        selectedValue={selectedCountry.value}
        disabled={disabled}
        invalid={invalid ? 'true' : undefined}
        onChange={handleCountryCodeChange}
        icon={FaChevronDown}
      />
      <TextInput
        invalid={
          isNumberInvalid !== null ? JSON.stringify(isNumberInvalid) : invalid
        }
        ref={inputRef}
        maxLength={maxLength}
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        className="ml-2"
        {...props}
      />
    </div>
  )
}

export default PhoneInput
