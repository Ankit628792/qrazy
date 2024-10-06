import React from 'react'
import { TableFilter } from './table-filter'
import { TableSort } from './table-sort'
import { TextInput } from '../../../atoms'
import { TableToolbarProps } from '../../../../types'

export const TableToolbar: React.FC<TableToolbarProps> = ({
  definedFilters,
  definedSorts,
  tableName,
  searchedValue,
  className,
  handleSortChange,
  handleFilterChange,
  getSearchedValue
}) => {
  return (
    <div
      className={`flex justify-between items-center pt-2 ${className || ''}`}
    >
      <p className=" text-xl font-medium text-neutral-800">{tableName}</p>
      <div className="flex gap-2 pr-1 items-center">
        <TableSort definedSorts={definedSorts} onChange={handleSortChange} />
        <TableFilter
          definedFilters={definedFilters}
          onChange={handleFilterChange}
        />
        {getSearchedValue && (
          <div className="w-80">
            <TextInput
              invalid="false"
              value={searchedValue}
              onChange={(e) => {
                if (getSearchedValue) {
                  getSearchedValue(e.target.value)
                }
              }}
              placeholder="Search By Name"
              className="h-[28px] outline outline-1 outline-neutral-300 rounded-sm border-none"
            />
          </div>
        )}
      </div>
    </div>
  )
}
