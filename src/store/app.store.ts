import { create } from 'zustand'

type AppManagementState = {}

const useAppStore = create<AppManagementState>((set) => ({}))

export default useAppStore
