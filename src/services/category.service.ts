import { IGetCategory } from '@/types/category.interface'
import { get } from './HttpService'

const getCategory = async () => {
    try {
        const response = await get(`/category/`)
        return response.data as IGetCategory[]
    } catch (error) {
        console.error('Error fetching product', error)
    }
}

const createCategory = async (data: any) => { }

const CategoryService = {
    getCategory,
    createCategory
}

export default CategoryService
