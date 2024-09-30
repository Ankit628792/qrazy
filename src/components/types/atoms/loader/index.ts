export type CircularLoaderProps = {
  size?: number // Diameter of the loader in pixels
  color?: string // Color of the loader
  className?: string // Additional classes for styling
}

export type LinearLoaderProps = {
  isLoading?: boolean // If true, show loading animation
  progress?: number // Percentage of progress (0-100)
  color?: string // Color of the loader
  className?: string // Additional classes for styling
}
