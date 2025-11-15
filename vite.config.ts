// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    // Alias 'mapbox-gl' to 'maplibre-gl' to satisfy react-map-gl's peer dependency
    alias: {
      'mapbox-gl': 'maplibre-gl',
    },
  },

  optimizeDeps: {
    exclude: [], 
  },
});