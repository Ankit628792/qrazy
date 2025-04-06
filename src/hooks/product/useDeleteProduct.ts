import { showError, showSuccess } from "@/lib"
import { deleteProduct } from "@/services/product.service"
import { PRODUCT_QUERY_KEYS } from "@/types/product.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_QUERY_KEYS.GET_PRODUCTS] })
            showSuccess("Product Deleted successfully")
        },
        onError: () => {
            showError("Failed to delete product")
        }
    })
}