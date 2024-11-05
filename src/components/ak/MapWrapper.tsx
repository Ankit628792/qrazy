"use client"
import { getCenter } from 'geolib'
import React, { useState, useEffect, useMemo } from 'react'
import ReactMapGL from 'react-map-gl'

function MapWrapper({ data, children }: { data: Array<any>, children: React.ReactNode }) {
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 5,
        width: '100%',
        height: typeof window !== 'undefined' ? window.innerHeight * 0.7 : 700
    });

    const coordinates = data.map((result) => ({
        longitude: result.longitude,
        latitude: result.latitude
    }));

    // Center point of coordinates
    const center = useMemo(() => getCenter(coordinates), [data]);

    // Update viewport center when data changes
    useEffect(() => {
        if (center) {
            setViewport((prev) => ({
                ...prev,
                latitude: center.latitude,
                longitude: center.longitude,
            }));
        }
    }, [center]);

    const handleViewportChange = (newViewport: any) => {
        setViewport((prev) => ({
            ...prev,
            ...newViewport
        }));
    };

    return (
        <ReactMapGL
            mapStyle='mapbox://styles/ankit628792/cks0ivxbk1c1v17p7ar3evdja'
            mapboxApiAccessToken={'pk.eyJ1IjoiYW5raXQ2Mjg3OTIiLCJhIjoiY2xyNGlyODN5MHd2ZDJrbzg2NjA1eGs3YyJ9.fgdQWATO9XGIMqhi1d3tcA'}
            {...viewport}
            onViewportChange={handleViewportChange}
            scrollZoom={{ speed: 1.5, smooth: true }}
            maxZoom={13}
        >
            {children}
        </ReactMapGL>
    );
}

export default MapWrapper;
