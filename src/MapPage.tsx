// src/pages/MapPage.tsx
import React, { useState } from 'react';
import Map, { NavigationControl, GeolocateControl } from 'react-map-gl';
import { MapDrawControlComponent } from './components/custom/MapDrawControl';
import maplibregl from 'maplibre-gl';

// O'rta Osiyo uchun standart koordinatalar
const initialViewState = {
  longitude: 69.2797,
  latitude: 41.3111,
  zoom: 12,
  bearing: 0,
  pitch: 0,
};

// MapLibre'ni Mapbox telemetriyasiz ishlatish uchun Map komponentini sozlash
const MapComponent = (props: any) => {
    // Mapbox GL Draw ning Mapbox API ga ulanishini oldini olamiz
    const MapboxTokenBypass = {
        ...maplibregl,
        // Mapbox GL Draw ning telemetriya yuborish urinishini o'chiradi
        setRTLTextPlugin: (url: string, callback: any) => { /* do nothing */ }, 
        // Tokensiz Stadia Maps serveriga yo'naltiramiz
        baseApiUrl: 'https://tiles.stadiamaps.com', 
    };

    return <Map {...props} mapLib={MapboxTokenBypass} />;
};


export const MapPage: React.FC = () => {
  const [viewState, setViewState] = useState(initialViewState);
  
  // Ishonchli, tokensiz Stadia Maps stil URL'i
  const MAP_STYLE_URL = "https://tiles.stadiamaps.com/styles/osm_bright.json";
  
  return (
    <div className="p-4 h-[80vh]">
      <h2 className="text-2xl font-semibold mb-4">📍 Xaritada Polygon Chizish (MapLibre)</h2>
      
      <MapComponent
        {...viewState}
        style={{ width: '100%', height: '100%', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle={MAP_STYLE_URL} 
        maxZoom={20}
        minZoom={0}
      >
        <NavigationControl position="top-right" />
        <GeolocateControl position="top-right" />
        
        <MapDrawControlComponent />
        
      </MapComponent>
    </div>
  );
};