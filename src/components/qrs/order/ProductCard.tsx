import { cn } from "@/lib/utils"

function ProductCard({ product, className }: { product: Product, className?: string }) {
    return (
        <div className={cn('w-full flex-grow flex items-center gap-2 lg:gap-3 rounded-xl p-2 cursor-pointer bg-gray-100 dark:bg-zinc-900 relative', className)}>
            <img className='w-12 h-12 rounded-lg object-cover' src={product?.image.url || ''} alt='' />
            <div>
                <h1 className='text-base lg:text-lg font-bold'>
                    {product?.title || ''}
                </h1>
                <p className='text-xs lg:text-sm font-normal text-muted-foreground'>
                    {product?.category.name || ''}
                </p>
            </div>
        </div>
    )
}

export default ProductCard