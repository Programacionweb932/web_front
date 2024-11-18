import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Define la carpeta de salida para la construcción del proyecto
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Agrega un alias para importar desde src
    },
  },
  server: {
    port: 3000, // Configura el puerto para el desarrollo local
  },
});