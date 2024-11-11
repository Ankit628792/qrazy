import { create } from 'zustand'

interface Loading {
    state: boolean,
    text?: string
}

interface AdminState {
    loading: Loading
    admin: any
    setAdmin: (details: any) => void
    setIntoAdmin: (details: any) => void
    setLoading: (info: Loading) => void
}

const initialState = {
    loading: {
        state: false,
    },
    admin: null
}

const useAdminStore = create<AdminState>()((set) => ({
    ...initialState,
    setAdmin: (details) => set({ admin: details, loading: { state: false } }),
    setIntoAdmin: (details) => set((state) => ({ admin: { ...state.admin, ...details } })),
    setLoading: (info: Loading) => set({ loading: { ...info, text: info.state ? info.text : "Loading..." } }),
}))


export { useAdminStore }