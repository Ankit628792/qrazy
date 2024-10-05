export enum FILTER_TYPE {
  STRING = 'string',
  LIST_OF_STRING = 'list_of_string',
  REGEX = 'regex',
  DATE = 'date',
  DATE_RANGE = 'date_range',
  DATETIME = 'datetime',
  DATETIME_RANGE = 'datetime_range',
  NUMBER = 'number',
  LIST_OF_NUMBERS = 'list_of_numbers',
  NUMERIC_RANGE = 'numeric_range',
  BOOLEAN = 'boolean',
  MULTISELECT = 'multiSelect'
}

export enum SORT_DIRECTION {
  ASC = 'asc',
  DESC = 'desc'
}

export type TableColumn<T, U> = {
  id: string
  label: string
  sortable?: boolean
  render?: (rowData: T, columnData: U) => JSX.Element
}

export interface TableHeaderProps<T, U> {
  appliedSorts?: ITableSort[]
  columns: TableColumn<T, U>[]
  className?: string
  showEditButton?: boolean
  onSortChange?: (sort: ITableSort) => void
}

export type TableBodyProps<T, U> = {
  columns?: TableColumn<T, U>[]
  rowData: T[]
  showEditButton?: boolean
  selectedRows?: number[] // Add this line
  className?: string
  renderRow?: (data: T) => React.ReactElement
  onRowSelection?: (rowIndex: number) => void // Add this line
  handleEditClick?: (row: T) => void // Update this line
}

export type TableCellProps<T, U> = {
  row: T
  column: TableColumn<T, U>
}

export interface ITableSort {
  columnId: string
  direction: SORT_DIRECTION
}

export interface ITableFilter {
  columnId: string
  value: any
  type: FILTER_TYPE
}

export interface TableComponentProps<T extends { [key: string]: any }, U> {
  columns?: TableColumn<T, U>[]
  rowData: T[] // Update the type of rowData to an array of T
  rowKey: string
  selectedRows?: string[]
  definedFilters?: ITableFilter[]
  definedSorts?: ITableSort[]
  page?: number
  pageLimit?: number
  rowsPerPageOptions?: number[]
  showEditButton?: boolean
  isNextPagebuttonDisabled?: boolean
  lowestPageCount?: number
  className?: string
  searchedValue?: string
  renderRow?: (data: T) => React.ReactElement
  onRowSelectionChange?: (selectedRowIds: string[]) => void
  handleSortChange?: (sort: ITableSort) => void
  handleFilterChange?: (filters: ITableFilter[]) => void
  handlePageChange?: (page: number) => void
  handlePageLimitChange?: (limit: number) => void
  handleRowClick?: (rowId: number) => void
  handleEditClick?: (row: T) => void // Update the type of handleEditClick
  getSearchedValue?: (value: string) => void
}

export type TableToolbarProps = {
  definedFilters?: ITableFilter[]
  definedSorts?: ITableSort[]
  className?: string
  searchedValue?: string
  handleSortChange?: (sort: ITableSort) => void
  handleFilterChange?: (filters: ITableFilter[]) => void
  getSearchedValue?: (value: string) => void
}

export type TableFooterProps = {
  page?: number
  pageLimit?: number
  perPageOptions?: number[]
  isNextPagebuttonDisabled?: boolean
  className?: string
  colSpan?: number
  lowestPageCount?: number
  handlePageChange?: (page: number) => void
  handlePageLimitChange?: (limit: number) => void
}

export type FilterDisplayOptionsProps = {
  filterData: ITableFilter
  onFilterChange: (columnId: string, value: any, type: FILTER_TYPE) => void
}

export interface TableFilterProps {
  definedFilters?: ITableFilter[]
  onChange?: (filters: ITableFilter[]) => void
}

export interface TableSortProps {
  definedSorts?: ITableSort[]
  onChange?: (sort: ITableSort) => void
}
