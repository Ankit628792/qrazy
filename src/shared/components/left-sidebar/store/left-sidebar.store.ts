import { create } from 'zustand'

type LeftSidebarManagementState = {
  showOnlyIcons: boolean
  setShowOnlyIcons: (value: boolean) => void
}

const useLeftSidebarStore = create<LeftSidebarManagementState>((set) => ({
  showOnlyIcons: false,
  setShowOnlyIcons: (value) => set({ showOnlyIcons: value })
}))

export default useLeftSidebarStore
