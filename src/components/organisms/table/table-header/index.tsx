import React from 'react'
import { SORT_DIRECTION, TableColumn, TableHeaderProps } from '../../../types'

export const TableHeader = <T, U>({
  columns,
  appliedSorts = [],
  className,
  showEditButton,
  onSortChange
}: TableHeaderProps<T, U>) => {
  const getSortDirection = (columnId: string): SORT_DIRECTION => {
    const sort = appliedSorts.find((s) => s.columnId === columnId)
    return sort ? sort.direction : SORT_DIRECTION.ASC
  }

  const handleSortClick = <T, U>(column: TableColumn<T, U>) => {
    if (column.sortable && onSortChange) {
      const currentDirection = getSortDirection(column.id)
      const newDirection =
        currentDirection === SORT_DIRECTION.ASC
          ? SORT_DIRECTION.DESC
          : SORT_DIRECTION.ASC
      onSortChange({ columnId: column.id, direction: newDirection })
    }
  }

  return (
    <thead className={`${className}`}>
      <tr className="flex">
        {columns.map((column) => (
          <th
            key={column.id}
            className={`px-4 py-2 ${column.sortable ? 'cursor-pointer' : ''} 
            flex justify-center items-center flex-1
            `}
            onClick={() => handleSortClick(column)}
          >
            {column.label}
            {column.sortable && (
              <span
                className={`ml-2 ${
                  getSortDirection(column.id) === 'asc'
                    ? 'text-primary-500'
                    : 'text-neutral-500'
                }`}
              >
                {getSortDirection(column.id) === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </th>
        ))}
        {showEditButton && <th className="px-4 py-2"></th>}
      </tr>
    </thead>
  )
}
