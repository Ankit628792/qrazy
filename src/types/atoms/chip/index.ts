export type ChipProps = {
  label: string
  color?: 'primary' | 'secondary' | 'tertiary' | 'neutral'
  className?: string
  onChipClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onDelete?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}
