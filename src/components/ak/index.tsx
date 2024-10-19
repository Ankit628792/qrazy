// Rough  Work


const ProductRow = ({ product }: any) => {
    return (
        <tr className='text-center'>
            <td className='!w-16 bg-black'>
                <div className='w-12 lg:w-14 aspect-square shrink-0 rounded-lg overflow-hidden'>
                    <img className='w-full h-full object-cover' src={product.image.url} alt="" />
                </div>
            </td>
            <td className='text-start min-w-40'>
                <h1 className='sm:text-base lg:text-lg font-semibold opacity-90 line-clamp-1'>{product.title}</h1>
                <p className='!line-clamp-1 text-xs hidden md:block font-light tracking-wide text-gray-500 py-0.5'>{product.description}</p>
            </td>
            <td className='min-w-24 w-40'>
                <p className='line-clamp-2'>{product.category.name}</p>
            </td>
            <td className='min-w-24 w-24'>
                <span className='py-0.5 px-2 bg-rose-500 rounded-full text-xs'>
                    {product.status}
                </span>
            </td>
            <td className={'min-w-32 w-32'}>{product.region}</td>
            <td className='min-w-24 w-28'>{product.scans}</td>
            <td className='min-w-24 w-28'>{moment(product.created_at).format('DD/MM/YYYY')}</td>
            <td className='min-w-24 w-28'>{moment(product.updated_at).format('DD/MM/YYYY')}</td>
            <td>
                {/* <MoreOption id={"2"} /> */}
            </td>
        </tr>
    )
}