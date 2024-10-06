import React from 'react'
import { GrPrevious, GrNext } from 'react-icons/gr'
import { TableFooterProps } from '../../../../types'

export const TableFooter: React.FC<TableFooterProps> = ({
  page = 1,
  pageLimit = 10,
  perPageOptions = [10, 20, 50],
  isNextPagebuttonDisabled,
  className,
  colSpan = 3,
  lowestPageCount = 0,
  handlePageChange,
  handlePageLimitChange
}) => {
  return (
    <tfoot className={className}>
      <tr>
        <td colSpan={colSpan} className="py-2">
          <div className="flex justify-between items-center">
            <div>
              Rows per page:
              <select
                value={pageLimit}
                onChange={(e) =>
                  handlePageLimitChange &&
                  handlePageLimitChange(Number(e.target.value))
                }
                className="ml-2 border rounded px-2 py-1"
              >
                {perPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={() => handlePageChange && handlePageChange(page - 1)}
                disabled={page === lowestPageCount}
                className="px-2 py-1 mr-2"
              >
                <GrPrevious />
              </button>
              <span className="mr-2">{page}</span>
              <button
                onClick={() => handlePageChange && handlePageChange(page + 1)}
                disabled={isNextPagebuttonDisabled}
                className="px-2 py-1"
              >
                <GrNext />
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  )
}
