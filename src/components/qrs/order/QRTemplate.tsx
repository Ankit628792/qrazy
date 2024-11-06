import PopUp from '@/components/ak/PopUp'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Tooltip from '@/components/ui/tooltip'
import { XIcon } from 'lucide-react'
import React, { MutableRefObject, useRef, useState } from 'react'
import { templates } from '../generate/constant'
import { QRCode } from 'react-qrcode-logo'
import { cn } from '@/lib/utils'

function QRTemplate({ title, description, onClose }: { title?: string, description?: string, onClose: () => void }) {
    const ref = useRef<QRCode>()
    const [templateId, setTemplateId] = useState<string | number>('');
    return (
        <PopUp onClose={onClose}>
            <Card className='w-full max-w-xl bg-white dark:bg-black rounded-xl relative y-translate'>
                <div className='absolute top-3 right-3 p-2 pb-0 cursor-pointer' onClick={onClose}>
                    <Tooltip title='Cancel'>
                        <XIcon />
                    </Tooltip>
                </div>
                <CardHeader>
                    <CardTitle>
                        {title || 'Choose QR template'}
                    </CardTitle>
                    <CardDescription>
                        {description || "Choose a QR template that best fits your product's needs and style."}
                    </CardDescription>
                </CardHeader>

                <CardContent className='flex flex-wrap items-center justify-center gap-5'>
                    {
                        [...templates, ...templates].map((template, i) => {
                            return (
                                <div key={i} onClick={() => setTemplateId(template.id)} className={cn('p-1 border-2', template.id === templateId ? 'border-emerald-500' : 'border-transparent')}>
                                    {/* @ts-ignore */}
                                    <QRCode
                                        size={75}
                                        value='www.qrazy.in'
                                        ref={ref as MutableRefObject<QRCode>}
                                        quietZone={5}
                                        logoOnLoad={(e) => console.log('logo loaded', e)}
                                        {...{
                                            ...template.params,
                                            eyeRadius: [ // build eyeRadius manually
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
                            )
                        })
                    }
                </CardContent>

                <CardFooter>
                    <div className='flex items-center justify-center w-full'>
                        <Button size={"lg"} className='text-white bg-amber-500 hover:bg-amber-600' onClick={() => {

                        }}>
                            <span className='text-base'>Pay Now</span>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </PopUp>
    )
}

export default QRTemplate