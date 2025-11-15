// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/common/Layout'; 
import { UsersPage } from './pages/UsersPage'; 
import { MapPage } from './pages/MapPage';

// MapLibre CSS va Mapbox GL Draw CSS ni import qilish
import 'maplibre-gl/dist/maplibre-gl.css'; 
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

function App() {
  return (
    <BrowserRouter>
      {/* Layout ni faqat sahifalar ichida ishlatamiz */}
      <Routes>
        <Route path="/" element={<Layout><UsersPage /></Layout>} />
        <Route path="/map" element={<Layout><MapPage /></Layout>} />
        
        {/* Boshqa barcha yo'nalishlarni asosiy sahifaga yo'naltirish */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;