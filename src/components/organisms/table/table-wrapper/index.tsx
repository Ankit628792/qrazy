type TableWrapperProps = {
  children: React.ReactNode
  className?: string
}

export const TableWrapper: React.FC<TableWrapperProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`overflow-scroll h-full w-full ${className}`} {...props}>
      {children}
    </div>
  )
}
