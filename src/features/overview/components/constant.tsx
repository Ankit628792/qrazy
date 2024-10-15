import appUtils from '@/libs/app-utils'
import { ChartConfig } from '@/shadcn-ui/chart'

const analyticCardData = [
  {
    id: '1',
    title: 'Total Active Product',
    // Icon: Users,
    value: '+' + Math.floor(Math.random() * 1000),
    description: 'Total number of active products in the system.'
  },
  {
    id: '2',
    title: 'Active QR Products',
    // Icon: ScanQrCode,
    value: '+' + Math.floor(Math.random() * 500),
    description: 'Number of products that are QR code enabled.'
  },
  {
    id: '3',
    title: 'Top Category',
    // Icon: LayoutDashboard,
    value: 'Electronics',
    description: 'The category with the highest number of active products.'
  },
  {
    id: '4',
    title: 'Total Product',
    // // Icon: ShoppingBagIcon,
    value: '+' + Math.floor(Math.random() * 5000),
    description: 'Total number of products available in the system.'
  },
  {
    id: '5',
    title: 'Rewards Claimed',
    // Icon: HandCoins,
    value: '+' + Math.floor(Math.random() * 200),
    description: 'Total number of rewards claimed by users.'
  }
]

export const chartData = [
  {
    id: 'January',
    'Britania Biscuit': appUtils.getRandomNumber(50, 400),
    'Parle-G': appUtils.getRandomNumber(50, 400),
    'Coca Cola': appUtils.getRandomNumber(50, 400),
    Pepsi: appUtils.getRandomNumber(50, 400),
    'Maggi Noodles': appUtils.getRandomNumber(50, 400)
  },
  {
    id: 'February',
    'Britania Biscuit': appUtils.getRandomNumber(50, 400),
    'Parle-G': appUtils.getRandomNumber(50, 400),
    'Coca Cola': appUtils.getRandomNumber(50, 400),
    Pepsi: appUtils.getRandomNumber(50, 400),
    'Maggi Noodles': appUtils.getRandomNumber(50, 400)
  },
  {
    id: 'March',
    'Britania Biscuit': appUtils.getRandomNumber(50, 400),
    'Parle-G': appUtils.getRandomNumber(50, 400),
    'Coca Cola': appUtils.getRandomNumber(50, 400),
    Pepsi: appUtils.getRandomNumber(50, 400),
    'Maggi Noodles': appUtils.getRandomNumber(50, 400)
  },
  {
    id: 'April',
    'Britania Biscuit': appUtils.getRandomNumber(50, 400),
    'Parle-G': appUtils.getRandomNumber(50, 400),
    'Coca Cola': appUtils.getRandomNumber(50, 400),
    Pepsi: appUtils.getRandomNumber(50, 400),
    'Maggi Noodles': appUtils.getRandomNumber(50, 400)
  },
  {
    id: 'May',
    'Britania Biscuit': appUtils.getRandomNumber(50, 400),
    'Parle-G': appUtils.getRandomNumber(50, 400),
    'Coca Cola': appUtils.getRandomNumber(50, 400),
    Pepsi: appUtils.getRandomNumber(50, 400),
    'Maggi Noodles': appUtils.getRandomNumber(50, 400)
  },
  {
    id: 'June',
    'Britania Biscuit': appUtils.getRandomNumber(50, 400),
    'Parle-G': appUtils.getRandomNumber(50, 400),
    'Coca Cola': appUtils.getRandomNumber(50, 400),
    Pepsi: appUtils.getRandomNumber(50, 400),
    'Maggi Noodles': appUtils.getRandomNumber(50, 400)
  }
]

// Define the type for each month's data
type MonthData = {
  id: string
  [product: string]: number | string // Each product has a string key and numeric value, except for the 'month' key
}

// Define the type for the chart config
type ChartConfigItem = {
  label: string
  color: string
}

export const getProductKeys = (chartData: MonthData[]) => {
  const uniqueProducts: { [key: string]: boolean } = {}

  // Extract unique product names from the data (excluding the 'month' key)
  chartData.forEach((monthData) => {
    Object.keys(monthData).forEach((key) => {
      if (key !== 'id' && !uniqueProducts[key]) {
        uniqueProducts[key] = true // Mark this product as seen
      }
    })
  })

  return Object.keys(uniqueProducts)
}

// Helper function to generate chart config based on chart data
export const generateChartConfig = (chartData: MonthData[]): ChartConfig => {
  const colorPalette = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(var(--chart-6))',
    'hsl(var(--chart-7))',
    'hsl(var(--chart-8))',
    'hsl(var(--chart-9))'
  ]
  const productKeys = getProductKeys(chartData) // Get unique product names from the data

  // Create chart config by iterating over the unique products
  const chartConfig: ChartConfig = productKeys.reduce(
    (config, product, index) => {
      const formattedKey = product.replace(/\s+/g, '').toLowerCase()
      config[formattedKey] = {
        label: product,
        color: colorPalette[index] // Cycle through colors if needed
      }
      return config
    },
    {} as ChartConfig
  )

  // console.log(chartConfig)
  return chartConfig
}

export const formattedChartData = (chartData: Array<any>) => {
  return chartData.map((data) => {
    const formattedData: any = {}
    Object.keys(data).forEach((key) => {
      formattedData[key.replace(/\s+/g, '').toLowerCase() as string] = data[key]
    })
    return formattedData
  })
}
