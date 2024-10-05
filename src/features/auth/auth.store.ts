import { create } from 'zustand'

type AuthManagementState = {
  isLoginTabActive: boolean
  setIsLoginTabActive: (isActive: boolean) => void
}

const useAuthStore = create<AuthManagementState>((set) => ({
  isLoginTabActive: true,
  setIsLoginTabActive: (isActive) => set({ isLoginTabActive: isActive })
}))

export default useAuthStore
