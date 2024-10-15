'use client'

import React from 'react'
import { Container, TableComponent } from '@/components'
import { InvoiceViewSideBarMenu } from './components/view-sidebar'
import { IInvoiceRowData } from './invoice.interface'
import { withViewPermissions } from '@/utils/middlewares/useHaveViewPermission'

const InvoiceComponent: React.FC = () => {
  const [isViewSidebarOpen, setIsViewSidebarOpen] = React.useState(false)
  const [selectedRowData, setSelectedRowData] =
    React.useState<IInvoiceRowData | null>(null)
  const columns = [
    {
      id: 'serialNumber',
      label: 'S/N',
      sortable: true
    },
    {
      id: 'name',
      label: 'Name',
      sortable: true
    },
    {
      id: 'age',
      label: 'Age',
      sortable: true
    },
    {
      id: 'address',
      label: 'Address',
      sortable: true
    }
  ]

  const data = [
    {
      id: 1,
      name: 'John Doe',
      age: 25,
      address: '123 Main St'
    },
    {
      id: 2,
      name: 'Jane Doe',
      age: 30,
      address: '456 Main St'
    },
    {
      id: 3,
      name: 'John Smith',
      age: 35,
      address: '789 Main St'
    },
    {
      id: 4,
      name: 'Jane Smith',
      age: 40,
      address: '101 Main St'
    },
    {
      id: 5,
      name: 'John Doe',
      age: 25,
      address: '123 Main St'
    },
    {
      id: 6,
      name: 'Jane Doe',
      age: 30,
      address: '456 Main St'
    },
    {
      id: 7,
      name: 'John Smith',
      age: 35,
      address: '789 Main St'
    },
    {
      id: 8,
      name: 'Jane Smith',
      age: 40,
      address: '101 Main St'
    },
    {
      id: 9,
      name: 'John Doe',
      age: 25,
      address: '123 Main St'
    },
    {
      id: 10,
      name: 'Jane Doe',
      age: 30,
      address: '456 Main St'
    },
    {
      id: 11,
      name: 'John Smith',
      age: 35,
      address: '789 Main St'
    },
    {
      id: 12,
      name: 'Jane Smith',
      age: 40,
      address: '101 Main St'
    },
    {
      id: 13,
      name: 'John Doe',
      age: 25,
      address: '123 Main St'
    },
    {
      id: 14,
      name: 'Jane Doe',
      age: 30,
      address: '456 Main St'
    },
    {
      id: 15,
      name: 'John Smith',
      age: 35,
      address: '789 Main St'
    },
    {
      id: 16,
      name: 'Jane Smith',
      age: 40,
      address: '101 Main St'
    },
    {
      id: 17,
      name: 'John Doe',
      age: 25,
      address: '123 Main St'
    },
    {
      id: 18,
      name: 'Jane Doe',
      age: 30,
      address: '456 Main St'
    },
    {
      id: 19,
      name: 'John Smith',
      age: 35,
      address: '789 Main St'
    },
    {
      id: 20,
      name: 'Jane Smith',
      age: 40,
      address: '101 Main St'
    }
  ]

  const handleViewSidebar = (row: IInvoiceRowData) => {
    console.log(row)
    setIsViewSidebarOpen(true)
    setSelectedRowData(row)
  }

  const getSearchedValue = (value: string) => {
    console.log('searched value', value)
  }

  return (
    <Container className="w-full h-full">
      <InvoiceViewSideBarMenu
        sideBarOpen={isViewSidebarOpen}
        selectedRowData={selectedRowData}
        setSideBarOpen={setIsViewSidebarOpen}
      />
      <TableComponent
        columns={columns}
        rowKey="id"
        rowData={data}
        definedFilters={[]}
        definedSorts={[]}
        page={1}
        pageLimit={10}
        rowsPerPageOptions={[10, 20, 50]}
        isNextPagebuttonDisabled={false}
        lowestPageCount={0}
        showEditButton={true}
        showViewButton={true}
        handleViewClick={handleViewSidebar}
        getSearchedValue={getSearchedValue}
        tableName={`Invoice List (${data.length})`}
      />
    </Container>
  )
}

export default withViewPermissions(InvoiceComponent)
