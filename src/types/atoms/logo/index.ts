export type LogoProps = {
  src: string // URL or path to the logo image or SVG
  alt: string // Alternative text for the logo for accessibility
  width?: number | string // Width of the logo
  height?: number | string // Height of the logo
  className?: string // Additional classes for styling
  onClick?: () => void // Optional click handler
}
