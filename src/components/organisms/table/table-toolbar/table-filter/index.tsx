'use client'

import useClickOutside from '@/components/hooks/useClickOutSide'
import React, { useRef, useState } from 'react'
import { Button, ButtonWithIcon } from '../../../../atoms'
import { BiFilterAlt } from 'react-icons/bi'
import { FilterDisplayOptions } from '../filter-display-options'
import {
  FILTER_TYPE,
  ITableFilter,
  TableFilterProps
} from '../../../../../types'

export const TableFilter: React.FC<TableFilterProps> = ({
  definedFilters = [],
  onChange
}) => {
  const [filters, setFilters] = useState<ITableFilter[]>(definedFilters || [])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const tableFilterRef = useRef<HTMLDivElement>(null)
  useClickOutside(tableFilterRef, () => setIsFilterOpen(false))

  const handleFilterChange = (
    columnId: string,
    value: any,
    type: FILTER_TYPE
  ) => {
    const updatedFilters = [...filters]
    const existingFilterIndex = updatedFilters.findIndex(
      (filter) => filter.columnId === columnId
    )

    if (existingFilterIndex > -1) {
      updatedFilters[existingFilterIndex].value = value
    } else {
      updatedFilters.push({ columnId, value, type })
    }

    setFilters(updatedFilters)
  }

  const handleResetFilter = () => {
    setIsFilterOpen(false)
    setFilters([])
    onChange && onChange([])
  }

  const handleApplyFilter = () => {
    setIsFilterOpen(false)
    onChange && onChange(filters)
  }

  return (
    <div className="relative flex flex-row" ref={tableFilterRef}>
      <ButtonWithIcon
        btnText="Filters"
        Icon={BiFilterAlt}
        btnType="secondary"
        onClick={() => setIsFilterOpen((filterOpen) => !filterOpen)}
      />
      <div>
        {isFilterOpen && (
          <div className="absolute rounded-md w-auto bg-white overflow-y-auto top-10 left-0 border border-neutral-200 shadow-md z-10">
            <div className="flex items-center justify-between border-b border-neutral-100 pl-3 pr-3">
              <h4 className="m-4 font-Lato">Filters</h4>
              <div className="flex items-center justify-center gap-2">
                <Button
                  type="submit"
                  btnText="Reset"
                  btnType="secondary"
                  onClick={() => handleResetFilter()}
                />
                <Button
                  type="submit"
                  btnText="Apply"
                  btnType="base"
                  onClick={() => handleApplyFilter()}
                />
              </div>
            </div>
            {definedFilters.map((filterData, index) => (
              <div key={index} className="flex flex-col">
                <FilterDisplayOptions
                  filterData={filterData}
                  onFilterChange={handleFilterChange}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
