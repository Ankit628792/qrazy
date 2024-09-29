export type ChipGroupProps = {
  chips: string[]
  color?: 'primary' | 'secondary' | 'tertiary' | 'neutral'
  className?: string
  onDelete?: (chip: string) => void
  onClick?: (chip: string) => void
}
