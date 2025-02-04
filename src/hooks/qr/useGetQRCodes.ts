import { getQRCodes } from "@/services/qrs.service"
import { useQuery } from "@tanstack/react-query"

export const useGetQrCodes = ({ orderId }: { orderId: string }) => {
    return useQuery({
        queryKey: ["orderDetail", orderId],
        queryFn: () => getQRCodes(orderId),
        retry: false,
        enabled: false
    })
}