export type DefaultLayoutProp = Readonly<{
  children: React.ReactNode
}>

export type LoginLayoutProps = DefaultLayoutProp &
  Readonly<{
    // future extension for LoginLayout
  }>

export type SidebarLayoutProps = DefaultLayoutProp &
  Readonly<{
    // future extension for SidebarLayout
  }>

export type LayoutProps = DefaultLayoutProp &
  Readonly<{
    // future extension for Layout
  }>

export type ProtectedBoundaryProps = DefaultLayoutProp &
  Readonly<{
    // future extension for ProtectedBoundary
  }>
