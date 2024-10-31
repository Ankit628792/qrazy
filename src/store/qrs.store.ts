import { create } from 'zustand'
import { persist } from 'zustand/middleware'

enum QRS_STORE_KEYS {
  ORDER_LIST = 'qrs-order-list'
}

export type OrderItem = {
  id: number | string
  title: string
  image: {
    url: string
  }
  category: {
    id: string
    name: string
  }
  mrl: string | number
  quantity: number
  expiryDate: Date | undefined
  digital: boolean
  physical: boolean
}

interface IOrderListState {
  orderList: OrderItem[]
  setOrderList: (orderList: OrderItem[]) => void
}

const exampleOrderItem: OrderItem = {
  id: 'number',
  title: 'Red Lebel',
  image: {
    url: 'https://images.unsplash.com/photo-1549049950-48d5887197a0'
  },
  category: {
    id: 'string',
    name: 'Drinks & Beverage'
  },
  mrl: 6767,
  quantity: 123,
  expiryDate: new Date(),
  digital: true,
  physical: true
}

const useQRSStore = create<IOrderListState>()(
  persist(
    (set) => ({
      orderList: Array(1).fill(exampleOrderItem),
      setOrderList: (orderList: OrderItem[]) => set({ orderList })
    }),
    {
      name: QRS_STORE_KEYS.ORDER_LIST,
      partialize: (state) => ({ orderList: state.orderList })
    }
  )
)

export { useQRSStore }
