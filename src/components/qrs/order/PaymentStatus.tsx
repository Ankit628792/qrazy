import PopUp from '@/components/ak/PopUp'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { BadgeCheck } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function PaymentStatus() {
    return (
        <PopUp>
            <Card className='w-full max-w-md bg-white dark:bg-black rounded-xl relative y-translate'>
                <CardHeader className='text-center flex flex-col items-center justify-center'>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-10 text-emerald-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                    <h1 className='text-xl font-medium text-gray-800 dark:text-white flex items-center justify-center gap-2'> <span>Payment Received</span></h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Your payment has been successfully done.</p>
                </CardHeader>

                <CardContent className='text-center'>
                    <p className='text-base text-gray-500'>Total Payment</p>
                    <h3 className='text-4xl font-semibold'>₹ 10,000</h3>
                </CardContent>

                <CardContent className='grid grid-cols-2 gap-4 my-2'>
                    <div className='flex flex-col border py-2 px-3 rounded-lg'>
                        <p className='text-sm text-gray-500'>Order Ref</p>
                        <h3 className='text-base font-medium'>000897878876</h3>
                    </div>
                    <div className='flex flex-col border py-2 px-3 rounded-lg'>
                        <p className='text-sm text-gray-500'>Payment Time</p>
                        <h3 className='text-base font-medium'>{moment().format("HH:mm, DD MMM YYYY")}</h3>
                    </div>
                    <div className='flex flex-col border py-2 px-3 rounded-lg'>
                        <p className='text-sm text-gray-500'>Payment Method</p>
                        <h3 className='text-base font-medium'>UPI</h3>
                    </div>
                    <div className='flex flex-col border py-2 px-3 rounded-lg'>
                        <p className='text-sm text-gray-500'>Payee Name</p>
                        <h3 className='text-base font-medium'>Ankit Kumar</h3>
                    </div>
                </CardContent>

                <CardFooter className='flex items-center justify-center'>
                    <Button>
                        Back to Dashboard
                    </Button>
                </CardFooter>
            </Card>
        </PopUp>
    )
}

export default PaymentStatus