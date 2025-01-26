import { cn } from "@/lib/utils"
import moment from "moment"

function ScannedProduct({ product, className }: { product: Product, className?: string }) {
    return (
        <div className={cn('w-full flex-grow flex items-start gap-2 lg:gap-3 rounded-xl p-2 cursor-pointer bg-gray-100 dark:bg-zinc-900 relative', className)}>
            <img className='w-12 h-12 rounded-lg object-cover' src={product?.image.url || ''} alt='' />
            <div>
                <h1 className='text-base font-bold'>
                    {product?.title || ''}
                </h1>
                <p className='text-xs font-normal text-muted-foreground'>
                    {product?.category.name || ''}
                </p>
            </div>
            <span className="absolute bottom-1 right-2 text-xs text-gray-500">Scanned {moment().subtract(2, 'm').fromNow()}</span>
        </div>
    )
}

export default ScannedProduct