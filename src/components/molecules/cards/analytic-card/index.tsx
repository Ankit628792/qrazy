import { cn } from '@/libs/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn-ui/card'

type AnalyticCardProps = {
  title: string
  Icon: React.ElementType
  value: string | number
  description?: string
  width?: string
}

export function AnalyticCard({
  title,
  Icon,
  value,
  description,
  width
}: AnalyticCardProps) {
  return (
    <Card
      className={cn(
        'min-w-72 relative group rounded-xl overflow-hidden cursor-pointer',
        width
      )}
    >
      <div className="absolute inset-0 rounded-xl transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 duration-300 ease-in-out flex items-center justify-center bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm p-5">
        <p className="text-center opacity-0 group-hover:opacity-100 delay-300">
          {description}
        </p>
      </div>
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
