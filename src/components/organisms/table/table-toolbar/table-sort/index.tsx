import useClickOutSide from '../../../../hooks/useClickOutSide'
import React, { useRef, useState } from 'react'
import { Select } from '../../../../molecules'
import { Button, Container, Switch } from '../../../../atoms'
import {
  ITableSort,
  SORT_DIRECTION,
  TableSortProps
} from '../../../../../types'

export const TableSort: React.FC<TableSortProps> = ({
  definedSorts = [],
  onChange
}) => {
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SORT_DIRECTION>(
    SORT_DIRECTION.ASC
  )
  const [isSortOpen, setIsSortOpen] = useState(false)

  const tableFilterSortRef = useRef<HTMLDivElement>(null)
  useClickOutSide(tableFilterSortRef, () => setIsSortOpen(false))

  const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn(e.target.value)
  }

  const handleSortDirectionChange = () => {
    setSortDirection(
      sortDirection === SORT_DIRECTION.DESC
        ? SORT_DIRECTION.ASC
        : SORT_DIRECTION.DESC
    )
  }

  const applySort = () => {
    if (selectedColumn) {
      const sort: ITableSort = {
        columnId: selectedColumn,
        direction: sortDirection
      }
      onChange && onChange(sort)
    }
  }

  return (
    <div className="relative flex flex-row" ref={tableFilterSortRef}>
      <Button
        btnText="Sort By"
        btnType="secondary"
        onClick={() => setIsSortOpen((filterOpen) => !filterOpen)}
      />
      <div>
        {isSortOpen && (
          <div className="absolute rounded-md w-auto bg-white overflow-y-auto top-10 left-0 border border-neutral-200 shadow-md z-10">
            <Container className="flex items-center justify-center p-1">
              <Select
                placeholder="Sort by column"
                options={definedSorts.map((col) => ({
                  label: col.columnId,
                  value: col.columnId
                }))}
                onChange={handleColumnChange}
                className="h-8"
              />
              <Container className="w-[60px]">
                <Switch
                  checked={sortDirection === 'asc'}
                  onClick={() => handleSortDirectionChange()}
                />
              </Container>
              <Button onClick={applySort} btnType="secondary" btnText="Apply" />
            </Container>
          </div>
        )}
      </div>
    </div>
  )
}
