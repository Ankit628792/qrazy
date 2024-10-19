
interface ProductLink {
    id: number | string,
    url: string,
}

interface Category {
    id?: string | number,
    name: string,
    description: string,
}

interface ProductImage {
    id: number | string, url: string, file?: File | null
}

interface Product {
    id: number,
    title: string,
    description: string,
    mrp: number,
    mrl: number,
    links: ProductLink[],
    category: Category,
    image: ProductImage,
    images: Array<ProductImage>,
    status: "active" | "inactive" | "draft",
    created_at: Date,
    updated_at: Date,

    // additional fields
    region: string,
    scans: number
}
