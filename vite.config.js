import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'VIO YT Clone',
        short_name: 'VIO',
        theme_color: '#212529',
        icons: [
          {
            src: '/logow.svg',
            // src: '/vite.svg',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/logow.svg',
            // src: '/vite.svg',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Workbox options
      },
    }),
  ],
});
