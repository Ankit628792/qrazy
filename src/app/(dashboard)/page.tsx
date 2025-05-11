"use client"

import React from 'react'
import { chartData, formattedChartData, generateChartConfig } from './products/constant'
import { AreaChartGradient } from '@/components/ui/area-chart'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DonutChart } from '@/components/ui/donut-chart'
import Calender from '@/components/dashboard/Calender'
import Feedback from '@/components/dashboard/Feedback'
import CustomerSupport from '@/components/dashboard/CustomerSupport'
import { LineChart } from '@/components/ui/line-chart'
import moment from 'moment'
import { getGreeting } from '@/lib'
import AnalyticCard from '@/components/ak/AnalyticCard'
import { HandCoins, LayoutDashboard, ListTodo, ScanQrCode, ShoppingBagIcon, TrendingUp, Users } from 'lucide-react'
import { ChartConfig } from '@/components/ui/chart'

const currentDate = new Date()

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

const analyticCardData = [
  {
    "id": "3",
    "title": "Top Product Category",
    "Icon": LayoutDashboard,
    "value": "Electronics",
    "description": "The category with the highest number of active qr."
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
    "title": "QRs Scanned",
    "Icon": ScanQrCode,
    "value": "+359",
    "description": "Number of QRs that are scanned by users."
  },
  {
    "id": "4",
    "title": "Rewards Distributed",
    "Icon": ShoppingBagIcon,
    "value": "+4969",
    "description": "Worth of rewards distributed"
  },
  {
    "id": "5",
    "title": "Rewards Claimed",
    "Icon": HandCoins,
    "value": "+161",
    "description": "Total number of rewards claimed by users."
  }
]

function Page() {
  const { admin } = useAdminStore()
  return (
    <div className='grid grid-cols-12 gap-4'>

      <div className='col-span-12 pt-5 pb-2 divide-x-2 divide-gray-600 dark:divide-gray-400 flex justify-end '>
        <div className='text-xl font-semibold px-4'>
          <h2>Hi, {admin?.firstName}</h2>
          <h2>{getGreeting()}</h2>
        </div>
        <div className='flex items-center gap-2 px-4 text-xl '>
          <div className='w-12 h-12 rounded-full bg-emerald-500 text-white grid place-items-center text-xl font-semibold'>
            {currentDate.getDate()}
          </div>
          <div className='font-semibold'>
            <h3>{moment(currentDate).format("ddd")},</h3>
            <h3>{moment(currentDate).format("MMM YYYY")}</h3>
          </div>
        </div>
      </div>

      <div className='col-span-12'>
        <div className='flex gap-4 w-full overflow-y-auto scroll-hidden'>
          {
            analyticCardData.map((card) => {
              return (
                <AnalyticCard key={card.id} {...card} width='glass' />
              )
            })
          }
        </div>
      </div>

      <div className='col-span-12 md:col-span-6 lg:col-span-5 flex flex-col gap-4'>
        <AreaChartGradient
          className='glass'
          cData={formattedChartData(chartData)}
          cConfig={generateChartConfig(chartData)}
          title='Top 5 Products'
          description="Showing most used product for scanning in the last 6 months"
          Navigate={<Link href={"/products/listing"} className="absolute top-3 right-3">
            <Button size={"sm"} className=" gap-1">
              <ListTodo className="w-4" />
              View All
            </Button>
          </Link>}
        />
        <DonutChart
          className='glass'
          title="Repeated Customers"
          cData={donutChartData}
          cConfig={donutChartConfig}
          // description="January - June 2024"
          Footer={<div className="grid gap-2 w-full">
            <div className="flex items-center justify-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
          </div>}
        />
      </div>


      <div className='col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-4'>
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
        <LineChart
          className='glass'
          cData={formattedChartData(chartData)}
          cConfig={generateChartConfig(chartData)}
          title='Your Product Scans'
          description="Showing scans analytics in the last 6 months"
          Footer={<div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - June 2024
              </div>
            </div>
          </div>
          }
        />

      </div>

      <div className='col-span-12 lg:col-span-3 flex flex-wrap justify-center gap-4'>
        <Calender />
        <Feedback />
        <CustomerSupport />
      </div>
    </div>
  )
}

export default Page






// import Link from 'next/link'
// import React from 'react'

// const routes = [
//   "/login",
//   "/register",
//   "/forgot-password",
//   "/reset-password",
//   "/verify",
//   "/onboarding",
//   "/settings",
//   "/products",
//   "/qrs",
//   // "/access",
//   "/scans",
//   '/counter-fitting'
// ]

// function Page() {
//   return (
//     <div className='pt-20'>
//       {
//         routes.map((route, index) => (
//           <Link href={route} key={index}>
//             <span className="block px-4 py-2 text-xl font-medium text-gray-500 hover:text-gray-700">
//               {route.replace("/", "").toUpperCase()}
//             </span>
//           </Link>
//         ))}
//     </div>
//   )
// }

// export default Page



