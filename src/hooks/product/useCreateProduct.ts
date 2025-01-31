import { showError, showSuccess } from "@/lib"
import ProductService from "@/services/product.service"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useCreateProductMutation = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: ProductService.createProduct,
        onSuccess: () => {
            showSuccess("Product created successfully")
            router.push("/products/listing")
        },
        onError: () => {
            showError("Failed to create product")
        }
    })
}