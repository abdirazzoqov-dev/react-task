// src/pages/MapPage.tsx

import React, { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl, type EditControlProps } from 'react-leaflet-draw';
import type { LatLngTuple } from 'leaflet';
import L from 'leaflet';

// Leaflet ikonkalari buzilmasligi uchun konfiguratsiya
// Bu muhim, aks holda chizish ikonkalari ko'rinmaydi.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
  iconUrl: 'leaflet/images/marker-icon.png',
  shadowUrl: 'leaflet/images/marker-shadow.png',
});


const initialCenter: LatLngTuple = [41.3111, 69.2797]; // Toshkent koordinatalari

export const MapPage: React.FC = () => {
  const [drawnLayers, setDrawnLayers] = useState<any[]>([]);

  // Polygon chizish tugagandan so'ng chaqiriladi
  const onCreated = (e: any) => {
    const { layerType, layer } = e;
    
    if (layerType === 'polygon') {
      const polygonCoords = layer.getLatLngs()[0].map((latlng: L.LatLng) => ({
        lat: latlng.lat,
        lng: latlng.lng,
      }));
      
      console.log("Yangi polygon chizildi:", polygonCoords);
      setDrawnLayers(prev => [...prev, layer]);
      // Bu yerda koordinatalarni saqlash logikasini qo'shishingiz mumkin (IndexedDB ga)
    }
  };

  // Polygon o'chirilganda
  const onDeleted = (e: any) => {
    e.layers.eachLayer((layer: L.Layer) => {
      console.log("O'chirilgan qatlam ID:", (layer.options as any).id);
      // Bu yerda saqlangan ma'lumotni IndexedDB dan o'chirish logikasi bo'ladi
    });
  };

  return (
    <div className="p-4 h-[80vh]">
      <h2 className="text-2xl font-semibold mb-4">📍 Xaritada Polygon Chizish</h2>
      <p className="text-sm text-gray-600 mb-4">Xaritada bir nechta vertex bosish orqali polygon chizing.</p>

      <MapContainer 
        center={initialCenter} 
        zoom={13} 
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Chizish va Tahrirlash Funksiyasi */}
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={onCreated}
            onDeleted={onDeleted}
            draw={{
              polyline: false, // Chiziqni o'chiramiz
              circle: false,
              marker: false,
              rectangle: false,
              circlemarker: false,
              // Asosiy talab: Polygon chizish
              polygon: {
                allowIntersection: false, 
                showArea: true,
              },
            }}
            edit={{
              // featureGroup: null, // Qatlamni o'chirish/tahrirlash uchun, bu yerda FeatureGroup ref berilishi kerak
              remove: true, // `true` bo'lishi mumkin, chunki u `EditHandlerOptions` ichida `boolean` yoki `undefined` bo'lishi mumkin.
              edit: {},
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};