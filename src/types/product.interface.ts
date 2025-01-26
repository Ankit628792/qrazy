export enum PRODUCT_STATUS {
    DRAFT = 'draft',
    ACTIVE = 'active',
}

export interface ICreateProduct {
    categoryId: string
    title: string
    description: string
    image: string
    productLinks: string[]
    imageUrls: string[]
    mrp: number
    mrl: number
    status: PRODUCT_STATUS
}

export interface IDraftProductForm {
    title: string;
    image: ProductImage | null;
    description?: string;
    mrp?: number;
    mrl?: number;
    links?: ProductLink[];
    category?: Category;
    images?: ProductImage[];
}


export interface ICreateProductForm {
    title: string;
    description: string;
    mrp: number;
    mrl: number;
    links: ProductLink[];
    category: Category;
    images: ProductImage[];
    image: ProductImage | null;
}
export interface IUpdateProductForm extends ICreateProductForm {
    id: string;
    status: string;
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

// LISTING PAGE
export enum PRODUCT_QUERY_KEYS {
    GET_PRODUCTS = 'GET_PRODUCTS',
}

export interface IProductListing {
    id: string;
    category: Category;
    name: string;
    description: string;
    image: string;
    productLinks: string[];
    images: ProductImage[];
    createdAt: string;
    updatedAt: string;
    status: PRODUCT_STATUS;
    mrp: number;
    mrl: number;
    region: string;
    scans: number;
}