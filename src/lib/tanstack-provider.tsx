'use client'
import { useAdminStore } from '@/store/admin.store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'

const queryClient = new QueryClient({
    // defaultOptions: {
    //   queries: {
    //     retry: false
    //   }
    // }
})
export function TanStackProvider({ admin, children }: {
    children: React.ReactNode,
    admin: any
}) {
    const { setAdmin } = useAdminStore()
    useEffect(() => {
        setAdmin(admin)
    }, [admin])

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
