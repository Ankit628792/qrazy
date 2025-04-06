import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from './select'
import { Input } from './input'
import { useState } from 'react'

const SearchSelect = ({
  options,
  initialValue,
  onChange
}: {
  options: Option[]
  initialValue?: string
  onChange: (option: Option) => void
}) => {
  const [value, setValue] = useState(initialValue || '')

  const filteredOptions = options.filter((option: Option) =>
    option.label.toLowerCase().includes(value.toLowerCase())
  )

  return (
    <Select
      defaultValue={initialValue}
      value={initialValue}
      onValueChange={(id) => {
        console.log({ id })
        const option = options.find(
          (item: Option) => id === item.value
        ) as Option
        setValue(option.value || '')
        onChange(option)
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <Input
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mb-2"
        />
        {filteredOptions.map((option: Option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}

        {!filteredOptions.length && <p className='text-xs p-2'>No Search Result Found</p>}
      </SelectContent>
    </Select>
  )
}

export default SearchSelect
