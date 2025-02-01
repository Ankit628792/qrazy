import { getOrderHistory } from "@/services/qrs.service"
import { useQuery } from "@tanstack/react-query"

export const useGetOrderHistory = () => {
    return useQuery({
        queryKey: ["orderHistory"],
        queryFn: () => getOrderHistory(),
        retry: false,
    })
}