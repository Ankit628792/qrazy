'use client'

import BaseInput from '../base-input'
import React, { useState, useRef, useEffect } from 'react'
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  setMonth,
  setYear,
  isBefore,
  isEqual
} from 'date-fns'
import { FaChevronLeft, FaChevronRight, FaCalendarDay } from 'react-icons/fa'
import { Button } from '../../buttons'
import {
  DateInputProps,
  DAYS_OF_WEEK,
  INPUT_TYPE,
  MONTHS
} from '../../../types'

export const DateInput: React.FC<DateInputProps> = ({
  minDate,
  maxDate,
  value,
  bounded,
  preSelectedDate,
  opened,
  openNext,
  isNextOpened,
  setIsNextOpened,
  onChange,
  ...props
}: DateInputProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    bounded ? maxDate || new Date() : new Date()
  )
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  )
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
  const [showYearPicker, setShowYearPicker] = useState<boolean>(false)
  const [showMonthPicker, setShowMonthPicker] = useState<boolean>(false)
  const datePickerRef = useRef<HTMLDivElement>(null)
  const [startYear, setStartYear] = useState<number>(
    (selectedDate && selectedDate.getFullYear()) || new Date().getFullYear()
  )

  useEffect(() => {
    // Clean up the event listener on unmount
    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

  // Function to check if date is within range
  const isWithinRange = (dateVal: Date, minDate: Date, maxDate: Date) => {
    if (props.bounded) {
      // Check if year is within range
      const yearWithinRange =
        format(dateVal, 'yyyy') >= format(minDate, 'yyyy') &&
        format(dateVal, 'yyyy') <= format(maxDate, 'yyyy')

      return (
        format(dateVal, 'MM/yyyy') >= format(minDate, 'MM/yyyy') &&
        format(dateVal, 'MM/yyyy') <= format(maxDate, 'MM/yyyy') &&
        yearWithinRange
      )
    }
    return true
  }

  // Function to handle click outside of calendar
  const handleDocumentClick = (event: MouseEvent) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target as Node)
    ) {
      setShowDatePicker(false)
      // Ensure the latest selected date is formatted and sent
      if (selectedDate && onChange) {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd')
        onChange({
          target: {
            value: formattedDate
          }
        } as React.ChangeEvent<HTMLInputElement>)
      }
    }
  }

  // Function to render header of date picker
  const renderHeader = () => {
    const monthFormat = 'MMMM'
    const yearFormat = 'yyyy'

    const handleYearClick = () => {
      setShowYearPicker(true)
      setShowMonthPicker(false)
    }

    const handleMonthClick = () => {
      setShowMonthPicker(true)
      setShowYearPicker(false)
    }

    const handlePrevClick = () => {
      if (showDatePicker && !showMonthPicker && !showYearPicker) {
        prevMonth()
      } else if (showDatePicker && showYearPicker && !showMonthPicker) {
        setStartYear(startYear - 24)
      } else if (showDatePicker && showMonthPicker && !showYearPicker) {
        setShowMonthPicker(false)
        setShowYearPicker(true)
      }
    }

    const handleNextClick = () => {
      if (showDatePicker && !showMonthPicker && !showYearPicker) {
        nextMonth()
      } else if (showDatePicker && showYearPicker && !showMonthPicker) {
        setStartYear(startYear + 24)
      }
    }

    return (
      <div className="flex justify-between items-center border-b border-1 border-neutral-300">
        <div className="flex items-center w-full text-neutral-900 text-opacity-70 mb-4">
          <div className="cursor-pointer" onClick={handlePrevClick}>
            <FaChevronLeft />
          </div>
          <div className="flex-grow flex justify-center items-center mx-2 relative">
            <div className="flex justify-around items-center">
              {!showMonthPicker && !showYearPicker && (
                <div onClick={handleYearClick}>
                  <span>{format(currentMonth, monthFormat)}&nbsp;&nbsp;</span>
                  <span>{format(currentMonth, yearFormat)}</span>
                </div>
              )}
              {showYearPicker && (
                <div onClick={handleMonthClick}>
                  <span>Select Year</span>
                </div>
              )}
              {showMonthPicker && <span>Select Month</span>}
            </div>
          </div>
          {(showYearPicker && !showMonthPicker) ||
          (!showYearPicker && !showMonthPicker) ? (
            <div className="cursor-pointer" onClick={handleNextClick}>
              <FaChevronRight />
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  // Function to render days of the week
  const renderDays = () => {
    return (
      <div className="flex py-2 mt-4 mb-2">
        {Object.values(DAYS_OF_WEEK).map((day, index) => (
          <div key={index} className="flex-1 text-center">
            {day}
          </div>
        ))}
      </div>
    )
  }

  // Function to render date cells
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const dateFormat = 'd'
    let rows: JSX.Element[] = []

    let days: JSX.Element[] = []
    let day = startDate
    let formattedDate = ''

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat)
        const isDisabled =
          (maxDate && day > maxDate) || (minDate && day < minDate)

        // Ensure preSelectedDate is defined before using it
        const isPreSelectedDate = preSelectedDate
          ? isEqual(day, preSelectedDate)
          : false

        // Ensure selectedDate is defined before using it
        const isSelectedBefore = selectedDate
          ? isBefore(day, selectedDate)
          : false

        const isSameDaySelected = selectedDate
          ? isSameDay(day, selectedDate)
          : false

        // Create a new Date object to avoid reference issues
        const cloneDay = new Date(day)
        days.push(
          <div
            className={`flex-1 h-10 cursor-pointer relative flex items-center justify-center ${
              !isSameMonth(day, monthStart)
                ? 'text-neutral-400'
                : preSelectedDate && isSelectedBefore
                  ? `text-neutral-900 bg-primary-100 bg-opacity-10 ${
                      i === 0 ? 'rounded-l-full' : ''
                    } ${i === 6 ? 'rounded-r-full' : ' '} `
                  : isSameDaySelected
                    ? 'bg-primary-400 text-white rounded-full'
                    : isDisabled
                      ? 'text-neutral-400 cursor-not-allowed'
                      : isPreSelectedDate
                        ? 'bg-primary-400 text-white rounded-full'
                        : 'text-neutral-900 hover:bg-primary-100 hover:bg-opacity-10 rounded-full'
            }`}
            key={day.toString()}
            onClick={() => !isDisabled && onDateClick(cloneDay)}
          >
            <span className="absolute">{formattedDate}</span>
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      )
      days = []
    }
    return <div>{rows}</div>
  }

  const renderMonthCells = () => {
    const rows: JSX.Element[] = []
    let cells: JSX.Element[] = []

    const handleMonthOptionSelect = (month: MONTHS) => () => {
      const monthIndex = Object.values(MONTHS).indexOf(month)
      setCurrentMonth(setMonth(currentMonth, monthIndex))
      setShowMonthPicker(false)
    }

    Object.values(MONTHS).forEach((month, index) => {
      cells.push(
        <div
          className={`flex-1 h-20 cursor-pointer relative flex items-center justify-center text-neutral-900 hover:bg-primary-100 hover:bg-opacity-10 rounded-full`}
          key={month}
          onClick={handleMonthOptionSelect(month)}
        >
          <span>{month}</span>
        </div>
      )

      // If we've created 3 cells, push them into a row and reset the cells array
      if ((index + 1) % 3 === 0) {
        rows.push(
          <div className="grid grid-cols-3 gap-4" key={index}>
            {cells}
          </div>
        )
        cells = []
      }
    })

    return <div>{rows}</div>
  }

  const renderYearCells = () => {
    const rows: JSX.Element[] = []
    let cells: JSX.Element[] = []

    // Define static years
    const years = Array.from({ length: 24 }, (_, i) => startYear + i)

    const handleYearOptionSelect = (year: number) => () => {
      if (
        isWithinRange(
          setYear(currentMonth, year),
          minDate as Date,
          maxDate as Date
        )
      ) {
        setCurrentMonth(setYear(currentMonth, year))
        setShowYearPicker(false)
        setShowMonthPicker(true)
      }
    }

    years.forEach((year, index) => {
      const isSelectedYear = selectedDate && selectedDate.getFullYear() === year
      cells.push(
        <div
          className={`flex-1 h-12 cursor-pointer relative flex items-center justify-center text-neutral-900 hover:bg-primary-100 hover:bg-opacity-10 rounded-full
          ${isSelectedYear ? 'text-primary-400' : ''}
          `}
          key={year}
          onClick={handleYearOptionSelect(year)}
        >
          <span>{year}</span>
        </div>
      )

      // If we've created 4 cells, push them into a row and reset the cells array
      if ((index + 1) % 4 === 0) {
        rows.push(
          <div className="grid grid-cols-4 gap-4" key={index}>
            {cells}
          </div>
        )
        cells = []
      }
    })

    return <div>{rows}</div>
  }

  // Function to handle date selection
  const onDateClick = (day: Date) => {
    setSelectedDate(day)
    setShowDatePicker(false)
    if (onChange) {
      const formattedDate = format(day, 'yyyy-MM-dd') // Use ISO format
      onChange({
        target: {
          value: formattedDate
        }
      } as React.ChangeEvent<HTMLInputElement>)
    }
    if (setIsNextOpened) {
      setIsNextOpened(false)
    }
  }

  // Function to navigate to next month
  const nextMonth = () => {
    if (
      isWithinRange(
        addMonths(currentMonth, 1),
        minDate as Date,
        maxDate as Date
      )
    ) {
      setCurrentMonth(addMonths(currentMonth, 1))
    }
  }

  // Function to navigate to previous month
  const prevMonth = () => {
    if (
      isWithinRange(
        subMonths(currentMonth, 1),
        minDate as Date,
        maxDate as Date
      )
    ) {
      setCurrentMonth(subMonths(currentMonth, 1))
    }
  }

  const handleResetClick = () => {
    setSelectedDate(null)
    if (selectedDate == null) {
      setShowDatePicker(false)
    }
  }

  const handleInputClick = () => {
    if (props.disabled) {
      return
    }
    setShowDatePicker(!showDatePicker)
  }

  // Format date value
  const formattedDate = selectedDate
    ? format(selectedDate, 'dd/MM/yyyy')
    : 'dd/mm/yyyy'

  return (
    <>
      <div className="flex flex-col w-80" ref={datePickerRef}>
        <div
          className="flex h-10 border items-center rounded-lg pt-2 pl-2 pr-20 pb-2.5 hover:border-neutral-400 focus:border-neutral-900"
          onClick={handleInputClick}
        >
          <span
            className={`mr-2 ${
              showDatePicker ? 'text-primary-400' : 'text-neutral-400'
            }`}
          >
            <FaCalendarDay />
          </span>
          <input
            type="text"
            className={`outline-none w-auto border-none flex-1 text-neutral-900`}
            value={
              preSelectedDate
                ? format(preSelectedDate, 'dd/MM/yyyy')
                : formattedDate
            }
            disabled={props.disabled}
            placeholder={
              preSelectedDate
                ? format(preSelectedDate, 'dd/MM/yyyy')
                : 'dd/mm/yyyy'
            }
            style={{ cursor: 'pointer', width: '90%' }}
            readOnly
          />
        </div>
        {showDatePicker && (
          <div className="p-4 w-full h-100 mt-2 sm:w-80 bg-neutral-100 rounded-lg shadow">
            {renderHeader()}
            {!showMonthPicker && !showYearPicker && (
              <>
                {renderDays()}
                {renderCells()}
              </>
            )}
            {showMonthPicker && renderMonthCells()}
            {showYearPicker && renderYearCells()}
            <div className="flex justify-end items-end gap-2 mt-4">
              <div className="w-3/12">
                <Button
                  btnText="Reset"
                  btnType="tertiary"
                  onClick={handleResetClick}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <BaseInput
        type={INPUT_TYPE.DATE}
        value={
          selectedDate
            ? new Date(
                selectedDate.getTime() -
                  selectedDate.getTimezoneOffset() * 60000
              )
                .toISOString()
                .split('T')[0]
            : ''
        }
        hidden
        onChange={onChange}
        min={props.minDate}
        max={props.maxDate}
        {...props}
      />
    </>
  )
}

export default DateInput
