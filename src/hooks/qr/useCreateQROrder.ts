import { showError, showSuccess } from "@/lib"
import { orderQR } from "@/services/qrs.service"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useCreateQROrder = (callback?: Function) => {
    const router = useRouter()
    return useMutation({
        mutationKey: ["orderQR"],
        mutationFn: orderQR,
        onSuccess: (res) => {
            showSuccess("QR order created successfully");
            callback && callback(res)
        },
        onError: (err) => {
            console.log(err)
            showError("Failed to create order")
        }
    })
}