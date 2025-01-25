import {
    ICreateProduct,
    ICreateProductForm,
    IProductListing,
    IUplodImageResponse
} from '@/types/product.interface'
import { request } from './HttpService'

const uploadImage = async (file: File | null | undefined): Promise<string> => {
    if (!file) {
        throw new Error('No file provided')
    }

    try {
        const formData = new FormData()
        formData.append('image', file)

        const {
            data
        }: {
            data: IUplodImageResponse
        } = await request.post('/image/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        return data.data.secure_url
    } catch (error) {
        console.error('Error uploading image:', error)
        throw new Error('Failed to upload image. Please try again.')
    }
}

const createProduct = async (payload: ICreateProductForm) => {
    const { title, description, category, links, images, image } = payload
    console.log({ "first": 'createProduct', payload })

    try {
        // Upload primary image
        const primaryImageUrl = await uploadImage((image as ProductImage).file)

        const uploadedImageUrls = await Promise.all(
            images.filter(({ file }) => file).map(({ file }) => uploadImage(file))
        )

        // Prepare the final payload
        const finalPayload: ICreateProduct = {
            categoryId: category.id as string,
            title,
            description,
            image: primaryImageUrl,
            imageUrls: uploadedImageUrls,
            productLinks: links.map(({ url }) => url).filter(Boolean)
        }

        console.log('Final Payload ===>', finalPayload)

        const { data } = await request.post('/product/', finalPayload)
        return data
    } catch (error) {
        console.error('Error creating product:', error)
        throw new Error(
            'Failed to create product. Please check your inputs and try again.'
        )
    }
}

// Placeholder for the updateProduct function
const updateProduct = async (product: Product) => {
    try {
        // Implementation here
    } catch (error) {
        console.error('Error updating product:', error)
        throw new Error('Failed to update product. Please try again.')
    }
}

const getProdustListing = async () => {
    try {
        const { data } = await request.get('/product/')
        return data.data as IProductListing[]
    } catch (error) {
        console.error('Error fetching product listing:', error)
        throw new Error('Failed to fetch product listing. Please try again.')
    }
}

// Export the ProductService
const ProductService = {
    createProduct,
    updateProduct,
    uploadImage,
    getProdustListing
}

export default ProductService
