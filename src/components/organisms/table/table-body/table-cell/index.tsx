import React from 'react'
import { TableCellProps } from '../../../../../types'

export const TableCell = <T, U>({ row, column }: TableCellProps<T, U>) => {
  if (column.render) {
    const RenderComponent = column.render as (props: any) => JSX.Element
    return <RenderComponent rowData={row} column={column} />
  } else {
    return row[column.id]
  }
}
