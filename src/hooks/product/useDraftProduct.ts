import { showError, showSuccess } from "@/lib"
import ProductService from "@/services/product.service"
import { useMutation } from "@tanstack/react-query"

export const useDraftProductMutation = () => {
    return useMutation({
        mutationFn: ProductService.createProductInDraft,
        onSuccess: (res) => {
            console.log({ res })
            showSuccess("Product Drafted")
        },
        onError: () => {
            showError("Failed to draft product")
        }
    })
}