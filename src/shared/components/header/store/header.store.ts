import { create } from 'zustand'

const subNavigation = [
  {
    name: 'Go Home',
    href: '/'
  }
]

type HomeManagementState = {
  sideBarOpen: boolean
  subNavigation: typeof subNavigation
  setSideBarOpen: (value: boolean) => void
}

const useHeaderStore = create<HomeManagementState>((set) => ({
  sideBarOpen: false,
  subNavigation: subNavigation,
  setSideBarOpen: (value) => set({ sideBarOpen: value })
}))

export default useHeaderStore
