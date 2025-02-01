"use client"
import { DonutChart } from '@/components/ui/donut-chart'
import { chartData, formattedChartData, generateChartConfig } from '../products/constant'
import { Clock4, Search, TrendingUp } from 'lucide-react'
import { ChartConfig } from '@/components/ui/chart'
import { AreaChartGradient } from '@/components/ui/area-chart'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { generateRandomProducts } from '../products/listing/constant'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import InvoiceTable from '@/components/qrs/InvoiceTable'
import ScannedProduct from '@/components/qrs/LastScannedProduct'
import { useGetOrderHistory } from '@/hooks/qr/useGetOrderHistory'

const donutChartData = [
    { id: "scanned", value: 200, fill: "var(--color-scanned)" },
    { id: "total", value: 275, fill: "var(--color-total)" },
]

const donutChartConfig = {
    value: {
        label: "Value",
    },
    total: {
        label: "Total QRs",
        color: "hsl(var(--chart-1))",
    },
    scanned: {
        label: "Scanned QRs",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const product: Product = {
    "id": 739,
    "title": "Oriental Soft Keyboard",
    "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    "mrp": 7362.59,
    "mrl": 3.79,
    "links": [
        {
            "id": 8283,
            "url": "https://grounded-fibre.biz"
        }
    ],
    "category": {
        "id": 398,
        "name": "Books",
        "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals"
    },
    "image": {
        "id": 3490,
        "url": "https://picsum.photos/seed/FEyeWbgtI/200/200?grayscale&blur=2"
    },
    "images": [
        {
            "id": 3066,
            "url": "https://loremflickr.com/200/200/product?lock=4668015477780484"
        },
        {
            "id": 6419,
            "url": "https://loremflickr.com/200/200/product?lock=983082933767790"
        }
    ],
    "status": "draft",
    "created_at": new Date(),
    "updated_at": new Date(),
    "region": "Doylebury",
    "scans": 10812
}

function QRs() {

    const { data, } = useGetOrderHistory()

    return (
        <section className='flex gap-4 items-start'>

            <div className='grid grid-cols-12 gap-4 flex-grow'>
                <div className='col-span-12 lg:col-span-7 flex flex-col gap-6'>
                    <AreaChartGradient
                        className='glass'
                        cData={formattedChartData(chartData)}
                        cConfig={generateChartConfig(chartData)}
                        title='Top 5 Products'
                        description="Showing most used product for scanning in the last 6 months"
                        Navigate={<Link href={"/qrs/order"} className="absolute top-3 right-3">
                            <Button size={"sm"} className=" gap-1">
                                <Clock4 className="w-4" />
                                Order QR
                            </Button>
                        </Link>}
                    />
                </div>
                <div className='col-span-12 lg:col-span-5 flex flex-col gap-4'>
                    <DonutChart
                        className='glass'
                        title="QR Scans"
                        cData={donutChartData}
                        cConfig={donutChartConfig}
                        description="January - June 2024"
                        Footer={<div className="grid gap-2 w-full">
                            <div className="flex items-center justify-center gap-2 font-medium leading-none">
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="flex items-center justify-center gap-2 leading-none text-muted-foreground">
                                January - June 2024
                            </div>
                        </div>}
                    />
                </div>
                <div className='col-span-12 flex-grow'>
                    <div className=' py-5 px-3 sticky -top-3 bg-white bg-opacity-10 dark:bg-zinc-900 dark:bg-opacity-10 backdrop-blur-md rounded-bl-xl rounded-br-xl z-10'>
                        <div className='w-full flex items-center gap-2'>
                            <form className="flex-1 relative">
                                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search by name or id"
                                    className="pl-8 w-full max-w-lg"
                                />
                            </form>

                            <div className="ml-auto flex items-center gap-2">
                                <Link href={"/qrs/order"}>
                                    <Button size="sm" className="gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white">
                                        <Clock4 className="h-4 w-4" />
                                        <span>
                                            Order QR
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='w-full overflow-x-auto scroll-hidden -mt-3'>
                        <InvoiceTable data={data?.data || []} />
                    </div>
                </div>
            </div>

            <RecentScans />

            <div className='bg-white dark:bg-black overflow-hidden absolute bottom-5 right-5 w-full max-w-xs rounded-lg hidden xl:flex flex-col h-80'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d249117.6674063128!2d77.19572370698737!3d28.67848108321333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1729966817181!5m2!1sen!2sin" style={{ border: 0 }} width={340} height={500} loading="lazy" ></iframe>
            </div>

        </section>
    )
}

export default QRs

const RecentScans = () => {
    return (
        <div className='w-full max-w-xs rounded-lg hidden xl:flex flex-col sticky top-0'>
            <div className='flex flex-col gap-2'>
                <h3 className='font-medium text-xl'>Recent Scans</h3>
                {
                    Array.from({ length: 5 }).map((_, index) => (
                        <ScannedProduct key={index} product={product} />
                    ))
                }
            </div>
        </div>
    )
}