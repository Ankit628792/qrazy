import { ICreateProduct, ICreateProductForm, IUplodImageResponse } from "@/types/product.interface"
import { post } from "./HttpService";

const uploadImage = async (file: File | null | undefined) => {
    const formData = new FormData();
    formData.append("image", file as File);
    const response = await post("/image/upload")
    return response.data as IUplodImageResponse
};

const createProduct = async (createProductPayload: ICreateProductForm) => {
    const { title, description, category, links, images, image } = createProductPayload;

    const uploadedImageUrls = await Promise.all(
        images.filter((img) => img.file).map((img) => uploadImage(img.file))
    );

    const primaryImageUrl = await uploadImage(image.file)

    const finalPayload = {
        categoryId: category.id,
        title,
        description,
        image: primaryImageUrl,
        imageUrls: uploadedImageUrls,
        productLinks: links.map((link) => link.url).filter(Boolean),
    };

    console.log("finalPayload ====>", finalPayload)
}

const updateProduct = async (product: Product) => { }

const ProductService = {
    createProduct,
    updateProduct,
    uploadImage
}

export default ProductService