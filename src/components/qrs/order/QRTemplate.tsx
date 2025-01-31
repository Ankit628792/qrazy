
import React, { useRef } from 'react'
import { QRTemplates } from '../generate/constant';
import { cn } from '@/lib/utils';
import { QRCode } from 'react-qrcode-logo';
import { MoveLeft, MoveRight } from 'lucide-react';

function QRTemplate({
    initial, onChange
}: {
    initial: string;
    onChange: (item: string, cb: Function) => void;
}) {
    const [templateId, setTemplateId] = React.useState(initial);
    // Create a reference to the scrollable container
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Function to scroll right by a specific amount
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    // Function to scroll left by a specific amount
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const handleChange = (id: string) => {

        onChange(id, () => setTemplateId(id));
    }


    return (
        <div className=' glass-base rounded-xl p-3 flex-grow overflow-x-auto flex flex-col gap-2 justify-between'>
            <div className='flex items-center justify-between'>
                <h2 className='text-lg font-medium'>QR Template</h2>
                <div className='flex items-center gap-4 pr-3'>
                    <MoveLeft onClick={scrollLeft} className='cursor-pointer opacity-50 hover:opacity-90' />
                    <MoveRight onClick={scrollRight} className='cursor-pointer opacity-50 hover:opacity-90' />
                </div>
            </div>
            <div ref={scrollContainerRef} className='flex overflow-x-auto scroll-hidden items-center justify-start gap-4'>
                {
                    [...QRTemplates].map((template, i) => {
                        return (
                            <div key={i} onClick={() => handleChange(template.id)} className={cn('p-1 border-2 rounded-lg', template.id === templateId ? 'border-emerald-500' : 'border-transparent')}>
                                <div className='rounded-md overflow-hidden'>
                                    {/* @ts-ignore */}
                                    <QRCode
                                        size={100}
                                        value='www.qrazy.in'
                                        quietZone={4}
                                        {...{
                                            ...template.params,
                                            eyeRadius: [
                                                {
                                                    outer: [template.params.eyeradius_0_outer_0, template.params.eyeradius_0_outer_1, template.params.eyeradius_0_outer_2, template.params.eyeradius_0_outer_3],
                                                    inner: [template.params.eyeradius_0_inner_0, template.params.eyeradius_0_inner_1, template.params.eyeradius_0_inner_2, template.params.eyeradius_0_inner_3],
                                                },
                                                {
                                                    outer: [template.params.eyeradius_1_outer_0, template.params.eyeradius_1_outer_1, template.params.eyeradius_1_outer_2, template.params.eyeradius_1_outer_3],
                                                    inner: [template.params.eyeradius_1_inner_0, template.params.eyeradius_1_inner_1, template.params.eyeradius_1_inner_2, template.params.eyeradius_1_inner_3],
                                                },
                                                {
                                                    outer: [template.params.eyeradius_2_outer_0, template.params.eyeradius_2_outer_1, template.params.eyeradius_2_outer_2, template.params.eyeradius_2_outer_3],
                                                    inner: [template.params.eyeradius_2_inner_0, template.params.eyeradius_2_inner_1, template.params.eyeradius_2_inner_2, template.params.eyeradius_2_inner_3],
                                                }
                                            ],
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default QRTemplate