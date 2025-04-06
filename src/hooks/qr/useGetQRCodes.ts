import { getOrderDetails, getOrderHistory, getQrCodeList, ITransactionId } from "@/services/qrs.service"
import { useQuery } from "@tanstack/react-query"

export const useGetQRCodes = ({ orderId }: { orderId: string }) => {
    return useQuery({
        queryKey: ["orderDetail"],
        queryFn: () => getQrCodeList({ orderId }),
        retry: false,
    })
}