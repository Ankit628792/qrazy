import { CreateCategory, IGetCategory } from '@/types/category.interface'
import { get, post } from './HttpService'

const getCategory = async () => {
    try {
        const response = await get(`/category/`)
        return response.data as IGetCategory[]
    } catch (error) {
        console.error('Error fetching product', error)
    }
}

const createCategory = async (
    createCategoryPayload: CreateCategory
) => {
    const url = `/category/${createCategoryPayload.name}`
    try {
        const response = await post(url, createCategoryPayload)
        return response.data
    } catch (error) {
        console.error('Error creating category', error)
    }
}

const CategoryService = {
    getCategory,
    createCategory
}

export default CategoryService
