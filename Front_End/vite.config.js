//updated for the localhost:8000
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Django server URL
        changeOrigin: true,
      },
    },
  },
});
