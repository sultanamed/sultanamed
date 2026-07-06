import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fonts/*.woff2', 'icons/*.png'],
      manifest: {
        name: 'Arapça Adası',
        short_name: 'Arapça Adası',
        description: 'Çocuklar için Arapça öğrenme adası: alfabe, şekiller, rakamlar ve günlük kalıplar',
        lang: 'tr',
        display: 'standalone',
        orientation: 'any',
        background_color: '#FFF6E9',
        theme_color: '#2EC4B6',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2,png,svg}']
      }
    })
  ]
});
