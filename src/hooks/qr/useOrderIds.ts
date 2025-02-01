import { useParams } from "next/navigation"

export const useOrderIds = () => {
    const params = useParams();
    return params.invoiceId as string;
}