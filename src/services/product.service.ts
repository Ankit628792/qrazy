import {
    ICreateProduct,
    ICreateProductForm,
    IDraftProductForm,
    IProductListing,
    IUpdateProductForm,
    IUplodImageResponse,
    PRODUCT_STATUS
} from '@/types/product.interface'
import { get, patch, post, put, request } from './HttpService'

export const uploadImage = async (file: File | null | undefined): Promise<string> => {
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

export const createProduct = async (payload: ICreateProductForm) => {
    const { title, description, category, links, images, image, mrl, mrp } = payload
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
            productLinks: links.map(({ url }) => url).filter(Boolean),
            mrp: mrp,
            mrl: mrl,
            status: PRODUCT_STATUS.ACTIVE,
        }

        console.log('Final Payload ===>', finalPayload)

        const data = await post('/product/', finalPayload)
        return data
    } catch (error) {
        console.error('Error creating product:', error)
        throw new Error(
            'Failed to create product. Please check your inputs and try again.'
        )
    }
}

export const createProductInDraft = async (payload: IDraftProductForm) => {
    const { title, description, category, links, images, image, mrl, mrp } = payload

    try {
        // Upload primary image
        const primaryImageUrl = await uploadImage((image as ProductImage).file)

        const uploadedImageUrls = images && await Promise.all(
            images.filter(({ file }) => file).map(({ file }) => uploadImage(file))
        ) || []

        // Prepare the final payload
        const finalPayload: ICreateProduct = {
            categoryId: category && category.id as string || '',
            title,
            description: description || '',
            image: primaryImageUrl,
            imageUrls: uploadedImageUrls,
            productLinks: links && links.map(({ url }) => url).filter(Boolean) || [],
            mrp: mrp || 0,
            mrl: mrl || 0,
            status: PRODUCT_STATUS.DRAFT,
        }

        const data = await post('/product/', finalPayload)
        return data
    } catch (error) {
        console.error('Error creating product:', error)
        throw new Error(
            'Failed to create product. Please check your inputs and try again.'
        )
    }

}

// Placeholder for the updateProduct function
export const updateProduct = async (payload: IUpdateProductForm) => {
    try {
        const { id, images, ...otherData } = payload;
        const uploadedImageUrls = images && await Promise.all(
            images.filter(({ file }) => file).map(({ file }) => uploadImage(file))
        ) || []
        const previousImageUrls = images.filter(({ url }) => url).map(({ url }) => url)

        const finalImageUrls = [...uploadedImageUrls, ...previousImageUrls]

        const finalPayload = {
            categoryId: otherData.category.id as string || '',
            title: otherData.title as string,
            description: otherData.description || '',
            image: otherData.image?.url as string,
            productLinks: otherData.links && otherData.links.map(({ url }) => url).filter(Boolean) || [],
            mrp: (otherData.mrp || 0).toString(),
            mrl: (otherData.mrl || 0).toString(),
            status: PRODUCT_STATUS.ACTIVE,
        }
        const data = await put('/product/' + id, finalPayload)
        await patch('/product/image/' + id, finalImageUrls)
        return data
        // Implementation here
    } catch (error) {
        console.error('Error updating product:', error)
        throw new Error('Failed to update product. Please try again.')
    }
}

export const getProductListing = async () => {
    try {
        const data = await get('/product/')
        return data.data as IProductListing[]
    } catch (error) {
        console.error('Error fetching product listing:', error)
        throw new Error('Failed to fetch product listing. Please try again.')
    }
}
export const getProductById = async (id: string) => {
    try {
        const data = await get('/product/' + id)
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
    getProductListing,
    createProductInDraft,
    getProductById
}

export default ProductService
