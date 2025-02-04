import { getOrderDetails, ITransactionId } from "@/services/qrs.service"
import { useQuery } from "@tanstack/react-query"

export const useGetOrderDetail = (data: ITransactionId) => {
    return useQuery({
        queryKey: ["orderDetail", JSON.stringify(data)],
        queryFn: () => getOrderDetails(data),
        retry: false,
        enabled: Boolean(Object.values(data).length)
    })
}