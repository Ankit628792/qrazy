import React from 'react'
import { DateRangeInputProps, INPUT_TYPE } from '../../../types'
import DateInput from '../date-input'

export const DateRangeInput: React.FC<DateRangeInputProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onFormGroupInputChange,
  minDate,
  maxDate,
  ...props
}: DateRangeInputProps) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStartDateChange(e)
    if (onFormGroupInputChange) {
      onFormGroupInputChange(INPUT_TYPE.RANGE, {
        startDate,
        endDate,
        rangeStartDate: minDate,
        rangeEndDate: maxDate
      })
    }
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEndDateChange(e)
    if (onFormGroupInputChange) {
      onFormGroupInputChange(INPUT_TYPE.DATE_RANGE, {
        startDate,
        endDate,
        rangeStartDate: minDate,
        rangeEndDate: maxDate
      })
    }
  }

  return (
    <div className={`flex gap-2 ${props.className}`}>
      <DateInput
        value={startDate}
        onChange={(e) => {
          handleStartDateChange(e)
        }}
        openNext={false}
        minDate={minDate ? new Date(minDate) : undefined}
        maxDate={
          endDate ? new Date(endDate) : maxDate ? new Date(maxDate) : undefined
        }
        {...props}
      />
      <DateInput
        value={endDate}
        onChange={(e) => {
          handleEndDateChange(e)
        }}
        openNext={false}
        minDate={
          startDate
            ? new Date(startDate)
            : minDate
              ? new Date(minDate)
              : undefined
        }
        maxDate={maxDate ? new Date(maxDate) : undefined}
        {...props}
      />
    </div>
  )
}

export default DateRangeInput
