// src/components/custom/MapDrawControl.tsx
import React, { useCallback, useState } from 'react';
import { useControl } from 'react-map-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useMap } from 'react-map-gl';
import * as userService from '../../data-config/userService'; 
import { FeatureCollection, Polygon } from 'geojson'; 

// Maxsus Tugma Komponenti
const CustomButton: React.FC<{ onClick: () => void, children: React.ReactNode, className?: string, disabled?: boolean }> = ({ onClick, children, className, disabled = false }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-3 py-1 text-sm font-medium rounded-lg text-white transition-colors ${className || 'bg-indigo-600 hover:bg-indigo-700'} disabled:opacity-50 disabled:cursor-not-allowed shadow-md`}
    >
        {children}
    </button>
);

// Mapbox GL Draw uchun maxsus MapControl
function MapDrawControl() {
  const { current: map } = useMap();
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawInstance, setDrawInstance] = useState<MapboxDraw | null>(null);

  useControl(() => {
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {}, 
      styles: [], 
    });
    setDrawInstance(draw);
    return draw;
  }, {
    position: 'top-right'
  });

  const handleSavePolygon = useCallback(() => {
    const allFeatures = drawInstance?.getAll();
    if (!allFeatures || allFeatures.features.length === 0) return;

    const polygonFeature = allFeatures.features[allFeatures.features.length - 1] as unknown as Polygon;
    
    if (polygonFeature.geometry.type === 'Polygon') {
      const coordinates = polygonFeature.geometry.coordinates[0].map(coord => ({
        lat: coord[1],
        lng: coord[0],
      }));

      userService.createPolygon(coordinates)
        .then(() => console.log("Polygon MapLibre yordamida saqlandi!"))
        .catch(err => console.error("Polygon saqlashda xato:", err));
    }
    
    drawInstance?.changeMode('simple_select');
    setIsDrawing(false);
  }, [drawInstance]);

  React.useEffect(() => {
    if (!map || !drawInstance) return;

    const onDrawCreate = (e: any) => { handleSavePolygon(); };
    const onModeChange = () => { setIsDrawing(drawInstance.getMode().startsWith('draw')); };

    map.on('draw.create', onDrawCreate);
    map.on('draw.modechange', onModeChange);
    
    // Cleanup: to'liq tozalash uchun
    return () => {
      map.off('draw.create', onDrawCreate);
      map.off('draw.modechange', onModeChange);
      // MapboxDraw'ni xarita konteyneridan majburiy o'chiramiz
      if (map.getContainer().contains(drawInstance.container)) {
          map.removeControl(drawInstance);
      }
    };
  }, [map, drawInstance, handleSavePolygon]);
  
  // Custom UI funksiyalari
  const startDrawing = () => { drawInstance?.changeMode('draw_polygon'); setIsDrawing(true); };
  const finishDrawing = () => { drawInstance?.changeMode('simple_select'); };
  const startOver = () => { drawInstance?.deleteAll(); drawInstance?.changeMode('simple_select'); setIsDrawing(false); };
  const cancelDrawing = () => { drawInstance?.changeMode('simple_select'); setIsDrawing(false); };
  const toggleSelectMode = () => { drawInstance?.changeMode('simple_select'); };

  // Custom UI render
  return (
    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col space-y-2 p-3 bg-white rounded-lg shadow-xl z-10">
      {/* Tugmalar */}
      <CustomButton onClick={startDrawing} disabled={isDrawing}> ➕ Nuqta belgilash </CustomButton>
      {isDrawing ? (
        <>
          <CustomButton onClick={finishDrawing} className="bg-green-600 hover:bg-green-700"> ✅ Tasdiqlash </CustomButton>
          <CustomButton onClick={cancelDrawing} className="bg-gray-400 hover:bg-gray-500"> ❌ Bekor qilish </CustomButton>
        </>
      ) : (
        <>
          <CustomButton onClick={startOver} className="bg-red-600 hover:bg-red-700"> 🗑️ Boshidan boshlash </CustomButton>
          <CustomButton onClick={toggleSelectMode} className="bg-yellow-600 hover:bg-yellow-700"> ✏️ Tanlash/O'chirish </CustomButton>
        </>
      )}
    </div>
  );
}

export const MapDrawControlComponent: React.FC = () => {
    return <MapDrawControl />; 
};