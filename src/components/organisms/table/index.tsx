'use client'

import React, { useState } from 'react'
import { TableBody } from './table-body'
import { TableFooter } from './table-footer'
import { TableHeader } from './table-header'
import { TableToolbar } from './table-toolbar'
import { TableComponentProps } from '../../../types'

export const TableComponent = <T extends { [key: string]: any }, U>({
  tableName = '',
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
  showViewButton = false,
  handleSortChange,
  handleFilterChange,
  handlePageChange,
  handlePageLimitChange,
  handleRowClick,
  handleEditClick,
  renderRow,
  getSearchedValue,
  handleViewClick,
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
        tableName={tableName}
        definedFilters={definedFilters}
        definedSorts={definedSorts}
        searchedValue={searchedValue}
        handleSortChange={handleSortChange}
        handleFilterChange={handleFilterChange}
        getSearchedValue={getSearchedValue}
      />
      <table className="table-auto w-full h-full">
        {columns && (
          <TableHeader
            columns={columns}
            appliedSorts={definedSorts}
            showEditButton={showEditButton}
            showViewButton={showViewButton}
            className="max-h-[48px]"
          />
        )}
        <TableBody
          columns={columns}
          rowData={rowData}
          showEditButton={showEditButton}
          className={className}
          showViewButton={showViewButton}
          selectedRows={selectedRows}
          renderRow={renderRow}
          handleViewClick={handleViewClick}
          onRowSelection={handleRowSelection}
          handleEditClick={handleEditClick}
        />
        <TableFooter
          page={page}
          colSpan={colSpan}
          pageLimit={pageLimit}
          className="max-h-[48px]"
          perPageOptions={rowsPerPageOptions}
          isNextPagebuttonDisabled={isNextPagebuttonDisabled}
          lowestPageCount={lowestPageCount}
          handlePageChange={handlePageChange}
          handlePageLimitChange={handlePageLimitChange}
        />
      </table>
    </div>
  )
}
