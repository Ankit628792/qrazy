import { QRTemplates } from '@/components/qrs/generate/constant'
import { getId } from '@/lib'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

enum QRS_STORE_KEYS {
  ORDER_LIST = 'qrs-order-list'
}

interface IOrderListState {
  orderList: QROrder[]
  QRType: null | string
  templateId: null | string
  activeOrder: QROrder | null | undefined | boolean
  setActiveOrder: (order: QROrder | boolean) => void
  setQRType: (type: string | null) => void
  setTemplateId: (id: string | null) => void
  setOrderList: (orderItem: QROrder) => void
  removeOrderItem: (id: string) => void
  reset: () => void
}

export const exampleQRData: QROrder = {

  "selectedProduct": {
    "id": 70,
    "title": "Fantastic Metal Gloves",
    "description": "Weber LLC's most advanced Pizza technology increases distinct capabilities",
    "mrp": 7577.09,
    "mrl": 9.79,
    "links": [
      {
        "id": 9022,
        "url": "https://clear-cut-chiffonier.info/"
      }
    ],
    "category": {
      "id": 845,
      "name": "Games",
      "description": "The Polarised cloud-native flexibility Tuna offers reliable performance and victorious design"
    },
    "image": {
      "id": 2749,
      "url": "https://picsum.photos/seed/YstPXUVoAm/200/200?blur=10"
    },
    "images": [
      {
        "id": 7510,
        "url": "https://loremflickr.com/200/200/product?lock=7660854440868047"
      },
      {
        "id": 7969,
        "url": "https://loremflickr.com/200/200/product?lock=3934456272121020"
      }
    ],
    "status": "draft",
    "created_at": "2024-11-07T10:24:59.880Z",
    "updated_at": "2024-11-07T10:24:59.880Z",
    "region": "Anchorage",
    "scans": 57813
  },
  "quantity": 1200,
  "expiryDate": new Date("2024-11-14T18:30:00.000Z"),
  "mrl": "10"

}

const initialState = {
  orderList: [],
  activeOrder: false,
  QRType: null,
  templateId: null,
}

const useQRSStore = create<IOrderListState>()(
  persist(
    (set) => ({
      ...initialState,
      setActiveOrder: (order: QROrder | boolean) => set({ activeOrder: order }),
      setQRType: (type: string | null) => set({ QRType: type }),
      setTemplateId: (id: string | null) => set({ templateId: id }),
      setOrderList: (orderItem: QROrder) => set((state) => {
        let idx = state.orderList.findIndex(el => el.id === orderItem?.id);
        if (idx >= 0) {
          return { orderList: state.orderList.map(el => el.id === orderItem.id ? orderItem : el), activeOrder: false };
        } else {
          return { orderList: [...state.orderList, { id: getId(), ...orderItem }], activeOrder: false };
        }
      }),
      removeOrderItem: (id: string) => set((state) => ({ orderList: state.orderList.filter((el) => el.id !== id), QRType: state.orderList.length > 1 ? state.QRType : null, templateId: state.orderList.length > 1 ? state.templateId : null })),
      reset: () => set(initialState)
    }),
    {
      name: QRS_STORE_KEYS.ORDER_LIST,
      partialize: (state) => ({ orderList: state.orderList, QRType: state.QRType })
    }
  )
);


export { useQRSStore }
