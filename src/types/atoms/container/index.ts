export type ContainerProps = {
  maxWidth?: string // Maximum width of the container
  padding?: string // Padding around the content
  centered?: boolean // If true, centers the content horizontally
  className?: string // Additional classes for styling
} & { children: React.ReactNode }
