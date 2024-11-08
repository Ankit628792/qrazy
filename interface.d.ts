interface Option {
  label: string
  value: string
  id: string | number
}

type ID = {
  id: string | number
}

type ProductOption = {
  id: string | number
  title: string
  category: string
  image: string
}

interface ProductLink {
  id: number | string
  url: string
}

interface Category {
  id?: string | number
  name: string
  description?: string
}

interface ProductImage {
  id: number | string
  url: string
  file?: File | null
}

interface Product {
  id: number
  title: string
  description: string
  mrp: number
  mrl: number
  links: ProductLink[]
  category: Category
  image: ProductImage
  images: Array<ProductImage>
  status: 'active' | 'inactive' | 'draft'
  created_at: Date | string
  updated_at: Date | string

  // additional fields
  region: string
  scans: number
}

interface Option {
  label: string
  value: string
  id: string | number
}

interface ScanRow {
  id: number | string
  title: string
  description: string
  category: Category
  image: ProductImage

  username?: string
  region?: string
  reward?: string | number
  created_at?: Date | string
}


interface QROrder {
  id?: number | string
  quantity?: number
  expiryDate?: Date | undefined
  mrl?: string | number
  selectedProduct?: Product | undefined | null
}