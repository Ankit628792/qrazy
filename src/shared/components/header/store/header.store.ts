import { create } from 'zustand'

const navigation = [
  {
    name: 'Go Home',
    href: '/'
  }
]

const subNavigation = [
  {
    name: 'About Us',
    href: '/about-us'
  }
]

type HomeManagementState = {
  sideBarOpen: boolean
  navigation: typeof navigation
  subNavigation: typeof subNavigation
  setSideBarOpen: (value: boolean) => void
}

const useHeaderStore = create<HomeManagementState>((set) => ({
  sideBarOpen: false,
  navigation: navigation,
  subNavigation: subNavigation,
  setSideBarOpen: (value) => set({ sideBarOpen: value })
}))

export default useHeaderStore
