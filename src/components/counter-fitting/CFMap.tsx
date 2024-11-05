"use client"
import { MapPin } from 'lucide-react'
import React, { useState } from 'react'
import { Marker } from 'react-map-gl'
import MapWrapper from '../ak/MapWrapper'

type Coordinate = {
    longitude: number,
    latitude: number
}

function CFMap({ data }: { data: Array<any> }) {
    const [selectedLocation, setSelectedLocation] = useState<Coordinate | null>(null);

    return (
        <MapWrapper data={data}>
            {
                data.map((item, i) => (
                    <div key={i} className='relative group'>
                        <Marker longitude={item.longitude} latitude={item.latitude} offsetLeft={-10} offsetTop={-10}>
                            <div className="w-3 h-3 bg-rose-500 rounded-full cursor-pointer relative grid place-items-center"
                                aria-label="push-pin"
                                onClick={() => setSelectedLocation(item)}
                            >
                                <div className='w-6 h-6 rounded-full bg-rose-500 animate-ping absolute'></div>
                            </div>
                            {
                                selectedLocation?.longitude === item.longitude &&
                                <div onClick={() => setSelectedLocation(null)} className='glass-base rounded-xl z-40 cursor-pointer absolute -top-36 -left-[9.65rem] p-2 w-80 shrink-0 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 ease-out'>
                                    <div className='triangle-down absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-10 h-10 glass-base'></div>
                                    <div className='bg-white dark:bg-black w-full rounded-lg p-3'>
                                        <div className='flex justify-between'>
                                            <div className='flex items-center gap-2'>
                                                <img className='w-11 h-11 rounded-full object-cover border' src={'https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01'} alt={item.title} />
                                                <div>
                                                    <h1 className='text-base font-medium'>{item.title}</h1>
                                                    <p className='text-xs text-gray-500 font-light'>{"Category"}</p>
                                                </div>
                                            </div>

                                            <div className='text-right'>
                                                {/* <p className='text-base font-medium'>$76.20</p> */}
                                                <h3 className='text-sm'>Md. Devender</h3>
                                                <p className='text-xs text-gray-500'>Reported by</p>
                                            </div>
                                        </div>

                                        <div className='flex items-center justify-between text-sm mt-3'>
                                            <div className='flex items-center gap-1'>
                                                <MapPin className='w-4' />
                                                <span>{item.title}</span>
                                            </div>

                                            <p className='text-gray-500 italic text-xs'>
                                                2 minutes ago
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </Marker>
                    </div>
                ))
            }
        </MapWrapper>
    );
}

export default CFMap;
