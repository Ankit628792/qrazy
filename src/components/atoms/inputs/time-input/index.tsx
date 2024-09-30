'use client'

import React, { useState, useRef, useEffect } from 'react'
import { FaRegClock } from 'react-icons/fa'
import { Button } from '../../buttons'
import { INPUT_TYPE, TimeInputProps } from '../../../../types'
import BaseInput from '../base-input'

export const TimeInput: React.FC<TimeInputProps> = ({
  value,
  className,
  onChange,
  ...props
}: TimeInputProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [meridiem, setMeridiem] = useState<string>('AM')
  const divRef = useRef<HTMLDivElement>(null)

  const hoursArray = Array.from(Array(12).keys())
  const minutesArray = Array.from(Array(60).keys())

  const handleResetClick = () => {
    if (hours == 0 && minutes == 0) {
      setIsOpened(false)
    }
    setHours(0)
    setMinutes(0)
  }

  const handleOkClick = () => {
    setIsOpened(false)
    // Call onChange with the new time value
    onChange &&
      onChange({
        target: { value: formatTime() }
      } as React.ChangeEvent<HTMLInputElement>)
  }

  // Function to format the time
  const formatTime = () => {
    const formattedHours = meridiem === 'PM' && hours < 12 ? hours + 12 : hours
    const timeString = `${
      formattedHours <= 9 ? '0' + formattedHours : formattedHours
    }:${minutes <= 9 ? '0' + minutes : minutes}`
    return timeString
  }

  // Function to handle click outside of calendar
  const handleDocumentClick = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setIsOpened(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

  return (
    <>
      <div className={`flex flex-col w-60 gap-2 ${className}`}>
        <div
          className="w-52 h-10 flex justify-between items-center px-2 rounded-lg"
          onClick={() => setIsOpened(!isOpened)}
        >
          <span
            className={`font-normal ${
              hours || minutes ? 'text-neutral-900' : ' text-neutral-400'
            }`}
          >
            {hours || minutes
              ? `${hours <= 9 ? '0' + hours : hours}:${
                  minutes <= 9 ? '0' + minutes : minutes
                } ${meridiem}`
              : '--:-- --'}
          </span>
          <FaRegClock className="w-4 h-4" />
        </div>
        {isOpened && (
          <div
            className="flex w-full max-h-100 flex-col items-center overflow-y:auto text-primary-400 bg-neutral-100 px-2 py-1 rounded-lg"
            ref={divRef}
          >
            <div className="flex gap-2 text-sm">
              <div className="w-8 flex flex-col justify-center items-center bg-primary-100 bg-opacity-10 p-1 rounded border border-solid border-primary-400">
                <span className="font-normal">
                  {hours <= 9 ? `0${hours}` : hours}
                </span>
              </div>
              <div className="w-8 flex flex-col justify-center items-center bg-primary-100 bg-opacity-10 p-1 rounded border border-solid border-primary-400">
                <span className="font-normal">
                  {minutes <= 9 ? `0${minutes}` : minutes}
                </span>
              </div>
              <div className="w-8 flex flex-col justify-center items-center bg-primary-100 bg-opacity-10 p-1 rounded border border-solid border-primary-400">
                <span className="font-normal text-sm text-primary-100">
                  {meridiem}
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-2 max-h-56 overflow-scroll custom-scrollbar cursor-pointer">
              <div className="flex flex-col gap-1">
                {hoursArray.map((hour) => (
                  <div
                    key={hour}
                    className="w-8 flex justify-center items-center p-1"
                    onClick={() => setHours(hour)}
                  >
                    <span className="font-normal text-sm text-neutral-900">
                      {hour <= 9 ? `0${hour}` : hour}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col  gap-1">
                {minutesArray.map((minute) => (
                  <div
                    key={minute}
                    className="w-8 flex justify-center items-center p-1"
                    onClick={() => setMinutes(minute)}
                  >
                    <span className="font-normal text-sm text-neutral-900">
                      {minute <= 9 ? `0${minute}` : minute}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1">
                <div
                  className="w-8 flex justify-center items-center p-1"
                  onClick={() => setMeridiem(meridiem == 'AM' ? 'PM' : 'AM')}
                >
                  <span className="font-normal text-sm text-neutral-900">
                    {meridiem == 'PM' ? 'AM' : 'PM'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end items-end gap-4 mt-4 mb-4">
              <div className="w-3/12">
                <Button
                  btnText="Reset"
                  btnType="tertiary"
                  onClick={handleResetClick}
                />
              </div>
              <div className="w-3/12">
                <Button
                  btnText="OK"
                  btnType="tertiary"
                  onClick={handleOkClick}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <BaseInput
        type={INPUT_TYPE.TIME}
        hidden
        value={formatTime()}
        onChange={onChange}
        min={props.minDateTime}
        max={props.maxDateTime}
        {...props} // Spread the rest of the props
      />
    </>
  )
}

export default TimeInput
