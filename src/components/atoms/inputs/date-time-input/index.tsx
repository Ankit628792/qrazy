'use client'

import DateInput from '../date-input'
import BaseInput from '../base-input'
import TimeInput from '../time-input'
import React, { useState, useEffect } from 'react'
import { DateTimeInputProps, INPUT_TYPE } from '../../../types'

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  value,
  onChange,
  minDateTime,
  maxDateTime,
  ...props
}: DateTimeInputProps) => {
  const [dateValue, setDateValue] = useState<string>(
    value ? value.split('T')[0] : ''
  )
  const [timeValue, setTimeValue] = useState<string>(
    value ? value.split('T')[1] : ''
  )
  const [dateTimeValue, setDateTimeValue] = useState<string>(value)

  useEffect(() => {
    // Update date and time states when the external value prop changes
    if (value) {
      const [newDate, newTime] = value.split('T')
      setDateValue(newDate)
      setTimeValue(newTime)
      setDateTimeValue(value)
    }
  }, [value])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setDateValue(newDate)
    updateDateTimeValue(newDate, timeValue)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value
    setTimeValue(newTime)
    updateDateTimeValue(dateValue, newTime)
  }

  const updateDateTimeValue = (date: string, time: string) => {
    const newValue = `${date}T${time}`
    setDateTimeValue(newValue)

    if (onChange) {
      const event = {
        target: { value: newValue }
      } as React.ChangeEvent<HTMLInputElement>
      onChange(event)
    }
  }

  return (
    <>
      <div className="flex gap-2 items-start">
        <DateInput
          openNext={false}
          invalid={false}
          value={dateValue}
          min={minDateTime && minDateTime.split('T')[0]}
          max={maxDateTime && maxDateTime.split('T')[0]}
          onChange={handleDateChange}
        />
        <TimeInput
          invalid={false}
          onChange={handleTimeChange}
          value={timeValue}
          className="border rounded-lg hover:border-neutral-400 focus:border-neutral-900"
        />
      </div>
      <BaseInput
        type={INPUT_TYPE.DATETIME}
        value={`${dateTimeValue}`}
        hidden
        onChange={onChange}
        min={minDateTime}
        max={maxDateTime}
        {...props}
      />
    </>
  )
}

export default DateTimeInput
