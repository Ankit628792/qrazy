'use client'

import { Container, TableComponent } from '@/components'

export const ProductComponent: React.FC = () => {
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

  return (
    <Container className="w-full h-full">
      <TableComponent
        columns={columns}
        rowKey="id"
        rowData={data}
        definedFilters={[]}
        definedSorts={[]}
        page={1}
        pageLimit={10}
        rowsPerPageOptions={[10, 20, 50]}
        showEditButton={true}
        isNextPagebuttonDisabled={false}
        lowestPageCount={0}
        tableName="Product Table"
      />
    </Container>
  )
}
