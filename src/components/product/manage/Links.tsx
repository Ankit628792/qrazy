import SaveOptions from '@/components/ak/SaveOptions'
import { Input } from '@/components/ui/input'
import { getFavicon } from '@/lib';
import { Link } from 'lucide-react'
import React, { useState } from 'react'

function Links() {
    const [links, setLinks] = useState<ProductLink[]>(Array(5).fill(1).map((_, i) => ({ id: i, url: "" })));

    const handleChange = (i: number, value: string) => {
        let arr: ProductLink[] = [...links];
        arr[i].url = value;
        setLinks(arr);
    }

    return (
        <div className='manage-product-element'>
            <div className='px-2 flex items-center justify-between'>
                <h1 className='input-wrapper-title'>Product Links</h1>
                <SaveOptions onSave={() => { }} onCancel={() => { }} />
            </div>
            <div className='input-wrapper'>
                {
                    links.map((link, i) => {
                        let favicon = getFavicon(link.url)
                        return (
                            <div key={link.id} className='w-full flex items-center gap-2'>
                                <div className='w-10 h-10 rounded-lg p-0.5 bg-gray-100 dark:bg-zinc-900 grid place-items-center'>
                                    {
                                        favicon ?
                                            <img src={favicon} onError={(e) => { e.currentTarget.src = "/website.png" }} className='w-full h-full rounded-lg object-contain' alt="" /> :
                                            <Link className='w-full' />
                                    }
                                </div>
                                <Input value={link.url} onChange={(e) => handleChange(i, e.target.value)} placeholder='Paste your link here' className='py-5 2xl:text-base' />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Links