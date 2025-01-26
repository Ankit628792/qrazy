import ProductService from "@/services/product.service"
import { useMutation } from "@tanstack/react-query"

export const useDraftProductMutation = () => {
    return useMutation({
        mutationFn: ProductService.createProductInDraft,
        onSuccess: () => {
            console.log("Product created as draft")
        },
        onError: () => { }
    })
}