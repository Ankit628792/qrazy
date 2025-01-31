import ProductService from '@/services/product.service'
import { PRODUCT_QUERY_KEYS } from '@/types/product.interface'
import { useQuery } from '@tanstack/react-query'

export const useGetProductDetail = ({ productId }: {
    productId: string
}) => {
    return useQuery({
        queryKey: [PRODUCT_QUERY_KEYS.GET_PRODUCT_BY_ID, productId],
        queryFn: () => ProductService.getProductById(productId),
    })
}