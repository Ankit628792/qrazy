import React from 'react'
import DateTimeInput from '../date-time-input'
import { DateTimeRangeInputProps, INPUT_TYPE } from '../../../types'

export const DateTimeRangeInput: React.FC<DateTimeRangeInputProps> = ({
  startDateTime,
  endDateTime,
  minOfMin,
  maxOfMax,
  onFormGroupInputChange,
  onStartDateChange,
  onEndDateChange,
  onChange,
  ...props
}: DateTimeRangeInputProps) => {
  const handleStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event)
    if (onFormGroupInputChange) {
      onFormGroupInputChange(INPUT_TYPE.DATETIME_RANGE, {
        startDate: startDateTime,
        endDate: endDateTime,
        rangeStartDate: minOfMin,
        rangeEndDate: maxOfMax
      })
    }
  }

  const handleEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event)
    if (onFormGroupInputChange) {
      onFormGroupInputChange(INPUT_TYPE.DATETIME_RANGE, {
        startDate: startDateTime,
        endDate: endDateTime,
        rangeStartDate: minOfMin,
        rangeEndDate: maxOfMax
      })
    }
  }

  return (
    <div className={`flex gap-2 ${props.className}`}>
      <DateTimeInput
        value={startDateTime}
        onChange={(e) => {
          handleStartChange(e)
          onStartDateChange && onStartDateChange(e)
        }}
        minDateTime={minOfMin}
        maxDateTime={endDateTime}
        {...props}
      />
      <DateTimeInput
        value={endDateTime}
        onChange={(e) => {
          handleEndChange(e)
          onEndDateChange && onEndDateChange(e)
        }}
        minDateTime={startDateTime}
        maxDateTime={maxOfMax}
        {...props}
      />
    </div>
  )
}

export default DateTimeRangeInput
