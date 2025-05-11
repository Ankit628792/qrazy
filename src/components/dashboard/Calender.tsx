import { cn } from '@/lib/utils';
import moment from 'moment';
import React from 'react'
import Tooltip from '../ui/tooltip';

const currentDate = new Date();
const daysInMonth = moment(currentDate).daysInMonth();

function Calender() {
    return (
        <>
            <div className='flex-grow flex flex-col gap-2 rounded-xl bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm p-3 w-full sm:max-w-96'>
                <h1 className='font-man text-xl font-bold text-right'>Your Activity</h1>
                <div className='grid grid-cols-7 place-items-center gap-4 py-2'>
                    {
                        Array(daysInMonth).fill(1).map((_, index) => {
                            return <Day date={index + 1} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Calender

const Day = ({ date }: {
    date: number
}) => {
    return (
        <Tooltip title={`${date} hours spent`}>
            <div className={cn('cursor-pointer rounded-full bg-white dark:bg-black backdrop-blur-sm w-10 h-10 grid place-items-center text-gray-500 dark:text-gray-300 hover:bg-emerald-500 dark:hover:bg-emerald-500', date === currentDate.getDate() ? "bg-emerald-500 dark:bg-emerald-500 text-white dark:text-white" : "")}>
                <h1 className='font-man text-lg font-medium text-right'>{date}</h1>
            </div>
        </Tooltip>
    )
}