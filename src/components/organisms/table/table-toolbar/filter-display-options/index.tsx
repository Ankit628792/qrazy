import React, { useState } from 'react'
import { Radio, TextInput } from '../../../../atoms'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import {
  FILTER_TYPE,
  FilterDisplayOptionsProps,
  INPUT_TYPE
} from '../../../../types'

const TableFilterInput = ({
  filterData,
  onFilterChange
}: FilterDisplayOptionsProps) => {
  const [value, setValue] = useState(filterData.value)
  const [open, setOpen] = useState(false)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onFilterChange(filterData.columnId, e.target.value, filterData.type)
  }
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(!open)
  }
  return (
    <div className="p-2">
      <div onClick={handleToggle} className="flex flex-row items-center gap-2">
        {open === false ? <BiChevronDown /> : <BiChevronUp />}
        <div>{filterData.columnId}</div>
      </div>
      {open && (
        <div className=" bg-neutral-100">
          <TextInput
            type={INPUT_TYPE.TEXT}
            value={value}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      )}
    </div>
  )
}
const TableBooleanInput = ({
  filterData,
  onFilterChange
}: FilterDisplayOptionsProps) => {
  const [open, setOpen] = useState(false)
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(!open)
  }
  return (
    <div className="p-2">
      <div onClick={handleToggle} className="flex flex-row items-center gap-2">
        {open === false ? <BiChevronDown /> : <BiChevronUp />}
        <div>{filterData.columnId}</div>
      </div>
      {open && (
        <div className="p-2 bg-neutral-100">
          <Radio
            name={filterData.columnId}
            label="Active"
            checked={filterData.value === 'ACTIVE'}
            value="ACTIVE"
            onChange={(e) =>
              onFilterChange(
                filterData.columnId,
                e.target.value,
                filterData.type
              )
            }
            radioType="primary"
          />
          <Radio
            name={filterData.columnId}
            label="In-Active"
            checked={filterData.value === 'IN_ACTIVE'}
            onChange={(e) =>
              onFilterChange(
                filterData.columnId,
                e.target.value,
                filterData.type
              )
            }
            radioType="primary"
            value="IN_ACTIVE"
          />
        </div>
      )}
    </div>
  )
}
const getFilterComponentByType = (filterType: FILTER_TYPE) => {
  switch (filterType) {
    case FILTER_TYPE.STRING:
      return TableFilterInput
    case FILTER_TYPE.BOOLEAN:
      return TableBooleanInput
    case FILTER_TYPE.NUMBER:
    case FILTER_TYPE.DATE:
    case FILTER_TYPE.REGEX:
    case FILTER_TYPE.LIST_OF_NUMBERS:
    case FILTER_TYPE.NUMERIC_RANGE:
    case FILTER_TYPE.DATE_RANGE:
    case FILTER_TYPE.DATETIME_RANGE:
    default:
      break
  }
  return TableFilterInput
}
export const FilterDisplayOptions = ({
  filterData,
  onFilterChange
}: FilterDisplayOptionsProps) => {
  const FilterComponent = getFilterComponentByType(filterData.type)
  return (
    <FilterComponent filterData={filterData} onFilterChange={onFilterChange} />
  )
}
