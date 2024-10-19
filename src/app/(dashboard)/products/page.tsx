"use client"
import AnalyticCard from '@/components/ak/AnalyticCard'
import { AreaChartGradient } from '@/components/ui/area-chart';
import { ArrowUpRightFromCircle, HandCoins, LayoutDashboard, ScanQrCode, ShoppingBagIcon, TrendingUp, Users } from 'lucide-react'
import React from 'react'
import { chartData, formattedChartData, generateChartConfig } from './constant';
import { Charts, Progress } from './sample';
import Link from 'next/link';


function Products() {

    const analyticCardData = [
        {
            "id": "3",
            "title": "Top Category",
            "Icon": LayoutDashboard,
            "value": "Electronics",
            "description": "The category with the highest number of active products."
        },
        {
            "id": "1",
            "title": "Total Active Product",
            "Icon": Users,
            "value": "+427",
            "description": "Total number of active products in the system."
        },
        {
            "id": "2",
            "title": "Active QR Products",
            "Icon": ScanQrCode,
            "value": "+359",
            "description": "Number of products that are QR code enabled."
        },
        {
            "id": "4",
            "title": "Total Product",
            "Icon": ShoppingBagIcon,
            "value": "+4969",
            "description": "Total number of products available in the system."
        },
        {
            "id": "5",
            "title": "Rewards Claimed",
            "Icon": HandCoins,
            "value": "+161",
            "description": "Total number of rewards claimed by users."
        }
    ]

    return (
        <section className='flex flex-col gap-4'>
            <div className='flex gap-4 w-full overflow-y-auto scroll-hidden'>
                <Link href={"/products/create"}>
                    <AnalyticCard title="Product" Icon={ArrowUpRightFromCircle} value="+ Add Item" />
                </Link>
                {
                    analyticCardData.map((card) => {
                        return (
                            <AnalyticCard key={card.id} {...card} />
                        )
                    })
                }
            </div>

            <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-12 lg:col-span-5 flex flex-col gap-6'>
                    <AreaChartGradient
                        cData={formattedChartData(chartData)}
                        cConfig={generateChartConfig(chartData)}
                        title='Top 5 Products'
                        description="Showing most used product for scanning in the last 6 months"
                        Footer={<div className="flex w-full items-start gap-2 text-sm">
                            {/* <div className="grid gap-2">
                                <div className="flex items-center gap-2 font-medium leading-none">
                                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                    January - June 2024
                                </div>
                            </div> */}
                        </div>
                        }
                    />
                    <Progress />
                </div>
                <div className='col-span-12 lg:col-span-7'>
                    <Charts />
                </div>
            </div>
        </section>
    )
}

export default Products