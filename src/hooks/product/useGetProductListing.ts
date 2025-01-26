import ProductService from '@/services/product.service'
import { PRODUCT_QUERY_KEYS } from '@/types/product.interface'
import { useQuery } from '@tanstack/react-query'

export const useGetProductListing = () => {
    return useQuery({
        queryKey: [PRODUCT_QUERY_KEYS.GET_PRODUCTS],
        queryFn: () => ProductService.getProductListing(),
    })
}