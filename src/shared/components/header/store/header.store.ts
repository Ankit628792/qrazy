import { create } from 'zustand'

const subNavigation = [
  {
    name: 'Go Home',
    href: '/'
  }
]

type HomeManagementState = {
  showLogo: boolean
  sideBarOpen: boolean
  subNavigation: typeof subNavigation
  setSideBarOpen: (value: boolean) => void
  setShowLogo: (value: boolean) => void
}

const useHeaderStore = create<HomeManagementState>((set) => ({
  showLogo: true,
  sideBarOpen: false,
  subNavigation: subNavigation,
  setSideBarOpen: (value) => set({ sideBarOpen: value }),
  setShowLogo: (value) => set({ showLogo: value })
}))

export default useHeaderStore
