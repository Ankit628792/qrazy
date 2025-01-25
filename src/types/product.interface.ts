export interface ICreateProduct {
    categoryId: string
    title: string
    description: string
    image: string
    productLinks: string[]
    imageUrls: string[]
}

export interface ICreateProductForm {
    title: string;
    description: string;
    mrp: number;
    mrl: number;
    links: ProductLink[];
    category: Category;
    images: ProductImage[];
    image: ProductImage;
}

export interface IUploadImageResponseData {
    signature: string;
    format: string;
    resource_type: string;
    secure_url: string;
    created_at: string;
    asset_id: string;
    version_id: string;
    type: string;
    version: number;
    url: string;
    public_id: string;
    tags: string[];
    folder: string;
    original_filename: string;
    api_key: string;
    bytes: number;
    width: number;
    etag: string;
    placeholder: boolean;
    height: number;
}

export interface IUplodImageResponse {
    success: boolean;
    message: string;
    data: IUploadImageResponseData;
}