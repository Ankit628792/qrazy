import CategoryService from '@/services/category.service'
import { CATEGORY_QUERY_KEYS } from '@/types/category.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateCategoryMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: CategoryService.createCategory,
        onSuccess: () => {
            console.log("Category created successfully")
            queryClient.invalidateQueries({ queryKey: [CATEGORY_QUERY_KEYS.GET_CATEGORIES] })
        },
        onError: (error) => {
            console.error("Error creating category:", error)
        },
    })
}
