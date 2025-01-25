import CategoryService from '@/services/category.service'
import { CATEGORY_QUERY_KEYS } from '@/types/category.interface'
import { useQuery } from '@tanstack/react-query'

export const useGetCategory = () => {
    return useQuery({
        queryKey: [CATEGORY_QUERY_KEYS.GET_CATEGORIES],
        queryFn: () => CategoryService.getCategory(),
    })
}