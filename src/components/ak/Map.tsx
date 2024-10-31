'use client'
import { getCenter } from 'geolib'
import React, { useState, useEffect, useMemo } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

type Coordinate = {
  longitude: number
  latitude: number
}

function Map({ data }: { data: Array<any> }) {
  const [selectedLocation, setSelectedLocation] = useState<Coordinate | null>(
    null
  )
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 5,
    width: '100%',
    height: typeof window !== 'undefined' ? window.innerHeight * 0.7 : 700
  })

  const coordinates = data.map((result) => ({
    longitude: result.longitude,
    latitude: result.latitude
  }))

  // Center point of coordinates
  const center = useMemo(() => getCenter(coordinates), [data])

  // Update viewport center when data changes
  useEffect(() => {
    if (center) {
      setViewport((prev) => ({
        ...prev,
        latitude: center.latitude,
        longitude: center.longitude
      }))
    }
  }, [center])

  const handleViewportChange = (newViewport: any) => {
    setViewport((prev) => ({
      ...prev,
      ...newViewport
    }))
  }
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/ankit628792/cks0ivxbk1c1v17p7ar3evdja"
      mapboxApiAccessToken={
        'pk.eyJ1IjoiYW5raXQ2Mjg3OTIiLCJhIjoiY2xyNGlyODN5MHd2ZDJrbzg2NjA1eGs3YyJ9.fgdQWATO9XGIMqhi1d3tcA'
      }
      {...viewport}
      onViewportChange={handleViewportChange}
      scrollZoom={{ speed: 1.5, smooth: true }}
    >
      {data.map((item, i) => (
        <div key={i} className="relative group">
          <Marker
            longitude={item.longitude}
            latitude={item.latitude}
            offsetLeft={-10}
            offsetTop={-10}
          >
            <div
              className="w-3 h-3 bg-emerald-500 rounded-full cursor-pointer relative grid place-items-center"
              aria-label="push-pin"
              onClick={() => setSelectedLocation(item)}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 animate-ping absolute"></div>
            </div>
            {
              // selectedLocation?.longitude === item.longitude &&
              <div
                onClick={() => setSelectedLocation(null)}
                className="rounded-xl z-40 cursor-pointer transition duration-150 ease-out absolute top-5 -left-10 w-24 px-2 py-1 bg-emerald-600 hidden group-hover:block"
              >
                <p className="text-white text-xs text-center font-medium leading-none line-clamp-2">
                  {item.title}
                </p>
              </div>
            }
          </Marker>
        </div>
      ))}
    </ReactMapGL>
  )
}

export default Map
