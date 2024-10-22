
function ProductCard({ product }: { product: Product }) {
    return (
        <div className='w-full flex-grow flex items-center gap-2 lg:gap-3 rounded-xl p-2 bg-gray-100 dark:bg-zinc-900 cursor-pointer'>
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