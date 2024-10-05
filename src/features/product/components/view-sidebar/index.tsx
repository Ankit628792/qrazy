import useClickOutside from '@/components/hooks/useClickOutSide'
import React, { useRef } from 'react'
import { RightSideBarMenu } from '@/shared/components/right-sidebar'
import { Container } from '@/components'
import { IProductRowData } from '../../product.interface'

type ProductViewSideBarMenuProps = {
  sideBarOpen: boolean
  selectedRowData: IProductRowData | null
  setSideBarOpen: (value: boolean) => void
}

export const ProductViewSideBarMenu = ({
  sideBarOpen,
  selectedRowData,
  setSideBarOpen
}: ProductViewSideBarMenuProps) => {
  const sideBarRef = useRef(null)

  const handleCloseModal = () => {
    setSideBarOpen(false)
  }

  useClickOutside(sideBarRef, handleCloseModal)

  return (
    <RightSideBarMenu
      sideBarOpen={sideBarOpen}
      setSideBarOpen={setSideBarOpen}
      headerNode={
        <Container className="">
          {selectedRowData && selectedRowData.name}
        </Container>
      }
      Children={
        <React.Fragment>
          <Container className="flex flex-col">
            <Container>
              <Container className="text-lg font-semibold">Age:</Container>
              <Container>{selectedRowData && selectedRowData.age}</Container>
            </Container>
            <Container>
              <Container className="text-lg font-semibold">Address:</Container>
              <Container>
                {selectedRowData && selectedRowData.address}
              </Container>
            </Container>
          </Container>
        </React.Fragment>
      }
    />
  )
}
