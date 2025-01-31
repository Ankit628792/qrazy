import { showError, showSuccess } from "@/lib"
import ProductService from "@/services/product.service"
import { useMutation } from "@tanstack/react-query"

export const useUpdateProductMutation = () => {
    return useMutation({
        mutationFn: ProductService.updateProduct,
        onSuccess: () => {
            showSuccess("Product Details Updated")
        },
        onError: () => {
            showError("Failed to update product details")
        }
    })
}