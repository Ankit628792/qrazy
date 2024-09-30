import React from 'react'
import { CiEdit } from 'react-icons/ci'
import { TableCell } from './table-cell'
import { NoResult } from './NoResult'
import { TableBodyProps } from '../../../types'

export const TableBody = <T, U>({
  columns,
  rowData,
  showEditButton,
  className,
  onRowSelection,
  handleEditClick,
  renderRow
}: TableBodyProps<T, U>) => {
  const zero = 0
  const handleRowClick = (rowIndex: number) => {
    if (onRowSelection) {
      onRowSelection(rowIndex)
    }
  }

  if (rowData.length === zero) {
    return (
      <tbody
        className={`overflow-auto item-center w-full justify-center ${className}`}
      >
        <tr>
          <td className="flex flex-col items-center justify-center">
            <NoResult />
            <p className="text-center text-gray-400 text-base font-normal">
              Oops! No Results Found Oops! No Results Found
            </p>
          </td>
        </tr>
      </tbody>
    )
  }

  if (renderRow) {
    const groupedData: T[][] = []
    for (let i = 0; i < rowData.length; i += 3) {
      groupedData.push(rowData.slice(i, i + 3))
    }
    const RenderTableCell: any = renderRow
    return (
      <tbody className={`overflow-auto block ${className}`}>
        {groupedData.map((rowGroup, rowIndex) => (
          <tr key={rowIndex} className="flex items-center justify-start">
            {rowGroup.map((data) => (
              <RenderTableCell rowData={data} />
            ))}
          </tr>
        ))}
      </tbody>
    )
  }

  return (
    <tbody className={`overflow-auto block ${className}`}>
      {rowData.map((row, index) => (
        <tr key={index} onClick={() => handleRowClick(index)} className="flex">
          {columns &&
            columns.map((column) => (
              <td
                key={column.id}
                className="px-4 py-2 whitespace-nowrap text-sm overflow-hidden flex justify-center items-center flex-1"
              >
                <TableCell row={row} column={column} />
              </td>
            ))}
          {showEditButton && (
            <td className="px-4 py-2 flex justify-center items-center">
              <button
                className="hover:text-primary-700"
                onClick={() => {
                  if (handleEditClick) {
                    handleEditClick(row)
                  }
                }}
              >
                <CiEdit />
              </button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  )
}
