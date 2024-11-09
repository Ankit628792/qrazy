import { create } from 'zustand'

interface AdminState {
    admin: any
    setAdmin: (details: any) => void
    setIntoAdmin: (details: any) => void
}

const initialState = {
    admin: null
}

const useAdminStore = create<AdminState>()((set) => ({
    ...initialState,
    setAdmin: (details) => set({ admin: details }),
    setIntoAdmin: (details) => set((state) => ({ admin: { ...state.admin, ...details } }))
}))


export { useAdminStore }