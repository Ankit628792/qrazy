'use client'

import React from 'react'
import { withViewPermissions } from '@/libs/middlewares/useHaveViewPermission'
import { IUserRowData } from './user.interface'
import { Container, Modal, TableComponent } from '@/components'
import { ReportViewSideBarMenu } from '../report/components/view-sidebar'
import { AddUserForm } from './components/add-user-form'

const UserComponent: React.FC = () => {
  const [isViewSidebarOpen, setIsViewSidebarOpen] = React.useState(false)
  const [selectedRowData, setSelectedRowData] =
    React.useState<IUserRowData | null>(null)
  const [showAddUserModal, setShowAddUserModal] = React.useState(false)

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
    },
    {
      id: 'email',
      label: 'Email',
      sortable: false
    }
  ]

  const data = [
    {
      id: 1,
      name: 'John Doe',
      age: 25,
      address: '123 Main St',
      email: 'testCompany@gmail.com'
    }
  ]

  const handleViewSidebar = (row: IUserRowData) => {
    console.log(row)
    setIsViewSidebarOpen(true)
    setSelectedRowData(row)
  }

  const getSearchedValue = (value: string) => {
    console.log('searched value', value)
  }

  const handleAddRow = () => {
    setShowAddUserModal(true)
  }

  const handleCloseModal = () => {
    setShowAddUserModal(false)
  }

  return (
    <Container className="w-full h-full">
      <Modal isOpen={showAddUserModal} onClose={() => handleCloseModal()}>
        <AddUserForm />
      </Modal>
      <ReportViewSideBarMenu
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
        showEditButton={true}
        isNextPagebuttonDisabled={false}
        lowestPageCount={0}
        showViewButton={true}
        handleViewClick={handleViewSidebar}
        getSearchedValue={getSearchedValue}
        handleAddRow={handleAddRow}
        hideToolbar={true}
        showAddRowButton={true}
        tableName={`User List (${data.length})`}
      />
    </Container>
  )
}

export default withViewPermissions(UserComponent)
