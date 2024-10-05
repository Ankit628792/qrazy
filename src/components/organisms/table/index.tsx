'use client'

import React, { useState } from 'react'
import { TableBody } from './table-body'
import { TableFooter } from './table-footer'
import { TableHeader } from './table-header'
import { TableToolbar } from './table-toolbar'
import { TableComponentProps } from '../../../types'

export const TableComponent = <T, U>({
  columns,
  rowData,
  definedFilters = [],
  definedSorts = [],
  page = 1,
  pageLimit = 10,
  rowsPerPageOptions = [10, 20, 50],
  showEditButton,
  isNextPagebuttonDisabled,
  lowestPageCount = 0,
  className,
  searchedValue,
  handleSortChange,
  handleFilterChange,
  handlePageChange,
  handlePageLimitChange,
  handleRowClick,
  handleEditClick,
  renderRow,
  getSearchedValue
}: TableComponentProps<T, U>) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const handleRowSelection = (rowIndex: number) => {
    setSelectedRows((prevState) => {
      if (prevState.includes(rowIndex)) {
        return prevState.filter((index) => index !== rowIndex)
      } else {
        return [...prevState, rowIndex]
      }
    })
    handleRowClick && handleRowClick(rowIndex)
  }
  const colSpan = columns && columns.length + (showEditButton ? 1 : 0)
  return (
    <div className="overflow-hidden p-2">
      <TableToolbar
        definedFilters={definedFilters}
        definedSorts={definedSorts}
        searchedValue={searchedValue}
        handleSortChange={handleSortChange}
        handleFilterChange={handleFilterChange}
        getSearchedValue={getSearchedValue}
      />
      <table className="table-auto min-w-full">
        {columns && (
          <TableHeader
            columns={columns}
            appliedSorts={definedSorts}
            showEditButton={showEditButton}
          />
        )}
        <TableBody
          columns={columns}
          rowData={rowData}
          showEditButton={showEditButton}
          selectedRows={selectedRows}
          onRowSelection={handleRowSelection}
          handleEditClick={handleEditClick}
          className={className}
          renderRow={renderRow}
        />
        <TableFooter
          page={page}
          pageLimit={pageLimit}
          colSpan={colSpan}
          perPageOptions={rowsPerPageOptions}
          handlePageChange={handlePageChange}
          handlePageLimitChange={handlePageLimitChange}
          isNextPagebuttonDisabled={isNextPagebuttonDisabled}
          lowestPageCount={lowestPageCount}
        />
      </table>
    </div>
  )
}

export * from './table-wrapper'
