export interface IGridProps {
  container?: boolean
  item?: boolean
  spacing?: number | string
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  xs?: number | 'auto' | boolean
  sm?: number | 'auto' | boolean
  md?: number | 'auto' | boolean
  lg?: number | 'auto' | boolean
  xl?: number | 'auto' | boolean
  className?: string
  children?: React.ReactNode
}
