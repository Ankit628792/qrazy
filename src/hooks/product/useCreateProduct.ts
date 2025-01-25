import ProductService from "@/services/product.service"
import { useMutation } from "@tanstack/react-query"

export const useCreateProductMutation = () => {
    return useMutation({
        mutationFn: ProductService.createProduct,
        onSuccess: () => {
            console.log("Product created successfully")
        },
        onError: () => { }
    })
}