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
    <div className={`flex justify-between items-center ${className || ''}`}>
      <div className="flex items-center flex-row gap-2 p-2">
        <p className=" text-lg font-medium text-neutral-800">{tableName}</p>
        <TableSort definedSorts={definedSorts} onChange={handleSortChange} />
        <TableFilter
          definedFilters={definedFilters}
          onChange={handleFilterChange}
        />
      </div>
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
            className="h-8"
          />
        </div>
      )}
    </div>
  )
}
