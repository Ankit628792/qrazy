import React from 'react'
import { CiEdit } from 'react-icons/ci'
import { TableCell } from './table-cell'
import { NoResult } from './NoResult'
import { TableBodyProps } from '../../../../types'
import { HiMiniViewfinderCircle } from 'react-icons/hi2'

export const TableBody = <T extends { [key: string]: any }, U>({
  columns,
  rowData,
  showEditButton,
  className,
  showViewButton,
  onRowSelection,
  handleEditClick,
  handleViewClick,
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
        className={`item-center justify-center overflow-scroll w-full ${className}`}
        style={{ height: 'calc(100vh - 214px)' }}
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
      <tbody
        className={`block overflow-scroll w-full  ${className}`}
        style={{ height: 'calc(100vh - 214px)' }}
      >
        {groupedData.map((rowGroup, rowIndex) => (
          <tr key={rowIndex} className="flex items-center justify-start">
            {rowGroup.map((data, index) => (
              <RenderTableCell
                rowData={data}
                key={index}
                columns={columns}
                handleEditClick={handleEditClick}
                showEditButton={showEditButton}
              />
            ))}
          </tr>
        ))}
      </tbody>
    )
  }

  return (
    <tbody
      className={`overflow-y-scroll w-full block ${className}`}
      style={{ height: 'calc(100vh - 214px)' }}
    >
      {rowData.map((row, index) => (
        <tr
          key={index}
          onClick={() => handleRowClick(index)}
          className="flex border-y border-gray-500/10 py-1 hover:bg-gray-500/10 cursor-pointer"
        >
          {columns &&
            columns.map((column) =>
              column.id === 'serialNumber' ? (
                <td
                  key={column.id}
                  className="px-4 py-2 whitespace-nowrap text-sm overflow-hidden flex justify-start items-center flex-1"
                >
                  {index + 1}.
                </td>
              ) : (
                <td
                  key={column.id}
                  className="px-4 py-2 whitespace-nowrap text-sm overflow-hidden flex justify-start items-center flex-1"
                >
                  <TableCell row={row} column={column} />
                </td>
              )
            )}
          {showViewButton && (
            <td className="px-6 py-2 whitespace-nowrap text-sm overflow-hidden flex justify-start items-center">
              <button
                className="hover:text-blue-400"
                onClick={() => {
                  if (handleViewClick) {
                    handleViewClick(row)
                  }
                }}
              >
                <HiMiniViewfinderCircle />
              </button>
            </td>
          )}
          {showEditButton && (
            <td className="px-6 py-2 whitespace-nowrap text-sm overflow-hidden flex justify-start items-center">
              <button
                className="hover:text-blue-400"
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
