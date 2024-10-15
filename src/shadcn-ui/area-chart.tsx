'use client'

import React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from './chart'
import { getProductKeys } from '@/features/overview/components/constant'

export const description = 'An area chart with gradient fill'

export function AreaChartGradient({
  cData,
  cConfig,
  title,
  description,
  Footer = <></>
}: {
  cData: Array<any>
  cConfig: ChartConfig
  title: string
  description?: string
  Footer?: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={cConfig}>
          <AreaChart
            accessibilityLayer
            data={cData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="id"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              {getProductKeys(cData).map((key) => {
                return (
                  <linearGradient
                    key={key}
                    id={`fill${key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={`var(--color-${key})`}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={`var(--color-${key})`}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                )
              })}
            </defs>
            {getProductKeys(cData).map((key, i) => {
              return (
                <Area
                  key={i}
                  dataKey={key}
                  type="natural"
                  fill={`url(#fill${key})`}
                  fillOpacity={0.4}
                  stroke={`var(--color-${key})`}
                  stackId="a"
                />
              )
            })}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>{Footer}</CardFooter>
    </Card>
  )
}
