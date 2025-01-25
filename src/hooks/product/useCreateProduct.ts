import ProductService from "@/services/product.service"
import { ICreateProductForm } from "@/types/product.interface"
import { useMutation } from "@tanstack/react-query"

export const useCreateProductMutation = () => {
    return useMutation({
        mutationFn: (createProductPayload: ICreateProductForm) => {
            return ProductService.createProduct(createProductPayload)
        },
        onSuccess: () => {
        },
        onError: () => { }
    })
}