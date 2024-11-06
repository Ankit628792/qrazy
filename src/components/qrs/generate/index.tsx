'use client'
import React, { MutableRefObject, useRef, useState } from 'react';
import { InputField } from './InputField';
import { QRCode } from 'react-qrcode-logo';
import { SelectField } from './SelectField';
import { TextArea } from './TextArea';
import { ImageUploadField } from './ImageUploadField';
import { CheckboxField } from './CheckboxField';
import ReactJson from 'react-json-view';
import { Button } from '@/components/ui/button';

const QRGenerate = () => {
    const [state, setState] = useState<{ [key: string]: any }>({
        value: "www.qrazy.com"
    });
    const ref = useRef<QRCode>()

    const handleChange = ({ target }: any) => {
        setState(prevState => ({ ...prevState, [target.name]: target.value }))
    }

    const handleDownload = () => {
        ref.current?.download()
    }

    const buildEyeRadiusInput = (id: string) => {
        return <InputField
            name={id}
            type='range'
            handleChange={handleChange}
            min={0}
            max={50}
            hideLabel
            defaultValue={(state as any)[id]}
        />
    };

    return (
        <div className='app'>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', flex: 1 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '15px', flex: 1 }}>
                            <TextArea
                                name='value'
                                value={state.value || ''}
                                handleChange={handleChange}
                            />
                            <SelectField
                                name='ecLevel'
                                options={['L', 'M', 'Q', 'H']}
                                handleChange={handleChange}
                            />
                            <CheckboxField
                                name='enableCORS'
                                handleChange={handleChange}
                            />
                            <InputField
                                name='size'
                                type='range'
                                handleChange={handleChange}
                                min={100}
                                max={300}
                            />
                            <InputField
                                name='quietZone'
                                type='range'
                                handleChange={handleChange}
                                min={10}
                                max={100}
                            />
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '4px', justifyContent: 'space-around' }}>
                                <InputField
                                    name='bgColor'
                                    type='color'
                                    defaultValue='#ffffff'
                                    handleChange={handleChange}
                                />
                                <InputField
                                    name='fgColor'
                                    type='color'
                                    defaultValue='#000000'
                                    handleChange={handleChange}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '15px', flex: 1 }}>
                            <ImageUploadField
                                name='logoImage'
                                handleChange={handleChange}
                            />
                            <InputField
                                name='logoWidth'
                                type='range'
                                handleChange={handleChange}
                                min={20}
                                max={500}
                            />
                            <InputField
                                name='logoHeight'
                                type='range'
                                handleChange={handleChange}
                                min={20}
                                max={500}
                            />
                            <InputField
                                name='logoOpacity'
                                type='range'
                                handleChange={handleChange}
                                min={0}
                                max={1}
                                step={0.1}
                                defaultValue={1}
                            />
                            <SelectField
                                name='qrStyle'
                                options={['squares', 'dots', 'fluid']}
                                handleChange={handleChange}
                            />
                            <CheckboxField
                                name='removeQrCodeBehindLogo'
                                handleChange={handleChange}
                            />
                            <InputField
                                name='logoPadding'
                                type='range'
                                handleChange={handleChange}
                                min={0}
                                max={20}
                                step={1}
                                defaultValue={0}
                            />
                            <SelectField
                                name='logoPaddingStyle'
                                options={['square', 'circle']}
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2'>

                        <div style={{ padding: '15px' }}>
                            <p>eyeRadius</p>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: 40 }}>
                                <div className='flex-1'>
                                    <p style={{ fontSize: 14 }}>Top left eye</p>
                                    <p style={{ fontSize: 12 }}>Outer</p>
                                    {buildEyeRadiusInput('eyeradius_0_outer_0')}
                                    {buildEyeRadiusInput('eyeradius_0_outer_1')}
                                    {buildEyeRadiusInput('eyeradius_0_outer_2')}
                                    {buildEyeRadiusInput('eyeradius_0_outer_3')}
                                    <p style={{ fontSize: 12 }}>Inner</p>
                                    {buildEyeRadiusInput('eyeradius_0_inner_0')}
                                    {buildEyeRadiusInput('eyeradius_0_inner_1')}
                                    {buildEyeRadiusInput('eyeradius_0_inner_2')}
                                    {buildEyeRadiusInput('eyeradius_0_inner_3')}
                                </div>
                                <div className='flex-1'>
                                    <p style={{ fontSize: 14 }}>Top right eye</p>
                                    <p style={{ fontSize: 12 }}>Outer</p>
                                    {buildEyeRadiusInput('eyeradius_1_outer_0')}
                                    {buildEyeRadiusInput('eyeradius_1_outer_1')}
                                    {buildEyeRadiusInput('eyeradius_1_outer_2')}
                                    {buildEyeRadiusInput('eyeradius_1_outer_3')}
                                    <p style={{ fontSize: 12 }}>Inner</p>
                                    {buildEyeRadiusInput('eyeradius_1_inner_0')}
                                    {buildEyeRadiusInput('eyeradius_1_inner_1')}
                                    {buildEyeRadiusInput('eyeradius_1_inner_2')}
                                    {buildEyeRadiusInput('eyeradius_1_inner_3')}
                                </div>
                                <div className='flex-1'>
                                    <p style={{ fontSize: 14 }}>Bottom left eye</p>
                                    <p style={{ fontSize: 12 }}>Outer</p>
                                    {buildEyeRadiusInput('eyeradius_2_outer_0')}
                                    {buildEyeRadiusInput('eyeradius_2_outer_1')}
                                    {buildEyeRadiusInput('eyeradius_2_outer_2')}
                                    {buildEyeRadiusInput('eyeradius_2_outer_3')}
                                    <p style={{ fontSize: 12 }}>Inner</p>
                                    {buildEyeRadiusInput('eyeradius_2_inner_0')}
                                    {buildEyeRadiusInput('eyeradius_2_inner_1')}
                                    {buildEyeRadiusInput('eyeradius_2_inner_2')}
                                    {buildEyeRadiusInput('eyeradius_2_inner_3')}
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '15px', flex: 1 }}>
                            <p>eyeColor</p>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div>
                                    <p style={{ fontSize: 14 }}>Top left eye</p>
                                    <p style={{ fontSize: 12 }}>Outer</p>
                                    <InputField
                                        name='eyecolor_0_outer'
                                        type='color'
                                        defaultValue={state.fgColor ?? '#000000'}
                                        handleChange={handleChange}
                                        hideLabel={true}
                                    />
                                    <p style={{ fontSize: 12 }}>Inner</p>
                                    <InputField
                                        name='eyecolor_0_inner'
                                        type='color'
                                        defaultValue={state.fgColor ?? '#000000'}
                                        handleChange={handleChange}
                                        hideLabel={true}
                                    />
                                </div>
                                <div>
                                    <p style={{ fontSize: 14 }}>Top right eye</p>
                                    <p style={{ fontSize: 12 }}>Outer</p>
                                    <InputField
                                        name='eyecolor_1_outer'
                                        type='color'
                                        defaultValue={state.fgColor ?? '#000000'}
                                        handleChange={handleChange}
                                        hideLabel={true}
                                    />
                                    <p style={{ fontSize: 12 }}>Inner</p>
                                    <InputField
                                        name='eyecolor_1_inner'
                                        type='color'
                                        defaultValue={state.fgColor ?? '#000000'}
                                        handleChange={handleChange}
                                        hideLabel={true}
                                    />
                                </div>
                                <div>
                                    <p style={{ fontSize: 14 }}>Bottom left eye</p>
                                    <p style={{ fontSize: 12 }}>Outer</p>
                                    <InputField
                                        name='eyecolor_2_outer'
                                        type='color'
                                        defaultValue={state.fgColor ?? '#000000'}
                                        handleChange={handleChange}
                                        hideLabel={true}
                                    />
                                    <p style={{ fontSize: 12 }}>Inner</p>
                                    <InputField
                                        name='eyecolor_2_inner'
                                        type='color'
                                        defaultValue={state.fgColor ?? '#000000'}
                                        handleChange={handleChange}
                                        hideLabel={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div style={{
                    width: 400,
                    height: 500,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // border: '1px solid #ffcfdc',
                    borderRadius: '50px',
                    // backgroundColor: '#ffcfdc',
                    flexDirection: 'column'
                }} className='glass-base'>
                    <QRCode
                        ref={ref as MutableRefObject<QRCode>}
                        logoOnLoad={(e) => console.log('logo loaded', e)}
                        {...{
                            ...state,
                            eyeRadius: [ // build eyeRadius manually
                                {
                                    outer: [state.eyeradius_0_outer_0, state.eyeradius_0_outer_1, state.eyeradius_0_outer_2, state.eyeradius_0_outer_3],
                                    inner: [state.eyeradius_0_inner_0, state.eyeradius_0_inner_1, state.eyeradius_0_inner_2, state.eyeradius_0_inner_3],
                                },
                                {
                                    outer: [state.eyeradius_1_outer_0, state.eyeradius_1_outer_1, state.eyeradius_1_outer_2, state.eyeradius_1_outer_3],
                                    inner: [state.eyeradius_1_inner_0, state.eyeradius_1_inner_1, state.eyeradius_1_inner_2, state.eyeradius_1_inner_3],
                                },
                                {
                                    outer: [state.eyeradius_2_outer_0, state.eyeradius_2_outer_1, state.eyeradius_2_outer_2, state.eyeradius_2_outer_3],
                                    inner: [state.eyeradius_2_inner_0, state.eyeradius_2_inner_1, state.eyeradius_2_inner_2, state.eyeradius_2_inner_3],
                                }
                            ],
                            eyeColor: [ // build eyeColor manually
                                {
                                    outer: state.eyecolor_0_outer ?? state.fgColor ?? '#000000',
                                    inner: state.eyecolor_0_inner ?? state.fgColor ?? '#000000'
                                },
                                {
                                    outer: state.eyecolor_1_outer ?? state.fgColor ?? '#000000',
                                    inner: state.eyecolor_1_inner ?? state.fgColor ?? '#000000'
                                },
                                {
                                    outer: state.eyecolor_2_outer ?? state.fgColor ?? '#000000',
                                    inner: state.eyecolor_2_inner ?? state.fgColor ?? '#000000'
                                },
                            ]
                        }}
                    />
                    <Button type='button' onClick={handleDownload} style={{ margin: '20px' }}>
                        Download QR Code
                    </Button>
                </div>
            </div>
            <div style={{ marginLeft: '15px' }}>
                <p>State snapshot (Click Copy icon to copy styles)</p>
                <ReactJson src={state} style={{ marginBottom: 40, filter: 'invert(1)', fontSize: 16 }} />
            </div>

        </div>
    );
}

export default QRGenerate;

