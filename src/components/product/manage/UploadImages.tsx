import SaveOptions from '@/components/ak/SaveOptions'
import { useClickOutside } from '@/lib';
import { cn } from '@/lib/utils';
import { FileIcon, ImagePlus } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'

type ProductImage = {
    id: number | string, url: string, file?: File | null
}

function UploadImages() {
    const [images, setImages] = useState<Array<ProductImage>>(Array(4).fill(1).map((_, i) => ({
        id: i,
        url: '',
        file: null
    })))
    const [image, setImage] = useState<ProductImage>({ id: "", url: "", file: null })
    const ref = useRef(null);
    const outerRef = useRef(null);
    useClickOutside(() => { console.log("clicked outside") }, ref, outerRef);


    const handleImageChange = (i: number, file: File) => {
        let arr = [...images];
        arr[i].url = URL.createObjectURL(file);
        arr[i].file = file
        setImages(arr);
    }
    return (
        <div className='manage-product-element flex-grow lg:flex-grow-0' ref={outerRef}>
            <div className='px-2 flex items-center justify-between'>
                <h1 className='input-wrapper-title'>Upload Images</h1>
                <SaveOptions onSave={() => { }} onCancel={() => { }} />
            </div>
            <div className='input-wrapper'>
                <div className='w-full aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-900 rounded-lg grid place-items-center'>
                    <FileUploader
                        handleChange={(file: File) => setImage({ ...image, url: URL.createObjectURL(file), file: file })}
                        name="logo"
                        types={["jpg", "JPG", "png", "PNG", "jpeg", "JPEG"]}
                        children={
                            <>
                                {
                                    image.url ?
                                        <img src={image.url} alt="" className='w-full h-full rounded-lg object-contain' /> :
                                        <div className='text-center'>
                                            <ImagePlus className='transform scale-[3] opacity-5 mx-auto' />
                                            <p className='opacity-15 font-medium text-xs mt-8 text-center'>Only jpg, jpeg and png</p>
                                        </div>
                                }
                            </>
                        }
                    />
                </div>
            </div>
            <div className={cn('bg-white dark:bg-black p-4 pb-3 rounded-2xl flex gap-2 sm:gap-4 items-center justify-center overflow-x-auto file-input-wrapper')} ref={ref}>
                {
                    images.map((image, i) => (
                        <React.Fragment key={i}>
                            <FileUploader
                                handleChange={(file: File) => handleImageChange(i, file)}
                                name="logo"
                                types={["jpg", "JPG", "png", "PNG", "jpeg", "JPEG"]}
                                children={<>
                                    <div key={image.id} className='w-20 h-20 overflow-hidden bg-gray-100 dark:bg-zinc-900 rounded-lg grid place-items-center'>
                                        {
                                            image.url ?
                                                <img src={image.url} alt="" className='w-full h-full rounded-lg object-contain' /> :
                                                <ImagePlus className='opacity-5' />
                                        }
                                    </div>
                                </>}
                            />
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default UploadImages