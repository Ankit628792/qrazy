
import { getProductById } from '@/services/product.service'

export async function getProductDetails(productId: string) {
    try {
        const data = await getProductById(productId);
        return data || null
    } catch (error) {
        return null;
    }


}