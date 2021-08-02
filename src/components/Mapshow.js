import React from 'react';
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './Mapshow.css'
import { showDataOnMap } from './utils';

const Mapshow = ({ mapCountries, casesType, center, zoom }) => {
    return (
        <div className='map'>
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(mapCountries, casesType)}
            </LeafletMap>
        </div>
    )
}

export default Mapshow
